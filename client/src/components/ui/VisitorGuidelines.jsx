import React from "react";
import { motion } from "framer-motion";
import { Shield, Info, Users, HelpCircle } from "lucide-react";

export function VisitorGuidelines() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#F5E6D3] mb-4">
          Visitor Guidelines & Policies
        </h2>
        <p className="text-[#E6D5C7] text-lg max-w-2xl mx-auto">
          To ensure an enjoyable experience for all visitors, please review our guidelines and policies before your visit.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Safety Guidelines */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#800020]/20 to-transparent rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-br from-[#1A0F0D] to-[#2C1810] rounded-xl p-6 border border-[#CD7F32]/20 hover:border-[#CD7F32]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-[#CD7F32]" />
              <h3 className="text-2xl font-serif text-[#F5E6D3]">Safety Guidelines</h3>
            </div>
            <ul className="space-y-4">
              <GuidelineItem>Wear a face mask in designated areas</GuidelineItem>
              <GuidelineItem>Maintain appropriate distance from exhibits</GuidelineItem>
              <GuidelineItem>Follow staff instructions at all times</GuidelineItem>
              <GuidelineItem>No flash photography in sensitive areas</GuidelineItem>
            </ul>
          </div>
        </motion.div>

        {/* Museum Policies */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-[#CD7F32]/20 to-transparent rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-bl from-[#1A0F0D] to-[#2C1810] rounded-xl p-6 border border-[#CD7F32]/20 hover:border-[#CD7F32]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-[#CD7F32]" />
              <h3 className="text-2xl font-serif text-[#F5E6D3]">Museum Policies</h3>
            </div>
            <ul className="space-y-4">
              <GuidelineItem>No food or drinks in exhibition areas</GuidelineItem>
              <GuidelineItem>No large bags or backpacks</GuidelineItem>
              <GuidelineItem>Photography permits required for commercial use</GuidelineItem>
              <GuidelineItem>Children under 12 must be accompanied</GuidelineItem>
            </ul>
          </div>
        </motion.div>

        {/* Group Visits */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#800020]/20 to-transparent rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-tr from-[#1A0F0D] to-[#2C1810] rounded-xl p-6 border border-[#CD7F32]/20 hover:border-[#CD7F32]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#CD7F32]" />
              <h3 className="text-2xl font-serif text-[#F5E6D3]">Group Visits</h3>
            </div>
            <ul className="space-y-4">
              <GuidelineItem>Advance booking required for groups of 10+</GuidelineItem>
              <GuidelineItem>Special rates for educational groups</GuidelineItem>
              <GuidelineItem>Guided tours available upon request</GuidelineItem>
              <GuidelineItem>Maximum group size: 25 people</GuidelineItem>
            </ul>
          </div>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-[#CD7F32]/20 to-transparent rounded-xl blur-xl transition-all duration-300 group-hover:blur-2xl opacity-50"></div>
          <div className="relative bg-gradient-to-tl from-[#1A0F0D] to-[#2C1810] rounded-xl p-6 border border-[#CD7F32]/20 hover:border-[#CD7F32]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-8 h-8 text-[#CD7F32]" />
              <h3 className="text-2xl font-serif text-[#F5E6D3]">Additional Information</h3>
            </div>
            <ul className="space-y-4">
              <GuidelineItem>Audio guides available in multiple languages</GuidelineItem>
              <GuidelineItem>Free Wi-Fi throughout the museum</GuidelineItem>
              <GuidelineItem>Wheelchair accessible facilities</GuidelineItem>
              <GuidelineItem>Gift shop open during museum hours</GuidelineItem>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const GuidelineItem = ({ children }) => (
  <li className="flex items-center gap-2 text-[#E6D5C7] group">
    <span className="w-1.5 h-1.5 rounded-full bg-[#CD7F32] group-hover:bg-[#F5E6D3] transition-colors duration-300"></span>
    <span className="group-hover:text-[#F5E6D3] transition-colors duration-300">{children}</span>
  </li>
); 