import {
  BookOpenCheck,
  Bot,
  FileQuestion,
  LayoutTemplate,
  LineChart,
  Sparkles,
  Video,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

const tools = [
  {
    name: "Планирование хода урока",
    desc: "От цели занятия к хронометражу: черновой каркас с последующей редакцией педагога.",
    icon: Sparkles,
  },
  {
    name: "Презентации и структура слайдов",
    desc: "По одному ключевому тезису на слайд; сдержанная визуальная среда без перегруза.",
    icon: LayoutTemplate,
  },
  {
    name: "Тесты и проверочные работы",
    desc: "Варианты ответов, уровни сложности, адаптация под состав класса.",
    icon: FileQuestion,
  },
  {
    name: "Тексты и служебная документация",
    desc: "Черновики пояснений, сопроводительных писем и типовых обращений.",
    icon: BookOpenCheck,
  },
  {
    name: "Информационные ассистенты",
    desc: "Краткие сценарии ответов на частые вопросы для родителей и обучающихся.",
    icon: Bot,
  },
  {
    name: "Сценарии поясняющих материалов",
    desc: "Текстовые основы для коротких видеофрагментов и пояснений к ним.",
    icon: Video,
  },
  {
    name: "Рефлексия и сводка за период",
    desc: "Структурирование выводов о том, какие приёмы оказались эффективными на занятиях.",
    icon: LineChart,
  },
];

export function ToolsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Инструменты на базе ИИ"
          title="Набор задач, а не каталог всех доступных сервисов"
          subtitle="Каждый блок привязан к типовому этапу методической работы и может использоваться выборочно."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {tools.map((t, i) => (
            <GlassCard
              key={t.name}
              glow
              dense
              className={
                i === 0
                  ? "lg:col-span-7 min-h-[200px]"
                  : i === 3
                    ? "lg:col-span-5 lg:row-span-2 min-h-[240px]"
                    : "lg:col-span-4 min-h-[180px]"
              }
            >
              <t.icon className="size-6 text-accent-bright/90" aria-hidden />
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
                {t.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-[15px]">
            Сначала формулируется учебная или организационная задача, затем подбирается инструмент или сочетание
            средств. Такой порядок снижает риск длительного «тестирования моделей» без отнесения к программе и
            расписанию.
          </p>
          <MagneticButton href="/contact" className="shrink-0 px-7">
            Консультация по подбору
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
