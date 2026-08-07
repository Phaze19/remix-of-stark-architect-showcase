import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import windmillBg from "@/assets/contact-windmill-bg.jpg";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    productType: "",
    quantity: "",
    specifications: "",
  });

  const productTypes = [
    "Bare Copper Wire",
    "Paper Covered Copper Wire",
    "Enameled Copper Wire",
    "CTC Conductors",
    "Copper Busbars",
    "Winding Wire",
    "Custom Product",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Quote Request Submitted",
      description: "Our team will contact you within 24 hours with a detailed quote.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      productType: "",
      quantity: "",
      specifications: "",
    });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section with Windmill Background */}
      <section 
        className="relative pt-32 pb-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${windmillBg})` }}
      >
        <div className="absolute inset-0 bg-background/85" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-minimal text-muted-foreground mb-4 tracking-widest">POWERING INFRASTRUCTURE</h1>
            <h2 className="text-4xl md:text-6xl font-light text-foreground mb-6">
              Copper Solutions for
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              {"\n"}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Contact Information */}
              <div>
                <h1 className="text-minimal text-muted-foreground mb-4">GET IN TOUCH</h1>
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
                      103, Dhanalaxmi Residency, 1st Floor
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

                  <p className="text-sm text-muted-foreground text-center">
                    By submitting this form, you agree to our privacy policy. 
                    We'll respond within 24-48 business hours.
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
