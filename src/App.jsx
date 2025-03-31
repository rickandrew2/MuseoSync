import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar1 } from "./components/ui/navbar1";
import { Footer7 } from "./components/ui/footer7";
import { Hero } from "@/components/ui/hero";
import { Features06Page } from "@/components/ui/features";
import { Gallery4 } from "@/components/ui/gallery4";

// Import the pages for routing
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import LogBook from "./pages/LogBook";

const App = () => {
  return (
    <>
      <Navbar1 /> {/* Your Navbar, if you still want it */}
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/logbook" element={<LogBook />} /> 
      </Routes>
      <Footer7 />
    </>
  );
};

export default App;
