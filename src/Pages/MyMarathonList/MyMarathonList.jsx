import React from 'react';
import { useLoaderData } from 'react-router-dom';

const MyMarathonList = () => {
    const marathons = useLoaderData();

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">My Created Marathons</h1>
            
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
                        {marathons.map((marathon) => (
                            <tr key={marathon._id} className="border-b border-gray-200 hover:bg-gray-50">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{marathon.title}</div>
                                </td>
                                <td className="px-4 py-3">
                                    {new Date(marathon.marathonStartDate).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3">{marathon.location}</td>
                                <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyMarathonList;