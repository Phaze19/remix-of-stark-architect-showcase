/**
 * Warm the browser cache for images that appear just below the fold,
 * without competing with the LCP request. Runs after the initial render
 * during idle time, so perceived load feels instant when the user scrolls.
 */
const warmed = new Set<string>();

const idle = (cb: () => void) => {
  const w = window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
  };
  if (typeof w.requestIdleCallback === "function") {
    w.requestIdleCallback(() => cb(), { timeout: 2000 });
  } else {
    window.setTimeout(cb, 400);
  }
};

export const preloadImages = (urls: (string | undefined | null)[]) => {
  if (typeof window === "undefined") return;

  idle(() => {
    for (const url of urls) {
      if (!url || warmed.has(url)) continue;
      warmed.add(url);
      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = "low";
      img.src = url;
    }
  });
};

/** Preload after the first paint has settled (two frames + idle). */
export const preloadAfterRender = (urls: (string | undefined | null)[]) => {
  if (typeof window === "undefined") return;
  requestAnimationFrame(() => requestAnimationFrame(() => preloadImages(urls)));
};
