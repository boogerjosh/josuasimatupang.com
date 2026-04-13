import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const experiences = [
  {
    title: "Frontend Engineer",
    company: "Synergy Financial Advisers",
    period: "Aug 2024 — Present",
    points: [
      "Developing and maintaining the company website using Next.js, TypeScript, and Tailwind CSS",
      "Building HopOn — a full-stack recruitment platform with role-based dashboards",
      "Integrating AI-powered chatbot features for enhanced user engagement",
    ],
  },
  {
    title: "Frontend Developer (Internship)",
    company: "Jakarta Eye Center",
    period: "Aug 2023 — Jan 2024",
    points: [
      "Built internal dashboard for HR and operations using Vue.js and Vuetify",
      "Developed REST APIs with Express.js and PostgreSQL",
      "Created responsive, user-friendly interfaces for hospital staff workflows",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-primary mb-2">Experience</h2>
          <div className="w-12 h-px bg-primary mb-10" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                className="relative pl-8"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary -translate-x-[3.5px]" />

                <p className="text-xs font-mono text-muted-foreground mb-1">{exp.period}</p>
                <h3 className="text-foreground font-semibold text-lg">{exp.title}</h3>
                <p className="text-primary text-sm mb-3">{exp.company}</p>
                <ul className="space-y-2">
                  {exp.points.map((point, j) => (
                    <li key={j} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">—</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
