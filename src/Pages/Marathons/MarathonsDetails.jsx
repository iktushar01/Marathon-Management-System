import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRunning, FaCalendarAlt, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { motion } from "framer-motion";

const MarathonsDetails = () => {
  const navigate = useNavigate();
  const marathon = useLoaderData();
  const totalRegistrations = marathon.totalRegistrations || 0;

  // Date handling with proper timezone consideration
  const now = new Date();
  const startRegDate = new Date(marathon.startRegDate);
  const endRegDate = new Date(marathon.endRegDate);
  const marathonDate = new Date(marathon.marathonStartDate);

  // Calculate time remaining
  const timeUntilMarathon = marathonDate - now;
  const timeUntilRegOpen = startRegDate - now;

  // Registration status logic
  const isRegistrationNotStarted = now < startRegDate;
  const isRegistrationClosed = now > endRegDate;
  const isRegistrationOpen = !isRegistrationNotStarted && !isRegistrationClosed;

  const handleRegisterClick = () => {
    navigate(`/marathons/${marathon._id}/register`);
  };

  // Format dates for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Render function for countdown timers
  const renderTime = ({ remainingTime, label }) => {
    if (remainingTime === 0) {
      return (
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-sm font-bold text-yellow-500"
        >
          {label === "marathon" ? "The marathon has started!" : "Registration is open!"}
        </motion.div>
      );
    }

    const days = Math.floor(remainingTime / (3600 * 24));
    const hours = Math.floor((remainingTime % (3600 * 24)) / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);

    return (
      <div className="flex flex-col items-center">
        <motion.div 
          className="text-lg font-bold text-yellow-600"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {days}d {hours}h {minutes}m
        </motion.div>
        <div className="text-xs text-gray-400">until {label === "marathon" ? "marathon starts" : "registration opens"}</div>
      </div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-900"
    >
      {/* Hero Section */}
      <motion.div
        className="relative h-64 pt-20 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
        variants={itemVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/10 to-black/80"></div>
        <div className="relative px-6 py-2 text-center">
          <motion.h1 
            className="text-yellow-400 text-4xl md:text-6xl font-bold tracking-wide"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {marathon.title}
          </motion.h1>
          <motion.p 
            className="text-yellow-200 mt-4 text-xl"
            variants={itemVariants}
          >
            <FaCalendarAlt className="inline mr-2" />
            {formatDate(marathonDate)}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div 
          className="flex flex-col lg:flex-row gap-8"
          variants={containerVariants}
        >
          {/* Left Column */}
          <div className="lg:w-1/2 space-y-6">
            {/* Marathon Image */}
            <motion.div variants={itemVariants}>
              <img
                src={marathon.image}
                alt={marathon.title}
                className="w-full rounded-lg shadow-lg object-cover border-2 border-yellow-500"
              />
            </motion.div>
            
            {/* Countdown Timers */}
            <motion.div className="space-y-6" variants={containerVariants}>
              {/* Marathon Countdown */}
              {timeUntilMarathon > 0 && (
                <motion.div 
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500/30 flex flex-col items-center"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">Time Until Marathon</h3>
                  <CountdownCircleTimer
                    isPlaying
                    duration={Math.max(1, Math.floor(timeUntilMarathon / 1000))}
                    initialRemainingTime={Math.max(0, Math.floor(timeUntilMarathon / 1000))}
                    colors={['#f59e0b', '#d97706', '#b45309', '#92400e']}
                    colorsTime={[30 * 24 * 3600, 7 * 24 * 3600, 24 * 3600, 0]}
                    size={180}
                    strokeWidth={10}
                    trailColor="#1f2937"
                    onComplete={() => ({ shouldRepeat: false })}
                  >
                    {({ remainingTime }) => renderTime({ remainingTime, label: "marathon" })}
                  </CountdownCircleTimer>
                </motion.div>
              )}

              {/* Registration Countdown */}
              {isRegistrationNotStarted && timeUntilRegOpen > 0 && (
                <motion.div 
                  className="bg-gray-800 p-6 rounded-lg shadow-lg border border-yellow-500/30 flex flex-col items-center"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">Registration Opens In</h3>
                  <CountdownCircleTimer
                    isPlaying
                    duration={Math.max(1, Math.floor(timeUntilRegOpen / 1000))}
                    initialRemainingTime={Math.max(0, Math.floor(timeUntilRegOpen / 1000))}
                    colors={['#f59e0b', '#d97706', '#b45309', '#92400e']}
                    colorsTime={[30 * 24 * 3600, 7 * 24 * 3600, 24 * 3600, 0]}
                    size={180}
                    strokeWidth={10}
                    trailColor="#1f2937"
                    onComplete={() => ({ shouldRepeat: false })}
                  >
                    {({ remainingTime }) => renderTime({ remainingTime, label: "registration" })}
                  </CountdownCircleTimer>
                </motion.div>
              )}
            </motion.div>

            {/* Registration Count */}
            <motion.div 
              className="bg-gray-800 p-6 rounded-lg border border-yellow-500/30"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <HiUserGroup className="text-yellow-400 text-2xl mr-3" />
                <div>
                  <h4 className="font-semibold text-yellow-400 mb-1">
                    Total Registrations
                  </h4>
                  <p className="text-yellow-300 text-3xl font-bold">
                    {totalRegistrations}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Quick Info Card */}
           
          </div>

          {/* Right Column - Marathon Details */}
          <motion.div 
            className="lg:w-1/2 p-8 bg-gray-800 rounded-lg shadow-lg border border-yellow-500/30"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-3xl font-bold text-yellow-400 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              Event Details
            </motion.h2>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                About the Marathon
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {marathon.description}
              </p>
            </div>
             <motion.div 
              className="bg-gray-800 p-6 rounded-lg shadow border border-yellow-500/30 mb-8"
              variants={itemVariants}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center text-yellow-400">
                <FaRunning className="text-yellow-400 mr-2" />
                Quick Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="text-yellow-400 mr-3" />
                  <span className="text-gray-300">{marathon.location}</span>
                </li>
                <li className="flex items-center">
                  <FaRunning className="text-yellow-400 mr-3" />
                  <span className="text-gray-300">{marathon.distance}</span>
                </li>
              </ul>
            </motion.div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                className="bg-gray-700 p-4 rounded-lg border border-yellow-500/20"
                whileHover={{ y: -5 }}
              >
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center">
                  <FaRegCalendarCheck className="mr-2" />
                  Registration Period
                </h4>
                <p className="text-gray-300 mb-2">
                  {formatDate(startRegDate)} - {formatDate(endRegDate)}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isRegistrationOpen 
                    ? 'bg-green-900 text-green-300'
                    : isRegistrationNotStarted
                      ? 'bg-blue-900 text-blue-300'
                      : 'bg-red-900 text-red-300'
                }`}>
                  {isRegistrationOpen 
                    ? 'Open for Registration'
                    : isRegistrationNotStarted
                      ? 'Coming Soon'
                      : 'Registration Closed'}
                </div>
              </motion.div>

              <motion.div 
                className="bg-gray-700 p-4 rounded-lg border border-yellow-500/20"
                whileHover={{ y: -5 }}
              >
                <h4 className="font-semibold text-yellow-400 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Marathon Date
                </h4>
                <p className="text-gray-300">
                  {formatDate(marathonDate)}
                </p>
              </motion.div>
            </div>

            {/* Registration Button */}
            {isRegistrationOpen ? (
              <motion.button
                onClick={handleRegisterClick}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaRegCalendarCheck className="mr-2" />
                Register Now
              </motion.button>
            ) : (
              <motion.button
                disabled
                className={`w-full font-bold py-3 px-4 rounded-lg flex items-center justify-center ${
                  isRegistrationNotStarted
                    ? 'bg-blue-900 text-blue-300 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
                whileHover={{ scale: 1.01 }}
              >
                {isRegistrationNotStarted ? (
                  <>
                    <FaRegCalendarTimes className="mr-2" />
                    Registration Opens Soon
                  </>
                ) : (
                  <>
                    <FaRegCalendarTimes className="mr-2" />
                    Registration Closed
                  </>
                )}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MarathonsDetails;