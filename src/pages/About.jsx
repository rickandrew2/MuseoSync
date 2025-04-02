import React from "react";
import { OVM } from "@/components/ui/Features";
import { About1 } from "@/components/ui/about1";

const About = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-100 p-6">
        <About1 />
        <OVM />
      </div>
    </>
  );
};

export default About;
