import React, { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming Button is already imported
import { Card } from "@/components/ui/card"; // Assuming Card is already imported
import DatePicker from "react-datepicker"; // Correct import statement
import "react-datepicker/dist/react-datepicker.css";

const ScheduleForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState(null);
  const [visitTime, setVisitTime] = useState("");
  const [availableDates, setAvailableDates] = useState([
    "2025-04-10", "2025-04-12", "2025-04-15", "2025-04-20", // example available dates
  ]);

  const availableTimes = {
    "2025-04-10": ["10:00 AM", "1:00 PM", "3:00 PM"],
    "2025-04-12": ["9:00 AM", "12:00 PM", "2:00 PM"],
    "2025-04-15": ["11:00 AM", "2:00 PM", "4:00 PM"],
    "2025-04-20": ["10:00 AM", "12:00 PM", "1:00 PM"],
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${name} on ${visitDate} at ${visitTime}`);
  };

  const handleDateChange = (date) => {
    setVisitDate(date);
    setVisitTime(""); // Reset visit time when date changes
  };

  const handleTimeChange = (time) => {
    setVisitTime(time);
  };

  const isAvailableDate = (date) => {
    const formattedDate = date.toISOString().split("T")[0]; // format the date as yyyy-MM-dd
    return availableDates.includes(formattedDate);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex space-x-16">
      {/* Form Section */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-8">Schedule Your Visit</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-lg mb-2">Your Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Email Address</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-lg mb-2">Selected Visit Date</label>
            <div
              className="w-full p-2 border border-gray-300 rounded text-center"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              {visitDate ? visitDate.toISOString().split("T")[0] : "No date selected"}
            </div>
          </div>

          {visitDate && (
            <div>
              <label className="block text-lg mb-2">Select Visit Time</label>
              <select
                className="w-full p-2 border border-gray-300 rounded"
                value={visitTime}
                onChange={(e) => handleTimeChange(e.target.value)}
                required
              >
                <option value="">Select Time</option>
                {availableTimes[visitDate.toISOString().split("T")[0]]?.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={!visitDate || !visitTime}
          >
            Book Visit
          </Button>
        </form>
      </div>

      {/* Calendar Section */}
      <div className="flex-1">
        <h2 className="text-3xl font-semibold mb-8">Available Dates</h2>
        <Card className="bg-white p-4 rounded-lg shadow-lg">
          <DatePicker
            selected={visitDate}
            onChange={handleDateChange}
            minDate={new Date()}
            highlightDates={availableDates.map((date) => new Date(date))}
            inline
            dayClassName={(date) =>
              isAvailableDate(date) ? "bg-green-500 text-white" : undefined
            }
            calendarClassName="react-datepicker__calendar"
          />
        </Card>
      </div>
    </div>
  );
};

export { ScheduleForm };
