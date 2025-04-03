import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, PenLine } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";

export const VisitorLogForm = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      alert("Please complete the reCAPTCHA verification.");
      return;
    }

    const formData = { name, gender, address };

    try {
      const response = await fetch("/api/submit-logbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Thank you for signing our guest book!");
        setName("");
        setGender("");
        setAddress("");
        setCaptchaValue(null);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit data.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-center space-x-3 mb-8">
        <BookOpen className="w-8 h-8 text-[#FFD700]" />
        <h2 className="text-3xl font-serif font-bold text-[#FFD700]">
          Sign Our Guestbook
        </h2>
      </div>
      
      <p className="text-center text-[#D4AF37] mb-8 font-medium">
        Leave your mark in our museum's history
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="group"
        >
          <Label htmlFor="name" className="text-[#FFD700] font-medium mb-2 block">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-[#1A0F0D] border-2 border-[#8B4513] text-[#D4AF37] placeholder:text-[#8B4513] focus:border-[#FFD700] focus:ring-[#FFD700] transition-colors"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="group"
        >
          <Label htmlFor="gender" className="text-[#FFD700] font-medium mb-2 block">Gender</Label>
          <Select value={gender} onValueChange={setGender} required>
            <SelectTrigger className="w-full bg-[#1A0F0D] border-2 border-[#8B4513] text-[#D4AF37] focus:border-[#FFD700] focus:ring-[#FFD700] transition-colors">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-[#2C1810] border-2 border-[#8B4513]">
              <SelectItem value="Male" className="text-[#D4AF37] focus:bg-[#3D2419] focus:text-[#FFD700]">Male</SelectItem>
              <SelectItem value="Female" className="text-[#D4AF37] focus:bg-[#3D2419] focus:text-[#FFD700]">Female</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="group"
        >
          <Label htmlFor="address" className="text-[#FFD700] font-medium mb-2 block">Address</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full bg-[#1A0F0D] border-2 border-[#8B4513] text-[#D4AF37] placeholder:text-[#8B4513] focus:border-[#FFD700] focus:ring-[#FFD700] transition-colors"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center"
        >
          <ReCAPTCHA
            sitekey="6LeFK-oqAAAAAJToYZksywyjtT5a6Iw7ccix4BF_"
            onChange={handleRecaptchaChange}
            theme="dark"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button 
            type="submit" 
            className="w-full bg-[#8B4513] hover:bg-[#6B3410] text-[#FFD700] border-2 border-[#FFD700]/20 shadow-lg shadow-[#000]/20 transition-all duration-300 hover:shadow-xl hover:shadow-[#000]/30 group"
          >
            <PenLine className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            Sign Guestbook
          </Button>
        </motion.div>
      </form>
    </div>
  );
}; 