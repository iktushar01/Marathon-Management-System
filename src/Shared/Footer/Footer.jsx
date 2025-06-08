import React from "react";
import Logo from "../../Components/Logo/Logo";
import { FaLinkedin, FaGithub, FaFacebook, FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const links = {
    explore: [
      { name: "Home", href: "/" },
      { name: "Marathons", href: "/marathons" },
      { name: "Dashboard", href: "/dashboard" },
    ],
    support: [
      { name: "FAQs", href: "/faq" },
      { name: "Contact Us", href: "/contact" },
      { name: "Register", href: "/register" },
    ],
    legal: [
      { name: "Terms", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: <FaLinkedin className="w-5 h-5" />, href: "https://linkedin.com", color: "hover:text-blue-400" },
    { icon: <FaGithub className="w-5 h-5" />, href: "https://github.com", color: "hover:text-teal-500" },
    { icon: <FaFacebook className="w-5 h-5" />, href: "https://facebook.com", color: "hover:text-blue-600" },
  ];

  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Wave divider */}
      <div className="absolute top-0 left-0 right-0 h-12 transform -translate-y-1/2 overflow-hidden">
        <svg 
          viewBox="0 0 1440 54" 
          className="absolute top-0 left-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            className="text-gray-900"
            d="M0 22L120 16.7C240 11 480 1 720 0.7C960 1 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
          />
        </svg>
      </div>

      <div className="container px-4 pt-16 mx-auto sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-6">
          {/* Logo Section */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-gray-400">
              Empowering runners and organizers with the best marathon management platform.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-4 md:grid-cols-3">
            {Object.entries(links).map(([section, items]) => (
              <div key={section}>
                <h3 className="text-sm font-semibold tracking-wider text-teal-400 uppercase">
                  {section}
                </h3>
                <ul className="mt-4 space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="flex items-center text-base text-gray-300 transition duration-300 hover:text-teal-300 group"
                      >
                        <FaArrowRight className="w-3 h-3 mr-2 text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center pt-8 mt-8 border-t border-gray-800 sm:flex-row sm:justify-between mb-10">
          <p className="text-sm text-gray-500">
            © {currentYear} Marathon Management. All rights reserved.
          </p>
          
          <div className="flex mt-4 space-x-6 sm:mt-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 transition-colors duration-300 ${social.color}`}
                aria-label={social.href.replace('https://', '')}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);