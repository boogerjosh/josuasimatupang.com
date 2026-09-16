import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const NAV_SCROLL_OFFSET = 96;

const Navbar = () => {
  const [activeSection, setActiveSection] = useState(navItems[0].id);

  useEffect(() => {
    const updateNavbarState = () => {
      const probeLine = window.scrollY + window.innerHeight * 0.35;
      let currentSection = navItems[0].id;

      for (const item of navItems) {
        const section = document.getElementById(item.id);

        if (section && probeLine >= section.offsetTop - NAV_SCROLL_OFFSET) {
          currentSection = item.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveSection(sectionId);
    window.scrollTo({
      top: Math.max(0, section.offsetTop - NAV_SCROLL_OFFSET),
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 px-6 py-3.5 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0 text-sm font-medium leading-none text-foreground motion-reduce-safe-opacity transition-opacity hover:opacity-65"
        >
          I'm Josua
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`text-sm leading-none text-foreground motion-reduce-safe-opacity transition-opacity hover:opacity-65 ${
                activeSection === item.id ? "opacity-100" : "opacity-60"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => handleNavClick("contact")}
          className="pill-button hidden shrink-0 md:inline-flex"
        >
          Let's connect
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="-mx-1 flex items-center gap-5 overflow-x-auto px-6 pb-3 sm:px-8 md:hidden">
        {navItems.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleNavClick(item.id)}
            className={`shrink-0 text-sm leading-none text-foreground motion-reduce-safe-opacity transition-opacity hover:opacity-65 ${
              activeSection === item.id ? "opacity-100" : "opacity-55"
            }`}
            aria-current={activeSection === item.id ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
