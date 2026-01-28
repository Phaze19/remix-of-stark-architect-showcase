import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import IndustrialApplications from "@/components/IndustrialApplications";
import Differentiation from "@/components/Differentiation";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <div id="trust">
        <TrustSignals />
      </div>
      <div id="capabilities">
        <IndustrialApplications />
      </div>
      <div id="quality">
        <Differentiation />
      </div>
      <Portfolio />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
