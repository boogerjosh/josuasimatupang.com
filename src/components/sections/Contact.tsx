import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-24">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-sm font-mono text-primary mb-2">Contact</h2>
          <div className="w-12 h-px bg-primary mb-8 mx-auto" />
          <h3 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4">
            Let's connect
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            I'm always open to new opportunities, collaborations, or just a friendly chat about
            web development. Feel free to reach out.
          </p>
          <a
            href="mailto:josuasimatupang6@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Mail size={16} />
            Say Hello
          </a>
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://github.com/josuasimatupang"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/josua-simatupang"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
