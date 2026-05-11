import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import { useEffect, useRef } from "react";
import { publicUrl } from "@/lib/publicUrl";

export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="relative mx-auto aspect-[4/5] w-full max-w-lg overflow-visible sm:aspect-[5/6] lg:max-w-none"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,35%),rgba(168,85,247,0.22),transparent_55%)] opacity-90 blur-2xl transition-[opacity] duration-700" />
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-500/18 via-transparent to-fuchsia-600/12 opacity-80" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-lg overflow-hidden rounded-[1.85rem] border border-border-strong bg-bg-deep/40 shadow-card backdrop-blur-xl lg:max-w-none"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(168,85,247,0.18),transparent_55%)]" />
        <img
          src={publicUrl("images/hero-maria-ai.png")}
          alt=""
          className="relative z-[1] h-auto w-full object-cover opacity-90 contrast-110 saturate-[0.85] mix-blend-normal dark:mix-blend-screen"
          decoding="async"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-bg-void via-bg-void/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-[3] flex items-center justify-between gap-3 rounded-2xl border border-border-strong bg-bg-card/95 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-fg/[0.06] ring-1 ring-border-strong">
              <Activity className="size-4 text-accent-bright" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-medium text-fg">Организация подготовки</p>
              <p className="text-[10px] text-fg-muted">ориентир: до −60 % неурочного времени</p>
            </div>
          </div>
          <div className="hidden text-right text-[10px] text-fg-muted sm:block">
            <p className="font-mono text-fg-subtle">этап</p>
            <p>методики</p>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10 grain opacity-[0.35]" aria-hidden />
    </div>
  );
}
