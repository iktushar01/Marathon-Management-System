import React from "react";
import Logo from "../../Components/Logo/Logo";
import { FaLinkedin, FaGithub, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative  bg-black text-white">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-black"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1 720 0.7C960 1 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>
      <div className="px-4 pt-12 mx-auto container md:px-24 lg:px-8">
        <div className="grid gap-10 row-gap-8 mb-8 lg:grid-cols-6">
          <Logo></Logo>

          <div className="grid grid-cols-2 gap-5 lg:col-span-4 md:grid-cols-3">
            <div>
              <p className="font-semibold tracking-wide text-teal-400">
                Explore
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/" className="hover:text-teal-300">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/marathons" className="hover:text-teal-300">
                    Marathons
                  </a>
                </li>
                <li>
                  <a href="/dashboard" className="hover:text-teal-300">
                    Dashboard
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-teal-400">
                Support
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/faq" className="hover:text-teal-300">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-teal-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/register" className="hover:text-teal-300">
                    Register
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-teal-400">Legal</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="/terms" className="hover:text-teal-300">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-teal-300">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-yellow-400 sm:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Marathon Management. All rights
            reserved.
          </p>
          <div className="flex mt-4 space-x-4 sm:mt-0">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-teal-500"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaFacebook className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
