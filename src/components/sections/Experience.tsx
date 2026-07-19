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
    period: "Sep. 2023 - Present",
    start: { year: 2023, month: 9 },
    accent: "#7dd7df",
    current: true,
    intro:
      "Synergy Financial Advisers Ltd is a multi-award-winning independent financial advisory firm recognized among Singapore's fastest-growing companies. I build and maintain frontend products across internal operations, AI-driven business insights, recruitment, and corporate web presence.",
    highlights: [
      "Develop and maintain an internal business platform with 50+ modules used by multiple internal teams, streamlining workflows and improving operational efficiency.",
      "Built an internal AI-powered business intelligence agent using OpenAI LLMs and the Vercel AI SDK, independently delivering the end-to-end frontend used by 300+ financial advisers.",
      "Develop and maintain Synergy's corporate website with Next.js, TypeScript, and Strapi CMS, shipping responsive and SEO-friendly pages with 90+ Lighthouse performance scores.",
      "Develop and maintain Synergy's adviser recruitment platform with Next.js, TypeScript, and Zustand, building scalable high-performance interfaces and reusable components.",
      "Collaborate closely with product managers, designers, backend engineers, and QA throughout the software development lifecycle to deliver high-quality features in an Agile environment.",
    ],
  },
  {
    id: "jec",
    title: "Frontend Engineer",
    company: "Jakarta Eye Center Hospitals & Clinics",
    location: "Jakarta",
    companyUrl: "https://jec.co.id/id",
    period: "Apr. 2022 - Apr. 2023",
    start: { year: 2022, month: 4 },
    end: { year: 2023, month: 4 },
    accent: "#f7a81b",
    intro:
      "Jakarta Eye Center Hospitals is Indonesia's leading eye hospital network, operating 5 hospitals and 11 eye clinics nationwide. I worked on internal systems that supported hospital administration and operational workflows.",
    highlights: [
      "Developed and maintained an internal hospital operations dashboard to streamline patient administration and daily workflows for hospital staff.",
      "Built frontend modules with React.js, JavaScript, jQuery, Telerik UI, and Kendo UI integrated with ASP.NET REST APIs.",
      "Authored comprehensive frontend and user documentation for application modules, accelerating developer onboarding and enabling staff adoption in day-to-day operations.",
    ],
  },
];

const monthValue = ({ year, month }: { year: number; month: number }) => year * 12 + (month - 1);

const formatDuration = (start: { year: number; month: number }, end: { year: number; month: number }) => {
  const totalMonths = monthValue(end) - monthValue(start) + 1;
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
            Work <span className="text-primary">history.</span>
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
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2"> <h3 className="text-base font-semibold text-foreground sm:text-[1.15rem]"> {item.title} </h3> <div className="flex items-center gap-2 text-sm"> <span className="font-medium" style={{ color: item.accent }}> {item.company} </span> {item.companyUrl ? (<a href={item.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${item.company}`}
                        className="transition-opacity hover:opacity-80"
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                      >
                        <ExternalLink className="h-3.5 w-3.5" style={{ color: item.accent }} />
                      </a>
                      ) : null}
                      </div>
                        {item.current ? (
                          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.company}
                        {item.location ? <span>, {item.location}</span> : null}
                        <span className="mx-2 text-border">•</span>
                        {item.period}
                        <span className="mx-2 text-border">•</span>
                        {formatDuration(item.start, item.current ? presentDate : item.end ?? presentDate)}
                      </p>
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
