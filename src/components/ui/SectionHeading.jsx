import { motion } from "framer-motion";

export default function SectionHeading({ label, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full mb-12"
    >
      <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 mb-3 block">
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed text-justify">
          {description}
        </p>
      )}
    </motion.div>
  );
}
