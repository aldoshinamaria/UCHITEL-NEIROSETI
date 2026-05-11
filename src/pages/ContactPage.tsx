import { ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeader } from "@/components/ui/SectionHeader";

const channels = [
  {
    label: "Telegram-канал",
    href: "https://t.me/marialdosina",
    hint: "Заметки, разборы, короткие практики.",
    tone: "from-sky-500/15 to-transparent",
  },
  {
    label: "Группа в MAX",
    href: "https://max.ru/join/i9ON0DBx0akIF69KxNyGi7EHhz1u1j7v57m54R4p2PU",
    hint: "Живые обсуждения и быстрые ответы.",
    tone: "from-violet-500/15 to-transparent",
  },
  {
    label: "ВКонтакте",
    href: "https://vk.com/club231971768",
    hint: "Длинные материалы и подборки.",
    tone: "from-emerald-500/12 to-transparent",
  },
];

export function ContactPage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Контакты"
          title="Свяжитесь удобным каналом"
          subtitle="Отвечу сама, без «отдела забот». Напишите, чем вы занимаетесь и что хотите упростить."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {channels.map((c) => (
            <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" className="group block">
              <GlassCard glow className="relative h-full overflow-hidden">
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60 transition-opacity duration-500 group-hover:opacity-100 ${c.tone}`}
                />
                <div className="relative flex h-full flex-col gap-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-fg">{c.label}</h3>
                    <ExternalLink className="size-5 shrink-0 text-fg-subtle transition-colors group-hover:text-fg" />
                  </div>
                  <p className="text-sm leading-relaxed text-fg-muted">{c.hint}</p>
                  <span className="text-sm font-medium text-accent-bright">Перейти</span>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-white/[0.08] bg-bg-elevated/70 p-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-relaxed text-fg-muted">
            Если вы представляете школу или методическое объединение — оставьте контекст в первом сообщении: регион,
            возраст, текущая цифровая зрелость.
          </p>
          <MagneticButton href="https://t.me/marialdosina" className="px-8">
            Написать в Telegram
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
