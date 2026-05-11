/**
 * Тёмная / светлая тема: localStorage + data-theme на <html>.
 */
(function () {
  const STORAGE_KEY = 'theme';
  const root = document.documentElement;

  function isLight() {
    return root.dataset.theme === 'light';
  }

  function applyTheme(light) {
    if (light) {
      root.dataset.theme = 'light';
      try {
        localStorage.setItem(STORAGE_KEY, 'light');
      } catch (e) {}
    } else {
      delete root.dataset.theme;
      try {
        localStorage.setItem(STORAGE_KEY, 'dark');
      } catch (e) {}
    }
    syncToggle();
  }

  function syncToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const light = isLight();
    btn.setAttribute('aria-pressed', light ? 'true' : 'false');
    btn.setAttribute('aria-label', light ? 'Включить тёмную тему' : 'Включить светлую тему');
    btn.setAttribute('title', light ? 'Тёмная тема' : 'Светлая тема');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    syncToggle();
    btn?.addEventListener('click', () => applyTheme(!isLight()));
  });
})();
