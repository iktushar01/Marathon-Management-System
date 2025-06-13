import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SmoothFollower from "../Shared/Cursor/SmoothFollower";
import { motion } from "framer-motion";

const DashBoardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 ">
      <SmoothFollower />
      <Navbar />

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
            Dashboard
          </h1>
        </div>
      </div>

      {/* Navigation Buttons */}
      <motion.div 
        className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6  mt-10 md:mt-16 rounded-3xl p-6 md:p-8 shadow-2xl border "
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {[
          { to: "/dashboard/add-marathon", text: "Add Marathon" },
          { to: "/dashboard/my-marathons", text: "My Marathon List" },
          { to: "/dashboard/my-applies", text: "My Apply List" },
        ].map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            className={({ isActive }) =>
              `relative overflow-hidden text-center px-4 py-3 md:py-4 font-medium rounded-xl transition-all duration-300 transform hover:-translate-y-1
              ${
                isActive
                  ? "bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative z-10">{item.text}</span>
                {isActive && (
                  <motion.span
                    className="absolute inset-0 bg-yellow-500 z-0"
                    layoutId="navActiveBg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </motion.div>

      {/* Dynamic Content */}
      <motion.div
        className=" container mx-auto  py-10 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Outlet />
      </motion.div>

      <Footer />
    </div>
  );
};

export default DashBoardLayout;