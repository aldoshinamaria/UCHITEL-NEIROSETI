import { Download, FileText, PartyPopper } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

const blocks = [
  {
    title: "Шаблоны презентаций",
    text: "Логика слайдов и единообразное оформление; адаптация под тему урока за короткий интервал времени.",
    icon: FileText,
  },
  {
    title: "Сценарии мероприятий",
    text: "Структурированные планы воспитательных и внеурочных мероприятий без чрезмерных затрат времени на подготовку.",
    icon: PartyPopper,
  },
  {
    title: "Конспекты и запросы к модели",
    text: "Опорный текст занятия и типовые формулировки запросов под конкретные диапазоны тем.",
    icon: Download,
  },
];

export function MaterialsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Материалы"
          title="Стартовый набор для методической работы"
          subtitle="Три формата; общий принцип — готовность к использованию на ближайших занятиях после первичного ознакомления."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <GlassCard key={b.title} glow className={i === 1 ? "lg:translate-y-6" : ""}>
              <b.icon className="size-6 text-accent-bright" aria-hidden />
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-fg">{b.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{b.text}</p>
            </GlassCard>
          ))}
        </div>

        <div className="mt-16">
          <GlassCard glow className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                Доступ
              </p>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg">
                Запросить комплект материалов
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                Укажите контактные данные — будет направлена ссылка на подборку либо рекомендация по приоритету внедрения.
              </p>
            </div>
            <MagneticButton type="button" onClick={() => setOpen(true)} className="shrink-0 px-8">
              Оформить запрос
            </MagneticButton>
          </GlassCard>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm dark:bg-black/70"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[1] m-4 w-full max-w-md rounded-2xl border border-border-strong bg-bg-elevated p-6 shadow-card sm:p-8">
            <h4 className="font-display text-xl font-semibold text-fg">Запрос доступа к материалам</h4>
            <p className="mt-2 text-sm text-fg-muted">
              Демонстрационная форма: при необходимости подключите серверную обработку или сервис рассылки.
            </p>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm text-fg-muted">
                Имя
                <input className="mt-2 w-full rounded-xl border border-border-strong bg-bg-deep/80 px-4 py-3 text-fg outline-none ring-0 focus:border-accent/40 dark:bg-black/35" />
              </label>
              <label className="block text-sm text-fg-muted">
                Email
                <input type="email" className="mt-2 w-full rounded-xl border border-border-strong bg-bg-deep/80 px-4 py-3 text-fg outline-none focus:border-accent/40 dark:bg-black/35" />
              </label>
              <MagneticButton type="submit" className="w-full">
                Отправить
              </MagneticButton>
            </form>
            <button
              type="button"
              className="mt-4 text-sm text-fg-subtle hover:text-fg"
              onClick={() => setOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
