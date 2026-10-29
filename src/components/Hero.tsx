import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { profile } from "../data";
import Greeting from "./Greeting";
import Lanyard from "./Lanyard";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  return (
    <section id="top" className="relative min-h-svh">
      <div className="shell grid min-h-svh items-center gap-6 pt-28 pb-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-10 lg:py-0">
        <div>
          <motion.div
            {...rise(0.1)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1.5 pr-3.5 pl-3 text-sm text-ink-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {profile.availability}
          </motion.div>

          <motion.div {...rise(0.2)} className="mt-6">
            <Greeting />
          </motion.div>

          <motion.p {...rise(0.35)} className="mt-3 text-[clamp(1.4rem,2.8vw,2.25rem)] tracking-tight text-ink-2">
            {profile.role}
          </motion.p>

          <motion.p {...rise(0.45)} className="mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-2">
            {profile.intro}
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-9 flex flex-wrap gap-3">
            <Magnetic>
              <Link
                to="/resume"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-ink/30"
              >
                View resume
                <ArrowUpRight size={16} />
              </Link>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-2 px-6 py-3.5 text-[15px] font-medium transition-colors hover:border-ink/30"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                Let's connect
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <div className="relative lg:self-stretch">
          <Lanyard />
        </div>
      </div>
    </section>
  );
}
