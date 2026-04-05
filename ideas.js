(function () {
  const JSON_URL = 'idei.json';

  const card = document.getElementById('idea-card');
  const titleEl = document.getElementById('idea-title');
  const metaEl = document.getElementById('idea-meta');
  const promptEl = document.getElementById('idea-prompt');
  const actionEl = document.getElementById('idea-action');
  const loadingEl = document.getElementById('idea-loading');
  const errorEl = document.getElementById('idea-error');
  const hintEl = document.getElementById('idea-hint');
  const navEl = document.getElementById('idea-nav');
  const nextBtn = document.getElementById('idea-next');
  const revealBtn = document.getElementById('idea-reveal');
  const sliderEl = document.getElementById('idea-slider');

  let ideas = [];
  let ideasPromise = null;
  let currentIndex = -1;
  let hasRevealed = false;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ensureIdeasLoaded() {
    if (ideas.length > 0) return Promise.resolve();
    if (!ideasPromise) {
      ideasPromise = fetch(JSON_URL)
        .then((res) => {
          if (!res.ok) throw new Error(String(res.status));
          return res.json();
        })
        .then((data) => {
          if (!Array.isArray(data) || data.length === 0) throw new Error('empty');
          ideas = data;
        });
    }
    return ideasPromise;
  }

  function randomIndex(exclude) {
    if (ideas.length === 0) return -1;
    if (ideas.length === 1) return 0;
    let i;
    let guard = 0;
    do {
      i = Math.floor(Math.random() * ideas.length);
      guard += 1;
    } while (i === exclude && guard < 50);
    return i;
  }

  function fillCard(idea) {
    titleEl.textContent = idea.title;
    metaEl.textContent = `${idea.stage} · ${idea.time}`;
    promptEl.textContent = idea.prompt;
    actionEl.textContent = idea.action;
  }

  function playFlyIn() {
    if (prefersReducedMotion || !card) return;
    card.classList.remove('idea-card--enter');
    void card.offsetWidth;
    card.classList.add('idea-card--enter');
  }

  function showIdeaAt(index, withAnimation) {
    const idea = ideas[index];
    if (!idea) return;
    fillCard(idea);
    currentIndex = index;
    card.hidden = false;
    if (withAnimation) playFlyIn();
  }

  function onNext() {
    if (!ideas.length) return;
    showIdeaAt(randomIndex(currentIndex), true);
  }

  async function onReveal() {
    if (sliderEl) {
      sliderEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    const needsWait = ideas.length === 0;
    if (needsWait && loadingEl) loadingEl.hidden = false;
    errorEl.hidden = true;

    try {
      await ensureIdeasLoaded();
    } catch {
      ideasPromise = null;
      if (loadingEl) loadingEl.hidden = true;
      errorEl.hidden = false;
      return;
    }

    if (needsWait && loadingEl) loadingEl.hidden = true;

    if (hasRevealed) return;
    hasRevealed = true;

    currentIndex = randomIndex(-1);
    showIdeaAt(currentIndex, !prefersReducedMotion);

    nextBtn.disabled = false;
    if (navEl) navEl.hidden = false;
    if (hintEl) hintEl.hidden = true;
    if (revealBtn) {
      revealBtn.disabled = true;
      revealBtn.setAttribute('aria-disabled', 'true');
    }
  }

  function init() {
    ensureIdeasLoaded().catch(() => {});
    if (revealBtn) revealBtn.addEventListener('click', onReveal);
    nextBtn.addEventListener('click', onNext);
  }

  init();
})();
