import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaEdit, FaTrash, FaTimes, FaSpinner, FaRunning, FaCalendarAlt, FaUser, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Shared/Loading/Loading";
import { Helmet } from "react-helmet";

const MyApplyList = () => {
  const { user } = useContext(AuthContext);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
  const [errors, setErrors] = useState({});

  // Fetch registrations on component mount and when user changes
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        setLoading(true);
        setError(null);
        if (!user?.email) return;
        
        const response = await fetch(`https://stridez-server.vercel.app/myRegistrations/${user.email}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registrations');
        }
        const data = await response.json();
        setRegistrations(data || []);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching registrations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, [user?.email]);

  // Filter registrations based on search term
  const filteredRegistrations = registrations.filter((registration) => 
    registration.marathonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
    setErrors({});
  };

  // Handle delete button click
  const handleDeleteClick = (registration) => {
    setSelectedRegistration(registration);
    setShowDeleteModal(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[0-9]{10,15}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Please enter 10-15 digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle update submission
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsUpdating(true);

    try {
      const response = await fetch(`https://stridez-server.vercel.app/registrations/${selectedRegistration._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update registration');
      }

      // Update local state
      const updatedRegistrations = registrations.map(reg => 
        reg._id === selectedRegistration._id ? { ...reg, ...formData } : reg
      );
      setRegistrations(updatedRegistrations);

      Swal.fire({
        title: "Success!",
        text: "Registration updated successfully",
        icon: "success",
        confirmButtonColor: "#F59E0B",
      });
      setShowUpdateModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update registration",
        icon: "error",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch(`https://stridez-server.vercel.app/registrations/${selectedRegistration._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete registration');
      }

      // Update local state
      setRegistrations(registrations.filter(reg => reg._id !== selectedRegistration._id));

      Swal.fire({
        title: "Success!",
        text: "Registration deleted successfully",
        icon: "success",
        confirmButtonColor: "#F59E0B",
      });
      setShowDeleteModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete registration",
        icon: "error",
        confirmButtonColor: "#F59E0B",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Close modal
  const handleCloseModal = () => {
    setShowUpdateModal(false);
    setShowDeleteModal(false);
    setSelectedRegistration(null);
    setErrors({});
  };

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 text-center max-w-md">
          <p className="text-red-500 text-lg mb-4">Something went wrong</p>
          <p className="text-gray-600 mb-4">
            We couldn't load your registrations. Please try again later.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>My Apply List | stridez</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            My Marathon Registrations
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Manage all your marathon registrations
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by marathon title..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <FaTimes className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-gray-600 mb-4">
              <FaRunning className="mx-auto text-4xl text-yellow-400 mb-3" />
              {searchTerm 
                ? `No registrations found for "${searchTerm}"`
                : "You haven't registered for any marathons yet."}
            </div>
            {!searchTerm && (
              <p className="text-gray-500 mb-4">
                Find exciting marathons to participate in!
              </p>
            )}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 px-4 py-2 text-yellow-500 hover:text-yellow-600 font-medium border border-yellow-500 rounded-lg"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Marathon
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Participant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRegistrations.map((registration) => (
                    <tr key={registration._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{registration.marathonTitle}</div>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                          <FaRunning className="mr-1 text-yellow-500" />
                          {registration.marathonDistance}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaCalendarAlt className="mr-1 text-yellow-500" />
                          {new Date(registration.marathonStartDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <FaUser className="mr-1 text-yellow-500" />
                          {`${registration.firstName} ${registration.lastName}`}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{registration.contactNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleUpdateClick(registration)}
                            className="text-blue-600 hover:text-blue-800 flex items-center"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(registration)}
                            className="text-red-600 hover:text-red-800 flex items-center"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Update Modal */}
        {showUpdateModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Update Registration</h2>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleUpdateSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.contactNumber ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      placeholder="10-15 digit phone number"
                    />
                    {errors.contactNumber && (
                      <p className="mt-1 text-sm text-red-600">{errors.contactNumber}</p>
                    )}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Information</label>
                    <textarea
                      name="additionalInfo"
                      rows="4"
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Any special requirements or notes..."
                    />
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      disabled={isUpdating}
                    >
                      <FaTimes /> Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center gap-2"
                      disabled={isUpdating}
                    >
                      {isUpdating ? (
                        <>
                          <FaSpinner className="animate-spin" /> Updating...
                        </>
                      ) : (
                        <>
                          <FaEdit /> Update
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Confirm Deletion</h2>
                  <button 
                    onClick={handleCloseModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
                
                <p className="mb-6 text-gray-600">
                  Are you sure you want to delete your registration for <strong className="text-red-500">"{selectedRegistration?.marathonTitle}"</strong>?
                  This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                    disabled={isDeleting}
                  >
                    <FaTimes /> Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2"
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <>
                        <FaSpinner className="animate-spin" /> Deleting...
                      </>
                    ) : (
                      <>
                        <FaTrash /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplyList;