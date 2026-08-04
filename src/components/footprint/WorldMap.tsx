import { motion, useReducedMotion } from "framer-motion";
import { WORLD_PATH } from "./worldPath";

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
];

const VW = 1000;
const VH = 500;

const project = ([lon, lat]: [number, number]) => [
  ((lon + 180) / 360) * VW,
  ((90 - lat) / 180) * VH,
] as const;

/* Real country outlines (Natural Earth 110m), equirectangular 1000x500 */


type Props = {
  activeId: string | null;
  onHover: (id: string | null) => void;
};

const WorldMap = ({ activeId, onHover }: Props) => {
  const reduce = useReducedMotion();

  return (
    <div className="relative w-full">
      <svg
        viewBox="0 20 1000 415"
        className="h-auto w-full"
        role="img"
        aria-label="World map showing Rational Engineers manufacturing in India and a trading hub in Dubai"
      >
        <path
          d={WORLD_PATH}
          className="fill-muted-foreground/25 stroke-background"
          strokeWidth={0.6}
          fillRule="evenodd"
        />


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
