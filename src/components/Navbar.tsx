import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PROFILE } from "../lib/data";
import { cn, smoothScrollTo } from "../lib/utils";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrolled } from "../hooks/useMedia";

const ids = NAV_LINKS.map((l) => l.id);

export default function Navbar() {
  const active = useActiveSection(ids);
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    smoothScrollTo(id);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6",
            scrolled ? "glass mx-4 shadow-[0_10px_40px_-20px_rgba(59,130,246,0.35)] sm:mx-auto sm:max-w-4xl" : "mx-4 sm:mx-auto",
          )}
        >
          <button
            onClick={() => go("home")}
            className="font-display text-lg font-bold tracking-[0.2em] text-gradient"
            aria-label="Go to home"
          >
            SP
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => go(link.id)}
                  aria-current={active === link.id ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 font-body text-[13px] tracking-wide transition-colors duration-300",
                    active === link.id
                      ? "text-white"
                      : "text-mist hover:text-silver",
                  )}
                >
                  {link.label}
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full border border-electric/30 bg-electric/10"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${PROFILE.email}`}
            className="hidden rounded-full border border-electric/35 bg-electric/10 px-4 py-2 font-body text-[13px] text-silver transition-colors duration-300 hover:bg-electric/20 md:inline-flex"
          >
            Hire / Connect
          </a>

          <button
            className="inline-flex items-center justify-center rounded-lg p-2 text-silver md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-void/85 backdrop-blur-xl md:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.ul
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="glass mx-4 mt-24 flex flex-col gap-1 rounded-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left font-body text-[15px] transition-colors",
                      active === link.id
                        ? "bg-electric/12 text-white"
                        : "text-mist hover:bg-white/5 hover:text-silver",
                    )}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="mt-2 border-t border-white/8 pt-3">
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="block rounded-xl bg-electric/15 px-4 py-3 text-center font-body text-[14px] text-silver"
                >
                  {PROFILE.email}
                </a>
              </li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
