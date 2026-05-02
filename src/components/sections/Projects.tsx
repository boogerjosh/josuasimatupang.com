import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Bot, BriefcaseBusiness, Globe, Layers3 } from "lucide-react";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

type Project = {
  title: string;
  description: string;
  link?: string;
  postLink?: string;
  type: string;
  accent: string;
  icon: typeof Globe;
  featured?: boolean;
  embedUrl?: string;
};

const projects: Project[] = [
  {
    title: "Autobot AI",
    type: "Featured Work",
    description:
      "Internal AI chatbot experience built to reduce employee support response times, from client-side logic and REST API integration to day-to-day usability.",
    postLink:
      "https://www.linkedin.com/posts/synergyfinancialadvisers_experience-the-enhanced-autobot-ai-in-our-activity-7340664505728684032-gV-t?utm_source=share&utm_medium=member_desktop&rcm=ACoAADa5KJgB59PKUi7emDadHdW9FWjma3PReKk",
    accent: "#7dd7df",
    icon: Bot,
    featured: true,
    embedUrl:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7340260455086465024?compact=1",
  },
  {
    title: "Synergy Financial Website",
    type: "Marketing Platform",
    description:
      "SEO-optimized corporate website for a financial advisory firm, built with Next.js, TypeScript, and Tailwind CSS with strong Lighthouse performance.",
    link: "https://www.synergy.com.sg",
    accent: "#f29e38",
    icon: Globe,
  },
  {
    title: "HopOn Recruitment Platform",
    type: "Recruitment Platform",
    description:
      "Advisor recruitment platform for Synergy, built from product requirements and UI/UX designs into reusable React components and a smoother candidate journey.",
    link: "https://hopon.synergy.com.sg",
    accent: "#7dd7df",
    icon: Layers3,
  },
  {
    title: "JEC Website",
    type: "Website Improvement",
    description:
      "Contributed to improving Jakarta Eye Center's profile website experience, refining frontend implementation and helping deliver a cleaner, more reliable web presence.",
    link: "https://jec.co.id/id",
    accent: "#f7a81b",
    icon: BriefcaseBusiness,
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const featuredProject = projects.find((project) => project.featured);
  const supportingProjects = projects.filter((project) => !project.featured);

  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="relative mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Projects
          </p>
          <h2
            className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            Product work <span className="italic text-primary">in motion.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A mix of public-facing websites, internal products, and AI-powered tools built with a strong focus on usability and frontend craft.
          </p>
        </motion.div>

        {featuredProject ? (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-10 overflow-hidden rounded-[32px] border border-border/60 bg-card/78 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:mt-14"
          >
            <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="border-b border-border/60 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                <div className="flex items-center gap-3 text-sm font-medium" style={{ color: featuredProject.accent }}>
                  <featuredProject.icon className="h-4 w-4" />
                  <span>{featuredProject.type}</span>
                </div>
                <h3 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {featuredProject.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                  {featuredProject.description}
                </p>
                {featuredProject.postLink ? (
                  <a
                    href={featuredProject.postLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    See the post here on LinkedIn
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>

              <div className="p-4 sm:p-6">
                <div className="overflow-hidden rounded-[24px] border border-border/60 bg-background/70 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
                  <iframe
                    src={featuredProject.embedUrl}
                    title="Autobot AI LinkedIn post"
                    className="h-[420px] w-full bg-transparent"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {supportingProjects.map((project, index) => {
            const Icon = project.icon;

            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.18 + index * 0.08 }}
                className="group rounded-[28px] border border-border/60 bg-card/72 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/90 hover:bg-card/85"
              >
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/60 bg-background/70"
                    style={{ color: project.accent }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={`Open ${project.title}`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : null}
                </div>

                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                    {project.type}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-[0.96rem]">
                    {project.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
