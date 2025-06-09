import React from "react";
import { useLoaderData } from "react-router-dom";
import MarathonsCard from "./MarathonsCard";

const Marathons = () => {
  const marathons = useLoaderData();
  return (
    <div className="min-h-screen bg-[url('https://i.postimg.cc/B6DNk4DX/klim-musalimov-r-DMacl1-FDjw-unsplash.jpg')] bg-cover bg-center">
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
            Marathons
          </h1>
        </div>
      </div>
      {/* marathons on Grid */}
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
