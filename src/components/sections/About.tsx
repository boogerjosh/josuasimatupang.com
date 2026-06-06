import { ArrowUpRight, MapPin } from "lucide-react";

const technologies = [
  "React",
  "TypeScript",
  "Next.js",
  "JavaScript ES6+",
  "HTML5",
  "CSS3",
  "Vue.js",
  "React Native",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "Redux",
  "Zustand",
  "Custom Hooks",
  "Jest",
  "Performance",
  "PostgreSQL",
  "MongoDB",
  "Redis",
  "Firebase",
  "REST APIs",
  "GraphQL",
  "Docker",
  "CI/CD",
];

const story = [
  "I'm a frontend engineer with 3.5+ years of experience building scalable, secure, and mobile-first web applications across financial services, healthcare operations, recruitment platforms, internal dashboards, and AI products.",
  "At Synergy Financial Advisers, a licensed Singapore-based financial advisory firm providing investment, insurance, and fund-management advisory services, I help ship digital products across the public website, advisor recruitment, internal dashboards, and employee support tools.",
  "Before that, I worked with Jakarta Eye Center Hospitals & Clinics, an Indonesia-based eye care hospital and clinic network offering LASIK, cataract, retina, glaucoma, pediatric eye care, and other ophthalmology services.",
  "My strength is owning frontend features end-to-end, collaborating across product, design, backend, and frontend teams, and turning complex business workflows into maintainable user-facing interfaces.",
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-12">
      <div className="relative px-8">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Get to know <span className="text-primary">me.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[0.92fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[30px] border border-border/60 p-6 sm:p-8">
              <div className="relative">
                <div className="space-y-4 text-sm text-muted-foreground sm:text-[0.96rem]">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 flex-shrink-0 text-primary" />
                    <span>Jakarta, Indonesia</span>
                  </div>
                </div>

                <div className="mt-8">
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

                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-foreground">
                    The tools I use most
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[30px] border border-border/60 p-6 sm:p-8">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                I build interfaces that make complex businesses easier to use.
              </h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
