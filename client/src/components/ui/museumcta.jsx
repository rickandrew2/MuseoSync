import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays, Ticket } from "lucide-react";

export function MuseumCTA() {
  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30 overflow-hidden">
      <div className="w-full h-48 bg-gray-200 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
          alt="Museum exhibition" 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-primary">
          Plan Your Museum Visit Today
        </CardTitle>
        <CardDescription className="text-lg">
          Discover extraordinary exhibits and immerse yourself in culture
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <CalendarDays className="h-6 w-6 text-primary" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Open Tuesday - Sunday
            </p>
            <p className="text-sm text-muted-foreground">
              10:00 AM - 6:00 PM, Last entry at 5:30 PM
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Ticket className="h-6 w-6 text-primary" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Skip the line with online tickets
            </p>
            <p className="text-sm text-muted-foreground">
              Guaranteed entry with timed reservations
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" className="w-full sm:w-auto">
          <Ticket className="mr-2 h-4 w-4" />
          Book Tickets Now
        </Button>
        <Button variant="outline" size="lg" className="w-full sm:w-auto">
          <CalendarDays className="mr-2 h-4 w-4" />
          View Exhibitions
        </Button>
      </CardFooter>
    </Card>
  );
}