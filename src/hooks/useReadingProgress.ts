import { useEffect, useState, type RefObject } from "react";

export function useReadingProgress(target?: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = target?.current ?? null;

    const onScroll = () => {
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = el.scrollHeight - el.clientHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setProgress(total > 0 ? (scrolled / total) * 100 : 0);
        return;
      }
      const root = document.documentElement;
      const height = root.scrollHeight - root.clientHeight;
      setProgress(height > 0 ? (root.scrollTop / height) * 100 : 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [target]);

  return progress;
}
