import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar1 } from "./components/ui/navbar1";
import { Footer7 } from "./components/ui/footer7";
import { Hero } from "@/components/ui/hero";
import { Toaster } from 'sonner';

// Import the pages for routing
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VisitorLog from "./pages/VisitorLog";
import Visit from "./pages/Visit";
import FeaturedCollections from "./pages/FeaturedCollections";
import ArtifactDetail from "./pages/ArtifactDetail";

const App = () => {
  return (
    <>
      <Toaster />
      <Navbar1 /> {/* Your Navbar, if you still want it */}
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/visitor-log" element={<VisitorLog />} /> {/* Updated route */}
        <Route path="/collections" element={<FeaturedCollections />} />
        <Route path="/artifact/:id" element={<ArtifactDetail />} />
      </Routes>
      <Footer7 />
    </>
  );
};

export default App;
