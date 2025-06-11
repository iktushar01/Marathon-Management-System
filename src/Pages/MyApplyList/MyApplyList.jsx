import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";

const MyApplyList = () => {
  const registrations = useLoaderData();
  const { user } = useContext(AuthContext);

  // Filter registrations to only show those by the current user
  const myRegistrations = registrations.filter(
    (registration) => registration.userEmail === user.email
  );

  // State for update modal and form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    additionalInfo: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  // Handle update button click
  const handleUpdateClick = (registration) => {
    setSelectedRegistration(registration);
    setFormData({
      firstName: registration.firstName,
      lastName: registration.lastName,
      contactNumber: registration.contactNumber,
      additionalInfo: registration.additionalInfo || ''
    });
    setShowUpdateModal(true);
    setUpdateError(null);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    setUpdateError(null);

    try {
      const response = await fetch(`http://localhost:4000/registrations/${selectedRegistration._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update registration');
      }

      // Close modal on success
      setShowUpdateModal(false);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Update error:', error);
      setUpdateError(error.message || 'Error updating registration');
    } finally {
      setIsUpdating(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setSelectedRegistration(null);
    setUpdateError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400">
        My Marathon Registrations
      </h1>

      {myRegistrations.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-100">
            You haven't registered for any marathons yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Marathon Title</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {myRegistrations.map((registration) => (
                <tr
                  key={registration._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">{registration.marathonTitle}</td>
                  <td className="py-4 px-4">
                    {new Date(
                      registration.marathonStartDate
                    ).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">{`${registration.firstName} ${registration.lastName}`}</td>
                  <td className="py-4 px-4">{registration.contactNumber}</td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() => handleUpdateClick(registration)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                      disabled={isUpdating}
                    >
                      Update
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition opacity-50 cursor-not-allowed"
                      disabled
                      title="Delete functionality coming soon"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Registration</h2>
            
            {updateError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {updateError}
              </div>
            )}

            <form onSubmit={handleUpdateSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Contact Number</label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                  pattern="[0-9]{10,15}"
                  title="Please enter 10-15 digit phone number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Additional Info</label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                  disabled={isUpdating}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Updating...
                    </>
                  ) : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;