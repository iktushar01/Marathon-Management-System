import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import errorAnimation from '../../assets/error.json';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 - Page Not Found";
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: 'spring', stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex flex-col justify-center items-center text-center px-4 overflow-hidden relative">
            <motion.div
                className="w-full max-w-2xl flex flex-col items-center relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className="w-64 sm:w-80 md:w-96"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                >
                    <Lottie animationData={errorAnimation} loop={true} />
                </motion.div>

                <motion.h1 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-600 text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-2"
                    variants={itemVariants}
                >
                    404 - Off Course
                </motion.h1>

                <motion.p 
                    className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-2 font-medium max-w-2xl leading-relaxed"
                    variants={itemVariants}
                >
                    You've taken a wrong turn on the race route! This page doesn't exist in our marathon map.
                </motion.p>

                <motion.div 
                    className="flex flex-wrap justify-center gap-4 mt-8"
                    variants={itemVariants}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-transparent border-2 border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 
                        hover:text-white hover:bg-opacity-10 transition-all"
                        onClick={() => navigate('/')}
                    >
                        Return to Start Line
                    </motion.button>
                </motion.div>

                <motion.div 
                    className="mt-12 text-gray-400 text-sm"
                    variants={itemVariants}
                >
                    <p>Error code: 404 | Status: Not Found</p>
                    <p className="mt-1">Don't worry - even the best runners sometimes take wrong turns!</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Error;