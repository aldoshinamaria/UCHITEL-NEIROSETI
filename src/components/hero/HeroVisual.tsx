import { motion } from "framer-motion";
import {
  Activity,
  Layers,
  Sparkles,
  Wand2,
} from "lucide-react";
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
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_var(--mx,50%)_var(--my,35%),rgba(139,138,255,0.22),transparent_55%)] opacity-90 blur-2xl transition-[opacity] duration-700" />
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-violet-500/15 via-transparent to-teal-500/10 opacity-80" />

      <motion.div
        className="absolute left-[-6%] top-[8%] z-20 w-[58%] max-w-[240px] rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
        initial={{ opacity: 0, y: 26, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: -1.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ animation: "float-slow 7s ease-in-out infinite" }}
      >
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/55">
            <Layers className="size-3.5 text-accent" aria-hidden />
            Lesson OS
          </span>
          <span className="rounded-full bg-teal-400/10 px-2 py-0.5 text-[10px] font-medium text-teal-200/90">
            Draft
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="mt-3 rounded-xl bg-black/35 p-3 ring-1 ring-white/10">
            <p className="text-[11px] leading-relaxed text-white/70">
              Цель урока → проверка понимания → дифференциация. Сгенерировать опорный конспект + 5 вопросов.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="absolute right-[-4%] top-[22%] z-30 w-[54%] max-w-[220px] rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-4 shadow-[0_24px_70px_-26px_rgba(88,80,200,0.55)] backdrop-blur-2xl"
        initial={{ opacity: 0, y: 30, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 1.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        style={{ animation: "float-slow 8.5s ease-in-out infinite 0.5s" }}
      >
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-widest text-white/55">
          <Wand2 className="size-3.5 text-teal-300" aria-hidden />
          Prompt
        </div>
        <p className="font-mono text-[10px] leading-relaxed text-white/75">
          context: 7 класс · тема: дроби · ограничение: 120 слов · формат: 3 блока по 2 тезиса
        </p>
        <div className="mt-3 flex items-center gap-2 text-[10px] text-white/45">
          <Sparkles className="size-3.5" aria-hidden />
          quality guardrails on
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto mt-8 w-[88%] overflow-hidden rounded-[1.85rem] border border-white/10 bg-bg-deep/40 shadow-card backdrop-blur-xl"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,138,255,0.18),transparent_55%)]" />
        <img
          src={publicUrl("images/hero-maria-ai.png")}
          alt=""
          className="relative z-[1] h-auto w-full object-cover opacity-90 mix-blend-screen contrast-110 saturate-[0.85]"
          decoding="async"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-bg-void via-bg-void/25 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 z-[3] flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
              <Activity className="size-4 text-accent-bright" aria-hidden />
            </div>
            <div>
              <p className="text-[11px] font-medium text-white/90">Ритм подготовки</p>
              <p className="text-[10px] text-white/50">стабильно −60% ручного времени</p>
            </div>
          </div>
          <div className="hidden text-right text-[10px] text-white/45 sm:block">
            <p className="font-mono text-white/70">live</p>
            <p>workflow</p>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 -z-10 grain opacity-[0.35]" aria-hidden />
    </div>
  );
}
