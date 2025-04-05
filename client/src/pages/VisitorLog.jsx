import React from "react";
import { motion } from "framer-motion";
import { VisitorLogForm } from "@/components/ui/VisitorLogForm";
import { Button } from "@/components/ui/button";
import { Camera, Clock, MapPin } from "lucide-react";

const VisitorLog = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex items-center justify-center border-b border-primary/10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1444&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background"></div>
        
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
            Share Your Experience
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-medium text-foreground mb-6">Museum Guestbook</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Be part of our museum's living history by sharing your thoughts and experiences
          </p>
        </motion.div>
      </section>

      {/* Content Container */}
      <div className="w-full max-w-7xl mx-auto px-6 py-24">
        {/* Guestbook Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-3xl mx-auto mb-32"
        >
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            <VisitorLogForm />
          </div>
        </motion.section>

        {/* Museum Highlights Grid */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24"
        >
          <div className="relative overflow-hidden rounded-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1566438480900-0609be27a4be?q=80&w=1444&auto=format&fit=crop" 
              alt="Museum Gallery"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Stunning Exhibits</h3>
                <p className="text-sm text-muted-foreground">Explore our world-class collection of artifacts and artworks</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1605347086113-b27547d89312?q=80&w=1444&auto=format&fit=crop" 
              alt="Museum Interior"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Interactive Tours</h3>
                <p className="text-sm text-muted-foreground">Immerse yourself in history with our guided experiences</p>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl group">
            <img 
              src="https://images.unsplash.com/photo-1584652604733-d318260ab308?q=80&w=1444&auto=format&fit=crop" 
              alt="Museum Event"
              className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6">
              <div>
                <h3 className="text-xl font-medium text-foreground mb-2">Special Events</h3>
                <p className="text-sm text-muted-foreground">Join our cultural programs and educational workshops</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Visit Information */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <Clock className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Opening Hours</h3>
              <p className="text-sm text-muted-foreground">Tuesday - Sunday<br />9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <MapPin className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">123 Heritage Street<br />San Jose, Malaquing Tubig</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 p-6 rounded-xl bg-primary/5 border border-primary/10">
            <Camera className="w-6 h-6 text-primary mt-1" />
            <div>
              <h3 className="font-medium text-foreground mb-2">Photography</h3>
              <p className="text-sm text-muted-foreground">Photography allowed<br />in designated areas</p>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default VisitorLog;
