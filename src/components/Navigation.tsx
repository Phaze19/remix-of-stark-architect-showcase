import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoLight from "@/assets/rational-logo-light.png";
import logoDark from "@/assets/rational-logo-original.jpeg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b-2 border-rational-red">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        <a href="/" className="flex items-center">
          <img
            src={logoDark}
            alt="Rational Engineers"
            className="h-24 md:h-28 w-auto block dark:hidden"
          />
          <img
            src={logoLight}
            alt="Rational Engineers"
            className="h-24 md:h-28 w-auto hidden dark:block"
          />
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          <a href="#capabilities" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            CAPABILITIES
          </a>
          <a href="#trust" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            WHY LEADERS CHOOSE US
          </a>
          <a href="#quality" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            QUALITY SYSTEMS
          </a>
          <a href="/certifications" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            CERTIFICATIONS
          </a>
          <a href="/gallery" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            GALLERY
          </a>
          <a href="/contact" className="relative text-minimal text-muted-foreground hover:text-rational-red transition-colors duration-300 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-[-4px] after:left-0 after:bg-rational-red after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
            CONTACT
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
          <a
            href="/contact"
            className="bg-rational-red text-white px-6 py-3 text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-foreground transition-colors duration-300"
          >
            Request Quote
          </a>
        </div>


        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            <a href="#capabilities" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              CAPABILITIES
            </a>
            <a href="#trust" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              WHY LEADERS CHOOSE US
            </a>
            <a href="#quality" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              QUALITY SYSTEMS
            </a>
            <a href="/certifications" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              CERTIFICATIONS
            </a>
            <a href="/gallery" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              GALLERY
            </a>
            <a href="/contact" className="block text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
              CONTACT
            </a>
            
            {/* Mobile Theme Toggle */}
            <div className="pt-4 border-t border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;