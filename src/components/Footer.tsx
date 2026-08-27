import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import brandLogo from "@/assets/rational-logo-master.png.asset.json";

const LINKEDIN_URL = "https://www.linkedin.com/company/5681546";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="mb-6">
                <img
                  src={brandLogo.url}
                  alt="Rational Engineers"
                  width={1507}
                  height={603}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-auto max-w-full rounded-md bg-white px-3 py-2 object-contain"
                />
              </div>
              <p className="text-background/70 leading-relaxed max-w-xl">
                Rational Engineers is a leading copper conductor manufacturer delivering
                consistent quality, process control, and long-term supply reliability
                for critical industrial applications.
              </p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Rational Engineers on LinkedIn"
                className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-rational-red/40 text-background/70 transition-colors duration-300 hover:border-rational-red hover:bg-rational-red hover:text-background"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            
            {/* Contact */}
            <div>
              <h4 className="text-minimal text-rational-red mb-6 tracking-widest">CONTACT</h4>
              <div className="space-y-4">
                <a 
                  href="mailto:info@rationalengineers.com" 
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>info@rationalengineers.com</span>
                </a>
                <a 
                  href="tel:+911234567890" 
                  className="flex items-center gap-3 text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+91 123 456 7890</span>
                </a>
                <div className="flex items-start gap-3 text-background/70">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <span>Industrial Area, Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-rational-red/20 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Rational Engineers. All rights reserved.
            </p>
            <div className="flex gap-8">
              <a href="/work" className="text-background/50 hover:text-background text-sm transition-colors">
                Products
              </a>
              <a href="/about" className="text-background/50 hover:text-background text-sm transition-colors">
                About
              </a>
              <a href="/contact" className="text-background/50 hover:text-background text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
