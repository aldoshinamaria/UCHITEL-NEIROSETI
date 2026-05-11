/**
 * BorderGlow — vanilla порт: градиентная кайма и свечение следуют за курсором у краёв.
 */
(function initBorderGlow() {
  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = [
    '--gradient-one',
    '--gradient-two',
    '--gradient-three',
    '--gradient-four',
    '--gradient-five',
    '--gradient-six',
    '--gradient-seven'
  ];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function parseHSL(hslStr) {
    const match = String(hslStr).trim().match(/([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?/);
    if (!match) return { h: 268, s: 85, l: 78 };
    return {
      h: parseFloat(match[1], 10),
      s: parseFloat(match[2], 10),
      l: parseFloat(match[3], 10)
    };
  }

  function buildGlowVars(glowColor, intensity) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function easeOutCubic(x) {
    return 1 - Math.pow(1 - x, 3);
  }

  function easeInCubic(x) {
    return x * x * x;
  }

  function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
    const t0 = performance.now() + delay;
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
      else if (onEnd) onEnd();
    }
    setTimeout(() => requestAnimationFrame(tick), delay);
  }

  function getCenterLocal(el) {
    return [el.clientWidth / 2, el.clientHeight / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenterLocal(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenterLocal(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }

  function applyVars(el, obj) {
    Object.keys(obj).forEach(k => el.style.setProperty(k, obj[k]));
  }

  function parseColors(dataset) {
    if (!dataset.borderGlowColors) return ['#c084fc', '#f472b6', '#38bdf8'];
    try {
      const arr = JSON.parse(dataset.borderGlowColors);
      return Array.isArray(arr) && arr.length ? arr : ['#c084fc', '#f472b6', '#38bdf8'];
    } catch {
      return ['#c084fc', '#f472b6', '#38bdf8'];
    }
  }

  function setupCard(card) {
    const ds = card.dataset;
    const edgeSensitivity = ds.edgeSensitivity != null ? Number(ds.edgeSensitivity) : 30;
    const glowColor = ds.glowColor || '268 85 78';
    const glowIntensity = ds.glowIntensity != null ? Number(ds.glowIntensity) : 1;
    const borderRadius = ds.borderRadius != null ? Number(ds.borderRadius) : 28;
    const glowRadius = ds.glowRadius != null ? Number(ds.glowRadius) : 40;
    const coneSpread = ds.coneSpread != null ? Number(ds.coneSpread) : 25;
    const fillOpacity = ds.fillOpacity != null ? Number(ds.fillOpacity) : 0.5;
    const colors = parseColors(ds);

    if (ds.bg) {
      card.style.setProperty('--card-bg', ds.bg);
    }
    card.style.setProperty('--edge-sensitivity', String(edgeSensitivity));
    card.style.setProperty('--border-radius', `${borderRadius}px`);
    card.style.setProperty('--glow-padding', `${glowRadius}px`);
    card.style.setProperty('--cone-spread', String(coneSpread));
    card.style.setProperty('--fill-opacity', String(fillOpacity));

    applyVars(card, buildGlowVars(glowColor, glowIntensity));
    applyVars(card, buildGradientVars(colors));

    function handlePointerMove(e) {
      if (!card.isConnected) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);
      card.style.setProperty('--edge-proximity', (edge * 100).toFixed(3));
      card.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
    }

    function handlePointerLeave() {
      card.style.setProperty('--edge-proximity', '0');
    }

    card.addEventListener('pointermove', handlePointerMove);
    card.addEventListener('pointerleave', handlePointerLeave);

    const animated = ds.borderGlowAnimated === 'true';
    if (animated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const angleStart = 110;
      const angleEnd = 465;
      card.classList.add('sweep-active');
      card.style.setProperty('--cursor-angle', `${angleStart}deg`);

      animateValue({ duration: 500, onUpdate: v => card.style.setProperty('--edge-proximity', v.toFixed(3)) });
      animateValue({
        ease: easeInCubic,
        duration: 1500,
        end: 50,
        onUpdate: v => {
          card.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * v) / 100 + angleStart}deg`);
        }
      });
      animateValue({
        ease: easeOutCubic,
        delay: 1500,
        duration: 2250,
        start: 50,
        end: 100,
        onUpdate: v => {
          card.style.setProperty('--cursor-angle', `${((angleEnd - angleStart) * v) / 100 + angleStart}deg`);
        }
      });
      animateValue({
        ease: easeInCubic,
        delay: 2500,
        duration: 1500,
        start: 100,
        end: 0,
        onUpdate: v => card.style.setProperty('--edge-proximity', v.toFixed(3)),
        onEnd: () => card.classList.remove('sweep-active')
      });
    }
  }

  document.querySelectorAll('[data-border-glow]').forEach(setupCard);
})();
