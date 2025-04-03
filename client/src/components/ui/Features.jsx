import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Features06Page = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    const fetchArtifacts = async () => {
      try {
        const response = await fetch("/api/artifacts");
        const data = await response.json();
        // Shuffle the array and take only 5 random items
        const randomArtifacts = data
          .sort(() => Math.random() - 0.5)
          .slice(0, 5);
        setArtifacts(randomArtifacts);
      } catch (error) {
        console.error("Error fetching artifacts data:", error);
      }
    };

    fetchArtifacts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-screen-lg w-full py-10 px-6">
        <h2
          className="text-4xl md:text-5xl md:leading-[3.5rem] font-serif font-medium text-foreground max-w-xl md:text-center md:mx-auto"
          data-aos="fade-up"
        >
          Featured Collections
        </h2>
        <p className="mt-4 text-muted-foreground text-center">
          Discover our curated selection of 5 remarkable artifacts
        </p>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {artifacts.map((artifact, index) => (
            <div
              key={artifact._id}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div className="w-full basis-1/2">
                <div
                  className="aspect-[6/4] bg-background rounded-xl border border-primary/30 overflow-hidden"
                  data-aos="zoom-in"
                >
                  <img 
                    src={artifact.image}
                    alt={artifact.artifact_name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>
              <div className="basis-1/2 shrink-0" data-aos="fade-up">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {artifact.location}
                </span>
                <h4 className="mt-4 mb-3 text-3xl font-serif font-medium text-foreground tracking-tight">
                  {artifact.artifact_name}
                </h4>
                <p className="text-muted-foreground text-[17px] leading-relaxed">
                  {artifact.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="mt-6 border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  <Link to={`/artifact/${artifact._id}`} className="flex items-center gap-2 group">
                    Learn More 
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OVM = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-3">
          <h2 className="row-span-2 text-3xl font-serif font-medium text-foreground lg:text-5xl ml-5">
            Our Values and Principles
          </h2>
          <div className="p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors duration-300">
            <h3 className="mb-2 text-xl font-medium text-primary">Preservation</h3>
            <p className="text-muted-foreground">
              We are committed to safeguarding historical artifacts and cultural heritage to ensure they endure for future generations.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors duration-300">
            <h3 className="mb-2 text-xl font-medium text-primary">Education</h3>
            <p className="text-muted-foreground">
              We strive to educate visitors of all ages through engaging exhibits, workshops, and guided tours that bring history to life.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors duration-300">
            <h3 className="mb-2 text-xl font-medium text-primary">Community Engagement</h3>
            <p className="text-muted-foreground">
              We believe in fostering strong connections with our community by organizing events and programs that celebrate local history and culture.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors duration-300">
            <h3 className="mb-2 text-xl font-medium text-primary">Integrity</h3>
            <p className="text-muted-foreground">
              Our work is guided by honesty, transparency, and a deep respect for the stories and artifacts we curate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Features06Page, OVM };