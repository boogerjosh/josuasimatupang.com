import { ArrowDownRight, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
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
    width="18"
    height="18"
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

const socialLinks = [
  { href: "mailto:joshsmtpng19@gmail.com", label: "Email", icon: <Mail className="h-[18px] w-[18px]" /> },
  { href: "https://www.linkedin.com/in/josuasimatupang/", label: "LinkedIn", icon: <LinkedInIcon /> },
  { href: "https://github.com/boogerjosh", label: "GitHub", icon: <GithubIcon /> },
];

const scrollToProjects = () => {
  const section = document.getElementById("projects");

  if (!section) {
    return;
  }

  window.history.replaceState(null, "", "#projects");
  window.scrollTo({
    top: Math.max(0, section.offsetTop - 96),
    behavior: "smooth",
  });
};

const Hero = () => {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
        <div className="min-w-0">
          <h1 className="hero-name text-left">
            <span className="hero-name-leading block">Hi, I'm Josua Simatupang</span>
            <span className="mt-5 block text-[0.4em] italic leading-[1.3] text-foreground/80">
              Frontend Engineer.
            </span>
          </h1>
        </div>

        <div className="w-full max-w-md lg:max-w-none">
          <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            I build for the web, with a focus on the details that make products
            feel good to use: clear interfaces, solid performance, and code
            that remains easy to work with as the product grows.
          </p>

          <button
            type="button"
            onClick={scrollToProjects}
            className="pill-button pill-button--solid mt-7"
          >
            See my work
            <ArrowDownRight className="h-4 w-4 shrink-0" aria-hidden="true" />
          </button>

          <div className="mt-9 flex items-center gap-5 border-t border-border/70 pt-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={link.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground motion-reduce-safe-opacity transition-[color,border-color,background-color] duration-150 ease-out hover:border-foreground/40 hover:text-foreground"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
