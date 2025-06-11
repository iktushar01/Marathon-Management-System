import React from "react";
import { useLoaderData } from "react-router";

const MarathonRegister = () => {
  const marathon = useLoaderData();

  return (
    <div className="min-h-screen bg-black text-yellow-300">
      {/* Hero Section */}
      <div
        className="relative h-64 pt-16 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative px-6 py-2 text-center">
          <h1 className="text-yellow-300 text-4xl md:text-5xl font-bold tracking-wide mb-2">
            {marathon.title}
          </h1>
          <p className="text-yellow-200 text-lg">
            {new Date(marathon.marathonStartDate).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="container mx-auto px-4 py-12 ">
        <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Marathon Image */}
          <div className="md:w-1/2">
            <img
              src={marathon.image}
              alt={marathon.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Form Content */}
          <div className="p-8 md:p-10 md:w-1/2">
            <h2 className="text-2xl font-bold text-yellow-300 mb-6 text-center">
              Registration Form
            </h2>

            <form className="space-y-5">
              {/* Marathon Info (Readonly) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-yellow-200">
                    Marathon Title
                  </label>
                  <input
                    type="text"
                    value={marathon.title}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-yellow-200">
                    Start Date
                  </label>
                  <input
                    type="text"
                    value={new Date(
                      marathon.marathonStartDate
                    ).toLocaleDateString()}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* User Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-yellow-200">
                  Email
                </label>
                <input
                  type="email"
                  value={marathon.userEmail}
                  readOnly
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-yellow-200">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-yellow-200">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-yellow-200">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Additional Info */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-yellow-200">
                  Additional Information
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-700 rounded"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-yellow-200"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-black bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
                >
                  Register for Marathon
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(MarathonRegister);
