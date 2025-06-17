import React from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiLock, FiEyeOff, FiUserCheck } from 'react-icons/fi';
import { Helmet } from 'react-helmet';

const Privacy = () => {
  const privacyPoints = [
    {
      icon: <FiShield className="text-yellow-400 text-2xl" />,
      title: "Data Protection",
      content: "We implement industry-standard security measures to protect your information."
    },
    {
      icon: <FiLock className="text-yellow-400 text-2xl" />,
      title: "Encryption",
      content: "All sensitive data is encrypted both in transit and at rest."
    },
    {
      icon: <FiEyeOff className="text-yellow-400 text-2xl" />,
      title: "Minimal Collection",
      content: "We only collect what we need to provide our services."
    },
    {
      icon: <FiUserCheck className="text-yellow-400 text-2xl" />,
      title: "Your Control",
      content: "You can manage your privacy settings at any time."
    }
  ];

  return (
    <div className="bg-gray-900 text-gray-100">
      <Helmet>
        <title>Privacy | stridez</title>
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
            Privacy
          </h1>
        </div>
      </div>

      {/* Privacy Content */}
      <div className="container min-h-screen mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {privacyPoints.map((point, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-yellow-400/30 transition-all"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-gray-700 rounded-lg">
                    {point.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">{point.title}</h3>
                    <p className="text-gray-300">{point.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-10 rounded-xl border border-gray-700">
            <h2 className="text-2xl md:text-3xl font-semibold text-yellow-400 mb-6">
              Our Commitment to Your Privacy
            </h2>

            <p className="mb-6 leading-relaxed text-gray-300">
              At <span className="text-yellow-400 font-medium">Stridez</span>, we respect your privacy and are committed to protecting your personal information through our compliance with this policy.
            </p>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4 pb-2 border-b border-gray-700">
                  Information We Collect
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Account information (email, username, profile details)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Event registration and participation data</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>Technical data including IP address, browser type, and device information</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4 pb-2 border-b border-gray-700">
                  How We Use Your Information
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>To provide and maintain our service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>To notify you about changes to our service</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>To allow you to participate in interactive features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow-400 mr-2">•</span>
                    <span>To provide customer support</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-yellow-300 mb-4 pb-2 border-b border-gray-700">
                  Data Security
                </h3>
                <p className="text-gray-300">
                  We implement appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including encryption, access controls, and regular security assessments.
                </p>
              </div>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Last updated: June 13, 2025. We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                For any questions about this Privacy Policy, please contact us at privacy@stridez.com.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;