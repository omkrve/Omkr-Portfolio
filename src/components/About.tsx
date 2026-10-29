import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { about } from "../data";
import MaskText from "./MaskText";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span style={{ opacity }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

// Each word lights up as the paragraph scrolls through the viewport.
function ScrollWords({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} aria-label={text} className="text-[clamp(1.6rem,3.5vw,2.9rem)] leading-[1.18] font-medium tracking-[-0.03em]">
      {words.map((w, i) => (
        <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {w}
        </Word>
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="pt-12 pb-32 md:pb-44">
      <div className="shell">
        <MaskText className="display text-[clamp(2.5rem,6.5vw,5rem)]">Two sides, one desk</MaskText>

        <div className="mt-10 md:mt-16">
          <ScrollWords text={about.statement} />
        </div>

        <div className="mt-16 grid gap-12 border-t border-line pt-10 sm:grid-cols-2 md:mt-24">
          <div>
            <h3 className="text-sm font-medium text-ink-3">Cloud and DevOps</h3>
            <ul className="mt-4 flex flex-wrap gap-2 font-mono text-[13px]">
              {about.cloud.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 transition-colors hover:border-accent hover:text-accent-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-3">Design</h3>
            <ul className="mt-4 flex flex-wrap gap-2 text-[14px]">
              {about.design.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-1.5 transition-colors hover:border-accent hover:text-accent-ink"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
