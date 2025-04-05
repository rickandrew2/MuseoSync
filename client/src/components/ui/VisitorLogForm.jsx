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
        <BookOpen className="w-8 h-8 text-primary" />
        <h2 className="text-3xl font-serif font-medium text-foreground">
          Sign Our Guestbook
        </h2>
      </div>
      
      <p className="text-center text-muted-foreground mb-8">
        Leave your mark in our museum's history
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Label htmlFor="name" className="text-foreground font-medium mb-2 block">Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Label htmlFor="gender" className="text-foreground font-medium mb-2 block">Gender</Label>
          <Select value={gender} onValueChange={setGender} required>
            <SelectTrigger className="w-full bg-background border border-input text-foreground">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Label htmlFor="address" className="text-foreground font-medium mb-2 block">Address</Label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full bg-background border border-input text-foreground placeholder:text-muted-foreground focus:border-primary"
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
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
          >
            <PenLine className="w-5 h-5 mr-2" />
            Sign Guestbook
          </Button>
        </motion.div>
      </form>
    </div>
  );
}; 