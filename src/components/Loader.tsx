import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / 1100) * 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 220);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-6"
          >
            <span className="font-display text-2xl font-bold tracking-[0.35em] text-gradient">
              SP
            </span>
            <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-full rounded-full bg-gradient-to-r from-electric via-indigo to-violet transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-body text-[11px] tracking-[0.3em] text-mist/70 uppercase">
              Loading experience
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
