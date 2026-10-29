import { marquee } from "../data";

// Soft fade on the left and right edges.
const fade = "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)";

// How many times the list repeats inside one loop. Keep it high enough that one
// loop is wider than the screen, otherwise a blank gap shows on wide monitors.
const REPEAT = 4;

type Item = { label: string; mono?: boolean };

const cloud: Item[] = marquee.cloud.map((label) => ({ label, mono: true }));
const design: Item[] = marquee.design.map((label) => ({ label }));
// Same cloud skills, starting from the middle, so the third row looks different from the first.
const half = Math.ceil(cloud.length / 2);
const cloudShifted: Item[] = [...cloud.slice(half), ...cloud.slice(0, half)];

function Row({ items, reverse, dur }: { items: Item[]; reverse?: boolean; dur: string }) {
  const list = Array.from({ length: REPEAT }, () => items).flat();
  const group = (
    // Keep gap-* and pr-* the same number so the loop restarts without a jump.
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden>
      {list.map((it, i) => (
        <li
          key={`${it.label}-${i}`}
          className={`flex items-center gap-3 rounded-full border border-line bg-surface/70 py-3.5 pr-6 pl-5 text-xl whitespace-nowrap text-ink-2 transition-colors hover:border-accent hover:text-ink ${
            it.mono ? "font-mono" : ""
          }`}
        >
          <span className={`h-2.5 w-2.5 rounded-full ${it.mono ? "bg-accent" : "border-2 border-accent-ink"}`} />
          {it.label}
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden" style={{ ["--dur" as string]: dur }}>
      <div className={`marquee-track ${reverse ? "reverse" : ""}`}>
        {group}
        {group}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    // pt-* / pb-* set the space above and below. On desktop the top space already comes from the hero above.
    <section aria-label="Skills" className="relative z-10 pt-10 pb-10 md:pt-4 md:pb-8">
      <p className="sr-only">{[...marquee.cloud, ...marquee.design].join(", ")}</p>
      {/* space-y-* is the gap between the rows */}
      <div className="space-y-4" style={{ maskImage: fade, WebkitMaskImage: fade }}>
        <Row items={cloud} dur="150s" />
        <Row items={design} reverse dur="130s" />
        <Row items={cloudShifted} dur="155s" />
      </div>
    </section>
  );
}