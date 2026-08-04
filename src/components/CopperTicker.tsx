import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCopperMarket } from "@/hooks/useCopperMarket";

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

  const { price } = data;
  const up = price.change > 0;
  const down = price.change < 0;
  const TrendIcon = up ? TrendingUp : down ? TrendingDown : Minus;
  const trendClass = up ? "text-green-400" : down ? "text-rational-red" : "text-background/70";

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] w-full bg-foreground text-background text-sm tracking-wide py-3 border-b border-background/10 overflow-hidden shadow-md">
      <div className="flex items-center justify-center gap-2.5 px-4 font-semibold">
        <span className="uppercase tracking-widest text-background/60 text-xs">LME Cu</span>
        <span className="tabular-nums text-base">${price.price.toLocaleString()}/t</span>
        <span className={`flex items-center gap-1 ${trendClass} tabular-nums text-sm`}>
          <TrendIcon className="w-4 h-4" />
          {price.change >= 0 ? "+" : ""}
          {price.change.toLocaleString()} ({price.changePct >= 0 ? "+" : ""}
          {price.changePct}%)
        </span>
      </div>
    </div>
  );
};

export default CopperTicker;
