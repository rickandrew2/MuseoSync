import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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
        const response = await fetch("/api/artifacts");
        const data = await response.json();
        setArtifacts(data);
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
          className="text-4xl md:text-5xl md:leading-[3.5rem] font-bold tracking-tight max-w-xl md:text-center md:mx-auto"
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
            <h3 className="mb-2 text-xl font-medium">Team Spirit</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Innovation</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Quality</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-xl font-medium">Integrity</h3>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              architecto atque consequuntur perferendis ratione dolorem vitae,
              doloribus facere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


export { Features06Page, OVM };