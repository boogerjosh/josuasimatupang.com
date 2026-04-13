import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  "React", "Next.js", "Vue.js", "TypeScript", "JavaScript",
  "Tailwind CSS", "Node.js", "Express.js", "PostgreSQL", "MongoDB",
  "Git", "Figma", "REST APIs", "HTML/CSS", "Vuetify",
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-primary mb-2">Tech Stack</h2>
          <div className="w-12 h-px bg-primary mb-8" />
        </motion.div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.03 }}
              className="px-3 py-1.5 text-sm font-mono text-muted-foreground border border-border rounded-md hover:text-foreground hover:border-primary/40 transition-colors cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
