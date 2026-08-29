/**
 * Resolves a Lovable CDN asset pointer to a URL that works on ANY host.
 *
 * Pointer URLs are root-relative (`/__l5e/assets-v1/...`). That path is only
 * served by Lovable hosting and the Vite dev proxy. When the same build is
 * deployed elsewhere (e.g. GitHub -> Vercel/Netlify/Pages) those requests 404
 * and every image disappears. In that case we point at the canonical Lovable
 * origin, which serves the assets publicly.
 */
const CDN_ORIGIN = "https://rationalengineers.lovable.app";

type AssetPointer = { url: string };

const isLovableServedHost = (hostname: string) =>
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname.endsWith(".lovable.app") ||
  hostname.endsWith(".lovableproject.com") ||
  hostname.endsWith(".lovable.dev");

export const assetUrl = (asset: AssetPointer | string): string => {
  const url = typeof asset === "string" ? asset : asset?.url;
  if (!url) return "";
  if (/^https?:\/\//i.test(url)) return url;
  if (!url.startsWith("/__l5e/")) return url;
  if (typeof window === "undefined") return `${CDN_ORIGIN}${url}`;
  return isLovableServedHost(window.location.hostname) ? url : `${CDN_ORIGIN}${url}`;
};

export default assetUrl;
