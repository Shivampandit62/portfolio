import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMediaQuery } from "../hooks/useMedia";

export default function Cursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 220, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 220, damping: 26, mass: 0.5 });

  useEffect(() => {
    if (!finePointer || reduced) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor='hover']")));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer, reduced, x, y]);

  if (!finePointer || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] h-1.5 w-1.5 rounded-full bg-azure"
        style={{ x, y, translateX: "-50%", translateY: "-50%", opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border border-azure/40"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: hovering ? 42 : 26, height: hovering ? 42 : 26 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      />
    </>
  );
}
