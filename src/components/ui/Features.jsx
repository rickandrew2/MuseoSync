import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    category: "Lorem Ipsum",
    title: "Collect and enrich leads your way",
    details:
      "Take control over how and when to follow up with your leads. Store and reference leads in multiple tables and, from there, automatically send them personalized emails.",
    tutorialLink: "#",
  },
  {
    category: "Lorem Ipsum",
    title: "Streamline your workflows effortlessly",
    details:
      "Organize tasks, deadlines, and team collaboration in one place. Use customizable boards to manage projects efficiently and automate routine updates.",
    tutorialLink: "#",
  },
  {
    category: "Lorem Ipsum",
    title: "Deliver seamless customer experiences",
    details:
      "Track and resolve customer queries faster with an integrated ticketing system. Set priorities, automate follow-ups, and enhance satisfaction with personalized responses.",
    tutorialLink: "#",
  },
  {
    category: "Lorem Ipsum",
    title: "Stay connected with your team",
    details:
      "Simplify communication and align team efforts with shared boards and real-time updates. Enable transparent goal tracking and instant feedback for better results.",
    tutorialLink: "#",
  },
  {
    category: "Lorem Ipsum",
    title: "Accelerate innovation with ease",
    details:
      "Bring your product ideas to life by managing prototypes, feedback, and iterations in one place. Collaborate with your team to refine features and release with confidence.",
    tutorialLink: "#",
  },
];

const Features06Page = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: "ease-in-out", // Smooth animation
      once: true, // Runs animation once per scroll
    });
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
          {features.map((feature, index) => (
            <div
              key={feature.category}
              className="flex flex-col md:flex-row items-center gap-x-20 gap-y-6 md:odd:flex-row-reverse"
              data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            >
              <div
                className="w-full aspect-[6/4] bg-gray-200 rounded-xl border border-gray-300 basis-1/2"
                data-aos="zoom-in"
              />
              <div className="basis-1/2 shrink-0" data-aos="fade-up">
                <span className="uppercase font-semibold text-sm text-gray-500">
                  {feature.category}
                </span>
                <h4 className="my-3 text-3xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="text-gray-600 text-[17px]">{feature.details}</p>
                <Button
                  asChild
                  className="mt-6 rounded-full min-w-40 text-[15px]"
                  data-aos="fade-up"
                >
                  <Link to={feature.tutorialLink}>
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