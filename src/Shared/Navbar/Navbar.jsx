import React, { useState, useEffect, useContext, useCallback } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RegisterButton from "../../Components/Buttons/RegisterButton";
import Logo from "../../Components/Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext";
import LogOutBtn from "../../Components/Buttons/LogOutBtn";
import UserAvatar from "./UserAvatar";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Hide navbar on scroll down
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const underlineHover =
    "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100";

  const navLinkClasses = (isActive) =>
    `${
      isActive
        ? "text-yellow-400 font-semibold"
        : "text-white hover:text-yellow-500"
    } ${underlineHover} transition-colors duration-200 px-2 py-1 rounded-md`;

  const createNavLink = (to, text, isButton = false) => {
    if (isButton) {
      return (
        <NavLink to={to} onClick={closeMenu}>
          <div className="mt-2 lg:mt-0">
            <RegisterButton />
          </div>
        </NavLink>
      );
    }
    return (
      <NavLink
        to={to}
        className={({ isActive }) => navLinkClasses(isActive)}
        onClick={closeMenu}
      >
        {text}
      </NavLink>
    );
  };

  const navLinks = (
    <>
      {createNavLink("/", "Home")}
      {createNavLink("/marathons", "Marathons")}
      {createNavLink("/privacy", "Privacy")}
      {createNavLink("/terms", "terms")}
      {user ? (
        <>
          {createNavLink("/dashboard", "Dashboard")}
          <div className="flex items-center gap-4">
            <UserAvatar />
            <LogOutBtn />
          </div>
        </>
      ) : (
        <>
          {createNavLink("/signin", "Login")}
          {createNavLink("/register", "", true)}
        </>
      )}
    </>
  );

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -80 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed border-b border-yellow-400 bg-black/95 backdrop-blur-sm w-full z-50 shadow-lg"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-3">
        <Logo />

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-8 items-center text-lg font-medium">
          {navLinks}
        </nav>

        {/* Mobile Menu Button */}
        <button
          aria-label="Toggle menu"
          className="lg:hidden text-3xl text-yellow-400 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded p-1 transition-all"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-black/95 backdrop-blur-sm overflow-hidden lg:hidden"
          >
            <div className="flex flex-col gap-4 p-6 items-center text-lg font-medium">
              {navLinks}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
