import { useEffect, useState } from "react";
import { animate, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "motion/react";
import { profile } from "../data";
import { useMediaQuery } from "../hooks";

function Portrait() {
  const [failed, setFailed] = useState(false);
  if (!failed) {
    return (
      <img
        src={profile.photo}
        alt={profile.name}
        draggable={false}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    );
  }
  // Placeholder until public/profile.jpg exists.
  return (
    <svg viewBox="0 0 240 260" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="badge-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8a6dff" />
          <stop offset="1" stopColor="#1b1040" />
        </linearGradient>
      </defs>
      <rect width="240" height="260" fill="url(#badge-bg)" />
      {[110, 82, 54].map((r) => (
        <circle key={r} cx="120" cy="130" r={r} fill="none" stroke="#fff" strokeOpacity=".18" />
      ))}
      <path d="M120 70 170 130 120 190 70 130Z" fill="#fff" />
      <path d="M120 70 145 130 120 190 95 130Z" fill="#d9d1ff" />
    </svg>
  );
}

export default function Lanyard() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const rope = wide ? 190 : 90;
  const W = wide ? 272 : 224;
  const H = Math.round(W * 1.34);

  const x = useMotionValue(0);
  const y = useMotionValue(-480);
  const idle = useMotionValue(0);
  const ropeMV = useMotionValue(rope);
  const gx = useMotionValue(30);
  const gy = useMotionValue(20);

  useEffect(() => ropeMV.set(rope), [rope, ropeMV]);

  // Drop in with a bounce, then sway gently.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      y.set(0);
      return;
    }
    const drop = animate(y, 0, { type: "spring", stiffness: 70, damping: 7, delay: 0.5 });
    const sway = animate(idle, [-2.2, 2.2], { duration: 3.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" });
    return () => {
      drop.stop();
      sway.stop();
    };
  }, [y, idle]);

  const swing = useSpring(useTransform(x, [-260, 0, 260], [-18, 0, 18]), { stiffness: 90, damping: 9 });
  const rotate = useTransform([swing, idle], ([a, b]) => (a as number) + (b as number));

  const endY = useTransform([ropeMV, y], ([r, v]) => (r as number) + (v as number));
  const midY = useTransform(endY, (v) => v * 0.55);
  const d = useMotionTemplate`M0 0 Q 0 ${midY} ${x} ${endY}`;
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.65), transparent 55%)`;

  return (
    <div className="relative mx-auto" style={{ width: W, height: rope + H + 40 }}>
      {/* anchor plate */}
      <span className="absolute -top-1 left-1/2 h-2.5 w-16 -translate-x-1/2 rounded-b-md bg-line" />

      <svg className="absolute top-0 left-1/2 overflow-visible" width="1" height="1" aria-hidden>
        <motion.path d={d} fill="none" strokeWidth="16" className="stroke-surface-2" />
        <motion.path d={d} fill="none" strokeWidth="1.5" strokeDasharray="3 5" className="stroke-ink-3" />
      </svg>

      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.32}
        dragMomentum={false}
        transition={{ type: "spring", stiffness: 130, damping: 6 }}
        whileTap={{ cursor: "grabbing" }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          gx.set(((e.clientX - r.left) / r.width) * 100);
          gy.set(((e.clientY - r.top) / r.height) * 100);
        }}
        style={{ x, y, rotate, width: W, height: H, top: rope, transformOrigin: "50% 0%", touchAction: "none" }}
        className="absolute left-0 cursor-grab select-none"
      >
        {/* metal ring where the strap clips on */}
        <span className="absolute -top-3.5 left-1/2 z-20 h-7 w-7 -translate-x-1/2 rounded-full border-[3px] border-zinc-400 bg-zinc-200/10" />

        <div className="relative h-full overflow-hidden rounded-[22px] bg-[#f3f3f5] text-[#09090b] shadow-[0_40px_80px_-20px_rgba(0,0,0,.7),0_0_0_1px_rgba(255,255,255,.06)]">
          <div className="h-3.5 bg-accent" />
          <div className="absolute inset-x-0 top-3.5 bottom-0 overflow-hidden bg-zinc-200">
            <Portrait />
          </div>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 mix-blend-soft-light"
            style={{ background: glare }}
          />
        </div>
      </motion.div>
    </div>
  );
}
