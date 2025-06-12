import React, { useState, useEffect } from "react";
import BannerSlider from "./BannerSlider";
import MarathonsCardHome from "./MarathonCardHome";
import { useLoaderData } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import UpcomingMarathon from "./UpcomingMarathon";
import DownloadablesSection from "./DownloadablesSection";
import SponsorShowcase from "./SponsorShowcase";
import MarathonFAQs from "./MarathonFAQs";

const Home = () => {
  const allMarathons = useLoaderData();
  const [displayedMarathons, setDisplayedMarathons] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to select 6 random marathons
  const getRandomMarathons = () => {
    const shuffled = [...allMarathons].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  };

  // Set initial random marathons
  useEffect(() => {
    setDisplayedMarathons(getRandomMarathons());
  }, [allMarathons]);

  // Set up interval to change marathons every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setDisplayedMarathons(getRandomMarathons());
        setIsAnimating(false);
      }, 1000); // Duration matches animation
    }, 500000); // 50 seconds

    return () => clearInterval(interval);
  }, [allMarathons]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateY: 90,
      scale: 0.8,
    },
    show: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      rotateY: -90,
      scale: 0.8,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="bg-gray-900">
      <BannerSlider></BannerSlider>
      <div className="container mx-auto ">
        <div className="text-center text-yellow-400 py-8">
          <h1 className="text-4xl font-bold mb-2">Marathon</h1>
          <p className="text-lg max-w-xl mx-auto text-white">
            Join our thrilling marathon event where endurance meets excitement.
            Discover routes, register easily, and get ready to run!
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6"
          variants={containerVariants}
          initial="hidden"
          animate={isAnimating ? "hidden" : "show"}
        >
          <AnimatePresence>
            {displayedMarathons.map((marathon) => (
              <motion.div
                key={marathon._id}
                variants={cardVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
              >
                <MarathonsCardHome marathon={marathon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        <div>
          <div className="text-center text-yellow-400 py-8">
            <h1 className="text-4xl font-bold mb-2">Upcoming Marathon</h1>
            <p className="text-lg max-w-xl mx-auto text-white">
              Join our thrilling marathon event where endurance meets
              excitement. Discover routes, register easily, and get ready to
              run!
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
            {displayedMarathons.map((marathon) => (
              <div key={marathon._id}>
                <UpcomingMarathon  marathon ={marathon} />
              </div>
            ))}
          </div>
       
        </div>
           <DownloadablesSection/>
           
      </div>
      <SponsorShowcase/>
      <div className="container mx-auto">
        <MarathonFAQs/>
      </div>
    </div>
  );
};

export default Home;
