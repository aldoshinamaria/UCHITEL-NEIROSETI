import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { publicUrl } from "@/lib/publicUrl";

const principles = [
  "содержание применимо в общеобразовательной школе",
  "без избыточной технической терминологии",
  "возможность использования на уроке в краткий срок после знакомства с материалом",
];

export function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="О проекте"
          title="Практика и методическая ответственность — приоритет над демонстрацией технологий"
          subtitle="Генеративные модели рассматриваются как средство сопровождения труда педагога при явно заданных целях и критериях качества."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-bg-deep shadow-card">
              <img
                src={publicUrl("images/about-classroom.png")}
                alt="Мария Алдошина в классе"
                className="h-auto w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </motion.div>
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle">Мария Алдошина</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl">
              Педагог-практик
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-fg-muted">
              <p>
                Профессиональная деятельность в школе включает не только контактный урок, но и подготовку, проверку
                работ, аналитическую и отчётную документацию — при постоянном дефиците рабочего времени.
              </p>
              <p>
                Обращение к возможностям языковых моделей обусловлено необходимостью оптимизации отдельных этапов
                методической работы, а не внешним интересом к технологиям как таковым — в том числе в интересах
                коллег, испытывающих повышенную нагрузку.
              </p>
              <p>
                В фокусе — выстраивание прозрачного порядка действий: где уместна автоматизация черновика, где
                неизбежна педагогическая редакция, как сохранить профессиональный стиль и соответствие программе.
              </p>
            </div>
            <p className="mt-10 text-sm font-medium text-fg">Принципы проекта:</p>
            <ul className="mt-4 space-y-3 text-sm text-fg-muted">
              {principles.map((t) => (
                <li key={t} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <MagneticButton href="/contact" className="px-8">
                Обратная связь
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
