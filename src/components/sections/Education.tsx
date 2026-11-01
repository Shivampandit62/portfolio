import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EDUCATION } from "../../lib/data";
import SectionHeading from "../SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="My journey so far" title="Education" />

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[15px] w-px bg-gradient-to-b from-electric/50 via-violet/35 to-transparent sm:left-[19px]"
          />

          <ol className="space-y-8">
            {EDUCATION.map((item, i) => (
              <motion.li
                key={item.degree}
                initial={{ opacity: 0, x: -22 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="relative flex gap-5 sm:gap-7"
              >
                <span className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-electric/40 bg-abyss shadow-[0_0_0_5px_rgba(4,5,10,1)] sm:h-10 sm:w-10">
                  <GraduationCap size={15} className="text-azure" />
                </span>

                <div className="glass flex-1 rounded-xl px-5 py-5 transition-colors duration-400 hover:border-electric/25 sm:px-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-display text-[16px] font-semibold text-silver sm:text-[17px]">
                      {item.degree}
                    </h3>
                    <span className="rounded-full border border-white/10 bg-white/4 px-3 py-0.5 font-body text-[11px] text-mist">
                      {item.status}
                    </span>
                  </div>
                  <p className="font-body mt-2 text-[13.5px] text-mist">
                    {item.institute}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
