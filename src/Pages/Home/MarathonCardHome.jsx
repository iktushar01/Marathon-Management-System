import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const MarathonsCardHome = ({ marathon }) => {
  const { _id, title, location, image, startRegDate, endRegDate } = marathon;

  return (
    <div className="bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-yellow-400">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <div className="p-6 space-y-3">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium text-gray-100">{location}</span>
        </div>
        
        <h2 className="text-2xl font-bold text-yellow-400 line-clamp-2">{title}</h2>
        
        <div className="flex items-center space-x-2 text-sm text-gray-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
          <span>
            {format(new Date(startRegDate), "MMM d, yyyy")} –{" "}
            {format(new Date(endRegDate), "MMM d, yyyy")}
          </span>
        </div>
        
        <div className="pt-2">
          <Link
            to={`/marathons/${_id}`}
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 shadow-sm"
          >
            View Details
            <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MarathonsCardHome;