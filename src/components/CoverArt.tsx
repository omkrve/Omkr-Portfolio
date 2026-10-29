import type { DesignProject } from "../data";

const sans = { fontFamily: "var(--font-sans)" } as const;

const bg: Record<DesignProject["art"], string> = {
  gold: "#3a0f17",
  wash: "#e6f2ff",
  juice: "#ffb21a",
  gem: "#0b0716",
};

// Stand-in covers. Replace by dropping real files into public/work/ (see data.ts).
// The artwork scales to fit (never crops) and the flat background fills any extra space.
export default function CoverArt({ art, title }: { art: DesignProject["art"]; title: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: bg[art] }}>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 h-full w-full overflow-visible"
        role="img"
        aria-label={`${title} placeholder cover`}
      >
        {art === "gold" && (
          <>
            {[150, 115, 80, 45].map((r, i) => (
              <circle key={r} cx="200" cy="215" r={r} fill="none" stroke="#d9b26f" strokeWidth="1.5" opacity={0.35 + i * 0.2} />
            ))}
            <path d="M200 160 245 215 200 270 155 215Z" fill="#d9b26f" />
            <path d="M200 160 222 215 200 270 178 215Z" fill="#f1d9a4" />
            <text x="200" y="440" textAnchor="middle" fontSize="34" fontWeight="600" letterSpacing="-1" fill="#e9c98a" style={sans}>
              {title}
            </text>
          </>
        )}
        {art === "wash" && (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M-800 ${240 + i * 34} C -720 ${200 + i * 34}, -660 ${280 + i * 34}, -580 ${240 + i * 34} S -440 ${200 + i * 34}, -360 ${240 + i * 34} S -220 ${280 + i * 34}, -140 ${240 + i * 34} S 0 ${200 + i * 34}, 80 ${240 + i * 34} S 220 ${280 + i * 34}, 300 ${240 + i * 34} S 440 ${200 + i * 34}, 520 ${240 + i * 34} S 660 ${280 + i * 34}, 740 ${240 + i * 34} S 880 ${200 + i * 34}, 960 ${240 + i * 34} S 1100 ${280 + i * 34}, 1200 ${240 + i * 34}`}
                fill="none"
                stroke="#1d6bff"
                strokeWidth="3"
                opacity={1 - i * 0.17}
              />
            ))}
            <circle cx="290" cy="130" r="38" fill="#ffffff" stroke="#1d6bff" strokeWidth="3" />
            <circle cx="130" cy="170" r="20" fill="#ffffff" stroke="#1d6bff" strokeWidth="3" />
            <text x="200" y="450" textAnchor="middle" fontSize="64" fontWeight="600" letterSpacing="-3" fill="#0b3fa8" style={sans}>
              {title}
            </text>
          </>
        )}
        {art === "juice" && (
          <>
            <circle cx="200" cy="215" r="125" fill="#ff6a2b" />
            <circle cx="200" cy="215" r="104" fill="#fff3d6" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path
                key={i}
                d="M200 215 L200 118 A97 97 0 0 1 268.6 146.4 Z"
                transform={`rotate(${i * 45} 200 215)`}
                fill={i % 2 ? "#ff8a3d" : "#ff6a2b"}
              />
            ))}
            <circle cx="335" cy="95" r="26" fill="#ff3d7f" />
            <circle cx="75" cy="360" r="18" fill="#7ac943" />
            <text x="200" y="440" textAnchor="middle" fontSize="54" fontWeight="700" letterSpacing="-2" fill="#3a1500" style={sans}>
              {title}
            </text>
          </>
        )}
        {art === "gem" && (
          <>
            <circle cx="200" cy="210" r="140" fill="#8b5cf6" opacity=".18" />
            <polygon points="200,100 290,210 200,320 110,210" fill="#e8e6ff" />
            <polygon points="200,100 290,210 200,210" fill="#c9c3ff" />
            <polygon points="200,100 110,210 200,210" fill="#f4f2ff" />
            <polygon points="110,210 200,210 200,320" fill="#9b8cf0" />
            <polygon points="290,210 200,210 200,320" fill="#7c6be0" />
            <text x="200" y="430" textAnchor="middle" fontSize="40" fontWeight="600" letterSpacing="-1.5" fill="#e8e6ff" style={sans}>
              {title.split(" ")[0]}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
