// Edge function: copper-market
// Returns live copper price + copper news headlines.
// Sources (all free, no API key required):
//   Price: Stooq CSV for HG.F (COMEX copper futures, USD/lb) -> converted to USD/tonne (~proxy for LME).
//   News:  Google News RSS search for "LME copper" (parsed XML).
// 5-minute in-memory cache keeps us well within rate limits.

import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type CacheEntry<T> = { at: number; data: T };
const CACHE_TTL_MS = 5 * 60 * 1000;
let priceCache: CacheEntry<unknown> | null = null;
let newsCache: CacheEntry<unknown> | null = null;

// --- Price ---------------------------------------------------------------
// Stooq returns CSV like: Symbol,Date,Time,Open,High,Low,Close,Volume
// HG.F = Copper front-month futures (USD/lb)
async function fetchCopperPrice() {
  const url = "https://stooq.com/q/l/?s=hg.f&f=sd2t2ohlcv&h&e=csv";
  const res = await fetch(url);
  const text = await res.text();
  const lines = text.trim().split("\n");
  if (lines.length < 2) throw new Error("Invalid stooq response");
  const cols = lines[1].split(",");
  // Columns: Symbol,Date,Time,Open,High,Low,Close,Volume
  const open = parseFloat(cols[3]);
  const high = parseFloat(cols[4]);
  const low = parseFloat(cols[5]);
  const close = parseFloat(cols[6]);
  const date = cols[1];
  const time = cols[2];

  if (!isFinite(close)) throw new Error("Invalid price");

  // USD/lb -> USD/tonne (2204.62 lb per tonne) — LME-comparable approximation
  const POUNDS_PER_TONNE = 2204.62;
  const usdPerTonne = close * POUNDS_PER_TONNE;
  const usdPerTonneOpen = open * POUNDS_PER_TONNE;
  const change = usdPerTonne - usdPerTonneOpen;
  const changePct = (change / usdPerTonneOpen) * 100;

  return {
    symbol: "COPPER",
    source: "COMEX HG (front-month) via Stooq",
    unit: "USD/tonne",
    price: Math.round(usdPerTonne),
    pricePerLb: close,
    open: Math.round(usdPerTonneOpen),
    high: Math.round(high * POUNDS_PER_TONNE),
    low: Math.round(low * POUNDS_PER_TONNE),
    change: Math.round(change),
    changePct: Number(changePct.toFixed(2)),
    asOf: `${date} ${time} UTC`,
  };
}

// --- News ----------------------------------------------------------------
// Google News RSS: returns XML with <item><title/><link/><pubDate/><source/></item>
async function fetchCopperNews() {
  const url =
    "https://news.google.com/rss/search?q=LME+copper+OR+copper+price+OR+copper+market&hl=en-US&gl=US&ceid=US:en";
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (copper-market-bot)" },
  });
  const xml = await res.text();

  const items: Array<{ title: string; link: string; pubDate: string; source: string }> = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let m: RegExpExecArray | null;
  while ((m = itemRegex.exec(xml)) !== null && items.length < 12) {
    const block = m[1];
    const title = pickTag(block, "title");
    const link = pickTag(block, "link");
    const pubDate = pickTag(block, "pubDate");
    const source = pickTag(block, "source") || "Google News";
    if (title && link) {
      items.push({
        title: decodeHtml(title),
        link,
        pubDate,
        source: decodeHtml(source),
      });
    }
  }
  return items;
}

function pickTag(block: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`);
  const match = block.match(re);
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function decodeHtml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

// --- Handler -------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const now = Date.now();

    let price: unknown;
    if (priceCache && now - priceCache.at < CACHE_TTL_MS) {
      price = priceCache.data;
    } else {
      price = await fetchCopperPrice();
      priceCache = { at: now, data: price };
    }

    let news: unknown;
    if (newsCache && now - newsCache.at < CACHE_TTL_MS) {
      news = newsCache.data;
    } else {
      news = await fetchCopperNews();
      newsCache = { at: now, data: news };
    }

    return new Response(
      JSON.stringify({ price, news, fetchedAt: new Date().toISOString() }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("copper-market error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
