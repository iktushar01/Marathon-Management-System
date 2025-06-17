import React from "react";
import { useLoaderData } from "react-router-dom";
import BannerSlider from "./BannerSlider";
import MarathonsCardHome from "./MarathonCardHome";
import { motion } from "framer-motion";
import UpcomingMarathon from "./UpcomingMarathon";
import DownloadablesSection from "./DownloadablesSection";
import SponsorShowcase from "./SponsorShowcase";
import MarathonFAQs from "./MarathonFAQs";
import { Helmet } from "react-helmet";

const Home = () => {
  const marathons = useLoaderData();

  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-900">
      <Helmet>
        <title>Home | stridez</title>
      </Helmet>
      <BannerSlider />
      
      <div className="container mx-auto">
        {/* Featured Marathons Section */}
        <section className="py-12">
          <div className="text-center text-yellow-400 mb-12">
            <h1 className="text-4xl font-bold mb-2">Featured Marathons</h1>
            <p className="text-lg max-w-xl mx-auto text-white">
              Join our thrilling marathon events where endurance meets excitement.
            </p>
          </div>

          <motion.div
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {marathons.map((marathon) => (
              <motion.div
                key={marathon._id}
                variants={cardVariants}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MarathonsCardHome marathon={marathon} />
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Upcoming Marathons Section */}
        <section className="py-12">
          <div className="text-center text-yellow-400 mb-12">
            <h1 className="text-4xl font-bold mb-2">Upcoming Marathons</h1>
            <p className="text-lg max-w-xl mx-auto text-white">
              Discover upcoming events and register today!
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6">
            {marathons.map((marathon) => (
              <UpcomingMarathon key={`upcoming-${marathon._id}`} marathon={marathon} />
            ))}
          </div>
        </section>

        <DownloadablesSection />
      </div>

      <SponsorShowcase />
      
      <div className="container mx-auto py-12">
        <MarathonFAQs />
      </div>
    </div>
  );
};

export default Home;