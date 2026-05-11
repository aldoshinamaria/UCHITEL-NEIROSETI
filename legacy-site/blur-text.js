/**
 * Адаптация эффекта BlurText (motion/react) для статического сайта:
 * слова появляются с blur + смещением по Y, с задержкой между словами.
 */
(function () {
  const HERO = ".hero";

  function wrapElement(el) {
    if (!el || el.dataset.blurWrapped === "1") return;

    const delayMs = Number(el.dataset.blurDelay || 200);
    const startMs = Number(el.dataset.blurStartDelay || 0);
    const direction = el.dataset.blurDirection || "top";
    const by = el.dataset.blurBy || "words";
    const text = el.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;

    const segments = by === "words" ? text.split(" ") : Array.from(text);
    el.textContent = "";
    el.classList.add("blur-text", `blur-text--dir-${direction}`);
    if (by === "words") el.classList.add("blur-text--words");
    el.dataset.blurWrapped = "1";

    segments.forEach((segment, i) => {
      const span = document.createElement("span");
      span.className = "blur-text__segment";
      const totalDelay = (startMs + i * delayMs) / 1000;
      span.style.setProperty("--blur-delay", `${totalDelay}s`);
      span.textContent = segment;
      el.appendChild(span);
    });
  }

  let heroRestShown = false;

  function showHeroRest() {
    if (heroRestShown) return;
    heroRestShown = true;
    document.querySelector(".hero__note")?.classList.add("hero__rest--visible");
    document.querySelector(".hero__actions")?.classList.add("hero__rest--visible");
    window.dispatchEvent(new CustomEvent("blurTextComplete"));
  }

  function onLastSegmentDone(hero) {
    const blocks = hero.querySelectorAll(".blur-text.blur-text--active");
    const lastBlock = blocks[blocks.length - 1];
    const lastSeg = lastBlock?.querySelector(".blur-text__segment:last-of-type");
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      showHeroRest();
    };

    if (!lastSeg) {
      finish();
      return;
    }

    const done = (e) => {
      const name = (e.animationName || "").split(",")[0].trim();
      if (!name.includes("blur-text-reveal")) return;
      lastSeg.removeEventListener("animationend", done);
      window.clearTimeout(fallbackTimer);
      finish();
    };

    lastSeg.addEventListener("animationend", done);
    const fallbackTimer = window.setTimeout(finish, 8000);
  }

  function init() {
    const hero = document.querySelector(HERO);
    if (!hero) return;

    const targets = Array.from(hero.querySelectorAll("[data-blur-text]"));
    if (!targets.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      targets.forEach((el) => {
        el.classList.remove("blur-text", "blur-text--active");
      });
      document.querySelector(".hero__note")?.classList.add("hero__rest--visible");
      document.querySelector(".hero__actions")?.classList.add("hero__rest--visible");
      return;
    }

    targets.forEach(wrapElement);

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) return;
        io.disconnect();
        targets.forEach((el) => el.classList.add("blur-text--active"));
        onLastSegmentDone(hero);
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );

    io.observe(hero);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
