import React from "react";
import { motion } from "framer-motion";
import { Visit1 } from "@/components/ui/visit1";
import { Visit2 } from "@/components/ui/visit2";
import { ScheduleForm } from "@/components/ui/ScheduleForm";

const Visit = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center border-b border-primary/10">
        {/* Museum interior with classical architecture */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
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
            Plan Your Visit
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6">
            Experience Our Museum
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Experience the grandeur of our museum and immerse yourself in history
          </p>
        </motion.div>
      </section>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-32">
        {/* Visit Information */}
        <section
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative"
        >
          <Visit1 />
        </section>

        {/* Schedule Form */}
        <section
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative border-t border-primary/10 pt-16"
        >
          <div className="max-w-5xl mx-auto">
            <ScheduleForm />
          </div>
        </section>

        {/* Additional Information */}
        <section
          data-aos="fade-up"
          data-aos-delay="200"
          className="relative border-t border-primary/10 pt-16"
        >
          <Visit2 />
        </section>
      </div>
    </main>
  );
};

export default Visit;
