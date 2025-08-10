import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MarathonsCard from "./MarathonsCard";
import { Helmet } from "react-helmet";

const Marathons = () => {
  const initialMarathons = useLoaderData();
  const [marathons, setMarathons] = useState(initialMarathons);
  const [sortConfig, setSortConfig] = useState({
    field: "createdAt",
    order: "desc",
  });

  const handleSortChange = (field, order) => {
    const sortedMarathons = [...marathons].sort((a, b) => {
      const dateA = new Date(a[field]);
      const dateB = new Date(b[field]);
      
      if (order === "asc") {
        return dateA - dateB;
      } else {
        return dateB - dateA;
      }
    });
    
    setMarathons(sortedMarathons);
    setSortConfig({ field, order });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Marathon | stridez</title>
      </Helmet>
      
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-64 flex items-center justify-center pt-18 md:pt-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/T2sbwf8W/pexels-dmitrii-eremin-67499966-15741250.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative px-6 py-2 rounded">
          <h1 className="text-yellow-300 text-4xl font-bold tracking-wide">
            Marathons
          </h1>
        </div>
      </div>

      {/* Sorting Controls */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 shadow-lg">
          <div className="w-full sm:w-auto">
            <h2 className="text-white text-xl font-semibold mb-2 sm:mb-0">
              Filter Events
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <label htmlFor="sort-field" className="block text-sm font-medium text-gray-300 mb-1">
                Sort by
              </label>
              <select
                id="sort-field"
                value={sortConfig.field}
                onChange={(e) => handleSortChange(e.target.value, sortConfig.order)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              >
                <option value="marathonStartDate">Marathon Date</option>
                <option value="startRegDate">Registration Start</option>
                <option value="createdAt">Date Added</option>
              </select>
            </div>
            
            <div className="flex-1 sm:flex-none">
              <label htmlFor="sort-order" className="block text-sm font-medium text-gray-300 mb-1">
                Order
              </label>
              <select
                id="sort-order"
                value={sortConfig.order}
                onChange={(e) => handleSortChange(sortConfig.field, e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Marathons Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {marathons.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl text-gray-300 font-medium">
              No marathons available at the moment
            </h3>
            <p className="text-gray-400 mt-2">
              Check back later for upcoming events
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {marathons.map((marathon) => (
              <MarathonsCard key={marathon._id} marathon={marathon} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marathons;