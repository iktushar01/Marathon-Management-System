import React, { useState } from "react";
import Datepicker from "../../Components/DatePicker/Datepicker";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FiUpload, FiCalendar, FiMapPin, FiAward, FiAlignLeft, FiImage } from "react-icons/fi";

const AddMarathon = () => {
  const [startRegDate, setStartRegDate] = useState(null);
  const [endRegDate, setEndRegDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = (formData) => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.distance) newErrors.distance = "Distance is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (!startRegDate) newErrors.startRegDate = "Start date is required";
    if (!endRegDate) newErrors.endRegDate = "End date is required";
    if (!marathonStartDate) newErrors.marathonStartDate = "Marathon date is required";
    
    // Validate date logic
    if (startRegDate && endRegDate && startRegDate > endRegDate) {
      newErrors.endRegDate = "End date must be after start date";
    }
    
    if (marathonStartDate && endRegDate && marathonStartDate < endRegDate) {
      newErrors.marathonStartDate = "Marathon must be after registration ends";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddMarathon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.title.value,
      location: form.location.value,
      distance: form.distance.value,
      description: form.description.value,
      image: form.image.value,
    };

    if (!validateForm(formData)) return;

    setIsSubmitting(true);

    const MarathonData = {
      ...formData,
      startRegDate,
      endRegDate,
      marathonStartDate,
    };

    try {
      const res = await fetch("http://localhost:4000/marathons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(MarathonData),
      });

      const data = await res.json();

      if (data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Marathon added successfully",
          icon: "success",
          confirmButtonColor: "#F59E0B",
        });
        form.reset();
        setStartRegDate(null);
        setEndRegDate(null);
        setMarathonStartDate(null);
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Failed to add marathon",
          icon: "error",
          confirmButtonColor: "#F59E0B",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Server error while posting data",
        icon: "error",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            Create Your Marathon Event
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Fill out the details below to organize and launch your marathon event
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Information Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/3"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full">
              <div className="relative h-48 bg-gradient-to-r from-amber-400 to-yellow-500">
                <img
                  src="https://i.postimg.cc/sgpNVTNb/abdur-ahmanus-t-2-Ov-WCSd34-unsplash.jpg"
                  alt="Marathon"
                  className="w-full h-full object-cover mix-blend-overlay"
                />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h2 className="text-2xl font-bold text-white text-center">
                    Event Creation Guidelines
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FiCalendar className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Date Selection
                      </h3>
                      <p className="text-sm text-gray-600">
                        Ensure registration dates are before the marathon date
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FiAward className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Distance Options
                      </h3>
                      <p className="text-sm text-gray-600">
                        Provide clear distance options for participants
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <FiImage className="text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Event Image
                      </h3>
                      <p className="text-sm text-gray-600">
                        Use high-quality images that represent your event
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <motion.form
              onSubmit={handleAddMarathon}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white rounded-xl shadow-lg overflow-hidden p-6 md:p-8"
            >
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-2 border-amber-200">
                  Marathon Details
                </h2>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marathon Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="title"
                    placeholder="Marathon Title"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  />
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Registration Date
                  </label>
                  <div className="relative">
                    <Datepicker
                      value={startRegDate}
                      onChange={setStartRegDate}
                      placeholder="Select start date"
                      className={`w-full ${errors.startRegDate ? "border-red-500" : ""}`}
                    />
                    {errors.startRegDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.startRegDate}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Registration Date
                  </label>
                  <div className="relative">
                    <Datepicker
                      value={endRegDate}
                      onChange={setEndRegDate}
                      placeholder="Select end date"
                      className={`w-full ${errors.endRegDate ? "border-red-500" : ""}`}
                    />
                    {errors.endRegDate && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.endRegDate}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marathon Start Date
                </label>
                <div className="relative">
                  <Datepicker
                    value={marathonStartDate}
                    onChange={setMarathonStartDate}
                    placeholder="Select marathon date"
                    className={`w-full ${errors.marathonStartDate ? "border-red-500" : ""}`}
                  />
                  {errors.marathonStartDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.marathonStartDate}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiMapPin className="text-amber-500" />
                  Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Event location"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.location ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.location}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiAward className="text-amber-500" />
                  Running Distance
                </label>
                <div className="relative">
                  <select
                    name="distance"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.distance ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none bg-white`}
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Running Distance
                    </option>
                    <option value="5k">5K</option>
                    <option value="10k">10K</option>
                    <option value="21k">Half Marathon (21K)</option>
                    <option value="42k">Full Marathon (42K)</option>
                  </select>
                  {errors.distance && (
                    <p className="mt-1 text-sm text-red-600">{errors.distance}</p>
                  )}
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiAlignLeft className="text-amber-500" />
                  Description
                </label>
                <div className="relative">
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Event description..."
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description}
                    </p>
                  )}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FiImage className="text-amber-500" />
                  Marathon Image URL
                </label>
                <div className="relative">
                  <input
                    name="image"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.image ? "border-red-500" : "border-gray-300"
                    } focus:ring-2 focus:ring-amber-500 focus:border-transparent`}
                  />
                  {errors.image && (
                    <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                  <FiUpload className="text-amber-500" />
                  <span>Or upload an image (coming soon)</span>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    "Create Marathon Event"
                  )}
                </button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddMarathon;