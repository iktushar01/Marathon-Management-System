import React from 'react';
import Lottie from 'lottie-react';
import runningAnimation from '../../assets/loading.json';
const Loading = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="w-32 h-32 mx-auto">
                    <Lottie 
                        animationData={runningAnimation} 
                        loop={true} 
                        autoplay={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default Loading;