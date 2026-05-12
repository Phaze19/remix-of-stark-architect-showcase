import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const STORAGE_KEY = "copper-market-cache-v1";

interface PersistedCache {
  data: CopperMarketData;
  updatedAt: number;
}

const readPersisted = (): PersistedCache | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedCache;
    if (!parsed?.data || !parsed?.updatedAt) return null;
    return parsed;
  } catch {
    return null;
  }
};

const writePersisted = (data: CopperMarketData, updatedAt: number) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, updatedAt }));
  } catch {
    /* ignore quota errors */
  }
};

export interface CopperPrice {
  symbol: string;
  source: string;
  unit: string;
  price: number;
  pricePerLb: number;
  open: number;
  high: number;
  low: number;
  change: number;
  changePct: number;
  asOf: string;
}

export interface CopperNewsItem {
  title: string;
  link: string;
  pubDate: string;
  source: string;
}

export interface CopperMarketData {
  price: CopperPrice;
  news: CopperNewsItem[];
  fetchedAt: string;
}

export const COPPER_REFRESH_MS = 3 * 60 * 1000; // refresh every 3 min

export const useCopperMarket = () => {
  return useQuery<CopperMarketData>({
    queryKey: ["copper-market"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("copper-market");
      if (error) throw error;
      return data as CopperMarketData;
    },
    refetchInterval: COPPER_REFRESH_MS,
    refetchIntervalInBackground: true,
    staleTime: COPPER_REFRESH_MS - 10_000,
  });
};
