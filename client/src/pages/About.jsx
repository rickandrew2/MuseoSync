import React, { useEffect } from "react";
import { OVM } from "@/components/ui/Features";
import { About1 } from "@/components/ui/about1";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center border-b border-primary/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584652604060-35b36e6ebb82?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-4 max-w-4xl mx-auto"
        >
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            Welcome to Our Story
          </span>
          <h1 
            className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Our Legacy & Vision
          </h1>
          <p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            Discover the story behind Museo de Malaquing Tubig, where history meets innovation in preserving our cultural heritage
          </p>
        </motion.div>
      </section>

      {/* Content Section */}
      <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* About Section */}
        <section 
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative"
        >
          <About1 />
        </section>

        {/* Values Section */}
        <section 
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative border-t border-primary/10 pt-16"
        >
          <div className="space-y-8">
            <div data-aos="fade-right">
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
                Our Values & Mission
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Experience the principles that guide our commitment to cultural preservation
              </p>
            </div>
            <OVM />
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
