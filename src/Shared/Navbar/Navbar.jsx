import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // React Icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <header className="border-2 bg-white fixed top-2 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
       <div className="flex justify-center items-center">
         <div><img className="w-14" src="https://i.postimg.cc/MpXx3PwJ/stridez.png" alt="stridez-logo" /></div>
        <div className="text-2xl font-bold text-blue-700">Stridez</div>
       </div>
        <div className="lg:hidden text-3xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>
        <nav className="hidden lg:flex gap-6 items-center">
          {navLinks}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white p-5 flex flex-col gap-4 shadow-lg lg:hidden">
          {navLinks}
        </div>
      )}
    </header>
  );
};

export default Navbar;
