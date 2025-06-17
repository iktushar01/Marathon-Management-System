import React from 'react';
import { FaFilePdf, FaDownload, FaEye } from 'react-icons/fa';
import { motion } from 'framer-motion';

const files = [
  {
    id: 1,
    name: "Beginner Training Plan",
    url: "/pdfs/Nike-Run-Club-Marathon-Training-Plan-Audio-Guided-Runs_compressed.pdf",
    type: "pdf",
    size: "1.2 MB",
    preview: "12-week plan with audio-guided runs for beginners",
    category: "Training"
  },
  {
    id: 2,
    name: "Marathon Nutrition Guide",
    url: "/pdfs/Marathon_Nutrition_Guide_compressed.pdf",
    type: "pdf",
    size: "980 KB",
    preview: "Complete fueling guide for before/during/after race",
    category: "Nutrition"
  },
  {
    id: 3,
    name: "Marathon Gadget Guide",
    url: "/pdfs/Tech_Tools_Guide_Marathon_2025_compressed.pdf",
    type: "pdf",
    size: "650 KB",
    preview: "Latest tech tools to enhance marathon performance",
    category: "Gear"
  }
];

const DownloadablesSection = () => {
  return (
    <div className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-3 sm:mb-4">
            RUNNER RESOURCES
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Essential downloads to power your marathon journey
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 10px 25px -5px rgba(234, 179, 8, 0.3)"
              }}
              className="bg-gray-800 rounded-none border-2 border-yellow-400 overflow-hidden flex flex-col h-full"
            >
              {/* Card Header */}
              <div className="bg-yellow-400 p-3 sm:p-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <FaFilePdf className="text-gray-900 text-xl sm:text-2xl" />
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
                    {file.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex-grow flex flex-col">
                <div className="mb-3 sm:mb-4">
                  <span className="inline-block bg-gray-700 text-yellow-400 text-xs px-2 py-1 rounded mb-2">
                    {file.category}
                  </span>
                  <p className="text-sm sm:text-base text-gray-300 line-clamp-3">
                    {file.preview}
                  </p>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm text-gray-400 mt-auto mb-4 sm:mb-6">
                  <span>Format: {file.type.toUpperCase()}</span>
                  <span>Size: {file.size}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 sm:gap-3">
                  <a
                    href={file.url}
                    download
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-yellow-400 text-gray-900 font-medium py-2 px-3 sm:px-4 hover:bg-yellow-500 transition-colors text-sm sm:text-base"
                  >
                    <FaDownload className="text-xs sm:text-sm" /> 
                    <span>Download</span>
                  </a>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 sm:gap-2 bg-gray-700 text-yellow-400 font-medium py-2 px-3 sm:px-4 hover:bg-gray-600 transition-colors text-sm sm:text-base"
                  >
                    <FaEye className="text-xs sm:text-sm" /> 
                    <span>Live View</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DownloadablesSection;