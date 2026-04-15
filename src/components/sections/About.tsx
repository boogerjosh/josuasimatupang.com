import { motion, useInView } from "framer-motion";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { useRef } from "react";

const technologies = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Strapi",
  "REST APIs",
  "Figma",
];

const story = [
  "I am a frontend engineer based in Jakarta with an unconventional start. I studied Civil Engineering at Universitas Sumatera Utara before realizing that building for the web was the work that kept pulling me back.",
  "Today I work at Synergy Financial Advisers, where I build product and marketing experiences with a strong focus on clarity, performance, and maintainable frontend systems. I care about interfaces that feel polished, but I care just as much about the structure underneath them.",
  "Outside of work, I keep exploring better ways to design and ship on the web, whether that means refining UI details, learning new tools, or building side projects that sharpen my thinking.",
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            About
          </p>
          <h2 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl" style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}>
            Get to know <span className="italic text-primary">me.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A closer look at how I think, what I build, and the tools I rely on most.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.92fr_1.18fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:sticky lg:top-28"
          >
            <div className="relative overflow-hidden rounded-[30px] border border-border/60 bg-card/75 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,140,0,0.08),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(125,215,223,0.12),transparent_30%)]" />
              <div className="relative">
                <div className="space-y-4 text-sm text-muted-foreground sm:text-[0.96rem]">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span>Frontend engineer focused on product UI, performance, and design implementation.</span>
                  </div>
                </div>

                <div className="mt-8 rounded-[24px] border border-border/60 bg-background/65 p-5">
                  <p className="text-xs font-medium uppercase tracking-[0.26em] text-muted-foreground">
                    Currently
                  </p>
                  <p className="mt-3 text-lg font-medium text-foreground">
                    Building web products at Synergy Financial Advisers
                  </p>
                  <a
                    href="https://www.synergy.com.sg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    synergy.com.sg
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.16 }}
            className="space-y-8"
          >
            <div className="rounded-[30px] border border-border/60 bg-card/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                I build for the web.
              </h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border/60 bg-card/72 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:p-8">
              <div className="flex flex-col gap-3 sm:justify-between">
                <h3 className="mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
                  The tools I reach for most
                </h3>
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
                  A practical stack for product work, content-heavy websites, and maintainable frontend systems.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.28, delay: 0.2 + index * 0.03 }}
                    className="rounded-full border border-border/70 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
