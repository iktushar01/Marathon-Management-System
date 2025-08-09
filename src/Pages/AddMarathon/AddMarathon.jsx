import React, { useContext, useState, forwardRef } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiAlignLeft,
  FiImage,
  FiChevronDown,
} from "react-icons/fi";
import { AuthContext } from "../../Contexts/AuthContext";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom date input component
const CustomDateInput = forwardRef(
  ({ value, onClick, placeholder, error }, ref) => (
    <button
      type="button"
      className={`w-full px-4 py-3 text-left rounded-lg bg-gray-700 text-gray-100 border ${
        error ? "border-red-500" : "border-gray-600 hover:border-yellow-400"
      } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none flex items-center justify-between`}
      onClick={onClick}
      ref={ref}
    >
      {value || <span className="text-gray-400">{placeholder}</span>}
      <FiCalendar className="text-amber-500" />
    </button>
  )
);

CustomDateInput.displayName = "CustomDateInput";

const AddMarathon = () => {
  const { user } = useContext(AuthContext);
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
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (!startRegDate) newErrors.startRegDate = "Start date is required";
    if (!endRegDate) newErrors.endRegDate = "End date is required";
    if (!marathonStartDate)
      newErrors.marathonStartDate = "Marathon date is required";

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
      userEmail: user?.email,
    };

    try {
      const res = await fetch("https://stridez-server.vercel.app/marathons", {
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

  return (
    <div className="min-h-screen bg-gray-900">
      <Helmet>
        <title>Add Marathon | Stridez</title>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-3">
            Create Your Marathon Event
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto text-lg">
            Fill out the details below to organize and launch your marathon
            event
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Information Card */}
          <div className="lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl shadow-xl overflow-hidden h-full border border-gray-700"
            >
              <div className="relative h-52 bg-gradient-to-r from-amber-800 to-yellow-900">
                <img
                  src="https://i.postimg.cc/sgpNVTNb/abdur-ahmanus-t-2-Ov-WCSd34-unsplash.jpg"
                  alt="Marathon"
                  className="w-full h-full object-cover mix-blend-overlay opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <h2 className="text-2xl font-bold text-white text-center">
                    Event Creation Guidelines
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                      <FiCalendar className="text-amber-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-100 text-lg">
                        Date Selection
                      </h3>
                      <p className="text-gray-300">
                        Ensure registration dates are before the marathon date
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                      <FiAward className="text-amber-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-100 text-lg">
                        Distance Options
                      </h3>
                      <p className="text-gray-300">
                        Provide clear distance options for participants
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="bg-amber-100 p-2 rounded-full flex-shrink-0">
                      <FiImage className="text-amber-600 text-lg" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-100 text-lg">
                        Event Image
                      </h3>
                      <p className="text-gray-300">
                        Use high-quality images that represent your event
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Form Section */}
          <div className="lg:w-2/3">
            <motion.form
              onSubmit={handleAddMarathon}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-800 rounded-xl shadow-xl overflow-hidden p-6 md:p-8 border border-gray-700"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400 border-b pb-3 border-gray-700">
                  Marathon Details
                </h2>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Marathon Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Marathon Title"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border ${
                      errors.title ? "border-red-500" : "border-gray-600"
                    } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.title && (
                    <p className="mt-2 text-sm text-red-400">{errors.title}</p>
                  )}
                </div>

                {/* Date Pickers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      Start Registration Date
                    </label>
                    <DatePicker
                      selected={startRegDate}
                      onChange={(date) => setStartRegDate(date)}
                      customInput={
                        <CustomDateInput
                          error={errors.startRegDate}
                          placeholder="Select start date"
                        />
                      }
                      minDate={new Date()}
                      selectsStart
                      startDate={startRegDate}
                      endDate={endRegDate}
                    />
                    {errors.startRegDate && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.startRegDate}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-100 mb-2">
                      End Registration Date
                    </label>
                    <DatePicker
                      selected={endRegDate}
                      onChange={(date) => setEndRegDate(date)}
                      customInput={
                        <CustomDateInput
                          error={errors.endRegDate}
                          placeholder="Select end date"
                        />
                      }
                      minDate={startRegDate || new Date()}
                      selectsEnd
                      startDate={startRegDate}
                      endDate={endRegDate}
                    />
                    {errors.endRegDate && (
                      <p className="mt-2 text-sm text-red-400">
                        {errors.endRegDate}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2">
                    Marathon Start Date
                  </label>
                  <DatePicker
                    selected={marathonStartDate}
                    onChange={(date) => setMarathonStartDate(date)}
                    customInput={
                      <CustomDateInput
                        error={errors.marathonStartDate}
                        placeholder="Select marathon date"
                      />
                    }
                    minDate={endRegDate || new Date()}
                  />
                  {errors.marathonStartDate && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.marathonStartDate}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <FiMapPin className="text-amber-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Event location"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border ${
                      errors.location ? "border-red-500" : "border-gray-600"
                    } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.location && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Distance */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <FiAward className="text-amber-500" />
                    Running Distance
                  </label>
                  <div className="relative">
                    <select
                      name="distance"
                      className={`w-full px-4 py-3 pr-10 rounded-lg bg-gray-700 text-gray-100 border ${
                        errors.distance ? "border-red-500" : "border-gray-600"
                      } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none appearance-none transition-colors`}
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
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiChevronDown className="text-amber-500" />
                    </div>
                  </div>
                  {errors.distance && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.distance}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <FiAlignLeft className="text-amber-500" />
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="4"
                    placeholder="Event description..."
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border ${
                      errors.description ? "border-red-500" : "border-gray-600"
                    } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors`}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-400">
                      {errors.description}
                    </p>
                  )}
                </div>

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-100 mb-2 flex items-center gap-2">
                    <FiImage className="text-amber-500" />
                    Marathon Image URL
                  </label>
                  <input
                    name="image"
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-700 text-gray-100 border ${
                      errors.image ? "border-red-500" : "border-gray-600"
                    } focus:border-yellow-400 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors`}
                  />
                  {errors.image && (
                    <p className="mt-2 text-sm text-red-400">{errors.image}</p>
                  )}
                  <div className="mt-3 flex items-center gap-2 text-sm text-amber-400">
                    <FiUpload className="text-amber-500" />
                    <span>Or upload an image (coming soon)</span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-gray-900 font-bold py-4 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
                      isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5 text-gray-900"
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
                </div>
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMarathon;
