import React, { useState } from "react";
import Datepicker from "../../Components/DatePicker/Datepicker";

const AddMarathon = () => {
  const [startRegDate, setStartRegDate] = useState(null);
  const [endRegDate, setEndRegDate] = useState(null);
  const [marathonStartDate, setMarathonStartDate] = useState(null);

  const handleAddMarathon = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const location = form.location.value;
    const distance = form.distance.value;
    const description = form.description.value;
    const image = form.image.value;

    const MarathonData = {
      title,
      location,
      distance,
      description,
      image,
      startRegDate,
      endRegDate,
      marathonStartDate,
    };

    console.log(MarathonData);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Image Section */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
        <img
          src="https://i.postimg.cc/sgpNVTNb/abdur-ahmanus-t-2-Ov-WCSd34-unsplash.jpg"
          alt="Marathon Event"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

        {/* Content */}
        <div className="relative z-20 text-white text-center px-6 py-8 rounded-lg mx-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Create Your <span className="text-yellow-400">Marathon Event</span>
          </h1>
          <p className="mt-4 text-sm lg:text-base">
            Organize and launch marathons with ease...
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 bg-[url('https://i.postimg.cc/qvbjBWGb/adrien-olichon-il-VYjf0-J378-unsplash.jpg')] bg-cover bg-center min-h-screen">
        <form
          onSubmit={handleAddMarathon}
          className="w-11/12 max-w-lg space-y-5 bg-white/90 p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Add Marathon Details
          </h2>

          <div>
            <label className="block text-gray-700 mb-1">Marathon Title</label>
            <input
              type="text"
              name="title"
              placeholder="Marathon Title"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Datepicker
              label="Start Registration Date"
              value={startRegDate}
              onChange={setStartRegDate}
              placeholder="Start Date"
            />
            <Datepicker
              label="End Registration Date"
              value={endRegDate}
              onChange={setEndRegDate}
              placeholder="End Date"
            />
          </div>

          <Datepicker
            label="Marathon Start Date"
            value={marathonStartDate}
            onChange={setMarathonStartDate}
            placeholder="Marathon Date"
          />

          <div>
            <label className="block text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Running Distance</label>
            <select
              name="distance"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                Select Running Distance
              </option>
              <option value="25k">25K</option>
              <option value="10k">10K</option>
              <option value="3k">3K</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Description"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Marathon Image URL
            </label>
            <input
              name="image"
              type="text"
              placeholder="Marathon Image URL"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 font-semibold rounded transition duration-300 btn"
          >
            Submit Marathon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMarathon;
