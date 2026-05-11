import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { useCallback, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { publicUrl } from "@/lib/publicUrl";

type Idea = {
  title: string;
  stage: string;
  time: string;
  prompt: string;
  action: string;
};

export function IdeaSpotlight() {
  const [ideas, setIdeas] = useState<Idea[] | null>(null);
  const [active, setActive] = useState<Idea | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch(publicUrl("idei.json"));
      if (!res.ok) throw new Error("fetch");
      const data = (await res.json()) as Idea[];
      setIdeas(data);
      setActive(data[Math.floor(Math.random() * data.length)] ?? null);
      setError(null);
    } catch {
      setError(
        "Для загрузки списка идей откройте сайт через локальный сервер разработки или опубликованную версию (при открытии файла с диска запрос к JSON может быть заблокирован).",
      );
    }
  }, []);

  const next = useCallback(() => {
    if (!ideas?.length) return;
    setActive(ideas[Math.floor(Math.random() * ideas.length)] ?? null);
  }, [ideas]);

  return (
    <div className="rounded-2xl border border-border bg-bg-elevated/60 p-6 shadow-card backdrop-blur-xl sm:p-8">
      {!ideas ? (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-fg-muted">
              Случайный сценарий из банка: формулировка запроса к модели и вариант применения на уроке.
            </p>
            {error ? <p className="mt-3 text-sm text-rose-300/90">{error}</p> : null}
          </div>
          <MagneticButton type="button" onClick={load}>
            Загрузить сценарии
          </MagneticButton>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fg-subtle">
                Случайный сценарий
              </p>
              <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-fg sm:text-2xl">
                {active?.title}
              </h4>
              <p className="mt-2 text-sm text-fg-muted">
                {active?.stage} · {active?.time}
              </p>
            </div>
            <MagneticButton type="button" onClick={next}>
              <Shuffle className="size-4" aria-hidden />
              Другой вариант
            </MagneticButton>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-border bg-bg-card/70 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-subtle">
                Запрос к модели
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{active?.prompt}</p>
            </div>
            <div className="rounded-xl border border-border bg-bg-card/70 p-5">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-fg-subtle">
                На занятии
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">{active?.action}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
