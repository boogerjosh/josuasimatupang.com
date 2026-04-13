import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Synergy Financial Website",
    description:
      "Corporate website for a financial advisory firm. Built with Next.js and integrated with a headless CMS for content management.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "CMS"],
    link: "#",
  },
  {
    title: "HopOn Recruitment Platform",
    description:
      "Full-stack recruitment platform featuring role-based dashboards for admins, recruiters, and candidates with real-time updates.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Full-Stack"],
    link: "#",
  },
  {
    title: "AI Chatbot Integration",
    description:
      "Conversational AI chatbot integrated into the company website to assist users with financial planning inquiries.",
    tags: ["React", "AI/ML", "API Integration"],
    link: "#",
  },
  {
    title: "JEC Internal Dashboard",
    description:
      "Internal operations dashboard for Jakarta Eye Center's HR team, handling employee data and workflow management.",
    tags: ["Vue.js", "Vuetify", "Express.js", "PostgreSQL"],
    link: "#",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-primary mb-2">Projects</h2>
          <div className="w-12 h-px bg-primary mb-10" />
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <motion.a
              key={i}
              href={project.link}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group block p-6 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1"
                />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs font-mono font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
