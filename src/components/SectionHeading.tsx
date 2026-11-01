import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, align = "left" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={align === "center" ? "mb-14 text-center" : "mb-12"}
    >
      <span className="font-body text-[11px] font-medium tracking-[0.35em] text-azure/80 uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-silver sm:text-4xl">
        {title}
      </h2>
      <div
        className={
          align === "center"
            ? "mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-electric to-transparent"
            : "mt-5 h-px w-24 bg-gradient-to-r from-electric to-transparent"
        }
      />
    </motion.div>
  );
}
