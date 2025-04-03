import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar as CalendarIcon, Clock, User, Mail, CalendarCheck } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitDate: null,
    visitTime: ""
  });

  // Get today's date and add 1 day to start from tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Define available dates (next 3 months)
  const generateAvailableDates = () => {
    const dates = [];
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 3);

    for (let date = new Date(tomorrow); date <= endDate; date.setDate(date.getDate() + 1)) {
      // Exclude Mondays and existing dates
      if (date.getDay() !== 1) { // 1 represents Monday
        dates.push(new Date(date));
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      visitDate: date,
      visitTime: "" // Reset time when date changes
    }));
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      visitTime: time
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.visitDate || !formData.visitTime) {
      alert('Please select both a date and time for your visit.');
      return;
    }

    try {
      console.log('Booking submitted:', formData);
      alert(`Booking confirmed for ${formData.name} on ${formData.visitDate.toLocaleDateString()} at ${formData.visitTime}`);
      
      setFormData({
        name: "",
        email: "",
        visitDate: null,
        visitTime: ""
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error processing your booking. Please try again.');
    }
  };

  const isWeekday = (date) => {
    const day = date.getDay();
    return day !== 1; // Return true for all days except Monday (1)
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
          Schedule Your Visit
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select your preferred date and time for your museum visit.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        {/* Form Section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <User className="h-4 w-4" />
                </div>
                Your Name
              </label>
              <Input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <Mail className="h-4 w-4" />
                </div>
                Email Address
              </label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                Selected Visit Date
              </label>
              <div className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg text-foreground">
                {formData.visitDate ? formData.visitDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }) : "No date selected"}
              </div>
            </div>

            {formData.visitDate && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <div className="p-2 rounded-lg bg-primary/5 text-primary">
                    <Clock className="h-4 w-4" />
                  </div>
                  Select Visit Time
                </label>
                <Select 
                  value={formData.visitTime} 
                  onValueChange={handleTimeChange}
                  required
                >
                  <SelectTrigger className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-lg text-foreground">
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-primary/10">
                    {availableTimes.map((time) => (
                      <SelectItem 
                        key={time} 
                        value={time}
                        className="text-foreground hover:bg-primary/5"
                      >
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!formData.visitDate || !formData.visitTime}
            >
              <CalendarCheck className="h-5 w-5" />
              Book Visit
            </Button>
          </form>
        </div>

        {/* Calendar Section */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-foreground mb-2">Available Dates</h3>
            <p className="text-muted-foreground">
              Select a date to schedule your visit. The museum is closed on Mondays.
            </p>
          </div>
          
          <Card className="border border-primary/10 bg-background p-4">
            <DatePicker
              selected={formData.visitDate}
              onChange={handleDateChange}
              minDate={tomorrow}
              maxDate={availableDates[availableDates.length - 1]}
              filterDate={isWeekday}
              inline
              dayClassName={date =>
                isWeekday(date)
                  ? "bg-primary/5 text-foreground hover:bg-primary/10 transition-colors duration-300" 
                  : "text-muted-foreground hover:bg-primary/5 transition-colors duration-300"
              }
              calendarClassName="!bg-transparent"
              monthClassName={() => "text-foreground"}
              weekDayClassName={() => "text-primary"}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export { ScheduleForm };
