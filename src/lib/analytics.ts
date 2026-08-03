// Google Analytics (GA4) initialization
// Measurement ID is a publishable key — safe to keep in the codebase.
const GA_MEASUREMENT_ID = "G-7QVFB7309F";

export function initAnalytics() {
  if (typeof window === "undefined") return;
  if (window.location.hostname === "localhost") return; // skip in dev

  // Load gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  (window as unknown as { gtag: typeof gtag }).gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

// Helper for SPA route changes
export function trackPageView(path: string) {
  if (typeof window === "undefined" || !window.dataLayer) return;
  (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
    "event",
    "page_view",
    { page_path: path }
  );
}
