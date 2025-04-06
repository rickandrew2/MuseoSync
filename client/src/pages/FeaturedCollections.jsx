import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import axiosInstance from "@/lib/axios";

const FeaturedCollections = () => {
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const artifactsPerPage = 6;

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        console.log("Fetching artifacts...");
        const response = await axiosInstance.get('/artifacts');
        console.log("Received artifacts:", response.data);
        setArtifacts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error details:', err);
        setError(err.message || 'Failed to fetch artifacts');
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, []);

  // Calculate pagination values
  const indexOfLastArtifact = currentPage * artifactsPerPage;
  const indexOfFirstArtifact = indexOfLastArtifact - artifactsPerPage;
  const currentArtifacts = artifacts.slice(indexOfFirstArtifact, indexOfLastArtifact);
  const totalPages = Math.ceil(artifacts.length / artifactsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Collections</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Featured Collections
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked selection of extraordinary artifacts that showcase the rich cultural heritage of our region.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Showing {indexOfFirstArtifact + 1}-{Math.min(indexOfLastArtifact, artifacts.length)} of {artifacts.length} artifacts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentArtifacts.map((artifact, index) => (
            <motion.div
              key={artifact._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group cursor-pointer ${index === artifacts.length - 1 && artifacts.length % 2 !== 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
              onClick={() => navigate(`/artifact/${artifact._id}`)}
            >
              <div className="relative overflow-hidden rounded-xl bg-black/5 shadow-lg hover:shadow-xl transition-all duration-300">
                {/* Location Badge - Always visible */}
                <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {artifact.location}
                  </span>
                </div>

                {/* Main Image Container */}
                <div className="aspect-[4/3] relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 opacity-60 group-hover:opacity-50 transition-opacity duration-300 z-10" />
                  <motion.img
                    src={artifact.image}
                    alt={artifact.artifact_name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                    }}
                  />
                  
                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6">
                    <motion.div 
                      className="space-y-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-2xl font-serif font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {artifact.artifact_name}
                      </h3>
                      <p className="text-sm text-gray-200 line-clamp-2 group-hover:text-white/90 transition-colors duration-300">
                        {artifact.description}
                      </p>
                      
                      {/* Learn More Button */}
                      <div className="pt-2">
                        <span className="inline-flex items-center text-primary text-sm font-semibold">
                          Learn More
                          <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-background border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx + 1}
                  onClick={() => paginate(idx + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === idx + 1
                      ? 'bg-primary text-white'
                      : 'bg-background border border-border hover:bg-accent'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-background border border-border hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedCollections; 