import { motion, useInView } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useMemo, useRef, useState } from "react";

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
      "Synergy Financial Advisers is a financial planning company where I own frontend delivery across public-facing and internal digital products, focusing on performance, usability, and maintainable implementation.",
    highlights: [
      "Executed the complete frontend development of Synergy's profile website using Next.js, Strapi, TypeScript, and Tailwind CSS to deliver a high-performance, SEO-optimized platform.",
      "Engineered the frontend of Synergy's advisor recruitment platform from the ground up with Next.js, TypeScript, and Tailwind CSS, crafting a seamless, mobile-responsive experience that streamlined the application process.",
      "Spearheaded the frontend development for an internal AI chatbot, architecting the UI and managing the client-side integration with the AI service API to improve the speed and accessibility of employee support.",
      "Collaborate with the frontend team to build and launch a new internal employee dashboard, creating a centralized hub for resources that improves engagement and streamlines access to critical company information.",
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
      "Jakarta Eye Center Hospitals & Clinics is a healthcare network where I worked on internal operational software used by teams across clinical and front office workflows.",
    highlights: [
      "Delivered features for JEC's internal dashboard website using Telerik and Kendo UI, while diving deep into ASP.NET to support the product's feature set and stability.",
      "Ensured a seamless cross-device experience through responsive implementation with jQuery and Bootstrap.",
      "Authored user guides, tutorials, and FAQs that improved the end-user experience and made onboarding smoother for internal teams.",
      "Collaborated closely with IT support to design an intuitive application for doctors, nurses, and front office staff.",
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

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    <section id="experience" className="relative overflow-hidden py-24 sm:py-28">
      <div className="relative mx-auto max-w-6xl px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Career
          </p>
          <h2
            className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            style={{ fontFamily: '"DM Serif Display", Georgia, serif' }}
          >
            Work <span className="italic text-primary">history.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-12 hidden rounded-[28px] border border-border/60 bg-background/45 px-6 py-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-sm md:block"
        >
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
              <motion.span
                key={item.id}
                initial={{ opacity: 0, scaleX: 0.9 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="absolute top-1/2 h-4 -translate-y-1/2 rounded-md border"
                style={getRailStyle(item)}
              />
            ))}
          </div>
        </motion.div>

        <div className="relative mt-10 space-y-4 sm:mt-12">
          <div className="absolute bottom-6 left-[18px] top-6 hidden w-px bg-border/70 sm:block" />

          {experiences.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.16 + index * 0.12 }}
                className="relative pl-0 sm:pl-10"
              >
                <span
                  className="absolute left-[11px] top-7 hidden h-3 w-3 rounded-full ring-4 ring-background sm:block"
                  style={{ backgroundColor: item.accent }}
                />

                <div
                  className={`overflow-hidden rounded-[22px] border transition-all duration-300 ${isOpen
                    ? "border-border/80 bg-card/90 shadow-[0_18px_48px_rgba(15,23,42,0.16)]"
                    : "border-border/55 bg-card/58 hover:border-border/80 hover:bg-card/76"
                    }`}
                  style={isOpen ? { boxShadow: `inset 3px 0 0 ${item.accent}` } : undefined}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left sm:px-6"
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-content`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                        <h3 className="text-lg font-semibold text-foreground sm:text-[1.35rem]">
                          {item.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium" style={{ color: item.accent }}>
                            {item.company}
                          </span>
                          {item.companyUrl ? (
                            <a
                              href={item.companyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Open ${item.company}`}
                              className="transition-opacity hover:opacity-80"
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
                  </button>

                  <motion.div
                    id={`${item.id}-content`}
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
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
                  </motion.div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
