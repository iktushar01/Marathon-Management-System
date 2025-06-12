import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="mt-4 text-gray-300 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;