import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Bio", id: "about" },
  { label: "Career", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

const NAV_SCROLL_OFFSET = 112;

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(storedTheme ? storedTheme === "dark" : prefersDark);
  }, []);

  useEffect(() => {
    const updateNavbarState = () => {
      setScrolled(window.scrollY > 20);

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

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavClick = (sectionId: string) => {
    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    window.history.replaceState(null, "", `#${sectionId}`);
    window.scrollTo({
      top: Math.max(0, section.offsetTop - NAV_SCROLL_OFFSET),
      behavior: "smooth",
    });
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3 sm:hidden">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-semibold tracking-tight text-foreground"
          >
            js<span className="text-primary">.</span>
          </a>
        </div>
        <a
          href="#"
          className="hidden text-lg font-semibold tracking-tight text-foreground sm:block"
        >
          js<span className="text-primary">.</span>
        </a>
        <div className="hidden flex-1 items-center justify-center sm:flex sm:flex-none">
          <div
            className={`relative flex w-full max-w-xl items-center rounded-full border px-1.5 py-1.5 shadow-[0_18px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 sm:w-auto ${scrolled
              ? "border-border/80 bg-background/80"
              : "border-border/60 bg-background/72"
              }`}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className="relative flex-1 rounded-full px-4 py-3 text-sm font-medium text-muted-foreground transition-[color,transform] duration-300 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:flex-none sm:px-7"
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                {activeSection === item.id ? (
                  <motion.span
                    layoutId="navbar-active-pill"
                    transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.9 }}
                    className="absolute inset-0 rounded-full border border-border/80 bg-background shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_10px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_26px_rgba(0,0,0,0.36)]"
                  />
                ) : null}
                <span
                  className={`relative z-10 transition-colors duration-300 ${activeSection === item.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 sm:min-w-[4rem]">
          <button
            onClick={() => setIsDark(!isDark)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/78 text-muted-foreground shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/78 text-muted-foreground shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-panel"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 top-full h-screen bg-background/35 backdrop-blur-[2px] sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu overlay"
            />
            <motion.div
              id="mobile-navigation-panel"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mx-4 mt-1 rounded-[28px] border border-border/70 bg-background/88 p-3 shadow-[0_24px_70px_rgba(15,23,42,0.18)] backdrop-blur-xl sm:hidden"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavClick(item.id)}
                    className="relative flex w-full items-center justify-between overflow-hidden rounded-[22px] px-4 py-4 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-current={activeSection === item.id ? "page" : undefined}
                  >
                    {activeSection === item.id ? (
                      <motion.span
                        layoutId="mobile-navbar-active-pill"
                        transition={{ type: "spring", stiffness: 360, damping: 32, mass: 0.9 }}
                        className="absolute inset-0 rounded-[22px] border border-border/80 bg-card shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_10px_24px_rgba(15,23,42,0.12)] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_12px_26px_rgba(0,0,0,0.36)]"
                      />
                    ) : null}
                    <span className="relative z-10 text-base font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="relative z-10 text-sm text-muted-foreground">
                      0{navItems.findIndex((navItem) => navItem.id === item.id) + 1}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
