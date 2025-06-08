import React from "react";
import { useLoaderData } from "react-router";

const MarathonsDetails = () => {
    const { title } = useLoaderData()
  return (
    <div>
      {/* Hero Section */}
      <div
        className="relative h-32 md:h-64 flex items-center justify-center pt-12 md:pt-16 bg-cover bg-center bg-no-repeat"
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
            Marathons Details
          </h1>
        </div>
      </div>

      <div className="min-h-screen container mx-auto"><p>{title}</p></div>
    </div>
  );
};

export default MarathonsDetails;
