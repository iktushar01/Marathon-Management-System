import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt, FaArrowRight } from "react-icons/fa";

const MarathonsCardHome = ({ marathon }) => {
  const { _id, title, location, image, startRegDate, endRegDate } = marathon;

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-400">
      {/* Image container - full width with fixed aspect ratio */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      {/* Content container - flex-grow to maintain consistent height */}
      <div className="flex flex-col flex-grow p-6 space-y-3">
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-medium text-gray-100 truncate">{location}</span>
        </div>
        
        <h2 className="text-xl md:text-2xl font-bold text-yellow-400 line-clamp-2">{title}</h2>
        
        <div className="flex items-center space-x-2 text-sm text-gray-200">
          <FaCalendarAlt className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            {format(new Date(startRegDate), "MMM d, yyyy")} –{" "}
            {format(new Date(endRegDate), "MMM d, yyyy")}
          </span>
        </div>
        
        {/* Push button to bottom */}
        <div className="mt-auto pt-4">
          <Link
            to={`/marathons/${_id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-sm"
          >
            View Details
            <FaArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonsCardHome;