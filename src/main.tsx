import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FontPresetProvider } from "@/components/FontPresetProvider";
import { initAnalytics } from "@/lib/analytics";
import { initImageFallback } from "@/lib/imageFallback";
import "./index.css";

initAnalytics();
initImageFallback();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="architecture-theme">
        <FontPresetProvider>
          <App />
        </FontPresetProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
);
