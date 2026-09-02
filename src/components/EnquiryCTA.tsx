import { Mail, MapPin, Phone, Linkedin, ArrowRight, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LINKEDIN_URL = "https://www.linkedin.com/company/5681546";

type Contact = {
  name: string;
  role: string;
  email: string;
};

const CONTACTS: Contact[] = [
  { name: "Aditya Nayak", role: "Sales & Quotations", email: "aditya.nayak@rationalengineers.com" },
  { name: "Enquiries", role: "General Enquiries", email: "enquiry@rationalengineers.com" },
  { name: "Information Desk", role: "Product Information", email: "info@rationalengineers.com" },
];

const EnquiryCTA = () => {
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

  const mailtoFor = (contact: Contact) => {
    const subject = `Quotation request — RATIONAL ENGINEERS LIMITED`;
    const body = `Dear ${contact.name},%0D%0A%0D%0AI would like a quotation for your copper conductor products.%0D%0A%0D%0APlease share pricing, lead time and minimum order quantity.%0D%0A%0D%0ARegards,%0D%0A`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <section id="enquire" className="bg-foreground py-20 text-background md:py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-rational-red">
                Enquire Now
              </p>
              <div className="mt-4 h-0.5 w-12 bg-rational-red" />
              <h2 className="mt-6 text-4xl font-light leading-[1.05] tracking-tight text-background md:text-5xl">
                Let's build the right solution
                <br />
                <span className="text-rational-red">for your requirement.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-background/70">
                Reach out to our team directly — pick the contact that fits your enquiry best. Your email client will open with a pre-filled message ready to send.
              </p>

              <div className="mt-12 space-y-6 border-t border-background/15 pt-10">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-rational-red" />
                  <p className="text-sm leading-relaxed text-background/75">
                    103, Dhanlaxmi Residency, Naupada,
                    <br />
                    L.B.S. Marg, Thane West, MH 400604, India
                  </p>
                </div>
                <a
                  href="tel:+919168643114"
                  className="flex items-center gap-4 text-sm text-background/75 transition-colors hover:text-background"
                >
                  <Phone className="h-5 w-5 shrink-0 text-rational-red" />
                  +91 91686 43114
                </a>
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-sm text-background/75 transition-colors hover:text-background"
                >
                  <Linkedin className="h-5 w-5 shrink-0 text-rational-red" />
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {CONTACTS.map((contact) => (
                <div
                  key={contact.email}
                  className="flex flex-col gap-4 border border-background/15 p-6 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-background">{contact.name}</p>
                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-background/50">
                      {contact.role}
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="mt-2 inline-flex items-center gap-2 text-sm text-background/80 transition-colors hover:text-rational-red"
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
                      className="rounded-none border-background/25 bg-transparent text-background hover:bg-background/10 hover:text-background"
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
                        className="rounded-none bg-rational-red text-white hover:bg-background hover:text-foreground"
                      >
                        Email
                        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryCTA;
