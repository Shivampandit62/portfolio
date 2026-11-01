import { motion } from "framer-motion";
import { Hammer, Compass, TrendingUp } from "lucide-react";
import { APPROACH } from "../../lib/data";
import SectionHeading from "../SectionHeading";

const icons = [Hammer, Compass, TrendingUp] as const;

export default function Approach() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="How I work" title="My Development Approach" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {APPROACH.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.55, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-b from-white/5 to-transparent p-7 transition-colors duration-400 hover:border-electric/30"
              >
                <div className="absolute -top-16 -right-16 h-36 w-36 rounded-full bg-electric/10 blur-2xl transition-opacity duration-500 group-hover:bg-electric/18" />

                <span className="font-body text-[11px] tracking-[0.3em] text-mist/50">
                  0{i + 1}
                </span>

                <div className="mt-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-electric/25 bg-electric/10 text-azure">
                  <Icon size={19} />
                </div>

                <h3 className="font-display mt-5 text-xl font-bold tracking-wide text-gradient-blue uppercase">
                  {item.title}
                </h3>

                <p className="font-body mt-3 text-[14px] leading-[1.8] text-mist">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
