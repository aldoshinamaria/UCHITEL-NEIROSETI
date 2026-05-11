import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getCaseBySlug } from "@/data/cases";
import { cn } from "@/lib/cn";

export function CaseDetailPage() {
  const { slug } = useParams();
  const c = slug ? getCaseBySlug(slug) : undefined;
  if (!c) return <Navigate to="/cases" replace />;

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06] py-14 sm:py-20">
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div className={cn("absolute inset-0 bg-gradient-to-br", c.coverGradient)} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Link
            to="/cases"
            className="inline-flex items-center gap-2 text-sm font-medium text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4" />
            Все кейсы
          </Link>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle"
          >
            {c.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-4 max-w-4xl font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl"
          >
            {c.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted"
          >
            {c.tagline}
          </motion.p>
          <div className="mt-10 flex flex-wrap gap-3 text-sm text-fg-muted">
            <span className="rounded-full border border-white/10 bg-black/30 px-4 py-2 backdrop-blur">
              Аудитория: {c.audience}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="lg:col-span-7">
            <GlassCard glow className="mb-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                Задача
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">{c.task}</p>
            </GlassCard>
            <GlassCard glow>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                Решение
              </p>
              <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">{c.solution}</p>
            </GlassCard>
          </div>
          <div className="lg:col-span-5">
            <GlassCard glow className="h-full">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                AI workflow
              </p>
              <ul className="mt-6 space-y-4">
                {c.workflow.map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] font-mono text-xs text-accent-bright">
                      {i + 1}
                    </span>
                    <p className="text-sm leading-relaxed text-fg-muted">{step}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-10 grid gap-3">
                {c.results.map((r, i) => (
                  <div
                    key={`${r.label}-${i}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-black/25 px-4 py-3"
                  >
                    <span className="text-sm text-fg-muted">{r.label}</span>
                    <span className="font-mono text-sm text-fg">{r.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.06] py-16 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-fg">
              <CheckCircle2 className="size-4 text-teal-300" />
              Готовы повторить систему у себя
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
              Короткий созвон или сообщение — подскажу, с какого шаблона начать.
            </p>
          </div>
          <MagneticButton href="/contact" className="px-8">
            Обсудить внедрение
          </MagneticButton>
        </div>
      </section>
    </div>
  );
}
