import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24">
      <div className="max-w-3xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-sm font-mono text-primary mb-2">About</h2>
          <div className="w-12 h-px bg-primary mb-8" />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a frontend engineer based in Jakarta with a unique path — I started in{" "}
              <span className="text-foreground">Civil Engineering</span> at Institut Teknologi Bandung
              before discovering my passion for building on the web.
            </p>
            <p>
              Today, I work at{" "}
              <span className="text-foreground font-medium">Synergy Financial Advisers</span>, where I
              lead frontend development for web applications that serve financial planning needs. I care
              deeply about clean code, great user experiences, and shipping things that matter.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new technologies, contributing to side
              projects, or thinking about how to make the web a little better.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
