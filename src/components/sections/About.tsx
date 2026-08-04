import { ArrowUpRight, MapPin } from "lucide-react";

const technologies = [
  "TypeScript",
  "React",
  "Next.js",
  "Zustand",
  "Redux",
  "Strapi CMS",
  "Vitest",
  "Storybook",
  "MCP",
  "Vercel AI SDK",
];

const story = [
  "Frontend-focused software engineer with 4 years of experience building production web applications, AI-powered products, internal platforms, and responsive digital experiences.",

  "I currently work at Synergy, where I develop products across React, Next.js, TypeScript, APIs, AI integrations, Zustand, and Strapi CMS. My work extends beyond building interfaces—I translate complex product requirements and business workflows into reliable, scalable, and user-friendly solutions.",

  "I am a key contributor to an internal AI-powered business intelligence platform used by 300+ financial advisers. I contribute throughout the development lifecycle, including requirements analysis, frontend architecture, API integration, code review, AI agents, MCP integrations, workflow automation, testing, and production improvements.",

  "I also develop and maintain Synergy's corporate website and adviser recruitment platform, focusing on reusable architecture, responsive design, SEO, accessibility, and performance.",

  "Previously, I worked at JEC, Indonesia's leading eye hospital network, where I developed an internal hospital operations dashboard and created technical and user documentation that improved developer onboarding and system adoption.",

  "I enjoy working at the intersection of frontend architecture, AI engineering, product development, and business impact.",
];

const selectedImpact = [
  "Helped build an internal AI platform that enables financial advisers and internal teams to retrieve business insights through natural-language conversations.",
  "Delivered Synergy's responsive, SEO-friendly corporate website with 90+ Lighthouse Performance scores.",
  "Built scalable interfaces and reusable components for Synergy's adviser recruitment and onboarding platform.",
  "Developed an internal hospital dashboard that streamlined patient administration and operational workflows.",
  "Created comprehensive technical and user documentation to accelerate onboarding and improve daily system adoption.",
];

const education = [
  {
    school: "Hacktiv8 Indonesia",
    program: "Full Stack JavaScript",
    location: "Online",
    period: "Jan 2022 – Apr 2022",
  },
  {
    school: "Universitas Sumatera Utara",
    program: "BSc in Civil Engineering",
    location: "Medan, Indonesia",
    period: "2017 – 2021",
  },
];

const About = () => {
  return (
    <section id="about" className="relative overflow-hidden py-12">
      <div className="relative px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            A little about <span className="text-primary">me.</span>
          </h2>
        </div>

        <div className="mt-10 grid gap-10 sm:mt-14 lg:grid-cols-[0.92fr_1.18fr] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[30px] border border-border/60 p-6 sm:p-8">
              <div className="relative">
                <div className="flex items-center gap-3 text-sm text-muted-foreground sm:text-[0.96rem]">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>Jakarta, Indonesia</span>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-medium uppercase tracking-[0.26em] text-muted-foreground">
                    Currently
                  </p>

                  <p className="mt-3 text-lg font-medium text-foreground">
                    Software Engineer at Synergy Financial Advisers
                  </p>

                  <a
                    href="https://www.synergy.com.sg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                  >
                    synergy.com.sg
                    <ArrowUpRight
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </a>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-foreground">
                    Tools I work with
                  </h3>

                  <div className="mt-6 flex flex-wrap gap-2.5">
                    {technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-border/70 bg-card/80 px-3 py-1.5 text-xs font-medium text-foreground shadow-[0_10px_24px_rgba(15,23,42,0.06)] transition-colors hover:border-primary/40 hover:text-primary"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="space-y-8">
            <article className="rounded-[30px] border border-border/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Frontend engineer with a product and AI engineering focus.
              </h3>

              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}

                <div className="pt-2">
                  <p className="font-medium text-foreground">Selected impact</p>
                  <ul className="mt-4 space-y-3">
                    {selectedImpact.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="rounded-[30px] border border-border/60 p-6 sm:p-8">
              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                Education &amp; training
              </h3>

              <div className="mt-6 divide-y divide-border/60">
                {education.map((item) => (
                  <div
                    key={`${item.school}-${item.program}`}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                      <div>
                        <p className="font-medium text-foreground">
                          {item.school}
                        </p>

                        <p className="mt-1 text-base text-muted-foreground">
                          {item.program}
                        </p>
                      </div>

                      <p className="shrink-0 text-sm text-muted-foreground sm:text-right">
                        {item.period}
                      </p>
                    </div>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;