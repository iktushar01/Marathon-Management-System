import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import RegisterButton from "../../Components/Buttons/RegisterButton";
import Logo from "../../Components/Logo/Logo";
import { AuthContext } from "../../Contexts/AuthContext";
import LogOutBtn from "../../Components/Buttons/LogOutBtn";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // const handleSignOut = () =>{
  //   signOutUser()
  //   .then(() =>{
  //     console.log('signout user')
  //   })
  //   .catch(error =>{
  //     console.log(error)
  //   })
  // }

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

  const underlineHover =
    "relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-yellow-500 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100";

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `${
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-500"
          } ${underlineHover}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/marathons"
        className={({ isActive }) =>
          `${
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-500"
          } ${underlineHover}`
        }
      >
        Marathons
      </NavLink>
      {user ? (
        <>
       <div className="flex justify-center"> <LogOutBtn></LogOutBtn></div>
        </>
       
      ) : (
        <>
          {" "}
          <NavLink
            to="/signin"
            className={({ isActive }) =>
              `${
                isActive
                  ? "text-yellow-400 font-semibold"
                  : "hover:text-yellow-500"
              } ${underlineHover}`
            }
          >
            Sign In
          </NavLink>
          <NavLink to="/register">
            <div className="mt-2 lg:mt-0">
              <RegisterButton />
            </div>
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -80 }}
      transition={{ duration: 0.4, ease: "easeInOut", type: "tween" }}
      className="fixed border-b border-yellow-400 bg-black w-full z-50 shadow"
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-0 md:py-3">
        <Logo></Logo>
        <div
          className="lg:hidden text-3xl text-yellow-400 cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        <nav className="hidden lg:flex gap-6 items-center text-white font-semibold">
          {navLinks}
        </nav>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobileMenu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut", type: "tween" }}
            className="bg-black text-yellow-400 text-center p-5 flex flex-col gap-4 shadow-lg lg:hidden"
          >
            {navLinks}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
