import { NavLink } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-deep/80 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="font-display text-lg font-semibold tracking-tight text-fg">
            Учитель<span className="text-fg-muted">&amp;Нейросети</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
            Практика и продуктовый подход к AI в школе: спокойно, применимо, без перегруза.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm text-fg-muted">
          <NavLink className="hover:text-fg" to="/cases">
            Кейсы
          </NavLink>
          <NavLink className="hover:text-fg" to="/materials">
            Материалы
          </NavLink>
          <NavLink className="hover:text-fg" to="/blog">
            Блог
          </NavLink>
          <NavLink className="hover:text-fg" to="/contact">
            Контакты
          </NavLink>
        </div>
        <p className="text-xs text-fg-subtle">© 2026</p>
      </div>
    </footer>
  );
}
