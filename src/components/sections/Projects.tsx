import { ArrowUpRight } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Project = {
  title: string;
  description: string;
  link?: string;
  postLink?: string;
  type: string;
  accent: string;
  imageSrcs?: string[];
};

const projects: Project[] = [
  {
    title: "Autobot AI",
    type: "Featured Work",
    description:
      "Internal AI chatbot for Synergy Financial Advisers employees, integrating REST and GraphQL APIs to answer support questions faster and reduce response times by roughly 30%.",
    postLink:
      "https://www.linkedin.com/posts/synergyfinancialadvisers_experience-the-enhanced-autobot-ai-in-our-activity-7340664505728684032-gV-t?utm_source=share&utm_medium=member_desktop&rcm=ACoAADa5KJgB59PKUi7emDadHdW9FWjma3PReKk",
    accent: "#7dd7df",
    imageSrcs: [
      "/autobot-1.png",
      "/autobot-2.png",
      "/autobot-3.png",
      "/autobot-4.png",
      "/autobot-5.png",
      "/autobot-6.png",
      "/autobot-7.png",
    ],
  },
  {
    title: "Synergy Financial Website",
    type: "Marketing Platform",
    description:
      "Public profile website for a licensed Singapore-based financial advisory firm, built to strengthen trust, improve search visibility, and keep performance scores above 90.",
    link: "https://www.synergy.com.sg",
    accent: "#f29e38",
  },
  {
    title: "HopOn Recruitment Platform",
    type: "Recruitment Platform",
    description:
      "Recruitment platform that helps Synergy attract and onboard prospective financial advisors through a clearer candidate journey and reusable React product flows.",
    imageSrcs: [
      "/hopon-1-web.png",
      "/hopon-2-web.png",
      "/hopon-3-web.png",
      "/hopon-4-web.png",
      "/hopon-5-web.png",
      "/hopon-6-web.png",
      "/hopon-7-web.png",
    ],
    accent: "#7dd7df",
  },
  {
    title: "Synergy Internal Dashboard",
    type: "Internal Operations",
    description:
      "Company dashboard built with the frontend team to support adviser acquisition and internal workflows using reusable React components, custom hooks, Zustand, Redux, TypeScript, and Jest.",
    accent: "#9b87f5",
  },
  {
    title: "JEC Website",
    type: "Website Improvement",
    description:
      "Frontend improvements for Jakarta Eye Center Hospitals & Clinics, an eye care hospital and clinic network in Indonesia, focused on a cleaner and more reliable public web presence.",
    link: "https://jec.co.id/id",
    accent: "#f7a81b",
  },
];

const ProjectImageModal = ({ project }: { project: Project }) => {
  const projectGallery = project.imageSrcs;

  if (!projectGallery) {
    return null;
  }

  return (
    <DialogContent className="max-h-[92vh] max-w-[min(1120px,calc(100vw-2rem))] overflow-hidden rounded-[24px] border-border/70 bg-background/95 p-0 shadow-[0_28px_90px_rgba(15,23,42,0.28)]">
      <DialogHeader className="border-b border-border/60 px-5 py-4 pr-12 text-left">
        <DialogTitle className="text-base sm:text-lg">{project.title}</DialogTitle>
      </DialogHeader>
      <div className="bg-muted/30 p-4 sm:p-5">
        <Carousel opts={{ align: "start", loop: projectGallery.length > 1 }} className="w-full">
          <CarouselContent className="-ml-0">
            {projectGallery.map((imageSrc, imageIndex) => (
              <CarouselItem key={imageSrc} className="pl-0">
                <figure className="overflow-hidden border border-border/60 shadow-[0_14px_36px_rgba(15,23,42,0.1)]">
                  <img
                    src={imageSrc}
                    alt={`${project.title} screenshot ${imageIndex + 1}`}
                    className="h-[min(68vh,720px)] w-full object-contain"
                  />
                  <figcaption className="border-t border-border/60 px-4 py-3 text-xs text-muted-foreground">
                    {imageIndex + 1} / {projectGallery.length}
                  </figcaption>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 top-1/2 h-10 w-10 -translate-y-1/2 bg-background/90 shadow-[0_10px_24px_rgba(15,23,42,0.18)]" />
          <CarouselNext className="right-3 top-1/2 h-10 w-10 -translate-y-1/2 bg-background/90 shadow-[0_10px_24px_rgba(15,23,42,0.18)]" />
        </Carousel>
      </div>
    </DialogContent>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="relative overflow-hidden py-16 sm:py-24 lg:py-28">
      <div className="relative px-8">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            Product work <span className="text-primary">in practice.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A mix of public websites, recruitment products, and internal tools that connect frontend craft with clearer business outcomes.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {projects.map((project) => {
            const previewImage = project.imageSrcs?.[0];
            const projectGallery = project.imageSrcs;

            return (
              <article
                key={project.title}
                className="group rounded-[28px] border border-border/60 bg-card/72 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/90 hover:bg-card/85"
              >
                <div className="flex items-start justify-between gap-4">
                  {projectGallery ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/60 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label={`Open ${project.title} screenshot`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </DialogTrigger>
                      <ProjectImageModal project={project} />
                    </Dialog>
                  ) : project.link ? (
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

                {previewImage && projectGallery ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="mt-6 block w-full overflow-hidden border border-border/60 bg-background/70 text-left shadow-[0_14px_32px_rgba(15,23,42,0.08)] transition-opacity hover:opacity-90"
                        aria-label={`Open ${project.title} screenshot`}
                      >
                        <img
                          src={previewImage}
                          alt={`${project.title} screenshot`}
                          className="aspect-[16/10] w-full object-cover object-top"
                          loading="lazy"
                        />
                      </button>
                    </DialogTrigger>
                    <ProjectImageModal project={project} />
                  </Dialog>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
