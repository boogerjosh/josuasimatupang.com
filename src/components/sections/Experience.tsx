import { ChevronDown, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  location?: string;
  companyUrl?: string;
  period: string;
  start: { year: number; month: number };
  end?: { year: number; month: number };
  accent: string;
  intro: string;
  highlights: string[];
  current?: boolean;
};

const today = new Date();
const presentDate = { year: today.getFullYear(), month: today.getMonth() + 1 };

const experiences: ExperienceItem[] = [
  {
    id: "synergy",
    title: "Frontend Engineer",
    company: "Synergy Financial Advisers Ltd",
    location: "Remote",
    companyUrl: "https://www.synergy.com.sg",
    period: "Sep 2023 – Present",
    start: { year: 2023, month: 9 },
    accent: "#7dd7df",
    current: true,
    intro:
      "I work across Synergy's internal and public-facing products, taking frontend features from early discussions through implementation, release, and ongoing support.",
    highlights: [
      "Build and maintain OneSynergy, an internal platform with more than 50 modules used by around 350 advisers and 70 staff across the business.",
      "Delivered the frontend for an internal assistant that helps advisers find business information using natural-language questions, along with admin tools for monitoring usage and costs.",
      "Improved the performance of the OneSynergy web app, reducing p75 LCP from 2.2s to 1.31s and bringing its performance score close to 100.",
      "Develop and maintain Synergy's corporate website and adviser recruitment platform, with an emphasis on responsive design, accessibility, SEO, and reusable components.",
      "Support production releases and investigate issues using Sentry and Jam.dev, working closely with product, design, backend, and QA.",
    ],
  },
  {
    id: "jec",
    title: "Frontend Engineer",
    company: "Jakarta Eye Center Hospitals",
    location: "Jakarta, Indonesia",
    companyUrl: "https://jec.co.id/id",
    period: "Apr 2022 – Apr 2023",
    start: { year: 2022, month: 4 },
    end: { year: 2023, month: 4 },
    accent: "#f7a81b",
    intro:
      "I worked on internal software used by hospital staff to manage patient administration and day-to-day operational work.",
    highlights: [
      "Developed and maintained an internal hospital operations dashboard used by staff across administrative workflows.",
      "Built frontend modules with React, and JavaScript",
      "Wrote technical and user documentation that made application modules easier for developers to maintain and hospital staff to adopt.",
    ],
  },
];

const monthValue = ({ year, month }: { year: number; month: number }) => year * 12 + (month - 1);

const formatDuration = (
  start: { year: number; month: number },
  end: { year: number; month: number },
) => {
  const totalMonths = monthValue(end) - monthValue(start);
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  if (years === 0) {
    return `${months}m`;
  }

  if (months === 0) {
    return `${years}y`;
  }

  return `${years}y ${months}m`;
};

const toggleExperience = (
  itemId: string,
  isOpen: boolean,
  setOpenId: React.Dispatch<React.SetStateAction<string>>,
) => {
  setOpenId(isOpen ? "" : itemId);
};

const Experience = () => {
  const [openId, setOpenId] = useState(experiences[0].id);

  const { years, railBounds } = useMemo(() => {
    const resolvedExperiences = experiences.map((item) => ({
      ...item,
      resolvedEnd: item.current ? presentDate : item.end ?? presentDate,
    }));
    const startYear = Math.min(...resolvedExperiences.map((item) => item.start.year));
    const endYear = Math.max(...resolvedExperiences.map((item) => item.resolvedEnd.year));

    return {
      years: Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index),
      railBounds: {
        min: Math.min(...resolvedExperiences.map((item) => monthValue(item.start))),
        max: Math.max(...resolvedExperiences.map((item) => monthValue(item.resolvedEnd) + 1)),
      },
    };
  }, []);

  const getRailStyle = (item: ExperienceItem) => {
    const resolvedEnd = item.current ? presentDate : item.end ?? presentDate;
    const left = ((monthValue(item.start) - railBounds.min) / (railBounds.max - railBounds.min)) * 100;
    const width = ((monthValue(resolvedEnd) - monthValue(item.start) + 1) / (railBounds.max - railBounds.min)) * 100;

    return {
      left: `${left}%`,
      width: `${Math.max(width, 8)}%`,
      backgroundColor: `${item.accent}22`,
      borderColor: item.accent,
      boxShadow: `0 0 0 1px ${item.accent}35 inset, 0 0 24px ${item.accent}18`,
    };
  };

  const getYearMarkerPosition = (year: number) => {
    return `${((monthValue({ year, month: 1 }) - railBounds.min) / (railBounds.max - railBounds.min)) * 100}%`;
  };

  return (
    <section id="experience" className="relative overflow-hidden py-12">
      <div className="relative px-8">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Selected <span className="text-primary">experience.</span>
          </h2>
        </div>

        <div className="mt-12 hidden rounded-[28px] border border-border/60 bg-background/45 px-6 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm md:block">
          <div className="flex items-center justify-between gap-6 font-mono text-xs text-muted-foreground">
            {years.map((year) => (
              <span key={year}>{year}</span>
            ))}
          </div>
          <div className="relative mt-5 h-6 rounded-full border border-border/50 bg-background/50">
            <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-border/60" />
            {years.slice(0, -1).map((year) => (
              <span
                key={year}
                className="absolute top-0 h-full w-px bg-border/50"
                style={{ left: getYearMarkerPosition(year + 1) }}
              />
            ))}
            {experiences.map((item) => (
              <span
                key={item.id}
                className="absolute top-1/2 h-4 -translate-y-1/2 rounded-md border"
                style={getRailStyle(item)}
              />
            ))}
          </div>
        </div>

        <div className="relative mt-10 space-y-4 sm:mt-12">
          <div className="absolute bottom-6 left-[18px] top-6 hidden w-px bg-border/70 sm:block" />

          {experiences.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <article
                key={item.id}
                className="relative pl-0 sm:pl-10"
              >
                <span
                  className="absolute left-[11px] top-7 hidden h-3 w-3 rounded-full ring-4 ring-background sm:block"
                  style={{ backgroundColor: item.accent }}
                />

                <div
                  className={`overflow-hidden rounded-[22px] border transition-[border-color,background-color,box-shadow] duration-300 ease-out ${isOpen
                    ? "border-border/80 bg-card/90 shadow-[0_18px_48px_rgba(15,23,42,0.16)]"
                    : "border-border/55 bg-card/58 hover:border-border/80 hover:bg-card/76"
                    }`}
                  style={isOpen ? { boxShadow: `inset 3px 0 0 ${item.accent}` } : undefined}
                >
                  <div
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleExperience(item.id, isOpen, setOpenId)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        toggleExperience(item.id, isOpen, setOpenId);
                      }
                    }}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-base font-semibold text-foreground sm:text-[1.15rem]">
                          {item.title}
                        </h3>

                        {item.current ? (
                          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            Current
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                        {item.companyUrl ? (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium transition-opacity hover:opacity-75"
                            style={{ color: item.accent }}
                            onClick={(event) => event.stopPropagation()}
                          >
                            {item.company}
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        ) : (
                          <span>{item.company}</span>
                        )}

                        {item.location ? (
                          <>
                            <span className="text-border">•</span>
                            <span>{item.location}</span>
                          </>
                        ) : null}

                        <span className="text-border">•</span>
                        <span>{item.period}</span>

                        <span className="text-border">•</span>
                        <span>
                          {formatDuration(
                            item.start,
                            item.current ? presentDate : item.end ?? presentDate,
                          )}
                        </span>
                      </div>
                    </div>

                    <span className="mt-1 rounded-full p-2 text-muted-foreground transition-colors duration-200 hover:text-foreground">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      />
                    </span>
                  </div>

                  <div
                    id={`${item.id}-content`}
                    className="experience-panel"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-6 sm:px-6">
                        <div className="border-t border-border/60 pt-5">
                          <p className="max-w-4xl text-[0.96rem] leading-7 text-muted-foreground">
                            {item.intro}
                          </p>
                          <ul className="mt-5 space-y-3 max-w-5xl text-[0.96rem] leading-7 text-muted-foreground">
                            {item.highlights.map((highlight) => (
                              <li key={highlight} className="flex gap-3">
                                <span className="mt-[0.7rem] h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: item.accent }} />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
