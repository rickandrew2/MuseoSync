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
import ReCAPTCHA from "react-google-recaptcha";
import { toast } from "sonner";

export function Contact2() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "General Information",
    message: "",
    submittedAt: ""
  });
  const [captchaValue, setCaptchaValue] = useState(null);
  const [messageLength, setMessageLength] = useState(0);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const maxMessageLength = 1000; // You can adjust this value

  const subjectOptions = [
    "General Information",
    "Exhibition Information",
    "Group Visit",
    "School Programs",
    "Event Booking",
    "Feedback",
    "Other"
  ];

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    if (!regex.test(name)) {
      setNameError("Name should only contain letters and spaces");
      return false;
    }
    setNameError("");
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!regex.test(email)) {
      setEmailError("Email must be a valid Gmail address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'fullName') {
      validateName(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
    
    if (name === 'message') {
      if (value.length <= maxMessageLength) {
        setMessageLength(value.length);
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubjectChange = (value) => {
    setFormData(prev => ({
      ...prev,
      subject: value
    }));
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!captchaValue) {
      toast.error("Please complete the reCAPTCHA verification.");
      return;
    }

    try {
      const inquiryData = {
        ...formData,
        recaptchaToken: captchaValue
      };

      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inquiryData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit inquiry");
      }

      toast.success("Thank you for your message! We will get back to you soon.");
      
      setFormData({
        fullName: "",
        email: "",
        subject: "General Information",
        message: "",
        submittedAt: ""
      });
      
      setCaptchaValue(null);
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message || "There was an error sending your message. Please try again.");
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
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                Full Name
              </label>
              <Input 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe" 
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                required
              />
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
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
                placeholder="john@gmail.com" 
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
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
              <div className="relative">
                <Textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..." 
                  className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50 resize-none min-h-[150px]"
                  required
                  maxLength={maxMessageLength}
                />
                <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                  {messageLength}/{maxMessageLength}
                </div>
              </div>
            </div>

            <div className="flex justify-center mb-4">
              <ReCAPTCHA
                sitekey="6LeFK-oqAAAAAJToYZksywyjtT5a6Iw7ccix4BF_"
                onChange={handleRecaptchaChange}
                theme="dark"
                onExpired={() => {
                  setCaptchaValue(null);
                  toast.error('reCAPTCHA expired, please verify again');
                }}
                onError={() => {
                  setCaptchaValue(null);
                  toast.error('reCAPTCHA error, please try again');
                }}
              />
            </div>

            <Button 
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!captchaValue || messageLength === 0 || messageLength > maxMessageLength}
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