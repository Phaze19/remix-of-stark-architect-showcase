import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowRight, Copy, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageTopSpacer from "@/components/PageTopSpacer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import windmillBg from "@/assets/contact-windmill-bg.jpg";

type ContactEntry = {
  name: string;
  role: string;
  email: string;
};

const CONTACTS: ContactEntry[] = [
  { name: "Aditya Nayak", role: "Sales & Quotations", email: "aditya.nayak@rationalengineers.com" },
  { name: "Enquiries", role: "General Enquiries", email: "enquiry@rationalengineers.com" },
  { name: "Information Desk", role: "Product Information", email: "info@rationalengineers.com" },
];

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
                    <a href="tel:+919168643114" className="text-xl hover:text-muted-foreground transition-colors duration-300">
                      +91 91686 43114
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
              
              {/* Quote Request Form */}
              <div className="bg-muted p-8 md:p-10 rounded-lg">
                <h3 className="text-2xl font-medium mb-8">Quote Request Form</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (234) 567-8900"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name</Label>
                      <Input
                        id="company"
                        placeholder="Acme Industries"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="productType">Product Type *</Label>
                      <Select
                        value={formData.productType}
                        onValueChange={(value) => setFormData({ ...formData, productType: value })}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {productTypes.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Quantity Required *</Label>
                      <Input
                        id="quantity"
                        placeholder="e.g., 500 kg, 1000 meters"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specifications">Technical Specifications & Requirements *</Label>
                    <Textarea
                      id="specifications"
                      placeholder="Please describe your requirements including wire gauge, insulation type, conductivity requirements, delivery timeline, and any special certifications needed..."
                      className="min-h-[150px]"
                      value={formData.specifications}
                      onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Quote Request"}
                  </Button>

                  {reference && (
                    <div className="rounded-md border border-primary/40 bg-background p-4 text-center">
                      <p className="text-minimal text-muted-foreground mb-1">YOUR TRACKING REFERENCE</p>
                      <p className="text-xl font-medium tracking-wide">{reference}</p>
                      <Link
                        to={`/quote-status?ref=${encodeURIComponent(reference)}`}
                        className="mt-2 inline-block text-sm underline"
                      >
                        Track this request
                      </Link>
                    </div>
                  )}

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy.
                    We'll respond within 24-48 business hours. Already submitted?{" "}
                    <Link to="/quote-status" className="underline">
                      Track your quote
                    </Link>
                    .
                  </p>
                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
