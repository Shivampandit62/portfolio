import { motion } from "framer-motion";
import { Download, MapPin, Sparkles } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import { PROFILE } from "../../lib/data";
import { smoothScrollTo } from "../../lib/utils";
import { useIsMobile, usePrefersReducedMotion, useWebGLSupport } from "../../hooks/useMedia";
import { Suspense, lazy } from "react";

const HeroScene = lazy(() => import("../three/HeroScene"));

function Portrait() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
      className="group relative mx-auto aspect-square w-[min(78vw,340px)] sm:w-[min(60vw,380px)]"
    >
      <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-electric/25 via-transparent to-violet/25 blur-2xl transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_140deg,#3b82f6,#8b5cf6,#60a5fa,#6366f1,#3b82f6)] opacity-80" />

      <div className="glow-ring absolute inset-0 overflow-hidden rounded-full bg-abyss">
        <img
          src={PROFILE.photo}
          alt="Portrait of Shivam Pandey"
          width={480}
          height={480}
          loading="eager"
          decoding="async"
          className="h-full w-full scale-[1.02] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.07]"
          onError={(e) => {
            const img = e.currentTarget;
            img.style.display = "none";
            const parent = img.parentElement;
            if (parent && !parent.querySelector("[data-photo-fallback]")) {
              const div = document.createElement("div");
              div.setAttribute("data-photo-fallback", "true");
              div.className =
                "flex h-full w-full items-center justify-center font-display text-5xl font-bold text-gradient";
              div.textContent = "SP";
              parent.appendChild(div);
            }
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/45 via-transparent to-transparent" />
      </div>

      <div className="absolute right-2 bottom-4 flex items-center gap-2 rounded-full border border-white/10 bg-abyss/80 px-3 py-1.5 backdrop-blur-md sm:right-0">
        <span className="animate-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
        <span className="font-body text-[11px] tracking-wide text-silver/90">
          {PROFILE.status}
        </span>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const webgl = useWebGLSupport();
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const particleCount = isMobile ? 120 : reduced ? 0 : 380;

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-20%] left-[-10%] h-[55vh] w-[55vw] rounded-full bg-electric/8 blur-[120px]" />
        <div className="absolute right-[-15%] bottom-[-10%] h-[50vh] w-[50vw] rounded-full bg-violet/10 blur-[130px]" />
      </div>

      {webgl && !reduced && (
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <Suspense fallback={null}>
            <HeroScene particleCount={particleCount} />
          </Suspense>
        </div>
      )}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 font-body text-[11px] font-medium tracking-[0.4em] text-azure/85 uppercase"
          >
            <Sparkles size={13} />
            {PROFILE.greeting}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.18, ease: "easeOut" }}
            className="font-display mt-4 text-[clamp(2.6rem,7.5vw,4.6rem)] leading-[1.02] font-bold tracking-tight text-gradient"
          >
            {PROFILE.name.toUpperCase()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-display mt-4 text-[15px] font-medium tracking-wide text-silver/85 sm:text-lg"
          >
            Frontend Developer{" "}
            <span className="text-mist/50">|</span> Backend Developer{" "}
            <span className="text-mist/50">|</span>{" "}
            <span className="text-gradient-blue">AI Enthusiast</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-body mt-6 max-w-xl text-[15px] leading-relaxed text-mist text-balance"
          >
            {PROFILE.heroDescription}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-4 inline-flex items-center gap-2 font-body text-[13px] text-mist/70"
          >
            <MapPin size={14} className="text-azure/70" />
            {PROFILE.location}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={() => smoothScrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-electric to-indigo px-6 py-3 font-body text-[14px] font-medium text-white shadow-[0_10px_30px_-12px_rgba(59,130,246,0.8)] transition-transform duration-300 hover:scale-[1.03]"
            >
              Explore My Work
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={() => smoothScrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-full border border-white/12 px-6 py-3 font-body text-[14px] font-medium text-silver transition-colors duration-300 hover:border-azure/45 hover:bg-white/5"
            >
              Contact Me
            </button>
            <a
              href="/resume.png"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-azure/35 bg-azure/8 px-6 py-3 font-body text-[14px] font-medium text-azure transition-colors duration-300 hover:border-azure/60 hover:bg-azure/15"
            >
              <Download size={15} />
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-white/12" />
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="text-mist transition-colors duration-300 hover:text-azure"
            >
              <Github size={19} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="text-mist transition-colors duration-300 hover:text-azure"
            >
              <Linkedin size={19} />
            </a>
          </motion.div>
        </div>

        <div className="relative">
          <Portrait />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-body text-[10px] tracking-[0.3em] text-mist/60 uppercase">
          Scroll
        </span>
        <span className="h-9 w-px bg-gradient-to-b from-azure/60 to-transparent" />
      </motion.div>
    </section>
  );
}
