import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { greetings, profile } from "../data";

// Split into user-perceived characters so Devanagari and Japanese type out cleanly.
const segment = (s: string): string[] =>
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s), (x) => x.segment)
    : Array.from(s);

const words = greetings.map((g) => ({ ...g, chars: segment(g.text) }));

const TYPE_MS = 110;
const HOLD_MS = 1500;
const DELETE_MS = 55;
const GAP_MS = 280;

function Wave() {
  return (
    <motion.span
      aria-hidden
      className="inline-block origin-[70%_70%]"
      animate={{ rotate: [0, 16, -8, 16, -4, 12, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
    >
      👋
    </motion.span>
  );
}

export default function Greeting() {
  const [reduce] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [w, setW] = useState(0);
  const [n, setN] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const current = words[w];
  const len = current.chars.length;

  // Type the word, hold it, delete it, then move to the next language.
  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setW((v) => (v + 1) % words.length), 2600);
      return () => clearTimeout(t);
    }

    let delay: number;
    if (!deleting && n < len) delay = TYPE_MS;
    else if (!deleting) delay = HOLD_MS;
    else if (n > 0) delay = DELETE_MS;
    else delay = GAP_MS;

    const t = setTimeout(() => {
      if (!deleting && n < len) setN(n + 1);
      else if (!deleting) setDeleting(true);
      else if (n > 0) setN(n - 1);
      else {
        setDeleting(false);
        setW((v) => (v + 1) % words.length);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [w, n, deleting, len, reduce]);

  const shown = reduce ? len : n;

  return (
    <h1
      aria-label={`Hello, I'm ${profile.name}`}
      className="display text-[clamp(2.6rem,7.2vw,5.75rem)]"
    >
      <span aria-hidden className="flex min-h-[1.25em] items-center text-ink-3">
        <span lang={current.lang} className="whitespace-pre">
          {current.chars.slice(0, shown).join("")}
        </span>
        <span className="caret ml-[0.07em] inline-block h-[0.8em] w-[0.055em] rounded-[1px] bg-accent" />
      </span>
      <span aria-hidden className="block whitespace-nowrap">
        I'm {profile.name} <Wave />
      </span>
    </h1>
  );
}
