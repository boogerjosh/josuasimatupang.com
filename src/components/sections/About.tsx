import { ArrowUpRight, MapPin } from "lucide-react";

const technologies = [
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Vue.js",
  "Node.js",
  "Express.js",
  "GraphQL",
  "Redux",
  "Zustand",
  "Jest",
  "PostgreSQL",
  "Storybook",
  "Better Auth",
  "CI/CD",
  "Git",
  "REST APIs",
  "SEO",
  "Accessibility",
  "Performance Optimization",
  "SSR / SSG / CSR",
  "Code Splitting",
];

const story = [
  "I'm a frontend engineer with 4+ years of experience building scalable web platforms across financial services and healthcare operations.",
  "At Synergy Financial Advisers, a multi-award-winning independent financial advisory firm recognized among Singapore's fastest-growing companies, I develop and maintain internal platforms with 50+ modules, advisor recruitment products, and the corporate website.",
  "I also built an internal AI-powered business intelligence agent with OpenAI LLMs and the Vercel AI SDK, used by 300+ financial advisers to retrieve business insights through natural language.",
  "Previously at Jakarta Eye Center Hospitals, I developed internal operations dashboards and documentation that improved daily workflows and sped up onboarding for both developers and hospital staff.",
];

const education = [
  {
    school: "Hacktiv8 Indonesia",
    program: "Certification in Full Stack JavaScript",
    location: "Online",
    period: "Jan 2022 - Apr 2022",
  },
  {
    school: "Universitas Sumatera Utara",
    program: "BSc in Civil Engineering",
    location: "Medan, Indonesia",
    period: "2017 - 2021",
  },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-12">
      <div className="relative px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
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
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                I build interfaces that make complex businesses easier to use.
              </h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="rounded-[30px] border border-border/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Education & Training
              </h3>
              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {education.map((item) => (
                  <div key={item.school + item.program}>
                    <p className="font-medium text-foreground">{item.school}</p>
                    <p>{item.program}</p>
                    <p className="text-sm">
                      {item.location} • {item.period}
                    </p>
                  </div>
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
