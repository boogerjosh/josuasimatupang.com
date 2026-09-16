import { ArrowUp } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/70 px-6 py-6 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-medium text-foreground motion-reduce-safe-opacity transition-opacity hover:opacity-65"
        >
          I'm Josua
        </button>

        <p>© {new Date().getFullYear()} Josua Simatupang. All rights reserved.</p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 font-medium text-foreground motion-reduce-safe-opacity transition-opacity hover:opacity-65"
        >
          Back to Top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
