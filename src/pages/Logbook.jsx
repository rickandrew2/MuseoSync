import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"; // Correct imports
import { useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

const LogBook = () => {
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
      const response = await fetch("http://localhost:5000/submit-logbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Data submitted successfully!");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Welcome to Museo de Malaquing Tubig!
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-1">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full"
              required
            />
          </div>

          <div>
  <Label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-1">Gender</Label>
  <Select
    value={gender}
    onValueChange={setGender}
    className="w-full" // Ensure full width
    required
  >
    <SelectTrigger className="w-full"> {/* Make the trigger take up full width */}
      <SelectValue placeholder="Select Gender" />
    </SelectTrigger>
    <SelectContent className="w-full"> {/* Make the content take up full width */}
      <SelectItem value="Male">Male</SelectItem>
      <SelectItem value="Female">Female</SelectItem>
    </SelectContent>
  </Select>
</div>


          <div>
            <Label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-1">Address</Label>
            <Input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full"
              required
            />
          </div>

          {/* Google reCAPTCHA */}
          <div className="mt-4">
            <ReCAPTCHA
              sitekey="6LeFK-oqAAAAAJToYZksywyjtT5a6Iw7ccix4BF_" // Replace with your actual site key
              onChange={handleRecaptchaChange}
            />
          </div>

          {/* Custom Button */}
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full mt-6"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LogBook;
