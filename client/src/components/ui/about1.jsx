import React, { useEffect } from "react";
import { Clock, Users, Globe2, UserCheck } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export function About1() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const features = [
    {
      title: "Our History",
      icon: <Clock className="h-6 w-6" />,
      description: "Founded in 1985, Museo de Malaquing Tubig has been a cornerstone of cultural preservation in San Jose. What started as a small collection has grown into a comprehensive archive of our region's rich heritage.",
      stats: [
        { label: "Established in", value: "1985" },
        { label: "Artifacts", value: "5,000+" },
        { label: "Restoration Projects", value: "Award-winning" },
        { label: "Growth", value: "Continuous" },
      ]
    },
    {
      title: "Our Mission",
      icon: <Globe2 className="h-6 w-6" />,
      description: "We are dedicated to preserving and showcasing the cultural heritage of Malaquing Tubig, making history accessible to all generations through innovative exhibitions and educational programs.",
      stats: [
        { label: "Cultural Preservation", value: "Primary Focus" },
        { label: "Educational Outreach", value: "Extensive" },
        { label: "Community Engagement", value: "Active" },
        { label: "Historical Research", value: "Ongoing" },
      ]
    },
    {
      title: "Our Team",
      icon: <Users className="h-6 w-6" />,
      description: "Our dedicated team of curators, historians, and educators work tirelessly to create engaging experiences that bring history to life, making every visit memorable and educational.",
      stats: [
        { label: "Expert Curators", value: "Specialized" },
        { label: "Conservators", value: "Skilled" },
        { label: "Educational Specialists", value: "Dedicated" },
        { label: "Volunteers", value: "Passionate" },
      ]
    },
    {
      title: "Our Impact",
      icon: <UserCheck className="h-6 w-6" />,
      description: "Through our exhibitions, educational programs, and community initiatives, we've touched the lives of thousands, fostering a deeper appreciation for our cultural heritage.",
      stats: [
        { label: "Annual Visitors", value: "50,000+" },
        { label: "School Programs", value: "200+" },
        { label: "Special Exhibitions", value: "30+" },
        { label: "Community Partnerships", value: "Growing" },
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <div className="text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
          About Our Museum
        </h2>
        <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
          Discover the story of Museo de Malaquing Tubig and our commitment to preserving cultural heritage.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={feature.title}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 100}
            className="relative"
          >
            <div className="p-6 border-b border-primary/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 rounded-lg bg-primary/5 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif font-medium text-foreground">
                  {feature.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>

              <div className="grid grid-cols-2 gap-4">
                {feature.stats.map((stat, statIndex) => (
                  <div
                    key={stat.label}
                    data-aos="zoom-in"
                    data-aos-delay={statIndex * 50}
                    className="p-3 bg-background border-l-2 border-primary/10"
                  >
                    <div className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </div>
                    <div className="text-lg font-medium text-foreground">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}