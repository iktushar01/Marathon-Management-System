import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

const MyMarathonList = () => {
  const marathons = useLoaderData();
  const { user } = useContext(AuthContext);

  // Filter marathons to only show those created by the current user
  const myMarathons = marathons.filter(
    (marathon) => marathon.userEmail === user.email
  );
  // or use ID if you have it: marathon.creatorId === user.uid

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2 text-center">
                    My Created Marathons
                </h1>
                <p className="text-white text-center mb-8">
                    View and manage all the marathon events you've created
                </p>

      {myMarathons.length === 0 ? (
        <p className="text-gray-600">You haven't created any marathons yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-3 text-left">Title</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {myMarathons.map((marathon) => (
                <tr
                  key={marathon._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium">{marathon.title}</div>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(marathon.marathonStartDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">{marathon.location}</td>
                  <td className="px-4 py-3">
                    <div className="flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm">
                        Update
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyMarathonList;
