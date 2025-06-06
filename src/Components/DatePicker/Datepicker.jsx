import React from "react";

const Datepicker = ({ label, value, onChange, placeholder }) => {
  // Format the date for the input (yyyy-MM-ddTHH:mm)
  const formatDateForInput = (date) => {
    if (!date) return '';
    const iso = new Date(date).toISOString();
    return iso.slice(0, 16);
  };

  const handleChange = (e) => {
    const selectedDate = new Date(e.target.value);
    onChange(selectedDate);
  };

  return (
    <div className="w-full">
      {label && <label className="block text-gray-700 mb-1">{label}</label>}
      <input
        type="datetime-local"
        value={formatDateForInput(value)}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none focus:ring-2 focus:ring-yellow-300  text-gray-800"
      />
    </div>
  );
};

export default Datepicker;
