import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageTopSpacer from "@/components/PageTopSpacer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS, CONTACT_PHONE, CONTACT_PHONE_HREF, type ContactEntry } from "@/data/contacts";
import windmillBg from "@/assets/contact-windmill-bg.jpg";



const Contact = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    setCopied(null);
  }, []);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      toast({ title: "Email address copied", description: email });
      setTimeout(() => setCopied((c) => (c === email ? null : c)), 2000);
    } catch {
      toast({ title: "Could not copy", description: "Please copy the address manually.", variant: "destructive" });
    }
  };

  const mailtoFor = (contact: ContactEntry) => {
    const subject = `Quotation request — RATIONAL ENGINEERS LIMITED`;
    const body = `Dear ${contact.name},%0D%0A%0D%0AI would like a quotation for your copper conductor products.%0D%0A%0D%0APlease share pricing, lead time and minimum order quantity.%0D%0A%0D%0ARegards,%0D%0A`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };




  return (
    <div className="min-h-screen">
      <Navigation />
      <PageTopSpacer />
      
      {/* Hero Section with Windmill Background */}
      <section 
        className="relative pt-14 pb-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${windmillBg})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <p className="text-minimal text-muted-foreground mb-4 tracking-widest">POWERING INFRASTRUCTURE</p>
            <h1 className="text-4xl md:text-6xl font-light text-foreground mb-6">
              Copper Solutions for
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Contact Information */}
              <div>
                <p className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</p>
                <h2 className="text-4xl md:text-5xl font-light text-architectural mb-12">
                  Request a Quote
                  <br />
                  <span className="text-muted-foreground">for Your Project</span>
                </h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">EMAIL</h3>
                    <a href="mailto:info@rationalengineers.com" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      info@rationalengineers.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">PHONE</h3>
                    <a href={CONTACT_PHONE_HREF} className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      {CONTACT_PHONE}
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-minimal text-muted-foreground mb-2">HEADQUARTERS</h3>
                    <address className="text-xl not-italic leading-relaxed">
                      <strong>RATIONAL ENGINEERS LIMITED</strong>
                      <br />
                      103, Dhanlaxmi Residency, 1st Floor
                      <br />
                      Near Tip Top Plaza, Naupada
                      <br />
                      L.B.S. Marg, Thane West
                      <br />
                      Maharashtra 400604, India
                    </address>
                  </div>
                </div>

                <div className="mt-12 pt-12 border-t border-border">
                  <p className="text-muted-foreground">
                    Our technical team reviews every quote request personally. 
                    Expect a detailed response with pricing, lead times, and 
                    technical specifications within 24-48 hours.
                  </p>
                </div>
              </div>
              
              {/* Direct Email Contacts */}
              <div className="bg-muted p-8 md:p-10 rounded-lg">
                <h3 className="text-2xl font-medium mb-8">Reach Out Directly</h3>

                <div className="space-y-4">
                  {CONTACTS.map((contact) => (
                    <div
                      key={contact.email}
                      className="flex flex-col gap-4 border border-border p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <p className="text-base font-semibold text-foreground">{contact.name}</p>
                        <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          {contact.role}
                        </p>
                        <a
                          href={`mailto:${contact.email}`}
                          className="mt-2 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-rational-red"
                        >
                          <Mail className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{contact.email}</span>
                        </a>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => copyEmail(contact.email)}
                          className="rounded-none"
                        >
                          {copied === contact.email ? (
                            <>
                              <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                            </>
                          )}
                        </Button>
                        <a href={mailtoFor(contact)} className="inline-flex">
                          <Button
                            type="button"
                            size="sm"
                            className="rounded-none bg-rational-red text-white hover:bg-foreground hover:text-background"
                          >
                            Email
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                          </Button>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm text-muted-foreground text-center">
                  We'll respond within 24-48 business hours. Already submitted?{" "}
                  <Link to="/quote-status" className="underline">
                    Track your quote
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
