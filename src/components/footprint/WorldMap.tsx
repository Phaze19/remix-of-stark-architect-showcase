import { motion, useReducedMotion } from "framer-motion";

export type FootprintPin = {
  id: string;
  label: string;
  sub?: string;
  /** [longitude, latitude] */
  coords: [number, number];
  kind: "manufacturing" | "presence";
  /** label anchor offset in viewBox units */
  labelOffset: [number, number];
  labelAlign?: "start" | "end";
};

export const pins: FootprintPin[] = [
  {
    id: "india",
    label: "Rational Engineers Limited",
    sub: "India — Manufacturing",
    coords: [73, 19.2],
    kind: "manufacturing",
    labelOffset: [10, 96],
    labelAlign: "start",
  },
  {
    id: "dubai",
    label: "REL Metal Trading Co",
    sub: "Dubai",
    coords: [55, 25],
    kind: "presence",
    labelOffset: [-130, -6],
    labelAlign: "end",
  },
  {
    id: "germany",
    label: "Germany",
    sub: "Warehousing",
    coords: [10, 51],
    kind: "presence",
    labelOffset: [-120, -10],
    labelAlign: "end",
  },
];

const VW = 1000;
const VH = 500;

const project = ([lon, lat]: [number, number]) => [
  ((lon + 180) / 360) * VW,
  ((90 - lat) / 180) * VH,
] as const;

/* Stylised low-detail continent silhouettes (equirectangular, 1000x500) */
const CONTINENTS = [
  // North America
  "M120 70 L215 62 L268 78 L262 105 L288 112 L272 140 L238 150 L226 178 L204 196 L186 178 L172 150 L150 138 L128 112 L112 92 Z",
  // Greenland
  "M300 40 L342 34 L356 58 L336 82 L306 72 Z",
  // Central America
  "M226 196 L252 206 L268 226 L256 236 L236 216 Z",
  // South America
  "M282 232 L318 226 L336 254 L330 296 L314 340 L296 378 L280 396 L268 372 L266 330 L272 292 L266 262 Z",
  // Africa
  "M470 178 L520 168 L556 176 L570 200 L562 232 L548 262 L534 300 L516 336 L500 350 L486 330 L482 296 L470 262 L458 226 L462 198 Z",
  // Europe
  "M470 96 L512 86 L546 92 L556 112 L536 132 L506 142 L482 136 L466 118 Z",
  // Middle East
  "M566 150 L612 146 L640 160 L664 180 L648 200 L616 196 L586 178 Z",
  // Russia / North Asia
  "M556 66 L660 56 L760 60 L840 70 L890 86 L866 108 L800 118 L730 112 L666 118 L606 112 L570 96 Z",
  // South Asia
  "M660 170 L706 166 L724 182 L716 206 L700 224 L686 206 L668 188 Z",
  // East Asia
  "M730 122 L800 126 L836 142 L842 168 L812 186 L772 182 L740 162 Z",
  // SE Asia islands
  "M796 200 L836 206 L862 220 L840 236 L804 228 L788 214 Z",
  // Australia
  "M840 300 L900 292 L932 308 L928 344 L896 360 L858 348 L836 326 Z",
  // New Zealand
  "M950 350 L968 344 L974 366 L956 374 Z",
];

type Props = {
  activeId: string | null;
  onHover: (id: string | null) => void;
};

const WorldMap = ({ activeId, onHover }: Props) => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="h-auto w-full"
        role="img"
        aria-label="World map showing Rational Engineers manufacturing in India, a trading hub in Dubai and a warehouse in Germany"
      >
        <g className="fill-muted-foreground/25">
          {CONTINENTS.map((d, i) => (
            <path key={i} d={d} className="stroke-background" strokeWidth={1.5} />
          ))}
        </g>

        {pins.map((pin, i) => {
          const [x, y] = project(pin.coords);
          const [ox, oy] = pin.labelOffset;
          const lx = x + ox;
          const ly = y + oy;
          const isActive = activeId === pin.id;
          const isManu = pin.kind === "manufacturing";
          const colorClass = isManu ? "fill-rational-red" : "fill-foreground";
          const strokeClass = isManu ? "stroke-rational-red" : "stroke-foreground";

          return (
            <motion.g
              key={pin.id}
              tabIndex={0}
              role="button"
              aria-label={`${pin.label}${pin.sub ? `, ${pin.sub}` : ""}`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => onHover(pin.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(pin.id)}
              onBlur={() => onHover(null)}
              initial={reduce ? undefined : { opacity: 0, y: -16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.18, ease: "easeOut" }}
            >
              {/* connector */}
              <motion.path
                d={`M ${lx} ${ly} L ${x} ${ly} L ${x} ${y}`}
                fill="none"
                className={strokeClass}
                strokeWidth={2}
                strokeDasharray="7 7"
                strokeLinecap="round"
                opacity={isActive ? 1 : 0.55}
                initial={reduce ? undefined : { pathLength: 0 }}
                whileInView={reduce ? undefined : { pathLength: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.18, ease: "easeInOut" }}
              />
              <circle cx={lx} cy={ly} r={7} className={`${colorClass}`} />
              <circle cx={lx} cy={ly} r={3} className="fill-background" />

              {/* pulse ring */}
              {!reduce && (
                <circle
                  cx={x}
                  cy={y - 22}
                  r={14}
                  className={strokeClass}
                  fill="none"
                  strokeWidth={1.5}
                  opacity={isActive ? 0.5 : 0.22}
                >
                  <animate
                    attributeName="r"
                    values="10;22;10"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.45;0;0.45"
                    dur="2.6s"
                    repeatCount="indefinite"
                  />
                </circle>
              )}

              {/* map pin */}
              <g
                transform={`translate(${x} ${y}) scale(${isActive ? 1.25 : 1}) translate(${-x} ${-y})`}
                style={{ transition: "transform 200ms ease-out" }}
              >
                <path
                  d={`M ${x} ${y} C ${x - 16} ${y - 20}, ${x - 15} ${y - 44}, ${x} ${y - 44} C ${x + 15} ${y - 44}, ${x + 16} ${y - 20}, ${x} ${y} Z`}
                  className={colorClass}
                />
                <circle cx={x} cy={y - 29} r={6} className="fill-background" />
              </g>

              {/* label */}
              <text
                x={pin.labelAlign === "end" ? lx - 14 : lx + 14}
                y={ly - 6}
                textAnchor={pin.labelAlign === "end" ? "end" : "start"}
                className={`hidden fill-foreground text-[15px] font-bold uppercase tracking-[0.08em] sm:block`}
              >
                {pin.label}
              </text>
              <text
                x={pin.labelAlign === "end" ? lx - 14 : lx + 14}
                y={ly + 14}
                textAnchor={pin.labelAlign === "end" ? "end" : "start"}
                className="hidden fill-rational-red text-[13px] font-bold uppercase tracking-[0.14em] sm:block"
              >
                {pin.sub}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          <svg viewBox="0 0 20 26" className="h-5 w-4 fill-rational-red" aria-hidden>
            <path d="M10 26 C0 12 0.5 0 10 0 C19.5 0 20 12 10 26 Z" />
            <circle cx="10" cy="9" r="3.6" className="fill-background" />
          </svg>
          Manufacturing Footprints
        </span>
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          <svg viewBox="0 0 20 26" className="h-5 w-4 fill-foreground" aria-hidden>
            <path d="M10 26 C0 12 0.5 0 10 0 C19.5 0 20 12 10 26 Z" />
            <circle cx="10" cy="9" r="3.6" className="fill-background" />
          </svg>
          Global Presence
        </span>
      </div>
    </div>
  );
};

export default WorldMap;
