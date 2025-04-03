import React from "react";
import { motion } from "framer-motion";
import { VisitorLogForm } from "@/components/ui/VisitorLogForm";
import { VisitorLogDisplay } from "@/components/ui/VisitorLogDisplay";

const VisitorLog = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1444&auto=format&fit=crop')] bg-cover bg-center bg-fixed"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-20 mix-blend-overlay"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center px-4"
        >
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6">Visitor Log</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Share your experience and become part of our museum's living history
          </p>
        </motion.div>
      </section>

      {/* Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-6 py-24">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5"></div>
        
        {/* Visitor Log Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative group mb-20"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-20 group-hover:opacity-40"></div>
          <div className="relative bg-gradient-to-br from-background to-background/90 rounded-xl p-8 shadow-2xl border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-primary/10 hover:shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5 rounded-xl mix-blend-overlay"></div>
            <VisitorLogForm />
          </div>
        </motion.section>

        {/* Visitor Log Display */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-secondary via-primary to-secondary rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500 opacity-20 group-hover:opacity-40"></div>
          <div className="relative bg-gradient-to-br from-background to-background/90 rounded-xl p-8 shadow-2xl border-2 border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-primary/10 hover:shadow-2xl backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5 rounded-xl mix-blend-overlay"></div>
            <VisitorLogDisplay />
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default VisitorLog;
