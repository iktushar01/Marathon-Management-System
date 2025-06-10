import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaMapMarkerAlt, FaRunning, FaCalendarAlt, FaRegCalendarCheck, FaRegCalendarTimes } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const MarathonsDetails = () => {
  const marathon = useLoaderData();
  const registrationCount = marathon.registrationCount || 0;

  // Date handling with proper timezone consideration
  const now = new Date();
  const startRegDate = new Date(marathon.startRegDate);
  const endRegDate = new Date(marathon.endRegDate);
  const marathonDate = new Date(marathon.marathonStartDate);

  // Registration status logic
  const isRegistrationNotStarted = now < startRegDate;
  const isRegistrationClosed = now > endRegDate;
  const isRegistrationOpen = !isRegistrationNotStarted && !isRegistrationClosed;

  const handleRegisterClick = () => {
    window.location.href = `/marathons/${marathon._id}/register`;
  };

  // Format dates for display
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[url('https://i.postimg.cc/B6DNk4DX/klim-musalimov-r-DMacl1-FDjw-unsplash.jpg')] bg-cover bg-center">
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative px-6 py-2 text-center">
          <h1 className="text-yellow-300 text-4xl md:text-5xl font-bold tracking-wide">
            {marathon.title}
          </h1>
          <p className="text-white mt-2 text-lg">
            <FaCalendarAlt className="inline mr-2" />
            {formatDate(marathonDate)}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Marathon Image and Stats */}
          <div className="lg:w-1/2 space-y-6">
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            
            {/* Registration Count */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center">
                <HiUserGroup className="text-blue-800 text-2xl mr-3" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">
                    Total Registrations
                  </h4>
                  <p className="text-blue-600 text-3xl font-bold">
                    {registrationCount}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <FaRunning className="text-yellow-500 mr-2" />
                Quick Info
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-500 mr-3" />
                  <span>{marathon.location}</span>
                </li>
                <li className="flex items-center">
                  <FaRunning className="text-gray-500 mr-3" />
                  <span>{marathon.distance}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Marathon Details */}
          <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Event Details
            </h2>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                About the Marathon
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {marathon.description}
              </p>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaRegCalendarCheck className="mr-2" />
                  Registration Period
                </h4>
                <p className="text-gray-600 mb-2">
                  {formatDate(startRegDate)} - {formatDate(endRegDate)}
                </p>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  isRegistrationOpen 
                    ? 'bg-green-100 text-green-800'
                    : isRegistrationNotStarted
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {isRegistrationOpen 
                    ? 'Open for Registration'
                    : isRegistrationNotStarted
                      ? 'Coming Soon'
                      : 'Registration Closed'}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                  <FaCalendarAlt className="mr-2" />
                  Marathon Date
                </h4>
                <p className="text-gray-600">
                  {formatDate(marathonDate)}
                </p>
              </div>
            </div>

            {/* Registration Button */}
            {isRegistrationOpen ? (
              <button
                onClick={handleRegisterClick}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
              >
                <FaRegCalendarCheck className="mr-2" />
                Register Now
              </button>
            ) : (
              <button
                disabled
                className={`w-full font-bold py-3 px-4 rounded-lg flex items-center justify-center ${
                  isRegistrationNotStarted
                    ? 'bg-blue-100 text-blue-800 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-600 cursor-not-allowed'
                }`}
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
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonsDetails;