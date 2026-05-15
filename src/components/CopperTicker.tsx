import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCopperMarket } from "@/hooks/useCopperMarket";
import { BME_COPPER } from "@/data/bmeBenchmark";

/**
 * Thin site-wide ticker showing live LME-comparable copper price
 * and a rotating headline. Rendered directly under Navigation.
 */
const CopperTicker = () => {
  const { data, isLoading, isError } = useCopperMarket();

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-foreground text-background text-xs tracking-wider uppercase py-2 px-6 flex items-center justify-center">
        <span className="opacity-60">Loading copper market data…</span>
      </div>
    );
  }

  if (isError || !data) {
    return null; // fail silent — don't break the page
  }

  const { price, news } = data;
  const up = price.change > 0;
  const down = price.change < 0;
  const TrendIcon = up ? TrendingUp : down ? TrendingDown : Minus;
  const trendClass = up ? "text-green-400" : down ? "text-rational-red" : "text-background/70";

  // Build a single ticker string of headlines
  const headlines = news.slice(0, 8).map((n) => n.title).join("   •   ");

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-foreground text-background text-xs tracking-wide py-2 border-b border-background/10 overflow-hidden shadow-md">
      <div className="flex items-center gap-4 px-4">
        {/* LME Price badge */}
        <div className="flex items-center gap-2 flex-shrink-0 font-medium">
          <span className="uppercase tracking-widest text-background/60">LME Cu</span>
          <span className="tabular-nums">${price.price.toLocaleString()}/t</span>
          <span className={`flex items-center gap-1 ${trendClass} tabular-nums`}>
            <TrendIcon className="w-3 h-3" />
            {price.change >= 0 ? "+" : ""}
            {price.change.toLocaleString()} ({price.changePct >= 0 ? "+" : ""}
            {price.changePct}%)
          </span>
        </div>

        <div className="w-px h-4 bg-background/20 flex-shrink-0" />

        {/* BME badge */}
        <div className="flex items-center gap-2 flex-shrink-0 font-medium">
          <span className="uppercase tracking-widest text-background/60">BME Cu Billet</span>
          <span className="tabular-nums">₹{BME_COPPER.pricePerKg.toLocaleString("en-IN")}/kg</span>
          <span className="hidden md:inline text-background/40 uppercase tracking-widest">
            {BME_COPPER.asOf}
          </span>
        </div>

        <div className="w-px h-4 bg-background/20 flex-shrink-0" />

        {/* Scrolling headlines */}
        <div className="flex-1 overflow-hidden">
          <div
            className="whitespace-nowrap inline-block animate-[marquee_60s_linear_infinite] text-background/80"
          >
            {headlines} &nbsp;•&nbsp; {headlines}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default CopperTicker;
