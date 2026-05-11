import { Link } from "react-router-dom";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start gap-8 px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-fg-subtle">404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-fg">Страница не найдена</h1>
      <p className="text-fg-muted">
        Запрашиваемая страница отсутствует или перенесена. Воспользуйтесь главной страницей или разделом с кейсами.
      </p>
      <div className="flex flex-wrap gap-3">
        <MagneticButton href="/">На главную</MagneticButton>
        <Link
          to="/cases"
          className="rounded-xl border border-border-strong bg-fg/[0.04] px-6 py-3 text-sm font-medium text-fg-muted transition-colors hover:border-accent/30 hover:text-fg"
        >
          Кейсы
        </Link>
      </div>
    </div>
  );
}
