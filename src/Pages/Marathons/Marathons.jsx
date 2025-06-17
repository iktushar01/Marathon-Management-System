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

  const handleSortChange = async (field, order) => {
    try {
      const response = await fetch(
        `/marathons?sortBy=${field}&sortOrder=${order}`
      );
      const sortedMarathons = await response.json();
      setMarathons(sortedMarathons);
      setSortConfig({ field, order });
    } catch (error) {
      console.error("Error sorting marathons:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title> Marathon | stridez</title>
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

      {/* Enhanced Sorting Controls */}
      <div className="container mx-auto px-6 pt-6 flex justify-end space-x-4">
        <div className="flex items-center space-x-2">
          <span className="text-white">Sort by:</span>
          <select
            value={sortConfig.field}
            onChange={(e) => handleSortChange(e.target.value, sortConfig.order)}
            className="bg-gray-800 text-white border border-yellow-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="createdAt">Creation Date</option>
            <option value="marathonStartDate">Marathon Date</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-white">Order:</span>
          <select
            value={sortConfig.order}
            onChange={(e) => handleSortChange(sortConfig.field, e.target.value)}
            className="bg-gray-800 text-white border border-yellow-400 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Marathons Grid */}
      <div className="container mx-auto">
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6">
          {marathons.map((marathon) => (
            <MarathonsCard key={marathon._id} marathon={marathon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marathons;
