import React from "react";
import { useLoaderData } from "react-router-dom";

const MarathonsDetails = () => {
  const marathon = useLoaderData();
  const registrationCount = marathon.registrationCount || 0;

  return (
    <div className="min-h-screen bg-[url('https://i.postimg.cc/B6DNk4DX/klim-musalimov-r-DMacl1-FDjw-unsplash.jpg')] bg-cover bg-center">
        {/* Hero Section */}
      <div
        className="relative h-64 md:h-64 flex items-center justify-center pt-18 md:pt-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Content */}
        <div className="relative px-6 py-2 rounded">
          <h1 className="text-yellow-300 text-4xl font-bold tracking-wide">
            Marathons Details
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Marathon Image */}
          <div className="lg:w-1/2">
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            
            {/* Registration Count */}
            <div className="mt-6 bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 text-lg">
                Total Registrations
              </h4>
              <p className="text-blue-600 text-3xl font-bold">
                {registrationCount}
              </p>
            </div>
          </div>

          {/* Marathon Details */}
          <div className="lg:w-1/2 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Event Details
            </h2>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-4">
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-lg">{marathon.location}</span>
            </div>

            {/* Distance */}
            <div className="flex items-center text-gray-600 mb-6">
              <svg
                className="w-5 h-5 mr-2 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
              <span className="text-lg">{marathon.distance}</span>
            </div>

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
                <h4 className="font-semibold text-gray-800 mb-2">
                  Registration Period
                </h4>
                <p className="text-gray-600">
                  {new Date(marathon.startRegDate).toLocaleDateString()} -{" "}
                  {new Date(marathon.endRegDate).toLocaleDateString()}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Marathon Date
                </h4>
                <p className="text-gray-600">
                  {new Date(marathon.marathonStartDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Action Button - You might want to add this */}
            <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarathonsDetails;