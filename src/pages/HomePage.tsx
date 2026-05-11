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
    role: "Учитель начальных классов",
    text: "Подготовка наглядного сопровождения к уроку сократилась до 10–15 минут вместо нескольких часов; формат оказался устойчивым и переносимым.",
  },
  {
    name: "Андрей",
    role: "Учитель истории",
    text: "Самостоятельно подготовил проверочный материал с элементами автоматизации и провёл занятие без срыва хронометража.",
  },
  {
    name: "Алина",
    role: "Классный руководитель",
    text: "Начали с простых шаблонов; инструменты постепенно вошли в регулярную методическую практику.",
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
          <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-fuchsia-500/12 blur-3xl" />
        </div>

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <motion.p
              className="mb-6 text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Методическая линия
            </motion.p>
            <motion.h1
              className="font-display text-balance text-[clamp(2.4rem,6vw,4.25rem)] font-semibold leading-[0.95] tracking-tight text-fg"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              Подготовка к уроку и внеурочке{" "}
              <span className="bg-gradient-to-r from-accent-bright via-fg to-accent-bright/90 bg-clip-text text-transparent">
                с опорой на ИИ
              </span>
            </motion.h1>
            <motion.p
              className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-fg-muted sm:text-xl"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              Сдержанный, применимый в школе подход: разумная экономия времени при сохранении методической ответственности педагога.
            </motion.p>
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <MagneticButton href="/materials" className="px-8 py-3.5 text-[15px]">
                Перейти к материалам
              </MagneticButton>
              <p className="mt-4 text-sm text-fg-subtle">
                Примеры внедрения — в разделе{" "}
                <Link className="text-fg-muted underline-offset-4 hover:text-fg hover:underline" to="/cases">
                  «Кейсы»
                </Link>
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
            eyebrow="Аудитория"
            title="Материалы и подход ориентированы на практику современной школы"
            subtitle="Ниже — типовые ситуации, с которыми педагоги обращаются к проекту."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Методическая подготовка занимает значительную долю неурочного времени",
              "Тексты и презентации требуют многоступенчатой редакции",
              "Проверочные работы, отчёты и сопроводительная документация отнимают много часов",
              "Инструменты на базе ИИ применялись точечно, без устойчивого регламента",
              "Требуется понятная схема работы, а не очередной перегруженный сервис",
              "Необходима модель, которую можно согласовать в методическом объединении или использовать самостоятельно",
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
            title="Примеры внедрения: задача, решение, ожидаемый эффект"
            subtitle="Каждый материал структурирован как методический кейс и может использоваться в рабочих совещаниях."
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
                        Открыть описание
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
              Полный перечень кейсов
            </MagneticButton>
          </div>
        </div>
      </section>

      <section className="border-b border-white/[0.06] py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5">
              <SectionHeader
                eyebrow="Методический блок"
                title="Идея для урока из воспроизводимого банка сценариев"
                subtitle="К формулировке прилагаются запрос к модели и вариант применения на занятии; данные загружаются с сервера после локальной или сетевой сборки сайта."
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
                    Главный материал
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
                    {featured.excerpt}
                  </p>
                </div>
                <MagneticButton href={`/blog/${featured.slug}`} className="shrink-0">
                  Читать статью
                </MagneticButton>
              </div>
            </GlassCard>
            <div className="grid gap-4">
              <GlassCard dense glow className="flex items-start gap-3">
                <Zap className="mt-0.5 size-5 text-accent-bright" />
                <div>
                  <p className="text-sm font-medium text-fg">Регламентированная подготовка</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Шаблоны сценариев урока и повторно используемые конструкции запросов.
                  </p>
                </div>
              </GlassCard>
              <GlassCard dense glow className="flex items-start gap-3">
                <Cpu className="mt-0.5 size-5 text-accent-bright" />
                <div>
                  <p className="text-sm font-medium text-fg">ИИ вспомогательно, не вместо педагога</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Поддержка рутинных операций при неизменном статусе педагогического решения.
                  </p>
                </div>
              </GlassCard>
              <GlassCard dense glow className="flex items-start gap-3">
                <BookOpen className="mt-0.5 size-5 text-amber-200" />
                <div>
                  <p className="text-sm font-medium text-fg">Методический блог</p>
                  <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                    Статьи о методике и инструментах в нейтральном деловом стиле.
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
            eyebrow="Обратная связь"
            title="Отзывы коллег"
            subtitle="Фрагменты реальных сообщений без маркетинговой обработки."
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
