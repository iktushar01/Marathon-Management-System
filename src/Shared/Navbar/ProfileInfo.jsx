import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Contexts/AuthContext'; // Adjust path as needed
import { FaUserCircle, FaEnvelope, FaPhone, FaClock, FaCalendarAlt, FaIdBadge, FaCog } from 'react-icons/fa';
import { MdErrorOutline } from 'react-icons/md';
import { CgSpinner } from 'react-icons/cg';

const ProfileInfo = () => {
  const { user, loading } = useContext(AuthContext);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] text-gray-500">
        <CgSpinner className="animate-spin text-yellow-500 h-16 w-16" />
        <p className="ml-4 text-lg">Loading profile data...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-[100px] flex flex-col justify-center items-center p-6 bg-red-50 rounded-lg shadow-md mx-auto max-w-lg text-center border border-red-200">
        <MdErrorOutline className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-red-700 mb-2">Not Logged In</h2>
        <p className="text-red-600">
          Please log in to view your profile information.
        </p>
        {/* You could add a login button here */}
        {/* <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Log In</button> */}
      </div>
    );
  }

  const profileSections = [
    {
      title: 'Contact Information',
      icon: <FaEnvelope className="w-5 h-5 mr-2 text-yellow-600" />,
      items: [
        { label: 'Email', value: user?.email, icon: <FaEnvelope className="mr-2 text-gray-500" /> },
        { label: 'Phone', value: user?.phoneNumber || 'N/A', icon: <FaPhone className="mr-2 text-gray-500" /> },
      ],
    },
    {
      title: 'Account Details',
      icon: <FaCog className="w-5 h-5 mr-2 text-yellow-600" />,
      items: [
        {
          label: 'Last Sign-in',
          value: user?.metadata?.lastSignInTime
            ? new Date(user.metadata.lastSignInTime).toLocaleString()
            : 'N/A',
          icon: <FaClock className="mr-2 text-gray-500" />,
        },
        {
          label: 'Account Created',
          value: user?.metadata?.creationTime
            ? new Date(user.metadata.creationTime).toLocaleDateString()
            : 'N/A',
          icon: <FaCalendarAlt className="mr-2 text-gray-500" />,
        },
        { label: 'User ID (UID)', value: user?.uid, icon: <FaIdBadge className="mr-2 text-gray-500" /> },
        {
          label: 'Auth Provider',
          value: user?.providerData?.[0]?.providerId
            ? user.providerData?.[0]?.providerId.replace('firebase.com', 'Email/Password')
            : 'N/A',
          icon: <FaCog className="mr-2 text-gray-500" />,
        },
      ],
    },
    // Add more sections as needed
  ];

  return (
    <div className="container min-h-screen mx-auto flex justify-center p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden md:flex md:max-w-4xl mx-auto border border-gray-200">
        {/* Profile Header / Avatar Section */}
        <div className="md:w-1/3 p-8 bg-gradient-to-br from-yellow-400 to-yellow-600 text-white flex flex-col items-center justify-center text-center">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt="User profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto border-4 border-yellow-300 object-cover shadow-md mb-4"
              referrerPolicy="no-referrer"
            />
          ) : (
            <FaUserCircle className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-yellow-700 flex items-center justify-center text-white shadow-md mb-4" />
          )}
          <h2 className="text-2xl font-bold mb-2">{user?.displayName || 'Guest User'}</h2>
          <p className="text-gray-100 text-md mb-1">{user?.email || 'email@example.com'}</p>
          {user?.phoneNumber && (
            <p className="text-gray-100 text-sm">
              <FaPhone className="inline-block mr-1" /> {user.phoneNumber}
            </p>
          )}
          <button
            onClick={() => alert('Edit Profile clicked!')} // Replace with actual edit logic
            className="mt-6 px-6 py-2 bg-white text-yellow-600 rounded-full shadow-md hover:bg-yellow-100 transition-colors font-semibold text-sm"
          >
            Edit Profile
          </button>
        </div>

        {/* Profile Details Section */}
        <div className="md:w-2/3 p-6 sm:p-8 lg:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-2 border-gray-200 flex items-center">
            <FaUserCircle className="w-6 h-6 mr-2 text-gray-600" /> Profile Information
          </h3>

          {profileSections.map((section, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                {section.icon} {section.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-gray-800">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex items-center">
                    {item.icon}
                    <span className="font-medium">{item.label}:</span>
                    <p className="ml-1 font-semibold text-gray-900 break-words">{item.value || 'N/A'}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;