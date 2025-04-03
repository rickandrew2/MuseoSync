import React from "react";
import { Clock, MapPin, Ticket, Calendar } from "lucide-react";

export function Visit1() {
  return (
    <div className="grid md:grid-cols-2 gap-16">
      {/* Left Column - Basic Info */}
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
            Plan Your Visit
          </h2>
          <p className="text-lg text-muted-foreground">
            Experience the rich cultural heritage of our museum. We look forward to welcoming you.
          </p>
        </div>

        <div className="space-y-8">
          {/* Hours of Operation */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Hours of Operation</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>Tuesday - Sunday: 9:00 AM - 5:00 PM</p>
                <p>Last admission at 4:30 PM</p>
                <p>Closed on Mondays and National Holidays</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-2">Location</h3>
              <div className="space-y-1 text-muted-foreground">
                <p>123 Heritage Street</p>
                <p>San Jose, Malaquing Tubig</p>
                <p>Free Parking Available</p>
                <p>Accessible by Public Transport</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Admission & Events */}
      <div className="space-y-8">
        {/* Admission Fees */}
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/5 text-primary">
            <Ticket className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Admission Fees</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center border-b border-primary/10 py-2">
                <span className="text-foreground">Adults</span>
                <span className="text-muted-foreground">₱100</span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 py-2">
                <span className="text-foreground">Students & Seniors</span>
                <span className="text-muted-foreground">₱50</span>
              </div>
              <div className="flex justify-between items-center border-b border-primary/10 py-2">
                <span className="text-foreground">Children (under 12)</span>
                <span className="text-muted-foreground">Free</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Special Group Rates Available
              </p>
            </div>
          </div>
        </div>

        {/* Special Events */}
        <div className="flex items-start gap-4">
          <div className="p-2 rounded-lg bg-primary/5 text-primary">
            <Calendar className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground mb-2">Special Events</h3>
            <div className="space-y-2 text-muted-foreground">
              <p>Guided Tours: Every Saturday at 10 AM</p>
              <p>Cultural Workshops: Monthly</p>
              <p>Exhibition Openings: Check Calendar</p>
              <p className="text-sm italic mt-2">
                Pre-registration required for all special events
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 