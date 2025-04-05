import { Button } from "@/components/ui/button";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const exhibitions = [
  {
    id: 1,
    title: "Ancient Artifacts Collection",
    description: "Explore our newest collection featuring rare artifacts from ancient civilizations.",
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "Modern Art Exhibition",
    description: "Contemporary masterpieces that challenge perception and inspire creativity.",
    image: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=2574&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Cultural Heritage Gallery",
    description: "Discover the rich traditions and customs of our local heritage.",
    image: "https://images.unsplash.com/photo-1572947650440-e8a97ef053b2?q=80&w=2574&auto=format&fit=crop"
  }
];

const Hero = () => {
  const [currentExhibition, setCurrentExhibition] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentExhibition((prev) => (prev + 1) % exhibitions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Full-width background image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
        <motion.img
          key={exhibitions[currentExhibition].image}
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          src={exhibitions[currentExhibition].image}
          alt="Museum Interior"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main content */}
      <div className="relative z-20 w-full min-h-screen">
        {/* Top bar */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-0 left-0 right-0 flex justify-start items-center px-6 py-4 bg-gradient-to-b from-black/50 to-transparent"
        >
          <div className="flex items-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Open today: 9:00–17:00</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">San Jose, Malaquing Tubig</span>
            </div>
          </div>
        </motion.div>

        {/* Hero section */}
        <div className="w-full min-h-screen flex items-center pt-20 sm:pt-0">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left content */}
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-white space-y-6"
              >
                <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/20">
                  Welcome to Our Museum
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.2]">
                  Discover Our Rich Cultural Heritage
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-xl">
                  Step into a world where history comes alive. Experience our carefully curated collection
                  of artifacts and immerse yourself in the cultural legacy of San Jose.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/visit" className="w-full sm:w-auto">
                    <Button 
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 text-base sm:text-lg font-serif font-medium tracking-wide w-full 
                        flex items-center justify-center px-6 sm:px-8 py-6 sm:py-7 rounded-full shadow-lg shadow-white/20 
                        hover:shadow-xl hover:shadow-white/30 hover:scale-[1.02] transition-all duration-300
                        active:scale-[0.98]"
                    >
                      Plan your visit
                      <ArrowUpRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link to="/about" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-black hover:bg-white hover:text-black 
                        transition-all duration-300 text-base sm:text-lg font-serif font-medium tracking-wide w-full
                        flex items-center justify-center px-6 sm:px-8 py-6 sm:py-7 rounded-full
                        hover:shadow-xl hover:shadow-white/20 hover:scale-[1.02]
                        active:scale-[0.98]"
                    >
                      Learn More
                      <ArrowUpRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Right content - Hide on small screens */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="relative hidden md:block"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentExhibition}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                  >
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                      <img
                        src={exhibitions[currentExhibition].image}
                        alt={exhibitions[currentExhibition].title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-white/60 text-sm">Featured Exhibition</span>
                    <h3 className="text-2xl text-white font-medium mt-2">{exhibitions[currentExhibition].title}</h3>
                    <p className="text-white/80 mt-2">
                      {exhibitions[currentExhibition].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
};

export { Hero };
