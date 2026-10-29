import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cloudProjects, type CloudProject } from "../data";
import { GithubIcon } from "./Icons";
import ArchMini from "./ArchMini";
import MaskText from "./MaskText";

function Card({
  p,
  i,
  n,
  progress,
}: {
  p: CloudProject;
  i: number;
  n: number;
  progress: MotionValue<number>;
}) {
  // Cards underneath shrink slightly as the next one slides over them.
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.045]);

  return (
    <div className="sticky mb-8 last:mb-0" style={{ top: `calc(5.5rem + ${i} * 1.1rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: "50% 0%" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
          e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
        }}
        className="group relative overflow-hidden rounded-[28px] border border-line bg-surface p-6 md:p-10"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--accent) 20%, transparent), transparent 62%)",
          }}
        />
        <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col md:col-span-6">
            <p className="font-mono text-sm text-ink-3">
              {p.year}
              {p.status ? `, ${p.status}` : ""}
            </p>
            <h3 className="display mt-3 text-[clamp(2rem,4.4vw,3.5rem)]">{p.title}</h3>
            <p className="mt-4 max-w-[46ch] text-[17px] leading-relaxed text-ink-2">{p.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-ink-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full border border-line bg-surface-2 px-3 py-1.5">
                  {s}
                </li>
              ))}
            </ul>
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${p.title}, view code on GitHub`}
              className="group/btn mt-8 inline-flex w-fit items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-[15px] font-medium text-bg transition-transform active:scale-[0.97] md:mt-auto"
            >
              <GithubIcon className="h-[18px] w-[18px]" />
              View on GitHub
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>

          <div className="rounded-2xl border border-line bg-bg/60 p-4 md:col-span-6 md:p-6">
            <ArchMini nodes={p.flow} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function CloudWork() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end end"] });
  const n = cloudProjects.length;

  return (
    <section id="cloud" className="py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <MaskText className="display text-[clamp(2.5rem,6.5vw,5rem)]">Cloud projects</MaskText>
          <p className="max-w-[34ch] text-lg leading-snug text-ink-2">
            Infrastructure, pipelines and the apps on top. Every one links to its code.
          </p>
        </div>

        <div ref={ref} className="mt-12 pb-4 md:mt-16">
          {cloudProjects.map((p, i) => (
            <Card key={p.title} p={p} i={i} n={n} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  );
}
