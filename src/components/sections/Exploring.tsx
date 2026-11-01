import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import { EXPLORING } from "../../lib/data";
import SectionHeading from "../SectionHeading";

export default function Exploring() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionHeading eyebrow="Current learning journey" title="What I'm Exploring" />

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass flex h-44 items-center justify-center rounded-2xl">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                className="absolute h-32 w-32 rounded-full border border-dashed border-azure/30"
              />
              <Compass size={40} className="relative text-azure" />
            </div>
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-2xl bg-gradient-to-br from-electric/12 to-violet/14 blur-xl"
            />
          </motion.div>

          <div>
            <ul className="flex flex-wrap gap-3">
              {EXPLORING.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  className="rounded-full border border-white/10 bg-white/4 px-4 py-2.5 font-body text-[13.5px] text-silver/85 transition-colors duration-300 hover:border-electric/35 hover:bg-electric/8"
                >
                  {item}
                </motion.li>
              ))}
            </ul>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body mt-7 max-w-xl text-[15px] leading-[1.85] text-mist"
            >
              I'm continuously exploring new technologies and improving my
              understanding through learning and practical development.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
