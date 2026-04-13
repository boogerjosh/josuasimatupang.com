import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-[85vh] flex items-center">
      <div className="max-w-3xl mx-auto px-6 py-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-primary font-mono text-sm mb-4"
        >
          Hi, I'm
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-tight"
        >
          Josua Simatupang
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl sm:text-2xl text-muted-foreground mt-3 font-light"
        >
          Frontend Engineer
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground mt-6 max-w-lg leading-relaxed"
        >
          I build thoughtful, performant web experiences with modern tools.
          Currently crafting interfaces at{" "}
          <span className="text-foreground font-medium">Synergy Financial Advisers</span>.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-4 mt-8"
        >
          <a
            href="https://github.com/josuasimatupang"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/josua-simatupang"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="mailto:josuasimatupang6@gmail.com"
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="Email"
          >
            <Mail size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
