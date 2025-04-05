import React from "react";
import { motion } from "framer-motion";
import { Visit1 } from "@/components/ui/visit1";
import { Visit2 } from "@/components/ui/visit2";
import { ScheduleForm } from "@/components/ui/ScheduleForm";

const Visit = () => {
  return (
    <main className="min-h-screen bg-background">
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
            src="https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Museum Visit Background"
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
            Plan Your Visit
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 drop-shadow-2xl"
          >
            Experience Our Museum
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-lg"
          >
            Experience the grandeur of our museum and immerse yourself in history
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
        <div className="w-full max-w-7xl mx-auto px-6 py-24 space-y-32">
          {/* Visit Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10"
          >
            <Visit1 />
          </motion.section>

          {/* Schedule Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10"
          >
            <div className="max-w-5xl mx-auto">
              <ScheduleForm />
            </div>
          </motion.section>

          {/* Additional Information */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary/10"
          >
            <Visit2 />
          </motion.section>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5 pointer-events-none"></div>
      </div>
    </main>
  );
};

export default Visit;
