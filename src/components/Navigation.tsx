import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import logoLight from "@/assets/rational-logo-light.png";
import logoDark from "@/assets/rational-logo-dark.png";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img 
            src={logoDark} 
            alt="Rational Engineers" 
            className="h-12 w-auto block dark:hidden"
          />
          <img 
            src={logoLight} 
            alt="Rational Engineers" 
            className="h-12 w-auto hidden dark:block"
          />
        </a>
        
        <div className="hidden md:flex items-center space-x-10">
          <a href="#capabilities" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            CAPABILITIES
          </a>
          <a href="#trust" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            WHY LEADERS CHOOSE US
          </a>
          <a href="#quality" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            QUALITY SYSTEMS
          </a>
          <a href="/certifications" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            CERTIFICATIONS
          </a>
          <a href="/contact" className="text-minimal text-muted-foreground hover:text-foreground transition-colors duration-300">
            CONTACT
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
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