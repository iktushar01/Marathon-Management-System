import React from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiBook,
  FiUsers,
} from "react-icons/fi";
import { Helmet } from "react-helmet";

const Terms = () => {
  const keySections = [
    {
      icon: <FiCheckCircle className="text-blue-400 text-2xl" />,
      title: "Acceptance of Terms",
      content:
        "By using our services, you agree to these terms and our Privacy Policy.",
    },
    {
      icon: <FiAlertTriangle className="text-blue-400 text-2xl" />,
      title: "Prohibited Conduct",
      content: "You agree not to misuse the services or help others do so.",
    },
    {
      icon: <FiBook className="text-blue-400 text-2xl" />,
      title: "Content Ownership",
      content:
        "You retain rights to your content, but grant us license to use it.",
    },
    {
      icon: <FiUsers className="text-blue-400 text-2xl" />,
      title: "Account Responsibility",
      content: "You're responsible for all activities under your account.",
    },
  ];

  return (
    <div className="bg-gray-900 text-gray-100">
      <Helmet>
        <title>Terms | stridez</title>
      </Helmet>
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
            Terms
          </h1>
        </div>
      </div>

      {/* Terms Content */}
      <div className="container min-h-screen mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {keySections.map((section, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-400/30 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">
                      {section.title}
                    </h3>
                    <p className="text-gray-300">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
              Terms and Conditions
            </h2>

            <p className="mb-6 leading-relaxed text-gray-300">
              Welcome to{" "}
              <span className="text-blue-400 font-medium">Stridez</span>. These
              Terms of Service ("Terms") govern your access to and use of our
              website, services, and applications.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4 pb-2 border-b border-gray-700">
                  1. Your Relationship With Us
                </h3>
                <p className="text-gray-300 mb-4">
                  These Terms form a legally binding agreement between you and
                  Stridez regarding your use of the Services.
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      You must be at least 13 years old to use our Services
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      You're responsible for your account and all activity on it
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Don't share your account credentials with others
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4 pb-2 border-b border-gray-700">
                  2. Acceptable Use
                </h3>
                <p className="text-gray-300 mb-4">
                  You agree not to misuse the Stridez services or help others do
                  so. This includes:
                </p>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Don't breach these Terms or our policies</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Don't harm or threaten to harm others</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>
                      Don't spam, phish, or engage in fraudulent activity
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Don't interfere with or disrupt our Services</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4 pb-2 border-b border-gray-700">
                  3. Content
                </h3>
                <p className="text-gray-300 mb-4">
                  You retain ownership rights in your content, but by using our
                  Services you grant us a worldwide license to use, host, store,
                  reproduce, and create derivative works.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-blue-300 mb-4 pb-2 border-b border-gray-700">
                  4. Termination
                </h3>
                <p className="text-gray-300">
                  We may suspend or terminate your access to our Services if you
                  violate these Terms or any applicable laws. You may stop using
                  our Services at any time.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                These Terms are effective as of June 13, 2025. We may modify
                these Terms at any time. If we make material changes, we'll
                provide notice through our Services.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                For questions about these Terms, please contact us at
                legal@stridez.com.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
