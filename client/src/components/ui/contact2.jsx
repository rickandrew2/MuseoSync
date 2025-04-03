import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export function Contact2() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });

  const subjectOptions = [
    "General Inquiry",
    "Exhibition Information",
    "Group Visit",
    "School Programs",
    "Event Booking",
    "Feedback",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Form submitted:', formData);
      alert('Thank you for your message! We will get back to you soon.');
      
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-serif text-[#F5E6D3] mb-4">
          Get in Touch
        </h2>
        <p className="text-[#E6D5C7] text-lg max-w-2xl mx-auto">
          Have questions about our exhibitions or programs? We're here to help.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
              Visit Us
            </h2>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground">123 Heritage Street</p>
                <p className="text-muted-foreground">San Jose, Malaquing Tubig</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
              Call Us
            </h2>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground">+63 (123) 456-7890</p>
                <p className="text-muted-foreground">Monday - Friday, 9AM - 5PM</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-serif font-medium text-foreground mb-6">
              Email Us
            </h2>
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/5 text-primary">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-foreground">info@museodemalaquingtubig.com</p>
                <p className="text-muted-foreground">We'll respond within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="md:col-span-2 space-y-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                  First Name
                </label>
                <Input 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John" 
                  className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                  Last Name
                </label>
                <Input 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe" 
                  className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com" 
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                Subject
              </label>
              <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                <SelectTrigger className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground appearance-none cursor-pointer">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-primary/10">
                  {subjectOptions.map((option) => (
                    <SelectItem 
                      key={option} 
                      value={option}
                      className="text-foreground focus:bg-primary/20 focus:text-primary"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..." 
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50 resize-none"
              />
            </div>

            <Button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300"
            >
              <Send className="h-5 w-5" />
              Send Message
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}