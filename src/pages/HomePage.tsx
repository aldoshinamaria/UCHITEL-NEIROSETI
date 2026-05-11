import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, BookOpen, Cpu, Quote, Zap } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { cases } from "@/data/cases";
import { getFeaturedPost } from "@/data/blog";
import { IdeaSpotlight } from "@/components/home/IdeaSpotlight";
import { cn } from "@/lib/cn";

const reviews = [
  {
    name: "Марина",
    role: "Начальные классы",
    text: "Презентации стали 10–15 минут вместо вечера — сначала не верила.",
  },
  {
    name: "Андрей",
    role: "История",
    text: "Собрал тест с автопроверкой и спокойно провёл в классе — без лишней суеты.",
  },
  {
    name: "Алина",
    role: "Классный руководитель",
    text: "Начала с простого — теперь использую каждую неделю, стало легче дышать.",
  },
];

export function HomePage() {
  const parallaxRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -32]);

  const featured = getFeaturedPost();
  const previewCases = cases.slice(0, 3);

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />
          <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <motion.p
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              AI education platform
            </motion.p>
            <motion.h1
              className="font-display text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-fg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              Будущее подготовки{" "}
              <span className="bg-gradient-to-r from-accent-bright via-fg to-teal-300 bg-clip-text text-transparent">
                уже в классе
              </span>
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              Меньше шума. Больше ясности. Практика для педагогов без «техно-кастрата».
            </motion.p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <MagneticButton href="/materials" className="px-8 py-3.5 text-[15px]">
                Получить материалы
              </MagneticButton>
              <p className="mt-4 text-sm text-fg-subtle">
                Дальше — <Link className="text-fg-muted underline-offset-4 hover:text-fg hover:underline" to="/cases">кейсы и витрины</Link>
              </p>
            </motion.div>
          </div>

          <motion.div ref={parallaxRef} style={{ y }}>
            <HeroVisual />
          </motion.div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Сигнал"
            title="Вам откликнется, если вы устали готовиться «как всегда»"
            subtitle="Короткий чеклист — без давления и базара про технологии."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Подготовка съедает вечер, а не урок",
              "Тексты и презентации приходится долго полировать",
              "Проверки и отчёты ощущаются бесконечными",
              "Нейросети пробовали — но не встроили в процесс",
              "Хочется проще, а не «ещё один сложный инструмент»",
              "Нужна ясная система для коллег и для себя",
            ].map((text, i) => (
              <GlassCard key={text} glow dense className="group">
                <div className="flex gap-4">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] font-mono text-xs text-accent-bright">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[15px] leading-relaxed text-fg-muted">{text}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Кейсы"
            title="Мини-витрины результата — как продукт, не как портфолио"
            subtitle="Каждый кейс — это задача, цепочка и измеримый эффект."
          />
          <div className="mt-14 grid gap-5 lg:grid-cols-12">
            {previewCases.map((c, idx) => {
              const span =
                c.size === "hero"
                  ? "lg:col-span-7 lg:row-span-2"
                  : c.size === "wide"
                    ? "lg:col-span-5"
                    : c.size === "tall"
                      ? "lg:col-span-5 lg:row-span-2"
                      : "lg:col-span-4";
              return (
                <Link
                  key={c.slug}
                  to={`/cases/${c.slug}`}
                  className={cn("group block", span)}
                >
                  <GlassCard
                    glow
                    className={cn(
                      "relative h-full overflow-hidden",
                      idx === 0 ? "min-h-[280px]" : "min-h-[220px]",
                    )}
                  >
                    <div
                      className={cn(
                        "pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100",
                        "bg-gradient-to-br",
                        c.coverGradient,
                      )}
                    />
                    <div className="relative flex h-full flex-col justify-between gap-6">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-subtle">
                          {c.category}
                        </p>
                        <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-[1.65rem]">
                          {c.title}
                        </h3>
                        <p className="mt-3 max-w-prose text-sm leading-relaxed text-fg-muted">
                          {c.previewNote}
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-bright">
                        Разбор кейса
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <MagneticButton href="/cases" className="px-8">
              Все кейсы
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Идея для урока"
                title="Случайная идея — как editorial-блок"
                subtitle="Живые сценарии из банка практики. Локально, без лишних серверов."
              />
            </div>
            <div className="lg:col-span-7">
              <IdeaSpotlight />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <GlassCard glow className="lg:col-span-2">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                    Featured
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                    {featured.excerpt}
                  </p>
                </div>
                <MagneticButton href={`/blog/${featured.slug}`} className="shrink-0">
                  Читать
                </MagneticButton>
              </div>
            </GlassCard>
            <div className="grid gap-4">
              <GlassCard dense glow className="flex items-start gap-3">
                <Zap className="mt-0.5 size-5 text-teal-300" />
                <div>
                  <p className="text-sm font-medium text-fg">Скорость без суеты</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Шаблоны и пайплайны под реальные уроки.
                  </p>
                </div>
              </GlassCard>
              <GlassCard dense glow className="flex items-start gap-3">
                <Cpu className="mt-0.5 size-5 text-accent-bright" />
                <div>
                  <p className="text-sm font-medium text-fg">AI как слой процесса</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Не замена педагогике — усиление рутины.
                  </p>
                </div>
              </GlassCard>
              <GlassCard dense glow className="flex items-start gap-3">
                <BookOpen className="mt-0.5 size-5 text-amber-200" />
                <div>
                  <p className="text-sm font-medium text-fg">Editorial блог</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Методика и инструменты в спокойном темпе.
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Отзывы"
            title="Коротко, по-человечески"
            subtitle="Как в переписке после урока — без лозунгов."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => (
              <GlassCard key={r.name} glow>
                <Quote className="size-5 text-white/25" aria-hidden />
                <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">«{r.text}»</p>
                <div className="mt-8 text-sm">
                  <p className="font-medium text-fg">{r.name}</p>
                  <p className="text-fg-subtle">{r.role}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
