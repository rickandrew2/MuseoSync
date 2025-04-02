import React from "react";
import { Hero } from "@/components/ui/hero";
import { Features06Page } from "@/components/ui/Features";
import { Gallery4 } from "@/components/ui/gallery4";
import { MuseumCTA } from "@/components/ui/museumcta";

const Home = () => {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="w-full flex justify-center">
        <Hero />
      </section>

      {/* Content Container */}
      <div className="w-full max-w-6xl mx-auto px-6 space-y-16">
        {/* Features Section */}
        <section>
          <Features06Page />
        </section>

        {/* Gallery Section */}
        <section>
          <Gallery4 />
        </section>

        {/* Call-To-Action Section */}
        <section>
          <MuseumCTA />
        </section>
      </div>
    </main>
  );
};

export default Home;
