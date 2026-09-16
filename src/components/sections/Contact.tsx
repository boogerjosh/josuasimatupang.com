import { ArrowUpRight, Mail } from "lucide-react";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
);
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

const Contact = () => {
  return (
    <section
      id="contact"
      className="px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto h-16 w-16 overflow-hidden rounded-full border border-border/70 bg-[#141414]">
          <img
            src="/favicon.ico"
            alt="Portrait of Josua Simatupang"
            className="h-full w-full object-cover object-[50%_45%]"
          />
        </div>

        <h2 className="mt-8 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Let's build something <span className="heading-em">useful.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
          I'm open to frontend engineering opportunities, product collaborations, and conversations
          around scalable web platforms, AI-assisted workflows, and performance-focused UX.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="mailto:joshsmtpng19@gmail.com"
            className="pill-button pill-button--solid"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            Say Hello
          </a>

          <a
            href="https://www.linkedin.com/in/josuasimatupang/"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-button"
          >
            Connect on LinkedIn
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-5">
          <a
            href="https://github.com/boogerjosh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground motion-reduce-safe-colors transition-[color,border-color] duration-150 ease-out hover:border-foreground/40 hover:text-foreground"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href="https://www.linkedin.com/in/josuasimatupang/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground motion-reduce-safe-colors transition-[color,border-color] duration-150 ease-out hover:border-foreground/40 hover:text-foreground"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
