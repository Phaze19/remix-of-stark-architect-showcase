import { Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      company: "TBEA Energy (India) Pvt Ltd",
      department: "Quality Department",
      quote: "Rational Engineers has consistently supplied copper conductors meeting our exact specifications across transformer and reactor applications."
    },
    {
      company: "Leading Power Transformer OEM",
      department: "Procurement Division",
      quote: "Their commitment to delivery timelines and product consistency has made them our preferred copper conductor supplier for over a decade."
    },
    {
      company: "Infrastructure Major",
      department: "Technical Team",
      quote: "The quality of CTC conductors and their ability to customize for our specific requirements sets Rational Engineers apart from other suppliers."
    }
  ];

  return (
    <section className="py-32 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-minimal text-muted-foreground mb-4 tracking-widest">
              CLIENT TESTIMONIALS
            </h2>
            <h3 className="text-4xl md:text-5xl font-light text-architectural">
              What Our Partners Say
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-background p-8 rounded-lg border border-border"
              >
                <Quote className="w-10 h-10 text-muted-foreground/30 mb-6" />
                
                <p className="text-foreground leading-relaxed mb-8 text-lg">
                  "{testimonial.quote}"
                </p>
                
                <div className="pt-6 border-t border-border">
                  <h4 className="font-semibold text-foreground mb-1">
                    {testimonial.company}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.department}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
