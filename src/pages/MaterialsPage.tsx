import { Download, FileText, PartyPopper } from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

const blocks = [
  {
    title: "Шаблоны презентаций",
    text: "Структура слайдов и стиль — вы адаптируете под тему за 10–15 минут.",
    icon: FileText,
  },
  {
    title: "Примеры мероприятий",
    text: "Сценарии, которые можно провести без многочасовой подготовки.",
    icon: PartyPopper,
  },
  {
    title: "Конспекты и промпты",
    text: "Опорный текст плюс готовые запросы под конкретные задачи урока.",
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
          title="Начать быстро — c готовой базой"
          subtitle="Три формата, один принцип: применимо завтра, а не «когда разберусь»."
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
                Получите набор материалов
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted">
                Оставьте контакт — вышлю ссылку или подскажу, что выбрать первым.
              </p>
            </div>
            <MagneticButton type="button" onClick={() => setOpen(true)} className="shrink-0 px-8">
              Запросить доступ
            </MagneticButton>
          </GlassCard>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true">
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[1] m-4 w-full max-w-md rounded-2xl border border-white/10 bg-bg-elevated p-6 shadow-card sm:p-8">
            <h4 className="font-display text-xl font-semibold text-fg">Контактная форма</h4>
            <p className="mt-2 text-sm text-fg-muted">
              Демо-форма: подключите backend или сервис рассылки при необходимости.
            </p>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm text-fg-muted">
                Имя
                <input className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-fg outline-none ring-0 focus:border-accent/40" />
              </label>
              <label className="block text-sm text-fg-muted">
                Email
                <input type="email" className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-4 py-3 text-fg outline-none focus:border-accent/40" />
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
