import { ArrowDownRight, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const scrollToProjects = () => {
  const section = document.getElementById("projects");

  if (!section) {
    return;
  }

  window.history.replaceState(null, "", "#projects");
  window.scrollTo({
    top: Math.max(0, section.offsetTop - 112),
    behavior: "smooth",
  });
};

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[calc(100vh-96px)] items-center overflow-hidden py-8 sm:py-12">
      <div className="flex w-full flex-col gap-10 px-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12 xl:gap-16">
        <h1 className="min-w-0 flex-1 text-3xl font-normal leading-[1.16] text-foreground sm:text-4xl md:text-5xl lg:max-w-[62%] lg:text-[3.5rem] xl:text-[4.25rem]">
          <span className="mr-2 align-middle text-5xl sm:mr-3 sm:text-6xl lg:text-7xl" aria-hidden="true">
            👋
          </span>
          Hi, I'm <strong className="font-bold text-primary">Josua</strong> - a frontend engineer building products for finance and healthcare
        </h1>

        <div className="w-full max-w-xl shrink-0 lg:w-[25rem] xl:w-[33rem]">
          <p className="text-xl font-normal leading-[1.7] text-muted-foreground sm:text-2xl xl:text-3xl">
            I design and ship scalable web apps with React, Next.js, and TypeScript, from internal business platforms to SEO-friendly public websites.
          </p>

          <button
            type="button"
            onClick={scrollToProjects}
            className="mt-7 inline-flex max-w-full items-center gap-3 rounded-full border border-foreground px-5 py-3 text-base text-foreground transition-opacity hover:opacity-70 sm:gap-4 sm:px-8 sm:py-4 sm:text-lg"
          >
            <span className="truncate">View Projects & Impact</span>
            <ArrowDownRight className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          </button>

          <div className="mt-10 flex flex-wrap items-center gap-7 text-foreground sm:gap-9">
            <a
              href="mailto:joshsmtpng19@gmail.com"
              className="transition-opacity hover:opacity-65"
              aria-label="Email"
            >
              <Mail className="h-8 w-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/josuasimatupang/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-65"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="https://github.com/boogerjosh"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-65"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
