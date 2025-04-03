import React from "react";
import { Hero } from "@/components/ui/hero";
import { Features06Page } from "@/components/ui/Features";
import { Gallery4 } from "@/components/ui/gallery4";
import { MuseumCTA } from "@/components/ui/museumcta";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full min-h-screen flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-fixed"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-10 mix-blend-overlay"></div>
        <Hero />
      </motion.section>

      {/* Content Container */}
      <div className="relative w-full max-w-6xl mx-auto px-4 space-y-32 py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5"></div>
        
        {/* Features Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Features06Page />
        </motion.section>

        {/* Gallery Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Gallery4 />
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <MuseumCTA />
        </motion.section>
      </div>
    </main>
  );
};

export default Home;
