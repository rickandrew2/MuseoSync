import React, { useState, useEffect, useRef } from "react";
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
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

// Utility functions for date formatting
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toISOString().split("T")[0]; // '2025-04-08'
};

const formatTime = (time) => {
  return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
};

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return {
    date: formatDate(date),
    time: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    }),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
};

const ScheduleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    visitDate: null,
    visitTime: ""
  });

  const [captchaValue, setCaptchaValue] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

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

  // Fetch available dates when component mounts
  useEffect(() => {
    const fetchAvailableDates = async () => {
      console.log('Starting to fetch available dates...');
      setIsLoading(true);
      setFetchError(null);
      try {
        console.log('Making fetch request to API...');
        const response = await fetch('http://localhost:5000/api/available-dates', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          mode: 'cors',
          credentials: 'include'
        });

        console.log('Response received:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries())
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error response:', errorText);
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();
        console.log('Successfully received data:', data);

        if (!Array.isArray(data)) {
          console.error('Received non-array data:', data);
          throw new Error('Invalid data format received from server');
        }

        console.log('Setting available dates:', data);
        setAvailableDates(data);
        
        if (data.length === 0) {
          console.warn('Received empty array of available dates');
        }
      } catch (error) {
        console.error('Error in fetchAvailableDates:', error);
        console.error('Error stack:', error.stack);
        setFetchError(`Failed to load available dates: ${error.message}`);
        toast.error('Failed to load available dates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableDates();
  }, []);

  // Add effect to monitor availableDates changes
  useEffect(() => {
    if (availableDates.length > 0) {
      console.log('Available dates in state:', {
        count: availableDates.length,
        dates: availableDates.map(d => d.date),
        firstDateDetails: availableDates[0]
      });
    }
  }, [availableDates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'name') {
      validateName(value);
    } else if (name === 'email') {
      validateEmail(value);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Helper function to format date to YYYY-MM-DD in Philippine timezone
  const formatDateToString = (date) => {
    // Convert to Philippine timezone
    const options = { timeZone: 'Asia/Manila' };
    const philippineDate = new Date(date.toLocaleString('en-US', options));
    
    const year = philippineDate.getFullYear();
    const month = String(philippineDate.getMonth() + 1).padStart(2, '0');
    const day = String(philippineDate.getDate()).padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;
    
    return formatted;
  };

  // Filter function for the date picker with timezone handling
  const isDateAvailable = (date) => {
    const dateString = formatDateToString(date);
    const isAvailable = availableDates.some(availableDate => {
      const matches = availableDate.date === dateString;
      return matches;
    });
    return isAvailable;
  };

  // Format the selected date for display with Philippine timezone
  const formatDisplayDate = (date) => {
    if (!date) return "No date selected";
    const options = {
      timeZone: 'Asia/Manila',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  // Get date class names
  const getDateClassName = (date) => {
    const dateString = formatDateToString(date);
    const isAvailable = availableDates.some(availableDate => availableDate.date === dateString);
    const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
    
    if (isPast) {
      return "text-gray-300 cursor-not-allowed line-through bg-gray-100/10";
    }
    
    if (isAvailable) {
      return "bg-green-500/20 text-foreground hover:bg-green-500/30 transition-colors duration-300 cursor-pointer font-medium";
    }
    
    return "text-muted-foreground pointer-events-none opacity-50";
  };

  // Handle date change with proper date string format
  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      visitDate: date,
      visitTime: "" // Reset time when date changes
    }));

    // Find available time slots for selected date
    const dateString = formatDateToString(date);
    console.log("Selected date string:", dateString); // Debug log
    const selectedDateData = availableDates.find(d => d.date === dateString);
    console.log("Found date data:", selectedDateData); // Debug log

    if (selectedDateData) {
      const availableSlots = selectedDateData.timeSlots.filter(
        slot => slot.isAvailable && slot.currentBookings < slot.maxCapacity
      );
      setAvailableTimeSlots(availableSlots);
    } else {
      setAvailableTimeSlots([]);
    }
  };

  const handleTimeChange = (time) => {
    setFormData(prev => ({
      ...prev,
      visitTime: time
    }));
  };

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!formData.visitDate || !formData.visitTime) {
      toast.error('Please select both a date and time for your visit.');
      setIsLoading(false);
      return;
    }

    if (!captchaValue) {
      toast.error('Please complete the reCAPTCHA verification.');
      setIsLoading(false);
      return;
    }

    try {
      // Fix timezone issue by using the date directly
      const year = formData.visitDate.getFullYear();
      const month = String(formData.visitDate.getMonth() + 1).padStart(2, '0');
      const day = String(formData.visitDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      console.log("Form submission details:", {
        rawDate: formData.visitDate,
        formattedDate: formattedDate,
        time: formData.visitTime,
        availableDates: availableDates.map(d => d.date)
      });
      
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          visitor_name: formData.name,
          email: formData.email,
          selected_date: formattedDate,
          selected_time: formData.visitTime,
          recaptchaToken: captchaValue
        }),
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.error("Server response error:", result);
        throw new Error(result.message || 'Failed to create booking');
      }

      toast.success('Booking confirmed! Reference code: ' + result.booking.reference_code);
      
      // Reset form and captcha
      setCaptchaValue(null);
      if (window.grecaptcha) {
        window.grecaptcha.reset();
      }
      
      setFormData({
        name: "",
        email: "",
        visitDate: null,
        visitTime: ""
      });
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(error.message || 'There was an error processing your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add styles for the calendar container
  const calendarContainerStyle = `
    .react-datepicker {
      background-color: transparent !important;
      border: none !important;
      font-family: inherit !important;
    }
    .react-datepicker__header {
      background-color: transparent !important;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
    }
    .react-datepicker__day {
      border-radius: 0.375rem !important;
      margin: 0.2rem !important;
      width: 2.5rem !important;
      height: 2.5rem !important;
      line-height: 2.5rem !important;
      font-size: 0.875rem !important;
    }
    .react-datepicker__day--selected {
      background-color: rgb(var(--primary)) !important;
      color: white !important;
    }
    .react-datepicker__day-name {
      color: rgb(var(--primary)) !important;
      width: 2.5rem !important;
      font-weight: 500 !important;
    }
    .react-datepicker__current-month {
      color: var(--foreground) !important;
      font-size: 1rem !important;
      font-weight: 500 !important;
      margin-bottom: 0.5rem !important;
    }
    .react-datepicker__navigation-icon::before {
      border-color: rgb(var(--primary)) !important;
    }
  `;

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
              {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
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
                className="w-full px-4 py-3 bg-background border border-primary/10 focus:border-primary/30 outline-none rounded-none rounded-lg text-foreground placeholder:text-muted-foreground/50"
                placeholder="Enter your Gmail address"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  <CalendarIcon className="h-4 w-4" />
                </div>
                Selected Visit Date (Philippine Time)
              </label>
              <div className="w-full px-4 py-3 bg-background border border-primary/10 rounded-lg text-foreground">
                {formatDisplayDate(formData.visitDate)}
              </div>
            </div>

            {formData.visitDate && availableTimeSlots.length > 0 && (
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
                    {availableTimeSlots.map((slot) => (
                      <SelectItem 
                        key={slot.time} 
                        value={slot.time}
                        className="text-foreground hover:bg-primary/5"
                      >
                        {formatTime(slot.time)} ({slot.maxCapacity - slot.currentBookings} slots available)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

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
              disabled={!formData.visitDate || !formData.visitTime || isLoading || !captchaValue}
            >
              <CalendarCheck className="h-5 w-5" />
              {isLoading ? 'Processing...' : 'Book Visit'}
            </Button>
          </form>
        </div>

        {/* Calendar Section */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-xl font-medium text-foreground mb-2">Available Dates</h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded bg-green-500/20 mr-2"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded bg-gray-500/10 mr-2"></div>
                <span>Not Available</span>
              </div>
            </div>
          </div>
          
          <Card className="border border-primary/10 bg-background p-4">
            <style>{calendarContainerStyle}</style>
            <DatePicker
              selected={formData.visitDate}
              onChange={handleDateChange}
              filterDate={isDateAvailable}
              inline
              dayClassName={getDateClassName}
              calendarClassName="!bg-transparent"
              monthClassName={() => "text-foreground"}
              weekDayClassName={() => "text-primary"}
              minDate={new Date()}
              maxDate={new Date('2025-12-31')}
              placeholderText="Select an available date"
              dateFormat="MMMM d, yyyy"
              showPopperArrow={false}
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export { ScheduleForm };
