import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false); 
      } else {
        setShowNavbar(true); 
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        About
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/signin"
        className={({ isActive }) =>
          isActive ? "text-blue-700 font-semibold" : "hover:text-blue-600"
        }
      >
        Sign In
      </NavLink>
      <NavLink to="/register">
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 mt-2 lg:mt-0">
          Register
        </button>
      </NavLink>
    </>
  );

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -80 }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "tween" }}
      className="fixed border-b bg-white w-full z-50 shadow"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <div className="flex items-center">
          <img
            className="w-14"
            src="https://i.postimg.cc/MpXx3PwJ/stridez.png"
            alt="stridez-logo"
          />
          <div className="text-2xl font-bold text-blue-700 ml-2">Stridez</div>
        </div>

        <div className="lg:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <nav className="hidden lg:flex gap-6 items-center">{navLinks}</nav>
      </div>

      {/* Mobile Menu with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
            className="bg-white p-5 flex flex-col gap-4 shadow-lg lg:hidden"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
