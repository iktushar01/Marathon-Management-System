import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaClock,
  FaCalendarAlt,
  FaIdBadge,
  FaCog,
} from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

const ProfileInfo = () => {
  const { user, loading } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] text-white">
        <div className="flex items-center">
          <CgSpinner className="animate-spin text-yellow-500 h-16 w-16" />
          <p className="ml-4 text-lg">Loading profile data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-[100px] flex flex-col justify-center items-center p-6 bg-gray-800 rounded-lg mx-auto max-w-lg text-center">
        <MdErrorOutline className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-yellow-500 mb-2">
          Not Logged In
        </h2>
        <p className="text-white">
          Please log in to view your profile information.
        </p>
      </div>
    );
  }

  const profileSections = [
    {
      title: "Contact Information",
      icon: <FaEnvelope className="w-5 h-5 mr-2 text-yellow-500" />,
      items: [
        {
          label: "Email",
          value: user?.email,
          icon: <FaEnvelope className="mr-2 text-white" />,
        },
        {
          label: "Phone",
          value: user?.phoneNumber || "Not provided",
          icon: <FaPhone className="mr-2 text-white" />,
        },
      ],
    },
    {
      title: "Account Details",
      icon: <FaCog className="w-5 h-5 mr-2 text-yellow-500" />,
      items: [
        {
          label: "Last Sign-in",
          value: user?.metadata?.lastSignInTime
            ? new Date(user.metadata.lastSignInTime).toLocaleString()
            : "Not available",
          icon: <FaClock className="mr-2 text-white" />,
        },
        {
          label: "Account Created",
          value: user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : "Not available",
          icon: <FaCalendarAlt className="mr-2 text-white" />,
        },
        {
          label: "User ID",
          value: user?.uid,
          icon: <FaIdBadge className="mr-2 text-white" />,
        },
        {
          label: "Auth Provider",
          value: user?.providerData?.[0]?.providerId
            ? user.providerData[0].providerId
                .replace("google.com", "Google")
                .replace("facebook.com", "Facebook")
                .replace("password", "Email/Password")
            : "Email/Password",
          icon: <FaCog className="mr-2 text-white" />,
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-64 pt-16 flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative px-6 py-2 text-center">
          <h1 className="text-yellow-300 text-4xl md:text-5xl font-bold tracking-wide mb-2">
            My Profile
          </h1>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 bg-gray-900 text-white text-center">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="User profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500 object-cover mb-4"
                referrerPolicy="no-referrer"
              />
            ) : (
              <FaUserCircle className="w-32 h-32 rounded-full mx-auto text-yellow-500 mb-4" />
            )}
            <h2 className="text-2xl font-bold text-yellow-500 mb-1">
              {user?.displayName || "Guest User"}
            </h2>
            <p className="text-gray-300">{user?.email || "email@example.com"}</p>
          </div>

          {/* Profile Details */}
          <div className="p-6 space-y-8">
            {/* Profile Header */}
            <div className="space-y-3">
              <h3 className="text-2xl font-bold text-yellow-500 flex items-center">
                <FaUserCircle className="w-6 h-6 mr-3" />
                Profile Information
              </h3>
              <div className="h-px w-full bg-gray-600"></div>
            </div>

            {/* Profile Sections */}
            <div className="space-y-8">
              {profileSections.map((section, index) => (
                <div key={index} className="space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center space-x-3">
                    <div className="text-yellow-500">
                      {React.cloneElement(section.icon, {
                        className: "w-5 h-5",
                      })}
                    </div>
                    <h4 className="text-lg font-semibold text-yellow-500">
                      {section.title}
                    </h4>
                  </div>

                  {/* Section Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-start space-x-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200"
                      >
                        <div className="text-yellow-500 mt-0.5">
                          {React.cloneElement(item.icon, {
                            className: "w-4 h-4",
                          })}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-yellow-400 mb-1">
                            {item.label}
                          </p>
                          <p className="text-gray-00 text-sm break-words">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;