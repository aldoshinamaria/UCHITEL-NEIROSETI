/**
 * Hero «lanyard»: крупное фото, широкий ремешок бейджа с брендом, перетаскивание.
 */
import * as THREE from 'https://esm.sh/three@0.160.0';

const BRAND_STRAP_TEXT = 'Учитель&Нейросети';

/** Карточка ~в 3× крупнее прежней; камера и якорь под масштаб сцены */
function getLanyardConfig(mobile) {
  return {
    cameraPosition: new THREE.Vector3(0, 0, mobile ? 90 : 108),
    fov: mobile ? 21 : 17.5,
    spring: 26,
    damping: 0.87,
    anchorY: mobile ? 17.2 : 20.8,
    cardHeight: mobile ? 9.15 : 11.45,
    cardAspect: 2 / 3,
    strapHalfWidth: mobile ? 0.4 : 0.52,
    strapSegments: mobile ? 42 : 62,
    ambient: 0.66,
    dirLight: 1.05
  };
}

function clamp(v, a, b) {
  return Math.max(a, Math.min(b, v));
}

function createStrapTexture(renderer) {
  const w = 1024;
  const h = 176;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#5b21b6');
  g.addColorStop(0.45, '#8b5cf6');
  g.addColorStop(0.55, '#a78bfa');
  g.addColorStop(1, '#5b21b6');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
  ctx.lineWidth = 6;
  ctx.strokeRect(3, 3, w - 6, h - 6);
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, h * 0.5);
  ctx.lineTo(w, h * 0.5);
  ctx.stroke();
  ctx.fillStyle = '#faf5ff';
  ctx.font = 'bold 56px system-ui, "Segoe UI", "Bricolage Grotesque", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
  ctx.shadowBlur = 10;
  ctx.shadowOffsetY = 2;
  ctx.fillText(BRAND_STRAP_TEXT, w / 2, h / 2);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 5.5);
  tex.anisotropy = Math.min(12, renderer.capabilities.getMaxAnisotropy());
  tex.needsUpdate = true;
  return tex;
}

function updateRibbonGeometry(pts, halfWidth, geometry) {
  const n = pts.length;
  const pos = geometry.attributes.position.array;
  const uv = geometry.attributes.uv.array;
  for (let i = 0; i < n; i++) {
    let tx;
    let ty;
    if (i === 0) {
      tx = pts[1].x - pts[0].x;
      ty = pts[1].y - pts[0].y;
    } else if (i === n - 1) {
      tx = pts[n - 1].x - pts[n - 2].x;
      ty = pts[n - 1].y - pts[n - 2].y;
    } else {
      tx = pts[i + 1].x - pts[i - 1].x;
      ty = pts[i + 1].y - pts[i - 1].y;
    }
    const len = Math.hypot(tx, ty) || 1;
    tx /= len;
    ty /= len;
    const px = -ty * halfWidth;
    const py = tx * halfWidth;
    const i6 = i * 6;
    pos[i6] = pts[i].x + px;
    pos[i6 + 1] = pts[i].y + py;
    pos[i6 + 2] = pts[i].z;
    pos[i6 + 3] = pts[i].x - px;
    pos[i6 + 4] = pts[i].y - py;
    pos[i6 + 5] = pts[i].z;
    const v = n > 1 ? i / (n - 1) : 0;
    const i4 = i * 4;
    uv[i4] = 0;
    uv[i4 + 1] = v;
    uv[i4 + 2] = 1;
    uv[i4 + 3] = v;
  }
  geometry.attributes.position.needsUpdate = true;
  geometry.attributes.uv.needsUpdate = true;
  geometry.computeVertexNormals();
}

function buildRibbonIndices(strapPts) {
  const indices = [];
  for (let i = 0; i < strapPts - 1; i++) {
    const a = i * 2;
    const b = a + 1;
    const c = (i + 1) * 2;
    const d = c + 1;
    indices.push(a, d, b, a, c, d);
  }
  return indices;
}

function initHeroLanyard() {
  if (typeof window === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.getElementById('hero-lanyard-root');
  const fallback = document.querySelector('.hero__img--fallback');
  const figure = root?.closest('.hero__figure');
  const hint = document.querySelector('.hero-lanyard-hint');
  if (!root || !fallback || !figure) return;

  const isMobile = () => window.innerWidth < 768;
  const cfg = getLanyardConfig(isMobile());
  const cardW = cfg.cardHeight * cfg.cardAspect;
  const cardH = cfg.cardHeight;
  const clipH = 0.42;
  const clipD = 0.2;
  const clipW = cardW * 1.08;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile() ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    root.appendChild(renderer.domElement);
  } catch {
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(cfg.fov, 1, 0.1, 220);
  camera.position.copy(cfg.cameraPosition);
  const lookY = isMobile() ? -0.42 : -1.05;
  camera.lookAt(0, lookY, 0);

  scene.add(new THREE.AmbientLight(0xffffff, cfg.ambient));
  const dir = new THREE.DirectionalLight(0xffffff, cfg.dirLight);
  dir.position.set(2.5, 4, 5);
  scene.add(dir);
  const fill = new THREE.DirectionalLight(0xddd6fe, 0.38);
  fill.position.set(-3, 1, 2);
  scene.add(fill);

  const anchor = new THREE.Vector3(0, cfg.anchorY, 0);

  const restY = isMobile() ? -1.72 : -2.82;
  const restPos = new THREE.Vector3(0, restY, 0);
  const pos = restPos.clone();
  const vel = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const targetDrag = new THREE.Vector3();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const raycaster = new THREE.Raycaster();

  const cardGroup = new THREE.Group();
  scene.add(cardGroup);

  const cardGeo = new THREE.PlaneGeometry(cardW, cardH);
  const clipGeo = new THREE.BoxGeometry(clipW, clipH, clipD);
  clipGeo.translate(0, cardH * 0.5 + clipH * 0.5 + 0.06, 0.05);

  const loader = new THREE.TextureLoader();
  const photoPath = fallback.getAttribute('src') || 'images/hero-photo.png';

  loader.load(
    photoPath,
    texture => {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(12, renderer.capabilities.getMaxAnisotropy());

      const cardMat = new THREE.MeshPhysicalMaterial({
        map: texture,
        roughness: 0.42,
        metalness: 0.08,
        clearcoat: isMobile() ? 0.15 : 0.55,
        clearcoatRoughness: 0.22
      });
      const cardMesh = new THREE.Mesh(cardGeo, cardMat);
      cardGroup.add(cardMesh);

      const clipMat = new THREE.MeshStandardMaterial({
        color: 0x9ca3af,
        metalness: 0.88,
        roughness: 0.26
      });
      const clipMesh = new THREE.Mesh(clipGeo, clipMat);
      cardGroup.add(clipMesh);

      const curve = new THREE.CatmullRomCurve3(
        [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()],
        false,
        'chordal'
      );

      const strapPts = Math.max(14, cfg.strapSegments);
      const strapTex = createStrapTexture(renderer);
      const vertCount = strapPts * 2;
      const ribbonGeo = new THREE.BufferGeometry();
      ribbonGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertCount * 3), 3));
      ribbonGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(vertCount * 2), 2));
      ribbonGeo.setIndex(buildRibbonIndices(strapPts));

      const strapMat = new THREE.MeshStandardMaterial({
        map: strapTex,
        roughness: 0.48,
        metalness: 0.12,
        side: THREE.DoubleSide
      });
      const strapMesh = new THREE.Mesh(ribbonGeo, strapMat);
      scene.add(strapMesh);

      const halfW = cfg.strapHalfWidth;
      const sagA = new THREE.Vector3();
      const sagB = new THREE.Vector3();

      let dragging = false;
      const pointerNdc = new THREE.Vector2();

      function pointerToWorld(clientX, clientY) {
        const rect = root.getBoundingClientRect();
        pointerNdc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
        pointerNdc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(pointerNdc, camera);
        const out = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, out);
        return out;
      }

      function onDown(e) {
        e.preventDefault();
        dragging = true;
        root.setPointerCapture(e.pointerId);
        targetDrag.copy(pointerToWorld(e.clientX, e.clientY));
        vel.multiplyScalar(0.35);
      }

      function onMove(e) {
        if (!dragging) return;
        targetDrag.copy(pointerToWorld(e.clientX, e.clientY));
      }

      function onUp(e) {
        if (!dragging) return;
        dragging = false;
        try {
          root.releasePointerCapture(e.pointerId);
        } catch {
          /* ignore */
        }
      }

      root.addEventListener('pointerdown', onDown);
      root.addEventListener('pointermove', onMove);
      root.addEventListener('pointerup', onUp);
      root.addEventListener('pointercancel', onUp);

      const clock = new THREE.Clock();

      function resize() {
        const w = root.clientWidth;
        const h = root.clientHeight;
        if (w < 1 || h < 1) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }

      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(root);

      function updateStrap() {
        const clipTop = cardH * 0.5 + clipH + 0.08;
        const cardTop = pos.clone().add(new THREE.Vector3(0, clipTop, 0));
        const t = performance.now() * 0.0015;
        const sway = Math.sin(t) * 0.1;

        const p0 = anchor.clone();
        const p3 = cardTop;
        const p1 = sagA
          .copy(p0)
          .lerp(p3, 0.28)
          .add(new THREE.Vector3(vel.x * 0.22, -2.85 + sway, vel.z * 0.14));
        const p2 = sagB
          .copy(p0)
          .lerp(p3, 0.72)
          .add(new THREE.Vector3(-vel.x * 0.18, -2.2 - sway * 0.55, 0));

        curve.points[0].copy(p0);
        curve.points[1].copy(p1);
        curve.points[2].copy(p2);
        curve.points[3].copy(p3);

        const pts = curve.getPoints(strapPts - 1);
        updateRibbonGeometry(pts, halfW, ribbonGeo);
      }

      function animate() {
        const dt = clamp(clock.getDelta(), 0, 0.05);
        const k = cfg.spring * dt;
        const d = cfg.damping;

        if (dragging) {
          tmp.copy(targetDrag).sub(pos);
          vel.add(tmp.multiplyScalar(k * 2.2));
          vel.multiplyScalar(0.72);
        } else {
          tmp.copy(restPos).sub(pos);
          vel.add(tmp.multiplyScalar(k));
          vel.multiplyScalar(d);
        }

        pos.add(vel);

        cardGroup.position.copy(pos);
        cardGroup.rotation.z = clamp(-vel.x * 0.12, -0.32, 0.32);
        cardGroup.rotation.x = clamp(vel.y * 0.09, -0.26, 0.26);

        updateStrap();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }

      figure.classList.add('hero__figure--has-lanyard');
      fallback.setAttribute('aria-hidden', 'true');
      if (hint) hint.hidden = false;
      animate();

      window.addEventListener(
        'pagehide',
        () => {
          ro.disconnect();
          root.removeEventListener('pointerdown', onDown);
          root.removeEventListener('pointermove', onMove);
          root.removeEventListener('pointerup', onUp);
          root.removeEventListener('pointercancel', onUp);
          renderer.dispose();
          cardGeo.dispose();
          clipGeo.dispose();
          ribbonGeo.dispose();
          strapMat.dispose();
          strapTex.dispose();
          cardMat.dispose();
          clipMat.dispose();
          texture.dispose();
          if (renderer.domElement.parentNode === root) root.removeChild(renderer.domElement);
        },
        { once: true }
      );
    },
    undefined,
    () => {
      /* текстура не загрузилась — оставляем обычное фото */
    }
  );
}

initHeroLanyard();
