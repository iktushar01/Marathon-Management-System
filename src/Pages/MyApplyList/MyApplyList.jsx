import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaEdit, FaTrash, FaTimes, FaSpinner } from "react-icons/fa";

const MyApplyList = () => {
  const registrations = useLoaderData();
  const { user } = useContext(AuthContext);

  // Filter registrations to only show those by the current user
  const myRegistrations = registrations.filter(
    (registration) => registration.userEmail === user.email
  );

  // State for update modal and form
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    additionalInfo: ''
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updateError, setUpdateError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

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

  // Handle delete button click
  const handleDeleteClick = (registration) => {
    setSelectedRegistration(registration);
    setShowDeleteModal(true);
    setDeleteError(null);
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

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const response = await fetch(`http://localhost:4000/registrations/${selectedRegistration._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      // Close modal on success
      setShowDeleteModal(false);
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Delete error:', error);
      setDeleteError(error.message || 'Error deleting registration');
    } finally {
      setIsDeleting(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedRegistration(null);
    setUpdateError(null);
    setDeleteError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-yellow-400 mb-8">
        My Marathon Registrations
      </h1>
      <p className="text-gray-100 max-w-2xl mx-auto">
            Manage all the marathons you've created
          </p>

      {myRegistrations.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-100">
            You haven't registered for any marathons yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
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
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded mr-2 transition flex items-center justify-center"
                      disabled={isUpdating}
                    >
                      <FaEdit className="mr-1" /> Update
                    </button>
                    <button
                      onClick={() => handleDeleteClick(registration)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded transition flex items-center justify-center"
                      disabled={isDeleting}
                    >
                      <FaTrash className="mr-1" /> Delete
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
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Update Registration</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
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
                  className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 flex items-center"
                  disabled={isUpdating}
                >
                  <FaTimes className="mr-1" /> Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center justify-center"
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" /> Updating...
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-1" /> Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Confirm Deletion</h2>
              <button 
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            {deleteError && (
              <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                {deleteError}
              </div>
            )}

            <p className="mb-6">
              Are you sure you want to delete your registration for <strong>{selectedRegistration?.marathonTitle}</strong>?
              This action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 flex items-center"
                disabled={isDeleting}
              >
                <FaTimes className="mr-1" /> Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 flex items-center justify-center"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" /> Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash className="mr-1" /> Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplyList;