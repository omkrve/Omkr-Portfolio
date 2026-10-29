import { motion } from "motion/react";

const W = 170;
const H = 42;
const PITCH = 58;

// A small animated architecture sketch: nodes zig-zag down, packets flow between them.
export default function ArchMini({ nodes }: { nodes: string[] }) {
  const pos = nodes.map((_, i) => ({ x: i % 2 === 0 ? 14 : 216, y: 8 + i * PITCH }));
  const height = nodes.length * PITCH + 8;
  const links = pos.slice(0, -1).map((p, i) => {
    const q = pos[i + 1];
    const x1 = p.x + W / 2;
    const y1 = p.y + H;
    const x2 = q.x + W / 2;
    const y2 = q.y;
    const my = (y1 + y2) / 2;
    return `M${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
  });

  return (
    <svg viewBox={`0 0 400 ${height}`} className="h-auto w-full" role="img" aria-label={`Architecture: ${nodes.join(", ")}`}>
      {links.map((d, i) => (
        <g key={d} fill="none">
          <path d={d} className="stroke-line" strokeWidth="2" />
          <motion.path
            d={d}
            className="flow stroke-accent"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12 }}
          />
        </g>
      ))}
      {nodes.map((n, i) => (
        <motion.g
          key={n}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <rect x={pos[i].x} y={pos[i].y} width={W} height={H} rx="13" className="fill-surface-2 stroke-line" strokeWidth="1.5" />
          <circle cx={pos[i].x + 20} cy={pos[i].y + H / 2} r="4.5" className="fill-accent" />
          <text
            x={pos[i].x + 36}
            y={pos[i].y + H / 2 + 5}
            className="fill-ink"
            fontSize="15"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {n}
          </text>
        </motion.g>
      ))}
    </svg>
  );
}
