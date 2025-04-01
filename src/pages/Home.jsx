import React from "react";
import { Hero } from "@/components/ui/hero";
import { Features06Page } from "@/components/ui/Features";
import { Gallery4 } from "@/components/ui/gallery4";
import { MuseumCTA } from "@/components/ui/museumcta";

const Home = () => {
  return (
    <>
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <Hero />
      <div className="w-full max-w-5xl mx-auto mt-8">
        <Features06Page />
      </div>
      <div className="w-full max-w-5xl mx-auto mt-8">
        <Gallery4 />
      </div>
      <div className="w-full max-w-5xl mx-auto mt-8">
        <MuseumCTA />
      </div>
    </div>
    </>
  );
};

export default Home;
