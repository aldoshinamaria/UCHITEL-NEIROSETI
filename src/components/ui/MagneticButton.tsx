import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { PointerEvent, ReactNode, Ref } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className,
  href,
  type = "button",
  onClick,
}: MagneticButtonProps) {
  const { ref, sx, sy, onPointerMove, onPointerLeave, onPointerCancel } = useMagnetic(0.28);
  const mx = useMotionValue(50);
  const my = useMotionValue(20);
  const bg = useMotionTemplate`radial-gradient(120px circle at ${mx}% ${my}%, rgba(255,255,255,0.12), transparent 60%)`;

  const commonMotion = {
    style: { x: sx, y: sy },
    onPointerMove: (e: PointerEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      onPointerMove(e);
      const t = e.currentTarget;
      const r = t.getBoundingClientRect();
      mx.set(((e.clientX - r.left) / r.width) * 100);
      my.set(((e.clientY - r.top) / r.height) * 100);
    },
    onPointerLeave: () => {
      onPointerLeave();
      mx.set(50);
      my.set(25);
    },
    onPointerCancel,
    whileTap: { scale: 0.985 },
  };

  const styles = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl px-6 py-3 text-sm font-medium tracking-tight",
    "bg-fg/[0.06] text-fg ring-1 ring-fg/10 transition-[box-shadow] duration-500",
    "hover:ring-accent/35 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
    className,
  );

  if (href) {
    return (
      <motion.a
        ref={ref as Ref<HTMLAnchorElement>}
        href={href}
        className={styles}
        {...commonMotion}
      >
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ backgroundImage: bg }}
        />
        <span className="relative z-[1]">{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={styles}
      {...commonMotion}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ backgroundImage: bg }}
      />
      <span className="relative z-[1]">{children}</span>
    </motion.button>
  );
}
