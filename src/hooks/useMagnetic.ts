import { useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef, type PointerEvent } from "react";

const spring = { stiffness: 220, damping: 24, mass: 0.35 };

export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  const onMove = useCallback(
    (e: PointerEvent<Element>) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      x.set(dx * strength);
      y.set(dy * strength);
    },
    [strength, x, y],
  );

  const onLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return { ref, sx, sy, onPointerMove: onMove, onPointerLeave: onLeave, onPointerCancel: onLeave };
}
