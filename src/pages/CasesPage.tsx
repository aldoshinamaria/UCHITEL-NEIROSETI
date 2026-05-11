import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cases } from "@/data/cases";
import { cn } from "@/lib/cn";

export function CasesPage() {
  return (
    <div className="border-b border-border py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Кейсы"
          title="Методические описания внедрения"
          subtitle="В каждом блоке — исходная ситуация, выбранный подход и ожидаемый эффект; иллюстрации не заменяют текст."
        />
        <div className="mt-16 grid auto-rows-[minmax(200px,auto)] gap-5 lg:grid-cols-12">
          {cases.map((c) => {
            const span =
              c.size === "hero"
                ? "lg:col-span-8 lg:row-span-2 min-h-[320px]"
                : c.size === "wide"
                  ? "lg:col-span-7 min-h-[260px]"
                  : c.size === "tall"
                    ? "lg:col-span-5 lg:row-span-2 min-h-[360px]"
                    : "lg:col-span-5 min-h-[240px]";
            return (
              <Link key={c.slug} to={`/cases/${c.slug}`} className={cn("group block", span)}>
                <GlassCard glow className="relative h-full overflow-hidden">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-0 opacity-55 transition-opacity duration-500 group-hover:opacity-90",
                      "bg-gradient-to-br",
                      c.coverGradient,
                    )}
                  />
                  <div className="relative flex h-full flex-col justify-between gap-8">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                        {c.category}
                      </p>
                      <h2 className="mt-5 max-w-2xl font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                        {c.title}
                      </h2>
                      <p className="mt-4 max-w-prose text-sm leading-relaxed text-fg-muted sm:text-[15px]">
                        {c.tagline}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-bright">
                      Подробнее
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
