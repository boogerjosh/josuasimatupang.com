import { ArrowUpRight, MapPin } from "lucide-react";

const career = [
  {
    id: "synergy",
    period: "Sep 2023 – Present",
    company: "Synergy Financial Advisers",
    title: "Software Engineer",
    accent: "#7dd7df",
  },
  {
    id: "jec",
    period: "Apr 2022 – Apr 2023",
    company: "Jakarta Eye Center Hospitals",
    title: "Software Engineer",
    accent: "#f7a81b",
  },
];

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
    <section
      id="about"
      className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24"
    >
      <div className="grid gap-6 rounded-[28px] border border-border/70 bg-card/50 p-4 sm:p-6 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
        <div className="relative min-h-[240px] overflow-hidden rounded-[20px] bg-[#141414] sm:min-h-[320px]">
          <img
            src="/favicon.ico"
            alt="Portrait of Josua Simatupang"
            className="absolute inset-0 h-full w-full object-cover object-[50%_75%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.2em] text-white/75">
            <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            Jakarta, Indonesia
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 p-1 sm:p-3 lg:p-5">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Josua Simatupang
            </h2>

            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              Software Engineer at Synergy Financial Advisers
            </p>

            <a
              href="https://www.synergy.com.sg"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary motion-reduce-safe-opacity transition-opacity hover:opacity-75"
            >
              synergy.com.sg
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {career.map((role) => (
              <div
                key={role.id}
                className="rounded-[16px] border border-border/70 bg-background/70 p-4 motion-reduce-safe-colors transition-colors duration-200 ease-out hover:border-border"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs text-muted-foreground">
                    {role.period}
                  </span>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: role.accent }}
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-foreground">
                  {role.company}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {role.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 sm:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="section-label">About</p>

          <h2 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            A little about <span className="heading-em">me.</span>
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
            Frontend engineer with a product and AI engineering focus.
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
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

          <div className="grid gap-6 sm:grid-cols-2">
            <article className="rounded-[22px] border border-border/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Education &amp; training
              </h3>

              <div className="mt-5 space-y-5">
                {education.map((item) => (
                  <div key={`${item.school}-${item.program}`}>
                    <p className="font-medium text-foreground">{item.school}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.program}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {item.period} · {item.location}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[22px] border border-border/70 p-6">
              <h3 className="text-lg font-semibold text-foreground">
                Tools I work with
              </h3>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-border/70 bg-card/70 px-3 py-1.5 text-xs font-medium text-foreground motion-reduce-safe-colors transition-colors duration-200 ease-out hover:border-primary/40 hover:text-primary"
                  >
                    {technology}
                  </span>
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
