import { motion } from "framer-motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

const principles = [
  "только то, что работает в школе",
  "без лишнего технического языка",
  "можно применить на уроке сразу",
];

export function AboutPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="О проекте"
          title="Практика, а не перформанс технологий"
          subtitle="Нейросети — это ускоритель рутины, если за ним стоит педагогический смысл."
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
                src="/images/about-classroom.png"
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
              Педагог и практик
            </h2>
            <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-fg-muted">
              <p>
                Работа в школе — это не только уроки. Это подготовка, проверка, тексты, отчёты и постоянная нехватка
                времени.
              </p>
              <p>
                Я пришла к нейросетям не ради «модных инструментов», а чтобы делать часть работы спокойнее и быстрее —
                в том числе для коллег, которые устали от перегруза.
              </p>
              <p>
                Сейчас показываю, как собрать понятный процесс: где AI помогает, где нужна ручная редакторская правка,
                и как не потерять голос учителя.
              </p>
            </div>
            <p className="mt-10 text-sm font-medium text-fg">Что для меня важно:</p>
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
                Написать
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
