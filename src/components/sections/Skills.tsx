import { motion } from "framer-motion";
import { Code2, Layout, Server, Sparkles } from "lucide-react";
import { SKILL_CATEGORIES } from "../../lib/data";
import SectionHeading from "../SectionHeading";

const icons = {
  layout: Layout,
  server: Server,
  code: Code2,
  sparkles: Sparkles,
} as const;

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="What I work with" title="Technical Skills" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_CATEGORIES.map((cat, i) => {
            const Icon = icons[cat.icon];
            return (
              <motion.article
                key={cat.category}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="glass group rounded-2xl p-6 transition-colors duration-400 hover:border-electric/30"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-azure transition-colors duration-400 group-hover:bg-electric/16">
                  <Icon size={19} />
                </div>

                <h3 className="font-display text-[15px] font-semibold tracking-wide text-silver">
                  {cat.category}
                </h3>

                <ul className="mt-5 space-y-3">
                  {cat.skills.map((skill) => (
                    <li key={skill.name} className="flex flex-col gap-0.5">
                      <span className="font-body text-[13.5px] text-mist">
                        {skill.name}
                      </span>
                      {skill.note && (
                        <span className="font-body text-[11px] text-mist/50">
                          {skill.note}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
