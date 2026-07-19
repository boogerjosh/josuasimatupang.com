import { ArrowUpRight, MapPin } from "lucide-react";

const technologies = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Vue",
  "Node.js",
  "Storybook",
  "Jest",
  "PostgreSQL",
  "Git",
];

const story = [
  "I'm a frontend engineer based in Jakarta. I enjoy turning complicated workflows into interfaces that feel clear, considered, and easy to use.",

  "Most of my work has been on products people rely on every day—from internal business tools to public-facing websites. I work closely with designers, product teams, and engineers to take ideas from early conversations through to production.",

  "I care about the parts of frontend work that are easy to overlook: sensible structure, thoughtful interactions, good performance, and the small details that make a product feel dependable.",

  "My path into software started with civil engineering before I moved into web development. It wasn't the most direct route, but it taught me to think in systems, work through practical constraints, and keep learning as I build.",
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
                    Frontend Engineer at Synergy Financial Advisers
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
                I like making complicated things feel straightforward.
              </h3>

              <div className="mt-6 space-y-5 text-base leading-8 text-muted-foreground sm:text-[1.02rem]">
                {story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
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