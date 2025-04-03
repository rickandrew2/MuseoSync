import React from "react";
import { Contact2 } from "@/components/ui/contact2";
import { motion } from "framer-motion";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center border-b border-primary/10">
        {/* Museum reception/information desk background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544939514-aa98d908bc47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center"></div>
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
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Have questions about our exhibitions or programs? We're here to help.
          </p>
        </motion.div>
      </section>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-24">
        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
        >
          <Contact2 />
        </motion.section>
      </div>
    </main>
  );
};

export default Contact;
