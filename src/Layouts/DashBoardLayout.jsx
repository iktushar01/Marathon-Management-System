import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SmoothFollower from "../Shared/Cursor/SmoothFollower";

const DashBoardLayout = () => {
  return (
    <div className="bg-[url('https://i.postimg.cc/B6DNk4DX/klim-musalimov-r-DMacl1-FDjw-unsplash.jpg')] bg-cover bg-center">
      <SmoothFollower />
      <Navbar />

      {/* Hero Section */}
      <div
        className="relative h-32 md:h-64 flex items-center justify-center pt-12 md:pt-16 bg-cover bg-center bg-no-repeat"
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
            Dashboard
          </h1>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="container mx-auto grid grid-cols-3 bg-gray-900 ">
        <NavLink
          to="/dashboard/add-marathon"
          className={({ isActive }) =>
            `text-center text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-3 font-semibold transition duration-300
      ${
        isActive
          ? "bg-yellow-400 text-black shadow-lg "
          : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black"
      }`
          }
        >
          Add Marathon
        </NavLink>

        <NavLink
          to="/dashboard/my-marathons"
          className={({ isActive }) =>
            `text-center text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-3 font-semibold transition duration-300
      ${
        isActive
          ? "bg-yellow-400 text-black shadow-lg "
          : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black "
      }`
          }
        >
          My Marathon List
        </NavLink>

        <NavLink
          to="/dashboard/my-applies"
          className={({ isActive }) =>
            `text-center text-sm sm:text-base px-2 sm:px-4 py-2 sm:py-3 font-semibold transition duration-300
      ${
        isActive
          ? "bg-yellow-400 text-black shadow-lg "
          : "bg-gray-800 text-white hover:bg-yellow-500 hover:text-black "
      }`
          }
        >
          My Apply List
        </NavLink>
      </div>

      {/* Dynamic Content */}
      <div className="min-h-screen container mx-auto">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default DashBoardLayout;
