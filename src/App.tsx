import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import FontPresetSwitcher from "@/components/FontPresetSwitcher";
import ScrollToTop from "@/components/ScrollToTop";
import SEO from "@/components/SEO";
import Index from "./pages/Index";

// Secondary routes are code-split so the landing page ships the smallest bundle.
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const Leadership = lazy(() => import("./pages/Leadership"));
const CSR = lazy(() => import("./pages/CSR"));
const Contact = lazy(() => import("./pages/Contact"));
const Certifications = lazy(() => import("./pages/Certifications"));
const QuoteStatus = lazy(() => import("./pages/QuoteStatus"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Warm the code-split route chunks once the landing page is idle so clicking a
// nav link feels instant instead of waiting on a network round-trip.
const prefetchRoutes = () => {
  void import("./pages/Certifications");
  void import("./pages/About");
  void import("./pages/Work");
  void import("./pages/Contact");
  void import("./pages/QuoteStatus");
  void import("./pages/Leadership");
  void import("./pages/CSR");
};

const RoutePrefetcher = () => {
  useEffect(() => {
    const idle = (window as typeof window & {
      requestIdleCallback?: (cb: () => void) => number;
    }).requestIdleCallback;
    if (idle) {
      idle(prefetchRoutes);
      return;
    }
    const timer = window.setTimeout(prefetchRoutes, 1500);
    return () => window.clearTimeout(timer);
  }, []);
  return null;
};

const RouteTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

const ROUTE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Rational Engineers — Premium Copper CTC Wires & Conductors",
    description:
      "Leading manufacturer of copper CTC wires, continuously transposed conductors, and premium copper wire products for power transformers and electrical applications.",
  },
  "/work": {
    title: "Our Work & Certifications — Rational Engineers",
    description:
      "Explore Rational Engineers' projects, OEM clients, and active ISO certifications for copper conductors and transformer winding products.",
  },
  "/about": {
    title: "About Us — Rational Engineers Limited",
    description:
      "Learn about Rational Engineers Limited, a Thane-based manufacturer of copper CTC, paper covered and enamelled conductors serving the power industry since 1990.",
  },
  "/leadership": {
    title: "Leadership — Rational Engineers Limited",
    description:
      "Meet the leadership team of Rational Engineers Limited driving copper conductor manufacturing excellence across India and global markets.",
  },
  "/csr": {
    title: "CSR Activities — Rational Engineers Limited",
    description:
      "Rational Engineers' corporate social responsibility initiatives in community development, education, and sustainability.",
  },
  "/certifications": {
    title: "Certifications — Rational Engineers Limited",
    description:
      "Quality certifications of Rational Engineers Limited, including ISO 9001:2015 quality management systems for copper conductor manufacturing.",
  },
  "/contact": {
    title: "Contact Us — Rational Engineers Limited",
    description:
      "Get in touch with Rational Engineers Limited for copper CTC wires, busbars, and conductor products. Request a quote today.",
  },
  "/quote-status": {
    title: "Track Your Quote — Rational Engineers Limited",
    description:
      "Track the status of your Rational Engineers quote request using your reference code and email address.",
  },
};

const DEFAULT_META = {
  title: "RATIONAL ENGINEERS LIMITED",
  description:
    "Rational Engineers Limited manufactures copper CTC, paper covered and enamelled conductors for the global power industry.",
};

const RouteSEO = () => {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? DEFAULT_META;
  return <SEO title={meta.title} description={meta.description} path={pathname} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <RouteSEO />
        <RoutePrefetcher />
        <Suspense fallback={<div className="min-h-dvh bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Work />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quote-status" element={<QuoteStatus />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      <FontPresetSwitcher />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
