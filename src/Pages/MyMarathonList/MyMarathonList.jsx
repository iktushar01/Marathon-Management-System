import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaEdit, FaTrash, FaTimes, FaSpinner, FaRunning, FaCalendarAlt, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import Datepicker from "../../Components/DatePicker/Datepicker";
import Loading from "../../Shared/Loading/Loading";

const MyMarathonList = () => {
  const { user } = useContext(AuthContext);

  console.log(user.accessToken)
  const [marathons, setMarathons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // State for modals
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMarathon, setSelectedMarathon] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    distance: '',
    description: '',
    image: '',
    startRegDate: null,
    endRegDate: null,
    marathonStartDate: null
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch marathons on component mount or when user changes
  useEffect(() => {
    const fetchMarathons = async () => {
      try {
        if (!user?.email) return;
        
        setLoading(true);
        const response = await fetch(`https://stridez-server.vercel.app/MyMarathon/${user.email}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch marathons');
        }
        
        const data = await response.json();
        setMarathons(data);
      } catch (err) {
        setError(err.message);
        Swal.fire({
          title: "Error!",
          text: err.message || "Failed to load marathons",
          icon: "error",
          confirmButtonColor: "#F59E0B",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMarathons();
  }, [user?.email]);

  // Filter marathons based on search term
  const filteredMarathons = marathons.filter(marathon => 
    marathon.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle update button click
  const handleUpdateClick = (marathon) => {
    setSelectedMarathon(marathon);
    setFormData({
      title: marathon.title,
      location: marathon.location,
      distance: marathon.distance,
      description: marathon.description,
      image: marathon.image,
      startRegDate: new Date(marathon.startRegDate),
      endRegDate: new Date(marathon.endRegDate),
      marathonStartDate: new Date(marathon.marathonStartDate)
    });
    setShowUpdateModal(true);
    setErrors({});
  };

  // Handle delete button click
  const handleDeleteClick = (marathon) => {
    setSelectedMarathon(marathon);
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

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.distance) newErrors.distance = "Distance is required";
    if (!formData.description) newErrors.description = "Description is required";
    if (!formData.image) newErrors.image = "Image URL is required";
    if (!formData.startRegDate) newErrors.startRegDate = "Start date is required";
    if (!formData.endRegDate) newErrors.endRegDate = "End date is required";
    if (!formData.marathonStartDate) newErrors.marathonStartDate = "Marathon date is required";

    if (formData.startRegDate && formData.endRegDate && formData.startRegDate > formData.endRegDate) {
      newErrors.endRegDate = "End date must be after start date";
    }

    if (formData.marathonStartDate && formData.endRegDate && formData.marathonStartDate < formData.endRegDate) {
      newErrors.marathonStartDate = "Marathon must be after registration ends";
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
      const response = await fetch(`https://stridez-server.vercel.app/marathons/${selectedMarathon._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          startRegDate: formData.startRegDate.toISOString(),
          endRegDate: formData.endRegDate.toISOString(),
          marathonStartDate: formData.marathonStartDate.toISOString()
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update marathon');
      }

      Swal.fire({
        title: "Success!",
        text: "Marathon updated successfully",
        icon: "success",
        confirmButtonColor: "#F59E0B",
      });
      
      // Refresh the marathon list
      const updatedResponse = await fetch(`https://stridez-server.vercel.app/MyMarathon/${user.email}`);
      const updatedData = await updatedResponse.json();
      setMarathons(updatedData);
      
      setShowUpdateModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to update marathon",
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
      const response = await fetch(`https://stridez-server.vercel.app/marathons/${selectedMarathon._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete marathon');
      }

      Swal.fire({
        title: "Success!",
        text: "Marathon deleted successfully",
        icon: "success",
        confirmButtonColor: "#F59E0B",
      });
      
      // Refresh the marathon list
      const updatedResponse = await fetch(`https://stridez-server.vercel.app/MyMarathon/${user.email}`);
      const updatedData = await updatedResponse.json();
      setMarathons(updatedData);
      
      setShowDeleteModal(false);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Failed to delete marathon",
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
    setSelectedMarathon(null);
    setErrors({});
  };

  if (loading) {
    return <Loading/>
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
            My Created Marathons
          </h1>
          <p className="text-gray-100 max-w-2xl mx-auto">
            Manage all the marathons you've created
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

        {filteredMarathons.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-gray-600">
              {searchTerm 
                ? `No marathons found for "${searchTerm}"`
                : "You haven't created any marathons yet."}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 text-yellow-500 hover:text-yellow-600 font-medium"
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
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Distance
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Registration Period
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-100 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMarathons.map((marathon) => (
                    <tr key={marathon._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{marathon.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 capitalize">{marathon.distance}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{marathon.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(marathon.marathonStartDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(marathon.startRegDate).toLocaleDateString()} - {new Date(marathon.endRegDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleUpdateClick(marathon)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteClick(marathon)}
                            className="text-red-600 hover:text-red-900 flex items-center"
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
                  <h2 className="text-2xl font-bold text-gray-800">Update Marathon</h2>
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.location ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      />
                      {errors.location && (
                        <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Registration Date</label>
                      <Datepicker
                        value={formData.startRegDate}
                        onChange={(date) => setFormData({...formData, startRegDate: date})}
                        className={`w-full ${errors.startRegDate ? "border-red-500" : ""}`}
                      />
                      {errors.startRegDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.startRegDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Registration Date</label>
                      <Datepicker
                        value={formData.endRegDate}
                        onChange={(date) => setFormData({...formData, endRegDate: date})}
                        className={`w-full ${errors.endRegDate ? "border-red-500" : ""}`}
                      />
                      {errors.endRegDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.endRegDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Marathon Date</label>
                      <Datepicker
                        value={formData.marathonStartDate}
                        onChange={(date) => setFormData({...formData, marathonStartDate: date})}
                        className={`w-full ${errors.marathonStartDate ? "border-red-500" : ""}`}
                      />
                      {errors.marathonStartDate && (
                        <p className="mt-1 text-sm text-red-600">{errors.marathonStartDate}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Running Distance</label>
                      <select
                        name="distance"
                        value={formData.distance}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.distance ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      >
                        <option value="">Select Distance</option>
                        <option value="5k">5K</option>
                        <option value="10k">10K</option>
                        <option value="21k">Half Marathon (21K)</option>
                        <option value="42k">Full Marathon (42K)</option>
                      </select>
                      {errors.distance && (
                        <p className="mt-1 text-sm text-red-600">{errors.distance}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.image ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                      />
                      {errors.image && (
                        <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      rows="4"
                      value={formData.description}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.description ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-yellow-500 focus:border-transparent`}
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                    )}
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
                  Are you sure you want to delete the marathon <strong className="text-red-500">"{selectedMarathon?.title}"</strong>?
                  This action will permanently remove all data associated with this marathon.
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

export default MyMarathonList;