import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Floating "scroll to top" button.
 * Smoothly animates the window scroll position back to 0 using a
 * requestAnimationFrame easing, so it works even when the OS/browser
 * does not honor `scroll-behavior: smooth` (and respects users who
 * have reduced-motion enabled by jumping instantly for them).
 */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const scrollToTopSmooth = () => {
  if (prefersReducedMotion()) {
    window.scrollTo(0, 0);
    return;
  }
  const start = window.scrollY;
  if (start <= 0) return;
  const duration = 600; // ms
  const startTime = performance.now();

  const tick = (now: number) => {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // easeInOutCubic
    const eased = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    window.scrollTo(0, start * (1 - eased));
    if (progress < 1) {
      window.requestAnimationFrame(tick);
    } else {
      window.scrollTo(0, 0);
    }
  };
  window.requestAnimationFrame(tick);
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTopSmooth}
      className={`fixed bottom-6 right-6 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-rational-red text-white shadow-[0_10px_30px_-10px_hsl(var(--rational-red)/0.6)] transition-all duration-500 hover:bg-foreground hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rational-red ${
        visible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};

export default ScrollToTop;
