import { useEffect, useState } from "react";

const navItems = [
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const NAV_SCROLL_OFFSET = 112;

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
    <nav className="relative px-8 pb-4 pt-6 sm:pt-8">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-4 sm:flex-nowrap sm:gap-x-0">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="shrink-0 text-lg font-normal leading-none text-foreground transition-opacity hover:opacity-65 sm:text-xl md:text-2xl"
        >
          I'm Josua
        </button>
        <span className="hidden w-[54px] border-t border-[#ededed] sm:mx-4 sm:block md:mx-5" />

        <div className="flex min-w-0 flex-wrap items-center gap-x-5 gap-y-3 sm:flex-nowrap sm:gap-x-7 md:gap-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`shrink-0 text-lg font-normal leading-none text-foreground transition-opacity hover:opacity-65 sm:text-xl md:text-2xl ${activeSection === item.id ? "opacity-100" : "opacity-78"
              }`}
              aria-current={activeSection === item.id ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
