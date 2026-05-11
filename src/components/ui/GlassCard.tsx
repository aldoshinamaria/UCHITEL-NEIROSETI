import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: boolean;
  dense?: boolean;
};

export function GlassCard({ children, className, glow, dense }: GlassCardProps) {
  return (
    <div
      className={cn(
        "group relative rounded-2xl border border-border bg-bg-card backdrop-blur-xl",
        "shadow-card transition-[box-shadow,transform,border-color] duration-500 ease-out",
        "hover:-translate-y-0.5 hover:border-white/15 hover:shadow-card-hover",
        dense ? "p-5 sm:p-6" : "p-6 sm:p-8",
        className,
      )}
    >
      {glow ? (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx,50%) var(--my,20%), rgba(168,85,247,0.14), transparent 45%)",
          }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
