import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, X, Maximize2, History, Info, Award, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";

const ArtifactDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [randomArtifacts, setRandomArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);

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
        setRandomArtifacts(shuffled.slice(0, 3)); // Get 3 random artifacts

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
    if (isNavigating) return;
    setIsNavigating(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    navigate(`/artifact/${artifactId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsNavigating(false);
  };

  // Image Modal Component
  const ImageModal = ({ isOpen, onClose, imageUrl, title }) => {
    if (!isOpen) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        onClick={onClose}
      >
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={imageUrl}
            alt={title}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </motion.div>
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-background"
      >
        {/* Hero Section with Image Background */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <div 
            className="absolute inset-0 cursor-zoom-in group" 
            onClick={() => setShowFullImage(true)}
          >
            <img
              src={artifact.image}
              alt={artifact.artifact_name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/1200x800?text=Image+Not+Available';
              }}
            />
            {/* Gradient overlay with pointer-events-none */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background pointer-events-none" />
            
            {/* Maximize icon overlay with pointer-events-none */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <Maximize2 className="w-12 h-12 text-white drop-shadow-lg" />
            </div>
          </div>
          
          {/* Content overlay with pointer-events-none except for the button */}
          <div className="container mx-auto px-4 relative h-full">
            <div className="relative z-10">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/collections");
                }}
                variant="outline"
                className="absolute top-24 left-4 bg-background/80 backdrop-blur-sm hover:bg-background/90"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collections
              </Button>
            </div>

            <div className="absolute bottom-12 left-4 right-4 pointer-events-none">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-5xl md:text-6xl font-serif font-bold text-white mb-6"
              >
                {artifact.artifact_name}
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center text-white/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <MapPin className="mr-2 h-4 w-4" />
                  {artifact.location}
                </div>
                <div className="flex items-center text-white/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(artifact.acquisition_date).toLocaleDateString()}
                </div>
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm text-primary text-sm">
                  {artifact.loan_status}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-lg text-primary">
                  <Info className="h-6 w-6" />
                  <h2 className="font-semibold">Description</h2>
                </div>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {artifact.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 text-lg text-primary">
                  <Award className="h-6 w-6" />
                  <h2 className="font-semibold">Details</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <History className="h-5 w-5 text-primary" />
                    <span>Acquired on {new Date(artifact.acquisition_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>Located in {artifact.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Eye className="h-5 w-5 text-primary" />
                    <span>Status: {artifact.loan_status}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* You May Also Like Section */}
          {randomArtifacts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-24"
            >
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-serif font-bold text-foreground mb-12 text-center"
              >
                You May Also Like
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {randomArtifacts.map((randomArtifact, index) => (
                  <motion.div
                    key={randomArtifact._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                    className="group cursor-pointer transform transition-all duration-300 hover:shadow-2xl rounded-xl bg-card"
                    onClick={() => handleArtifactClick(randomArtifact._id)}
                  >
                    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300 z-10" />
                      <motion.img
                        src={randomArtifact.image}
                        alt={randomArtifact.artifact_name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                        }}
                      />
                      <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
                        <motion.div 
                          className="space-y-3"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.3 }}
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
          )}
        </div>

        {/* Full Image Modal */}
        <AnimatePresence>
          {showFullImage && (
            <ImageModal
              isOpen={showFullImage}
              onClose={() => setShowFullImage(false)}
              imageUrl={artifact.image}
              title={artifact.artifact_name}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default ArtifactDetail; 