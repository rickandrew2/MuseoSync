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
    <main className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-[90vh] flex items-center justify-center"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1557177324-56c542165309?q=80&w=1470&auto=format&fit=crop"
            alt="Museum Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-background"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-20 mix-blend-overlay"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative text-center px-4 max-w-4xl mx-auto"
        >
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block px-6 py-2 mb-3 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20 text-white"
          >
            Welcome to Our Story
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            Our Legacy & Vision
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg"
          >
            Discover the story behind Museo de Malaquing Tubig, where history meets innovation in preserving our cultural heritage
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-[30px] h-[50px] rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Content Section */}
      <div className="relative w-full bg-gradient-to-b from-background to-background/95">
        <div className="max-w-7xl mx-auto px-4 space-y-32 py-24">
          {/* About Section */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10"
          >
            <About1 />
          </motion.section>

          {/* Values Section */}
          <motion.section 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10"
          >
            <div className="space-y-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                  Our Values & Mission
                </h2>
                <p className="text-lg text-muted-foreground">
                  Experience the principles that guide our commitment to cultural preservation
                </p>
              </div>
              <OVM />
            </div>
          </motion.section>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5 pointer-events-none"></div>
      </div>
    </main>
  );
};

export default About;
