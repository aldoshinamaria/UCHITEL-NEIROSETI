/**
 * Отзывы-колонки: пауза при наведении уже в CSS; здесь — снятие will-change и фолбэк.
 */
(function initReviewsMarquee() {
  const tracks = document.querySelectorAll('.reviews-marquee-track');
  if (!tracks.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tracks.forEach(t => {
      t.style.animation = 'none';
      t.style.willChange = 'auto';
    });
    return;
  }

  window.addEventListener(
    'pagehide',
    () => {
      tracks.forEach(t => {
        t.style.willChange = 'auto';
      });
    },
    { once: true }
  );
})();
