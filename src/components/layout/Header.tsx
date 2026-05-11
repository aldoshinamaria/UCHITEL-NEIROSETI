import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/cn";
import { publicUrl } from "@/lib/publicUrl";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/cases", label: "Кейсы" },
  { to: "/materials", label: "Материалы" },
  { to: "/tools", label: "Инструменты ИИ" },
  { to: "/about", label: "О проекте" },
  { to: "/blog", label: "Блог" },
  { to: "/contact", label: "Контакты" },
];

function linkClass(isActive: boolean) {
  return cn(
    "text-[13px] font-medium tracking-tight transition-colors duration-300",
    isActive ? "text-fg" : "text-fg-muted hover:text-fg",
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg-void/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex items-center gap-3"
          aria-label="Учитель и Нейросети — на главную"
        >
          <img
            src={publicUrl("images/logo.png")}
            alt=""
            width={40}
            height={40}
            decoding="async"
            className="size-9 shrink-0 rounded-full object-cover shadow-[0_0_24px_-4px_rgba(168,85,247,0.45)] ring-1 ring-white/10 transition-shadow duration-300 group-hover:shadow-[0_0_32px_-2px_rgba(192,132,252,0.5)] sm:size-10"
          />
          <span className="font-display text-sm font-semibold tracking-tight text-fg sm:text-base">
            Учитель
            <span className="text-fg-muted transition-colors group-hover:text-accent">&amp;Нейросети</span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Основная навигация">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => linkClass(isActive || pathname.startsWith(`${item.to}/`))}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <MagneticButton href="/contact">Обратная связь</MagneticButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-fg lg:hidden"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-white/[0.06] bg-bg-deep/95 lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4 sm:px-6">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "rounded-xl px-3 py-3 text-[15px] font-medium",
                      isActive || pathname.startsWith(`${item.to}/`)
                        ? "bg-white/[0.06] text-fg"
                        : "text-fg-muted hover:bg-white/[0.04] hover:text-fg",
                    )
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-2">
                <MagneticButton href="/contact" className="w-full">
                  Обратная связь
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
