import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const UpcomingMarathon = ({ marathon }) => {
  const { _id, title, location, image, startRegDate, endRegDate } = marathon;

  return (
    <div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
        <div className="relative group">
          <img
            src={image}
            alt={title}
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Overlay that appears on hover */}
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <span className="text-4xl font-bold text-white mb-4">UPCOMING</span>
            <div className="text-white text-center space-y-2">
              <p className="text-xl font-semibold">{title}</p>
              <p className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {location}
              </p>
              <p className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                {format(new Date(startRegDate), "MMM d, yyyy")} –{" "}
                {format(new Date(endRegDate), "MMM d, yyyy")}
              </p>
            </div>
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default UpcomingMarathon;