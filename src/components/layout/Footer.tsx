import { NavLink } from "react-router-dom";
import { publicUrl } from "@/lib/publicUrl";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-bg-deep/80 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="flex gap-4">
          <img
            src={publicUrl("images/logo.png")}
            alt=""
            width={48}
            height={48}
            decoding="async"
            className="size-12 shrink-0 rounded-full object-cover shadow-[0_0_28px_-6px_rgba(168,85,247,0.4)] ring-1 ring-white/10"
          />
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-fg">
              Учитель<span className="text-fg-muted">&amp;Нейросети</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg-muted">
              Методическая поддержка педагога при внедрении инструментов на базе ИИ: сдержанно, с опорой на программу и
              практику класса.
            </p>
          </div>
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
