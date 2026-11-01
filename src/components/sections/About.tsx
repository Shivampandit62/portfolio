import { motion } from "framer-motion";
import { PROFILE } from "../../lib/data";
import SectionHeading from "../SectionHeading";

const stats = [
  { label: "Based in", value: "Uttar Pradesh, India" },
  { label: "Focus", value: "Web & AI applications" },
  { label: "Studying", value: "B.Tech CSE" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Get to know me" title="About Me" />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65 }}
            className="space-y-5"
          >
            {PROFILE.about.map((para) => (
              <p
                key={para.slice(0, 32)}
                className="font-body text-[15px] leading-[1.85] text-mist"
              >
                {para}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative"
          >
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <span className="font-display text-sm font-semibold tracking-[0.2em] text-gradient-blue">
                  at a glance
                </span>
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-electric/60" />
                  <span className="h-2 w-2 rounded-full bg-violet/60" />
                  <span className="h-2 w-2 rounded-full bg-white/15" />
                </div>
              </div>

              <ul className="space-y-5">
                {stats.map((s, i) => (
                  <motion.li
                    key={s.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="flex items-start justify-between gap-4 border-b border-white/6 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="font-body text-[12px] tracking-[0.18em] text-mist/60 uppercase">
                      {s.label}
                    </span>
                    <span className="font-display text-right text-[14px] font-medium text-silver">
                      {s.value}
                    </span>
                  </motion.li>
                ))}
              </ul>

              <div className="relative mt-8 h-28 overflow-hidden rounded-xl border border-white/6 bg-gradient-to-br from-electric/10 via-transparent to-violet/12">
                <div className="animate-float absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rotate-45 rounded-2xl border border-azure/40 bg-azure/8" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.18),transparent_60%)]" />
              </div>
            </div>

            <div
              aria-hidden
              className="absolute -right-3 -bottom-3 -z-10 h-full w-full rounded-2xl bg-gradient-to-br from-electric/12 to-violet/12 blur-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
