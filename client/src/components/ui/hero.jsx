import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden">
      <div className="max-w-screen-xl w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12 lg:py-0">
        <div className="my-auto relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 rounded-2xl blur-3xl opacity-50"></div>
          <div className="relative">
            <span className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6">
              Welcome to Our Museum
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium !leading-[1.2] tracking-tight text-foreground">
              Discover Our Rich Cultural Heritage
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Step into a world where history comes alive. Experience our carefully curated collection
              of artifacts and immerse yourself in the cultural legacy of San Jose.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 group"
              >
                <Link to="/visit" className="flex items-center">
                  Plan Your Visit
                  <ArrowUpRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10 group"
              >
                <Link to="/about" className="flex items-center">
                  Learn More
                  <CirclePlay className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="relative lg:w-[800px] min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
          <img
            src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Museum Interior"
            className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export { Hero };
