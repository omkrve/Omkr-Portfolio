import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, Plus, X } from "lucide-react";
import { designProjects, type DesignProject } from "../data";
import CoverArt from "./CoverArt";
import MaskText from "./MaskText";

function Media({ p }: { p: DesignProject }) {
  const [failed, setFailed] = useState(false);

  if (p.kind === "pdf") {
    return (
      <object
        data={`${p.file}#view=FitH`}
        type="application/pdf"
        className="h-[68vh] w-[min(92vw,900px)] bg-white"
        aria-label={p.title}
      >
        <a href={p.file} className="p-6 text-white underline">
          Open the PDF
        </a>
      </object>
    );
  }

  if (failed) {
    return (
      <div className="relative aspect-[4/5] h-[62vh] max-h-[640px]">
        <CoverArt art={p.art} title={p.title} />
        <p className="absolute inset-x-0 bottom-0 bg-black/60 px-4 py-3 text-center font-mono text-xs text-white/80">
          Placeholder. Add your file at public{p.file}
        </p>
      </div>
    );
  }

  return (
    <img
      src={p.file}
      alt={`${p.title}: ${p.discipline}`}
      onError={() => setFailed(true)}
      className="max-h-[68vh] w-auto max-w-[92vw] object-contain"
    />
  );
}

function Lightbox({ p, onClose }: { p: DesignProject; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-xl"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="fixed top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25"
      >
        <X size={20} />
      </button>

      <div onClick={(e) => e.stopPropagation()} className="flex max-w-full flex-col items-center gap-5 py-10">
        <motion.div
          layoutId={`cover-${p.slug}`}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className="relative overflow-hidden bg-surface-2 shadow-2xl"
          style={{ borderRadius: 24 }}
        >
          <Media p={p} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.1 } }}
          className="flex w-[min(92vw,900px)] flex-col gap-3 text-white sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
            <p className="mt-1 text-[15px] text-white/60">{p.summary}</p>
          </div>
          <a
            href={p.file}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-white/15 px-4 py-2.5 text-sm font-medium backdrop-blur transition-colors hover:bg-white/25 sm:self-auto"
          >
            Open file
            <ArrowUpRight size={15} />
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Tile({ p, offset, onOpen }: { p: DesignProject; offset: boolean; onOpen: () => void }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  // Observe the frame, not the clipped child: an element fully hidden by its own clip-path never counts as visible.
  const frameRef = useRef<HTMLDivElement>(null);
  const revealed = useInView(frameRef, { once: true, margin: "0px 0px -12% 0px" });
  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 180, damping: 18 });

  return (
    <li className={offset ? "md:mt-24" : ""} style={{ perspective: 1000 }}>
      <motion.button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${p.title}`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width);
          my.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          mx.set(0.5);
          my.set(0.5);
        }}
        className="group block w-full text-left"
      >
        <motion.div
          ref={frameRef}
          layoutId={`cover-${p.slug}`}
          transition={{ type: "spring", stiffness: 260, damping: 32 }}
          className="relative aspect-[4/5] w-full overflow-hidden bg-surface-2"
          style={{ borderRadius: 28 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.15 }}
            animate={revealed ? { clipPath: "inset(0% 0 0 0)", scale: 1 } : undefined}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
         <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.05]">
           <img src={p.file}
             alt={`${p.title}: ${p.discipline}`}
              className="h-full w-full object-cover object-center"
               />
             </div>
          </motion.div>
          <span className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-black shadow-lg backdrop-blur transition-transform duration-300 group-hover:rotate-90">
            <Plus size={20} />
          </span>
        </motion.div>
        <div className="mt-4 flex items-baseline justify-between gap-4 px-1">
          <h3 className="text-xl font-semibold tracking-tight">{p.title}</h3>
          <p className="text-right text-sm text-ink-3">{p.discipline}</p>
        </div>
      </motion.button>
    </li>
  );
}

export default function DesignWork() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const active = designProjects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <section id="design" className="py-24 md:py-36">
      <div className="shell">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <MaskText className="display text-[clamp(2.5rem,6.5vw,5rem)]">Design work</MaskText>
          <p className="max-w-[34ch] text-lg leading-snug text-ink-2">
            Brands and campaigns for small businesses. Open a piece to see the full file.
          </p>
        </div>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:mt-20 md:grid-cols-2">
          {designProjects.map((p, i) => (
            <Tile key={p.slug} p={p} offset={i % 2 === 1} onOpen={() => setActiveSlug(p.slug)} />
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {active && <Lightbox key={active.slug} p={active} onClose={() => setActiveSlug(null)} />}
      </AnimatePresence>
    </section>
  );
}
