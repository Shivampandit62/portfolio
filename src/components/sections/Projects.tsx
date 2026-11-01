import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, Github, Clock } from "lucide-react";
import { PROJECTS, type Project } from "../../lib/data";
import SectionHeading from "../SectionHeading";

function Preview({ project }: { project: Project }) {
  const isUpcoming = project.status === "Upcoming";

  if (isUpcoming) {
    return (
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-xl border border-white/8 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.02)_0_12px,transparent_12px_24px)]">
        <div className="absolute inset-0 bg-gradient-to-br from-electric/8 to-violet/12" />
        <div className="relative text-center">
          <Clock size={26} className="mx-auto mb-3 text-azure/70" />
          <p className="font-display text-sm font-semibold tracking-[0.25em] text-silver/80 uppercase">
            In Progress
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-48 overflow-hidden rounded-xl border border-white/8 bg-abyss">
      <div
        className={`absolute inset-0 ${
          project.accent === "blue"
            ? "bg-[radial-gradient(circle_at_20%_15%,rgba(59,130,246,0.35),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(99,102,241,0.28),transparent_55%)]"
            : "bg-[radial-gradient(circle_at_20%_15%,rgba(139,92,246,0.32),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(59,130,246,0.25),transparent_55%)]"
        }`}
      />

      <div className="absolute inset-x-4 top-4 flex items-center gap-1.5 rounded-t-lg border border-white/8 border-b-0 bg-white/5 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/25" />
        <span className="h-2 w-2 rounded-full bg-white/18" />
        <span className="h-2 w-2 rounded-full bg-white/12" />
        <span className="ml-2 truncate font-body text-[10px] text-mist/70">
          {project.name === "Jivorax" ? "jivorax.tech" : "news-portal"}
        </span>
      </div>

      <div className="absolute inset-x-4 top-14 bottom-4 rounded-lg border border-white/8 bg-void/70 p-4 backdrop-blur-sm">
        <div className="flex h-full flex-col justify-between">
          <div>
            <div className="h-2.5 w-24 rounded-full bg-gradient-to-r from-azure/70 to-violet/60" />
            <div className="mt-3 space-y-2">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-5/6 rounded-full bg-white/8" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/6" />
            </div>
          </div>
          <div className="flex gap-2">
            <span className="h-6 w-16 rounded-md bg-electric/35" />
            <span className="h-6 w-16 rounded-md bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateXRaw = useTransform(py, [0, 1], [7, -7]);
  const rotateYRaw = useTransform(px, [0, 1], [-8, 8]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18 });
  const glare = useTransform(
    [px, py],
    ([x, y]: number[]) =>
      `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, rgba(96,165,250,0.14), transparent 60%)`,
  );

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const isUpcoming = project.status === "Upcoming";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass relative rounded-2xl p-6 transition-colors duration-400 hover:border-electric/30 sm:p-7"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{ background: glare }}
      />

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <span className="font-body text-[11px] tracking-[0.3em] text-mist/55 uppercase">
            Project {project.index}
          </span>
          <h3 className="font-display mt-2 text-2xl font-bold text-silver">
            {project.name}
          </h3>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 font-body text-[11px] ${
            isUpcoming
              ? "border-amber-400/30 bg-amber-400/8 text-amber-300/90"
              : "border-emerald-400/30 bg-emerald-400/8 text-emerald-300/90"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isUpcoming ? "bg-amber-400" : "bg-emerald-400"}`}
          />
          {isUpcoming ? "Upcoming Project" : "Live"}
        </span>
      </div>

      <Preview project={project} />

      <p className="font-body mt-5 text-[14px] leading-[1.8] text-mist">
        {project.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-white/8 bg-white/4 px-3 py-1 font-body text-[11.5px] text-silver/75"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-electric to-indigo px-5 py-2.5 font-body text-[13px] font-medium text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            Live Website
            <ArrowUpRight size={15} />
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/12 px-5 py-2.5 font-body text-[13px] text-silver transition-colors duration-300 hover:border-azure/45 hover:bg-white/5"
          >
            <Github size={14} />
            GitHub
          </a>
        )}
        {isUpcoming && (
          <span className="font-body text-[12.5px] text-mist/60">
            Not publicly available yet.
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Selected work" title="Featured Projects" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.name} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
