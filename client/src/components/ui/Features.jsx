import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";


const Features06Page = () => {
  const [artifacts, setArtifacts] = useState([]);

  // Fetch artifacts data from backend
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });

    // Fetch data from API
    const fetchArtifacts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/artifacts`, {
          withCredentials: true
        });
        // Shuffle the array and take only 5 random items
        const randomArtifacts = response.data
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
          className="text-4xl md:text-5xl md:leading-[3.5rem] font-serif font-medium tracking-tight max-w-xl md:text-center md:mx-auto"
          data-aos="fade-up"
        >
          Explore Featured Collections
        </h2>
        <div className="mt-8 md:mt-16 w-full mx-auto space-y-20">
          {artifacts.map((artifact, index) => (
            <div
              key={artifact._id}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div
                className="w-full aspect-[6/4] bg-gray-200 rounded-xl border border-gray-300 basis-1/2"
                style={{ backgroundImage: `url(${artifact.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
                data-aos="zoom-in"
              />
              <div className="basis-1/2 shrink-0" data-aos="fade-up">
                <span className="uppercase font-semibold text-sm text-gray-500">
                  {artifact.location}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {artifact.artifact_name}
                </h4>
                <p className="text-gray-600 text-[17px]">{artifact.description}</p>
                <Button
                  asChild
                  className="mt-6 rounded-full min-w-40 text-[15px]"
                  data-aos="fade-up"
                >
                  <Link to={`/artifact/${artifact._id}`}>
                    Learn More <ArrowRight />
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
          <h2 className="row-span-2 text-3xl font-semibold lg:text-5xl ml-5">
            Our Values and Principles
          </h2>
          <div>
            <h3 className="mb-2 text-xl font-medium">Preservation</h3>
            <p className="text-muted-foreground">
              We are committed to safeguarding historical artifacts and cultural heritage to ensure they endure for future generations.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Education</h3>
            <p className="text-muted-foreground">
              We strive to educate visitors of all ages through engaging exhibits, workshops, and guided tours that bring history to life.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Community Engagement</h3>
            <p className="text-muted-foreground">
              We believe in fostering strong connections with our community by organizing events and programs that celebrate local history and culture.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Integrity</h3>
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