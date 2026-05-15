import { TrendingUp, TrendingDown, Minus, ExternalLink, RefreshCw, Activity, Timer, Landmark } from "lucide-react";
import { useCopperMarket, COPPER_REFRESH_MS } from "@/hooks/useCopperMarket";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";
import { BME_COPPER } from "@/data/bmeBenchmark";

/**
 * MarketPulse
 * Homepage section showing live copper price card + copper news headlines.
 * Auto-refreshes on an interval; a visible countdown shows next refresh.
 */
const MarketPulse = () => {
  const { data, isLoading, isError, refetch, isFetching, dataUpdatedAt } = useCopperMarket();

  return (
    <section className="py-24 bg-background border-y border-border" aria-label="Copper market pulse">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-minimal text-rational-red mb-3 tracking-widest">MARKET PULSE</h2>
            <h3 className="text-4xl md:text-5xl font-light text-architectural text-foreground">
              Live Copper Prices & <span className="font-medium">Global Market News</span>
            </h3>
            <div className="w-12 h-0.5 bg-rational-red mx-auto mt-4" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Price card */}
            <div className="lg:col-span-1">
              <PriceCard data={data} isLoading={isLoading} isError={isError} onRefresh={() => refetch()} isRefreshing={isFetching} dataUpdatedAt={dataUpdatedAt} />
            </div>

            {/* News feed */}
            <div className="lg:col-span-2">
              <NewsFeed data={data} isLoading={isLoading} isError={isError} />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <RefreshCountdown dataUpdatedAt={dataUpdatedAt} isRefreshing={isFetching} />
          </div>

          <p className="mt-3 text-center text-xs text-muted-foreground tracking-wide">
            Prices are official LME Copper Cash-Settlement (USD/tonne), updated daily. News aggregated from Google News.
          </p>
        </div>
      </div>
    </section>
  );
};

const PriceCard = ({
  data,
  isLoading,
  isError,
  onRefresh,
  isRefreshing,
  dataUpdatedAt,
}: {
  data: ReturnType<typeof useCopperMarket>["data"];
  isLoading: boolean;
  isError: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  dataUpdatedAt: number;
}) => {
  if (isLoading) {
    return (
      <div className="h-full min-h-[260px] bg-card border border-border rounded-lg p-8 flex items-center justify-center">
        <Activity className="w-5 h-5 text-muted-foreground animate-pulse" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="h-full min-h-[260px] bg-card border border-border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
        Market data temporarily unavailable.
      </div>
    );
  }

  const { price } = data;
  const up = price.change > 0;
  const down = price.change < 0;
  const TrendIcon = up ? TrendingUp : down ? TrendingDown : Minus;
  const trendBg = up ? "bg-green-500/10 text-green-600" : down ? "bg-rational-red/10 text-rational-red" : "bg-muted text-muted-foreground";

  return (
    <div className="h-full bg-card border border-border hover:border-rational-red/40 transition-colors duration-500 rounded-lg p-8 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-minimal text-muted-foreground tracking-widest">LME COPPER · CASH SETTLEMENT</div>
          <div className="text-xs text-muted-foreground/70 mt-1">{price.source}</div>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          aria-label="Refresh price"
          className="w-8 h-8 rounded-full border border-border hover:border-rational-red hover:text-rational-red flex items-center justify-center transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <div className="text-5xl font-light text-foreground tabular-nums">
          ${price.price.toLocaleString()}
        </div>
        <div className="text-xs uppercase tracking-widest text-muted-foreground">USD / tonne</div>
      </div>
      <div className="text-xs text-muted-foreground mb-3 tabular-nums">
        ≈ ${price.pricePerLb.toFixed(2)} / lb
      </div>

      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium w-fit ${trendBg}`}>
        <TrendIcon className="w-3.5 h-3.5" />
        <span className="tabular-nums">
          {price.change >= 0 ? "+" : ""}
          {price.change.toLocaleString()} ({price.changePct >= 0 ? "+" : ""}
          {price.changePct}%) vs prev. day
        </span>
      </div>

      <div className="mt-6 pt-6 border-t border-border grid grid-cols-3 gap-4 text-sm">
        <Stat label="Prev. Close" value={`$${price.open.toLocaleString()}`} />
        <Stat label="5-Day High" value={`$${price.high.toLocaleString()}`} />
        <Stat label="5-Day Low" value={`$${price.low.toLocaleString()}`} />
      </div>

      <div className="mt-auto pt-6 text-[10px] text-muted-foreground/70 uppercase tracking-widest flex items-center justify-between gap-2">
        <span>Settlement date: {price.asOf}</span>
        {dataUpdatedAt > 0 && (
          <span className="normal-case tracking-normal text-muted-foreground/60">
            Updated {formatDistanceToNow(new Date(dataUpdatedAt), { addSuffix: true })}
          </span>
        )}
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    <div className="text-base font-medium text-foreground tabular-nums mt-1">{value}</div>
  </div>
);

const NewsFeed = ({
  data,
  isLoading,
  isError,
}: {
  data: ReturnType<typeof useCopperMarket>["data"];
  isLoading: boolean;
  isError: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="h-full bg-card border border-border rounded-lg p-8 space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-12 bg-muted/50 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  if (isError || !data || data.news.length === 0) {
    return (
      <div className="h-full bg-card border border-border rounded-lg p-8 flex items-center justify-center text-sm text-muted-foreground">
        News feed temporarily unavailable.
      </div>
    );
  }

  return (
    <div className="h-full bg-card border border-border rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-minimal text-rational-red tracking-widest">LIVE UPDATES</div>
          <div className="text-sm font-medium text-foreground mt-0.5">Copper Market Headlines</div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rational-red opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rational-red" />
          </span>
          <span className="uppercase tracking-widest">Live</span>
        </div>
      </div>

      <ul className="divide-y divide-border max-h-[420px] overflow-y-auto">
        {data.news.slice(0, 8).map((n, i) => {
          let timeAgo = "";
          try {
            timeAgo = formatDistanceToNow(new Date(n.pubDate), { addSuffix: true });
          } catch {
            timeAgo = "";
          }
          return (
            <li key={i}>
              <a
                href={n.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 px-6 py-4 hover:bg-muted/40 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-foreground group-hover:text-rational-red transition-colors line-clamp-2 leading-snug">
                    {n.title}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground uppercase tracking-widest">
                    <span className="truncate max-w-[180px]">{n.source}</span>
                    {timeAgo && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                        <span>{timeAgo}</span>
                      </>
                    )}
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-rational-red flex-shrink-0 mt-0.5 transition-colors" />
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const RefreshCountdown = ({
  dataUpdatedAt,
  isRefreshing,
}: {
  dataUpdatedAt: number;
  isRefreshing: boolean;
}) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  if (!dataUpdatedAt) return null;

  const elapsed = now - dataUpdatedAt;
  const remaining = Math.max(0, COPPER_REFRESH_MS - elapsed);
  const mm = Math.floor(remaining / 60_000);
  const ss = Math.floor((remaining % 60_000) / 1000);
  const pct = Math.min(100, (elapsed / COPPER_REFRESH_MS) * 100);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-border bg-card text-xs text-muted-foreground">
      <Timer className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-rational-red" : ""}`} />
      <span className="uppercase tracking-widest">
        {isRefreshing ? "Refreshing…" : "Next refresh in"}
      </span>
      <span className="tabular-nums font-medium text-foreground">
        {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
      </span>
      <span className="relative w-24 h-1 rounded-full bg-muted overflow-hidden">
        <span
          className="absolute inset-y-0 left-0 bg-rational-red transition-[width] duration-1000 ease-linear"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
};

export default MarketPulse;
