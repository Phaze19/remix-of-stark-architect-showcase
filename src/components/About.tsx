const About = () => {
  return (
    <section id="about" className="py-32 bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-minimal text-muted-foreground mb-4">ABOUT</h2>
              <h3 className="text-4xl md:text-6xl font-light text-architectural mb-12">
                Our Legacy
              </h3>
              
              <div className="space-y-8">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Rational Engineers Limited was started in 1989 and was later taken over by 
                  Mr. Mahendra Jain (B.E Mech) in 2006 with a vision of transforming the 
                  production and distribution landscape of copper. His son Mr. Jubin Jain 
                  (B.E Electrical) became a part of this vision in 2018.
                </p>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  As a family enterprise, we have been a part of the copper business for 
                  50 years, and have successfully managed, enhanced and transformed it since. 
                  REL's futuristic and modern manufacturing facilities combined with 
                  uncompromising machinery and latest equipment makes it a pioneer for 
                  stakeholders everywhere.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  Maintaining high standards of ethics and professionalism in every aspect 
                  of our business, we provide a complete range of copper products with one 
                  objective in mind — exceeding customer expectations.
                </p>
              </div>
            </div>
            
            <div className="space-y-12">
              <div>
                <h4 className="text-minimal text-muted-foreground mb-6">OUR PRINCIPLES</h4>
                <div className="space-y-6">
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Ubiquitous Presence</h5>
                    <p className="text-muted-foreground">Endeavoring to cover the complete array of copper conductors across industries</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Certified Resilience</h5>
                    <p className="text-muted-foreground">Certifications that indicate resilience to survive business cycles</p>
                  </div>
                  <div className="border-l-2 border-architectural pl-6">
                    <h5 className="text-lg font-medium mb-2">Global Growth</h5>
                    <p className="text-muted-foreground">Leveraging growth in India and abroad through ethics and professionalism</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-8 border-t border-border">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">ESTABLISHED</h4>
                    <p className="text-xl">1989</p>
                  </div>
                  <div>
                    <h4 className="text-minimal text-muted-foreground mb-2">IN COPPER</h4>
                    <p className="text-xl">50+ Years</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
