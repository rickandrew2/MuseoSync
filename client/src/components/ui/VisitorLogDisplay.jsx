import React from "react";
import { ScrollText } from "lucide-react";
import { motion } from "framer-motion";

const mockEntries = [
  {
    id: 1,
    name: "John Smith",
    date: "2024-03-15",
    message: "A truly magnificent collection. The artifacts are beautifully preserved and displayed.",
  },
  {
    id: 2,
    name: "Maria Garcia",
    date: "2024-03-14",
    message: "The cultural heritage preserved here is remarkable. Thank you for this wonderful experience.",
  },
  {
    id: 3,
    name: "David Chen",
    date: "2024-03-14",
    message: "Impressed by the detailed historical exhibits. Will definitely recommend to others.",
  },
];

export const VisitorLogDisplay = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <ScrollText className="w-8 h-8 text-[#FFD700]" />
        <h2 className="text-3xl font-serif font-bold text-[#FFD700]">
          Recent Visitors
        </h2>
      </div>
      
      <p className="text-center text-[#D4AF37] mb-8 font-medium">
        See what our esteemed guests have to say about their experience
      </p>

      <div className="space-y-6">
        {mockEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-[#8B4513] via-[#FFD700] to-[#8B4513] rounded-lg blur group-hover:blur-md transition-all duration-300 opacity-30"></div>
            <div className="relative bg-[#1A0F0D] p-6 rounded-lg border-2 border-[#8B4513] shadow-lg">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-[#FFD700] font-serif font-bold text-lg">
                  {entry.name}
                </h3>
                <span className="text-[#D4AF37] text-sm">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <p className="text-[#D4AF37] italic">
                "{entry.message}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 