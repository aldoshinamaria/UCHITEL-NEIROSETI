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
    name: "Генерация урока-сценария",
    desc: "От цели до тайминга: один запрос — каркас, вы — редактор.",
    icon: Sparkles,
  },
  {
    name: "Презентации и структура слайдов",
    desc: "Заголовок + одна мысль на слайд — без визуального шума.",
    icon: LayoutTemplate,
  },
  {
    name: "Тесты и проверочные",
    desc: "Варианты ответов, уровни сложности, быстрая адаптация под класс.",
    icon: FileQuestion,
  },
  {
    name: "Тексты и отчётность",
    desc: "Черновики объяснений, писем, сопроводительных текстов.",
    icon: BookOpenCheck,
  },
  {
    name: "Ассистенты и боты",
    desc: "Короткие сценарии FAQ и напоминаний для родителей и учеников.",
    icon: Bot,
  },
  {
    name: "Видео и пояснения",
    desc: "Сценарии коротких роликов и текстов к ним — без монтажной головной боли.",
    icon: Video,
  },
  {
    name: "Аналитика процесса",
    desc: "Сводки того, что реально сработало на уроках за неделю.",
    icon: LineChart,
  },
];

export function ToolsPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="AI-инструменты"
          title="Стек, который ощущается как рабочий стол"
          subtitle="Не каталог «всех нейросетей мира». Только узлы, которые стыкуются с уроком."
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
              <t.icon className="size-6 text-teal-200/90" aria-hidden />
              <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-fg sm:text-xl">
                {t.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">{t.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] to-transparent p-8 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-[15px]">
            Инструмент подбирается после задачи: сначала сценарий урока или отчёта, потом — конкретный сервис.
            Так вы не теряете недели на «выбор модели».
          </p>
          <MagneticButton href="/contact" className="shrink-0 px-7">
            Подобрать стек
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
