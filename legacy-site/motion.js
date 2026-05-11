(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  document.documentElement.classList.add('js-motion');

  const sections = document.querySelectorAll('.reveal');
  if (!sections.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.1 }
  );

  sections.forEach((el) => io.observe(el));
})();
