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
// Westmetall publishes official LME Copper Cash-Settlement & 3-month prices (USD/tonne).
// We scrape the public table (no API key required).
async function fetchCopperPrice() {
  const url = "https://www.westmetall.com/en/markdaten.php?action=table&field=LME_Cu_cash";
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (copper-market-bot)" },
  });
  const html = await res.text();

  // Parse rows: <tr><td>DATE</td><td>CASH</td><td>3-MONTH</td><td class="last">STOCK</td></tr>
  const rowRegex =
    /<tr>\s*<td[^>]*>([^<]+)<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*>([\d.,]+)<\/td>\s*<td[^>]*class="last"[^>]*>([\d.,]+)<\/td>\s*<\/tr>/g;
  const rows: Array<{ date: string; cash: number; threeMonth: number; stock: number }> = [];
  let m: RegExpExecArray | null;
  while ((m = rowRegex.exec(html)) !== null && rows.length < 5) {
    const cash = parseFloat(m[2].replace(/,/g, ""));
    const threeMonth = parseFloat(m[3].replace(/,/g, ""));
    const stock = parseFloat(m[4].replace(/,/g, ""));
    if (isFinite(cash)) {
      rows.push({ date: m[1].trim(), cash, threeMonth, stock });
    }
  }

  if (rows.length < 2) throw new Error("Could not parse LME copper data");

  const latest = rows[0];
  const prev = rows[1];
  const change = latest.cash - prev.cash;
  const changePct = (change / prev.cash) * 100;

  // Open/High/Low aren't published for LME cash settlement; use a small window proxy.
  const window = rows.slice(0, Math.min(5, rows.length));
  const high = Math.max(...window.map((r) => r.cash));
  const low = Math.min(...window.map((r) => r.cash));

  const POUNDS_PER_TONNE = 2204.62;

  return {
    symbol: "COPPER",
    source: "LME Copper Cash-Settlement (via Westmetall)",
    unit: "USD/tonne",
    price: Math.round(latest.cash),
    pricePerLb: Number((latest.cash / POUNDS_PER_TONNE).toFixed(4)),
    open: Math.round(prev.cash),
    high: Math.round(high),
    low: Math.round(low),
    change: Math.round(change),
    changePct: Number(changePct.toFixed(2)),
    asOf: latest.date,
  };
}

// --- News ----------------------------------------------------------------
// Google News RSS: returns XML with <item><title/><link/><pubDate/><source/></item>
async function fetchCopperNews() {
  const url =
    "https://news.google.com/rss/search?q=(LME+copper+OR+copper+price+OR+copper+market+OR+%22energy+sector%22+OR+%22power+grid%22+OR+%22electricity+demand%22+OR+%22renewable+energy%22)&hl=en-US&gl=US&ceid=US:en";
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
