import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { trackPageView } from "@/lib/analytics";
import FontPresetSwitcher from "@/components/FontPresetSwitcher";
import SEO from "@/components/SEO";
import Index from "./pages/Index";

// Secondary routes are code-split so the landing page ships the smallest bundle.
const Work = lazy(() => import("./pages/Work"));
const About = lazy(() => import("./pages/About"));
const FounderJourney = lazy(() => import("./pages/FounderJourney"));
const Leadership = lazy(() => import("./pages/Leadership"));
const CSR = lazy(() => import("./pages/CSR"));
const Contact = lazy(() => import("./pages/Contact"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const RouteTracker = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RouteTracker />
        <Suspense fallback={<div className="min-h-dvh bg-background" />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/work" element={<Work />} />
          
          <Route path="/about" element={<About />} />
          <Route path="/founder" element={<FounderJourney />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/csr" element={<CSR />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
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
