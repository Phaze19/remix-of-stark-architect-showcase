import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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

export const useCopperMarket = () => {
  return useQuery<CopperMarketData>({
    queryKey: ["copper-market"],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("copper-market");
      if (error) throw error;
      return data as CopperMarketData;
    },
    refetchInterval: 5 * 60 * 1000, // refresh every 5 min
    staleTime: 4 * 60 * 1000,
  });
};
