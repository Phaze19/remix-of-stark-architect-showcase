import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import IndustrialApplications from "@/components/IndustrialApplications";
import Differentiation from "@/components/Differentiation";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ScrollReveal>
        <div id="trust">
          <TrustSignals />
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div id="capabilities">
          <IndustrialApplications />
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <div id="quality">
          <Differentiation />
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Portfolio />
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal>
        <Footer />
      </ScrollReveal>
    </div>
  );
};

export default Index;
