/**
 * DomeGallery — vanilla порт для секции отзывов (без React / @use-gesture).
 * Параметры как в примере: fit 0.8, minRadius 600, maxVerticalRotationDeg 0, segments 34, dragDampening 2, grayscale.
 */
const REVIEW_DOME_IMAGES = [
  { src: 'https://picsum.photos/seed/uchitel201/800/600', alt: 'Марина · начальные классы' },
  { src: 'https://picsum.photos/seed/uchitel202/800/600', alt: 'Ольга · классный руководитель' },
  { src: 'https://picsum.photos/seed/uchitel203/800/600', alt: 'Ирина · доп. образование' },
  { src: 'https://picsum.photos/seed/uchitel204/800/600', alt: 'Елена · русский язык' },
  { src: 'https://picsum.photos/seed/uchitel205/800/600', alt: 'Андрей · история' },
  { src: 'https://picsum.photos/seed/uchitel206/800/600', alt: 'Алина · математика' }
];

const DEFAULTS = {
  maxVerticalRotationDeg: 5,
  dragSensitivity: 20,
  enlargeTransitionMs: 300,
  segments: 35
};

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
const normalizeAngle = d => ((d % 360) + 360) % 360;
const wrapAngleSigned = deg => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

function getDataNumber(el, name, fallback) {
  const v = el.dataset[name];
  const n = v == null ? NaN : parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function buildItems(pool, seg) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map(c => ({ ...c, src: '', alt: '' }));
  }
  if (pool.length > totalSlots) {
    console.warn(`[DomeGallery] Изображений больше, чем плиток (${totalSlots}).`);
  }

  const normalizedImages = pool.map(image =>
    typeof image === 'string' ? { src: image, alt: '' } : { src: image.src || '', alt: image.alt || '' }
  );

  const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt
  }));
}

function computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

class DomeGallery {
  constructor(root, opts = {}) {
    this.root = root;
    this.images = opts.images || REVIEW_DOME_IMAGES;
    this.fit = opts.fit ?? 0.8;
    this.fitBasis = opts.fitBasis || 'auto';
    this.minRadius = opts.minRadius ?? 600;
    this.maxRadius = opts.maxRadius ?? Infinity;
    this.padFactor = opts.padFactor ?? 0.25;
    this.overlayBlurColor = opts.overlayBlurColor || '#0b0b0f';
    this.maxVerticalRotationDeg = opts.maxVerticalRotationDeg ?? DEFAULTS.maxVerticalRotationDeg;
    this.dragSensitivity = opts.dragSensitivity ?? DEFAULTS.dragSensitivity;
    this.enlargeTransitionMs = opts.enlargeTransitionMs ?? DEFAULTS.enlargeTransitionMs;
    this.segments = opts.segments ?? DEFAULTS.segments;
    this.dragDampening = opts.dragDampening ?? 2;
    this.openedImageWidth = opts.openedImageWidth || '';
    this.openedImageHeight = opts.openedImageHeight || '';
    this.imageBorderRadius = opts.imageBorderRadius || '30px';
    this.openedImageBorderRadius = opts.openedImageBorderRadius || '30px';
    this.grayscale = opts.grayscale !== false;

    this.rotation = { x: 0, y: 0 };
    this.startRot = { x: 0, y: 0 };
    this.startPos = null;
    this.dragging = false;
    this.dragDist = 0;
    this.lastDragEndAt = 0;
    this.inertiaRAF = null;
    this.opening = false;
    this.openStartedAt = 0;
    this.focusedEl = null;
    this.originalTilePosition = null;
    this.scrollLocked = false;

    this.velX = 0;
    this.velY = 0;
    this.lastMoveX = 0;
    this.lastMoveY = 0;
    this.lastMoveT = 0;
    this.suppressTileClickUntil = 0;

    this.items = buildItems(this.images, this.segments);

    this._buildDom();
    this._bind();
    this._observeResize();
    this.applyTransform(this.rotation.x, this.rotation.y);
  }

  _buildDom() {
    const { root, segments, grayscale, overlayBlurColor, imageBorderRadius, openedImageBorderRadius } = this;
    root.classList.add('sphere-root');
    root.style.setProperty('--segments-x', String(segments));
    root.style.setProperty('--segments-y', String(segments));
    root.style.setProperty('--overlay-blur-color', overlayBlurColor);
    root.style.setProperty('--tile-radius', imageBorderRadius);
    root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
    root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');

    root.innerHTML = `
      <main class="sphere-main">
        <div class="stage">
          <div class="sphere"></div>
        </div>
        <div class="overlay"></div>
        <div class="overlay overlay--blur"></div>
        <div class="edge-fade edge-fade--top"></div>
        <div class="edge-fade edge-fade--bottom"></div>
        <div class="viewer">
          <div class="scrim"></div>
          <div class="frame"></div>
        </div>
      </main>
    `;

    this.main = root.querySelector('.sphere-main');
    this.sphere = root.querySelector('.sphere');
    this.viewer = root.querySelector('.viewer');
    this.frame = root.querySelector('.frame');
    this.scrim = root.querySelector('.scrim');

    const frag = document.createDocumentFragment();
    this.items.forEach((it, i) => {
      const item = document.createElement('div');
      item.className = 'item';
      item.dataset.src = it.src;
      item.dataset.offsetX = String(it.x);
      item.dataset.offsetY = String(it.y);
      item.dataset.sizeX = String(it.sizeX);
      item.dataset.sizeY = String(it.sizeY);
      item.style.setProperty('--offset-x', String(it.x));
      item.style.setProperty('--offset-y', String(it.y));
      item.style.setProperty('--item-size-x', String(it.sizeX));
      item.style.setProperty('--item-size-y', String(it.sizeY));

      const imgWrap = document.createElement('div');
      imgWrap.className = 'item__image';
      imgWrap.setAttribute('role', 'button');
      imgWrap.tabIndex = 0;
      imgWrap.setAttribute('aria-label', it.alt || 'Открыть фото');

      const img = document.createElement('img');
      img.src = it.src;
      img.alt = it.alt;
      img.draggable = false;

      imgWrap.appendChild(img);
      item.appendChild(imgWrap);
      frag.appendChild(item);
    });
    this.sphere.appendChild(frag);
  }

  lockScroll() {
    if (this.scrollLocked) return;
    this.scrollLocked = true;
    document.body.classList.add('dg-scroll-lock');
  }

  unlockScroll() {
    if (!this.scrollLocked) return;
    if (this.root.getAttribute('data-enlarging') === 'true') return;
    this.scrollLocked = false;
    document.body.classList.remove('dg-scroll-lock');
  }

  applyTransform(xDeg, yDeg) {
    if (this.sphere) {
      this.sphere.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }

  stopInertia() {
    if (this.inertiaRAF) {
      cancelAnimationFrame(this.inertiaRAF);
      this.inertiaRAF = null;
    }
  }

  startInertia(vx, vy) {
    const MAX_V = 1.4;
    let vX = clamp(vx, -MAX_V, MAX_V) * 80;
    let vY = clamp(vy, -MAX_V, MAX_V) * 80;
    let frames = 0;
    const d = clamp(this.dragDampening ?? 0.6, 0, 1);
    const frictionMul = 0.94 + 0.055 * d;
    const stopThreshold = 0.015 - 0.01 * d;
    const maxFrames = Math.round(90 + 270 * d);

    const step = () => {
      vX *= frictionMul;
      vY *= frictionMul;
      if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
        this.inertiaRAF = null;
        return;
      }
      if (++frames > maxFrames) {
        this.inertiaRAF = null;
        return;
      }
      const nextX = clamp(this.rotation.x - vY / 200, -this.maxVerticalRotationDeg, this.maxVerticalRotationDeg);
      const nextY = wrapAngleSigned(this.rotation.y + vX / 200);
      this.rotation.x = nextX;
      this.rotation.y = nextY;
      this.applyTransform(nextX, nextY);
      this.inertiaRAF = requestAnimationFrame(step);
    };
    this.stopInertia();
    this.inertiaRAF = requestAnimationFrame(step);
  }

  _observeResize() {
    this.lockedRadius = null;
    this.ro = new ResizeObserver(entries => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;
      let basis;
      switch (this.fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * this.fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, this.minRadius, this.maxRadius);
      this.lockedRadius = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * this.padFactor));
      this.root.style.setProperty('--radius', `${this.lockedRadius}px`);
      this.root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      this.applyTransform(this.rotation.x, this.rotation.y);

      const enlargedOverlay = this.viewer?.querySelector('.enlarge');
      if (enlargedOverlay && this.frame && this.main) {
        const frameR = this.frame.getBoundingClientRect();
        const mainR = this.main.getBoundingClientRect();
        const hasCustomSize = this.openedImageWidth && this.openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement('div');
          tempDiv.style.cssText = `position:absolute;width:${this.openedImageWidth};height:${this.openedImageHeight};visibility:hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);
          enlargedOverlay.style.left = `${frameR.left - mainR.left + (frameR.width - tempRect.width) / 2}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top + (frameR.height - tempRect.height) / 2}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    this.ro.observe(this.root);
  }

  _bind() {
    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onTileClick = this._onTileClick.bind(this);
    this._onTilePointerUp = this._onTilePointerUp.bind(this);
    this._onTileKey = this._onTileKey.bind(this);
    this._close = this._close.bind(this);
    this._onKey = e => {
      if (e.key === 'Escape') this._close();
    };

    this.main.addEventListener('pointerdown', this._onPointerDown, { passive: true });
    this.main.addEventListener('pointermove', this._onPointerMove, { passive: true });
    this.main.addEventListener('pointerup', this._onPointerUp);
    this.main.addEventListener('pointercancel', this._onPointerUp);

    this.sphere.querySelectorAll('.item__image').forEach(el => {
      el.addEventListener('click', this._onTileClick);
      el.addEventListener('pointerup', this._onTilePointerUp);
      el.addEventListener('keydown', this._onTileKey);
    });

    this.scrim.addEventListener('click', this._close);
    window.addEventListener('keydown', this._onKey);
  }

  _onPointerDown(e) {
    if (this.focusedEl) return;
    this.stopInertia();
    this.dragging = true;
    this.dragDist = 0;
    this.startRot = { ...this.rotation };
    this.startPos = { x: e.clientX, y: e.clientY };
    this.lastMoveX = e.clientX;
    this.lastMoveY = e.clientY;
    this.lastMoveT = performance.now();
    this.velX = 0;
    this.velY = 0;
    try {
      this.main.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }

  _onPointerMove(e) {
    if (this.focusedEl || !this.dragging || !this.startPos) return;
    const dxTotal = e.clientX - this.startPos.x;
    const dyTotal = e.clientY - this.startPos.y;
    this.dragDist = Math.max(this.dragDist, dxTotal * dxTotal + dyTotal * dyTotal);

    const nextX = clamp(
      this.startRot.x - dyTotal / this.dragSensitivity,
      -this.maxVerticalRotationDeg,
      this.maxVerticalRotationDeg
    );
    const nextY = wrapAngleSigned(this.startRot.y + dxTotal / this.dragSensitivity);
    this.rotation.x = nextX;
    this.rotation.y = nextY;
    this.applyTransform(nextX, nextY);

    const now = performance.now();
    const dt = now - this.lastMoveT;
    if (dt > 0 && dt < 80) {
      this.velX = ((e.clientX - this.lastMoveX) / dt) * 0.02;
      this.velY = ((e.clientY - this.lastMoveY) / dt) * 0.02;
    }
    this.lastMoveX = e.clientX;
    this.lastMoveY = e.clientY;
    this.lastMoveT = now;
  }

  _onPointerUp(e) {
    if (!this.dragging) return;
    this.dragging = false;
    try {
      if (e.pointerId != null) this.main.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const moved = this.dragDist > 16;
    if (moved) {
      this.lastDragEndAt = performance.now();
      this.suppressTileClickUntil = performance.now() + 140;
    }

    let vx = this.velX;
    let vy = this.velY;
    if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && moved) {
      vx = clamp((this.lastMoveX - this.startPos.x) / this.dragSensitivity * 0.02, -1.2, 1.2);
      vy = clamp((this.lastMoveY - this.startPos.y) / this.dragSensitivity * 0.02, -1.2, 1.2);
    }
    if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) this.startInertia(vx, vy);

    this.startPos = null;
    this.dragDist = 0;
  }

  _onTileClick(e) {
    if (performance.now() < this.suppressTileClickUntil) return;
    if (this.dragging) return;
    if (performance.now() - this.lastDragEndAt < 80) return;
    if (this.opening) return;
    this.openItemFromElement(e.currentTarget);
  }

  _onTilePointerUp(e) {
    if (e.pointerType !== 'touch') return;
    if (performance.now() < this.suppressTileClickUntil) return;
    if (this.dragging) return;
    if (performance.now() - this.lastDragEndAt < 80) return;
    if (this.opening) return;
    this.openItemFromElement(e.currentTarget);
  }

  _onTileKey(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    if (this.opening) return;
    this.openItemFromElement(e.currentTarget);
  }

  openItemFromElement(el) {
    if (this.opening) return;
    this.opening = true;
    this.openStartedAt = performance.now();
    this.lockScroll();

    const parent = el.parentElement;
    this.focusedEl = el;
    el.setAttribute('data-focused', 'true');

    const offsetX = getDataNumber(parent, 'offsetX', 0);
    const offsetY = getDataNumber(parent, 'offsetY', 0);
    const sizeX = getDataNumber(parent, 'sizeX', 2);
    const sizeY = getDataNumber(parent, 'sizeY', 2);
    const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, this.segments);
    const parentY = normalizeAngle(parentRot.rotateY);
    const globalY = normalizeAngle(this.rotation.y);
    let rotY = -(parentY + globalY) % 360;
    if (rotY < -180) rotY += 360;
    const rotX = -parentRot.rotateX - this.rotation.x;
    parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
    parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

    const refDiv = document.createElement('div');
    refDiv.className = 'item__image item__image--reference';
    refDiv.style.opacity = '0';
    refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
    parent.appendChild(refDiv);
    void refDiv.offsetHeight;

    const tileR = refDiv.getBoundingClientRect();
    const mainR = this.main.getBoundingClientRect();
    const frameR = this.frame.getBoundingClientRect();

    if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
      this.opening = false;
      this.focusedEl = null;
      parent.removeChild(refDiv);
      this.unlockScroll();
      return;
    }

    this.originalTilePosition = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };
    el.style.visibility = 'hidden';
    el.style.zIndex = '0';

    const overlay = document.createElement('div');
    overlay.className = 'enlarge';
    overlay.style.position = 'absolute';
    overlay.style.left = `${frameR.left - mainR.left}px`;
    overlay.style.top = `${frameR.top - mainR.top}px`;
    overlay.style.width = `${frameR.width}px`;
    overlay.style.height = `${frameR.height}px`;
    overlay.style.opacity = '0';
    overlay.style.zIndex = '30';
    overlay.style.willChange = 'transform, opacity';
    overlay.style.transformOrigin = 'top left';
    overlay.style.transition = `transform ${this.enlargeTransitionMs}ms ease, opacity ${this.enlargeTransitionMs}ms ease`;

    const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
    const img = document.createElement('img');
    img.src = rawSrc;
    overlay.appendChild(img);
    this.viewer.appendChild(overlay);

    const tx0 = tileR.left - frameR.left;
    const ty0 = tileR.top - frameR.top;
    const sx0 = tileR.width / frameR.width;
    const sy0 = tileR.height / frameR.height;
    const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
    const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;
    overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

    setTimeout(() => {
      if (!overlay.parentElement) return;
      overlay.style.opacity = '1';
      overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
      this.root.setAttribute('data-enlarging', 'true');
    }, 16);
  }

  _close() {
    if (performance.now() - this.openStartedAt < 250) return;
    const el = this.focusedEl;
    if (!el) return;
    const parent = el.parentElement;
    const overlay = this.viewer?.querySelector('.enlarge');
    if (!overlay) return;
    const refDiv = parent.querySelector('.item__image--reference');
    const originalPos = this.originalTilePosition;
    if (!originalPos) {
      overlay.remove();
      if (refDiv) refDiv.remove();
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      el.style.visibility = '';
      el.style.zIndex = '0';
      el.removeAttribute('data-focused');
      this.focusedEl = null;
      this.root.removeAttribute('data-enlarging');
      this.opening = false;
      this.unlockScroll();
      return;
    }

    const currentRect = overlay.getBoundingClientRect();
    const rootRect = this.root.getBoundingClientRect();
    const overlayRel = {
      left: currentRect.left - rootRect.left,
      top: currentRect.top - rootRect.top,
      width: currentRect.width,
      height: currentRect.height
    };
    const originalRel = {
      left: originalPos.left - rootRect.left,
      top: originalPos.top - rootRect.top,
      width: originalPos.width,
      height: originalPos.height
    };

    const animatingOverlay = document.createElement('div');
    animatingOverlay.className = 'enlarge-closing';
    animatingOverlay.style.cssText = `position:absolute;left:${overlayRel.left}px;top:${overlayRel.top}px;width:${overlayRel.width}px;height:${overlayRel.height}px;z-index:9999;border-radius:var(--enlarge-radius,32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${this.enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
    const originalImg = overlay.querySelector('img');
    if (originalImg) {
      const im = originalImg.cloneNode();
      im.style.cssText = 'width:100%;height:100%;object-fit:cover;';
      animatingOverlay.appendChild(im);
    }
    overlay.remove();
    this.root.appendChild(animatingOverlay);
    void animatingOverlay.getBoundingClientRect();
    requestAnimationFrame(() => {
      animatingOverlay.style.left = `${originalRel.left}px`;
      animatingOverlay.style.top = `${originalRel.top}px`;
      animatingOverlay.style.width = `${originalRel.width}px`;
      animatingOverlay.style.height = `${originalRel.height}px`;
      animatingOverlay.style.opacity = '0';
    });

    const cleanup = () => {
      animatingOverlay.remove();
      this.originalTilePosition = null;
      if (refDiv) refDiv.remove();
      parent.style.transition = 'none';
      el.style.transition = 'none';
      parent.style.setProperty('--rot-y-delta', '0deg');
      parent.style.setProperty('--rot-x-delta', '0deg');
      requestAnimationFrame(() => {
        el.style.visibility = '';
        el.style.opacity = '0';
        el.style.zIndex = '0';
        el.removeAttribute('data-focused');
        this.focusedEl = null;
        this.root.removeAttribute('data-enlarging');
        requestAnimationFrame(() => {
          parent.style.transition = '';
          el.style.transition = 'opacity 300ms ease-out';
          requestAnimationFrame(() => {
            el.style.opacity = '1';
            setTimeout(() => {
              el.style.transition = '';
              el.style.opacity = '';
              this.opening = false;
              if (!this.dragging && this.root.getAttribute('data-enlarging') !== 'true') {
                document.body.classList.remove('dg-scroll-lock');
                this.scrollLocked = false;
              }
            }, 300);
          });
        });
      });
    };
    animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
  }

  destroy() {
    this.stopInertia();
    this.ro?.disconnect();
    this.main?.removeEventListener('pointerdown', this._onPointerDown);
    this.main?.removeEventListener('pointermove', this._onPointerMove);
    this.main?.removeEventListener('pointerup', this._onPointerUp);
    this.main?.removeEventListener('pointercancel', this._onPointerUp);
    this.scrim?.removeEventListener('click', this._close);
    window.removeEventListener('keydown', this._onKey);
    document.body.classList.remove('dg-scroll-lock');
  }
}

function initReviewsDomeGallery() {
  const wrap = document.getElementById('reviews-dome-wrap');
  const root = document.getElementById('reviews-dome-root');
  const fallback = document.getElementById('reviews-fallback');
  const hint = document.querySelector('.reviews-dome-hint');
  if (!wrap || !root || !fallback) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-hidden');
    wrap.classList.add('is-hidden');
    fallback.classList.remove('reviews-fallback--sr-only');
    hint?.classList.add('is-hidden');
    return;
  }

  try {
    const gallery = new DomeGallery(root, {
      images: REVIEW_DOME_IMAGES,
      fit: 0.8,
      minRadius: 600,
      maxVerticalRotationDeg: 0,
      segments: 34,
      dragDampening: 2,
      grayscale: true,
      overlayBlurColor: '#0b0b0f'
    });
    root.classList.remove('is-hidden');
    wrap.classList.remove('is-hidden');
    fallback.classList.add('reviews-fallback--sr-only');
    hint?.classList.remove('is-hidden');
    window.addEventListener('pagehide', () => gallery.destroy(), { once: true });
  } catch (e) {
    console.warn('DomeGallery init failed', e);
    root.classList.add('is-hidden');
    wrap.classList.add('is-hidden');
    fallback.classList.remove('reviews-fallback--sr-only');
    hint?.classList.add('is-hidden');
  }
}

initReviewsDomeGallery();
