import { useState } from "react";
import { z } from "zod";
import { Loader2, Send, MapPin, Phone, Mail, Linkedin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LINKEDIN_URL = "https://www.linkedin.com/company/5681546";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().max(150),
  country: z.string().trim().max(80),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(255),
  phone: z.string().trim().max(40),
  product: z.string().trim().max(150),
  message: z.string().trim().min(1, "Please describe your requirement").max(2000),
});

type Fields = z.infer<typeof schema>;
type FieldErrors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  country: "",
  email: "",
  phone: "",
  product: "",
  message: "",
};

const inputClass =
  "rounded-none border-0 border-b border-background/25 bg-transparent px-0 text-background placeholder:text-background/35 focus-visible:border-rational-red focus-visible:ring-0 focus-visible:ring-offset-0";
const labelClass = "text-[10px] font-bold uppercase tracking-[0.2em] text-background/50";

const EnquiryCTA = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const setField = (key: keyof Fields) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    const { country, product, message } = parsed.data;
    const messageBody = country ? `${message}\n\nCountry: ${country}` : message;

    setSubmitting(true);
    const { error } = await supabase.from("quote_requests").insert({
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      product_title: product || null,
      message: messageBody,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not send your enquiry",
        description: "Please try again, or email us directly at info@rationalengineers.com.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Enquiry sent",
      description: "Our team will respond within one business day.",
    });
    setForm(empty);
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
                Let&apos;s build the right solution
                <br />
                <span className="text-rational-red">for your requirement.</span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-background/70">
                Share your specification  conductor type, dimensions, insulation class and volumes  and our engineering team will revert with a technical and commercial proposal.
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
                  href="mailto:info@rationalengineers.com"
                  className="flex items-center gap-4 text-sm text-background/75 transition-colors hover:text-background"
                >
                  <Mail className="h-5 w-5 shrink-0 text-rational-red" />
                  info@rationalengineers.com
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

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid gap-8 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="enq-name" className={labelClass}>
                    Name *
                  </Label>
                  <Input
                    id="enq-name"
                    value={form.name}
                    maxLength={100}
                    onChange={(e) => setField("name")(e.target.value)}
                    className={inputClass}
                  />
                  {errors.name && <p className="text-xs text-rational-red">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enq-company" className={labelClass}>
                    Company
                  </Label>
                  <Input
                    id="enq-company"
                    value={form.company}
                    maxLength={150}
                    onChange={(e) => setField("company")(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enq-country" className={labelClass}>
                    Country
                  </Label>
                  <Input
                    id="enq-country"
                    value={form.country}
                    maxLength={80}
                    onChange={(e) => setField("country")(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enq-email" className={labelClass}>
                    Email *
                  </Label>
                  <Input
                    id="enq-email"
                    type="email"
                    value={form.email}
                    maxLength={255}
                    onChange={(e) => setField("email")(e.target.value)}
                    className={inputClass}
                  />
                  {errors.email && <p className="text-xs text-rational-red">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enq-phone" className={labelClass}>
                    Phone
                  </Label>
                  <Input
                    id="enq-phone"
                    value={form.phone}
                    maxLength={40}
                    onChange={(e) => setField("phone")(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="enq-product" className={labelClass}>
                    Product / requirement
                  </Label>
                  <Input
                    id="enq-product"
                    value={form.product}
                    maxLength={150}
                    placeholder="e.g. Copper CTC conductor"
                    onChange={(e) => setField("product")(e.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="enq-message" className={labelClass}>
                  Message *
                </Label>
                <Textarea
                  id="enq-message"
                  rows={5}
                  value={form.message}
                  maxLength={2000}
                  onChange={(e) => setField("message")(e.target.value)}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && <p className="text-xs text-rational-red">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                className="h-auto w-full rounded-none bg-rational-red px-10 py-5 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-rational-red/90 sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit enquiry
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnquiryCTA;
