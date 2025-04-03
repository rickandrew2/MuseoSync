"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS styles
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const Gallery4 = ({
  title = "Featured Exhibitions",
  description = "Immerse yourself in our curated collection of extraordinary artifacts and exhibitions that showcase the rich cultural heritage of our region.",
}) => {
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS
  }, []);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  // Fetch data from API on mount
  useEffect(() => {
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
  }, []); // Empty dependency array means it runs only once when mounted

  return (
    <section className="py-24">
      <div className="container">
        <div
          className="mb-12 flex items-end justify-between md:mb-14 lg:mb-16"
          data-aos="fade-up"
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-medium text-[#F5E6D3]">
              {title}
            </h2>
            <p className="max-w-lg text-[#E6D5C7] text-lg">
              {description}
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              className="border-[#CD7F32] text-[#CD7F32] hover:bg-[#CD7F32]/10 hover:text-[#F5E6D3]"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-[#CD7F32] text-[#CD7F32] hover:bg-[#CD7F32]/10 hover:text-[#F5E6D3]"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel 
          setApi={setCarouselApi} 
          opts={{ 
            align: "start",
            dragFree: true,
            containScroll: "trimSnaps"
          }}
        >
          <CarouselContent>
            {artifacts.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="basis-[80%] sm:basis-[40%] md:basis-[30%]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <a href={item.href} className="group relative block">
                  <div className="relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-lg">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1A0F0D]/60 to-[#1A0F0D] opacity-80" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6">
                      <div className="mb-2 text-xl font-serif font-medium text-[#F5E6D3]">
                        {item.title}
                      </div>
                      <div className="mb-6 line-clamp-2 text-[#E6D5C7]">
                        {item.description}
                      </div>
                      <div className="flex items-center text-sm text-[#CD7F32] group-hover:text-[#F5E6D3] transition-colors duration-300">
                        Read more 
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {artifacts.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[#CD7F32]" : "bg-[#CD7F32]/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
