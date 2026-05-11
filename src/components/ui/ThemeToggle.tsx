import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/cn";

type ThemeToggleProps = {
  className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex size-11 items-center justify-center rounded-xl border border-border-strong bg-fg/[0.06] text-fg transition-colors duration-300",
        "hover:border-accent/30 hover:bg-fg/[0.08] hover:text-accent-bright",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50",
        className,
      )}
      aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
      title={isDark ? "Светлая тема" : "Тёмная тема"}
    >
      {isDark ? <Sun className="size-5 shrink-0" aria-hidden /> : <Moon className="size-5 shrink-0" aria-hidden />}
    </button>
  );
}
