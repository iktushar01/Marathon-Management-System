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

  // State for modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);

  // Handle update button click
  const handleUpdateClick = (registration) => {
    setSelectedRegistration(registration);
    setShowUpdateModal(true);
  };

  // Handle delete button click
  const handleDeleteClick = (registration) => {
    setSelectedRegistration(registration);
    setShowDeleteModal(true);
  };

  // Close modals
  const handleCloseModals = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedRegistration(null);
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
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(registration)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
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
      {showUpdateModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Registration</h2>

            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  defaultValue={selectedRegistration.firstName}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  defaultValue={selectedRegistration.lastName}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  defaultValue={selectedRegistration.contactNumber}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Additional Info
                </label>
                <textarea
                  defaultValue={selectedRegistration.additionalInfo}
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCloseModals}
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRegistration && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6">
              Are you sure you want to delete your registration for "
              {selectedRegistration.marathonTitle}"?
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCloseModals}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Delete Registration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;
