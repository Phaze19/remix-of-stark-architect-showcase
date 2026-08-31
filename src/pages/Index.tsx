import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import CompanyAtAGlance from "@/components/CompanyAtAGlance";
import ProductShowcase from "@/components/ProductShowcase";
import TrustSignals from "@/components/TrustSignals";
import IndustrialApplications from "@/components/IndustrialApplications";
import QualityTesting from "@/components/QualityTesting";

import GlobalFootprint from "@/components/GlobalFootprint";
import SustainabilityGroup from "@/components/SustainabilityGroup";
import GroupCompanies from "@/components/GroupCompanies";
import Testimonials from "@/components/Testimonials";
import EnquiryCTA from "@/components/EnquiryCTA";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { useEffect } from "react";
import { preloadAfterRender } from "@/lib/preloadImages";
import ctcAsset from "@/assets/cat2-ctc.jpg.asset.json";
import bareCableAsset from "@/assets/cat2-bare-cable.jpg.asset.json";
import insulatedCableAsset from "@/assets/cat2-insulated-cable.jpg.asset.json";
import enamCopperAsset from "@/assets/cat2-enam-copper.jpg.asset.json";
import labImage from "@/assets/cat-lab.jpg";
import { assetUrl } from "@/lib/assetUrl";

const Index = () => {
  useEffect(() => {
    // Warm the first product cards + lab visual once the hero has painted.
    preloadAfterRender([
      assetUrl(ctcAsset),
      assetUrl(bareCableAsset),
      assetUrl(insulatedCableAsset),
      assetUrl(enamCopperAsset),
      labImage,
    ]);
  }, []);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Copper CTC Wires & Transformer Conductors | Rational Engineers</title>
        <meta
          name="description"
          content="Rational Engineers Limited manufactures copper CTC conductors, enamelled wires, busbars and transformer strips — 38,000 MT capacity, ISO-certified, serving 350+ customers across 4 continents."
        />
        <link rel="canonical" href="https://rationalengineers.lovable.app/" />
        <meta property="og:title" content="Copper CTC Wires & Transformer Conductors | Rational Engineers" />
        <meta
          property="og:description"
          content="Precision copper conductors for power and distribution transformers — CTC, enamelled wire, busbars and paper covered strips from a 35+ year Indian manufacturer."
        />
        <meta property="og:url" content="https://rationalengineers.lovable.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Copper CTC Wires & Transformer Conductors | Rational Engineers" />
        <meta
          name="twitter:description"
          content="Precision copper conductors for power and distribution transformers — CTC, enamelled wire, busbars and paper covered strips."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Rational Engineers Limited",
            url: "https://rationalengineers.lovable.app/",
            about: "Manufacturer of copper CTC conductors, enamelled winding wires and busbars",
          })}
        </script>
      </Helmet>
      <Navigation />
      <Hero />

      <ScrollReveal>
        <CompanyAtAGlance />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div id="products">
          <ProductShowcase />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div id="trust">
          <TrustSignals />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <div id="applications">
          <IndustrialApplications />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <QualityTesting />
      </ScrollReveal>


      <ScrollReveal delay={0.1}>
        <GlobalFootprint />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <SustainabilityGroup />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <GroupCompanies />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Testimonials />
      </ScrollReveal>


      <ScrollReveal delay={0.1}>
        <EnquiryCTA />
      </ScrollReveal>

      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
