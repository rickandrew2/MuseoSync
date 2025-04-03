import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, MapPin, Ticket } from "lucide-react";

export function MuseumCTA() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Left Section - Visit Info */}
        <div className="space-y-10">
          <div>
            <h2 className="text-3xl font-serif font-medium text-foreground mb-4">
              Plan Your Visit
            </h2>
            <p className="text-muted-foreground text-lg">
              Experience the rich cultural heritage of our museum. We look forward to welcoming you.
            </p>
          </div>

          <div className="space-y-8">
            {/* Hours */}
            <div className="flex items-start gap-4 group">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Clock className="h-5 w-5 text-primary shrink-0 relative" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Hours of Operation</h3>
                <p className="text-muted-foreground space-y-1">
                  Tuesday - Sunday: 9:00 AM - 5:00 PM<br />
                  Last admission at 4:30 PM
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4 group">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <MapPin className="h-5 w-5 text-primary shrink-0 relative" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Location</h3>
                <p className="text-muted-foreground space-y-1">
                  123 Heritage Street<br />
                  San Jose, Malaquing Tubig
                </p>
              </div>
            </div>

            {/* Admission */}
            <div className="flex items-start gap-4 group">
              <div className="relative mt-1">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Ticket className="h-5 w-5 text-primary shrink-0 relative" />
              </div>
              <div>
                <h3 className="text-foreground font-medium mb-2">Admission Fees</h3>
                <div className="text-muted-foreground space-y-1">
                  <p>Adults: ₱100</p>
                  <p>Students & Seniors: ₱50</p>
                  <p>Children (under 12): Free</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Image & CTA */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <div className="relative h-[400px] overflow-hidden rounded-2xl border border-primary/10">
            <img 
              src="https://images.unsplash.com/photo-1575224300306-1b8da36134ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
              alt="Museum exhibition" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-4">
            <Button 
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group"
              onClick={() => window.location.href = '/tickets'}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary-foreground rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <Ticket className="mr-2 h-5 w-5 relative" />
              </div>
              Book Tickets
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="w-full border-primary text-primary hover:bg-primary/10 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 group"
              onClick={() => window.location.href = '/exhibitions'}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                <CalendarDays className="mr-2 h-5 w-5 relative" />
              </div>
              View Exhibitions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}