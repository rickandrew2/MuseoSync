import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ArtifactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [randomArtifacts, setRandomArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch main artifact
        const artifactResponse = await axios.get(`http://localhost:5000/api/artifacts/${id}`, {
          withCredentials: true
        });
        setArtifact(artifactResponse.data);

        // Fetch all artifacts for random selection
        const allArtifactsResponse = await axios.get('http://localhost:5000/api/artifacts', {
          withCredentials: true
        });
        
        // Filter out the current artifact and get random artifacts
        const otherArtifacts = allArtifactsResponse.data.filter(a => a._id !== id);
        const shuffled = otherArtifacts.sort(() => 0.5 - Math.random());
        setRandomArtifacts(shuffled.slice(0, 6)); // Get 6 random artifacts

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleArtifactClick = async (artifactId) => {
    if (isNavigating) return; // Prevent multiple rapid clicks
    setIsNavigating(true);

    // Start fade out animation
    await new Promise(resolve => setTimeout(resolve, 300)); // Wait for fade out
    
    // Navigate and scroll to top
    navigate(`/artifact/${artifactId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset navigation state
    setIsNavigating(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev === Math.floor(randomArtifacts.length / 3) - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev === 0 ? Math.floor(randomArtifacts.length / 3) - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !artifact) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-semibold text-foreground">
            {error || "Artifact not found"}
          </h1>
          <Button
            onClick={() => navigate("/collections")}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
          </Button>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-background pt-24 pb-16"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Button
              onClick={() => navigate("/collections")}
              variant="outline"
              className="mb-8"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <h1 className="text-4xl font-serif font-bold text-foreground">
                  {artifact.artifact_name}
                </h1>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {artifact.location}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    {new Date(artifact.acquisition_date).toLocaleDateString()}
                  </div>
                </div>

                <p className="text-lg text-muted-foreground">
                  {artifact.description}
                </p>

                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                  {artifact.loan_status}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <div className="sticky top-24">
                  <div className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img
                      src={artifact.image}
                      alt={artifact.artifact_name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* You May Also Like Section */}
            {randomArtifacts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-16 relative"
              >
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl font-serif font-bold text-foreground mb-8"
                >
                  You May Also Like
                </motion.h2>
                
                <div className="relative">
                  <div className="overflow-hidden rounded-xl">
                    <motion.div 
                      className="flex transition-all duration-500 ease-out"
                      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-w-full p-2">
                        {randomArtifacts.map((randomArtifact, index) => (
                          <motion.div
                            key={randomArtifact._id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            className="group cursor-pointer transform transition-all duration-300 hover:shadow-2xl rounded-lg"
                            onClick={() => handleArtifactClick(randomArtifact._id)}
                          >
                            <div className="relative overflow-hidden rounded-lg aspect-[4/3] bg-black/5">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                              <motion.img
                                src={randomArtifact.image}
                                alt={randomArtifact.artifact_name}
                                className="w-full h-full object-cover"
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.6 }}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                                }}
                              />
                              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end transform transition-transform duration-300">
                                <motion.div 
                                  className="space-y-2"
                                  initial={{ y: 20, opacity: 0 }}
                                  animate={{ y: 0, opacity: 1 }}
                                  transition={{ duration: 0.3, delay: 0.1 }}
                                >
                                  <div className="text-sm font-medium text-primary bg-primary/10 backdrop-blur-sm w-fit px-3 py-1 rounded-full">
                                    {randomArtifact.location}
                                  </div>
                                  <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors duration-300">
                                    {randomArtifact.artifact_name}
                                  </h3>
                                </motion.div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  {randomArtifacts.length > 3 && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-full shadow-lg hover:bg-background hover:shadow-xl transition-all duration-300"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/80 backdrop-blur-sm text-foreground p-3 rounded-full shadow-lg hover:bg-background hover:shadow-xl transition-all duration-300"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </motion.button>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtifactDetail; 