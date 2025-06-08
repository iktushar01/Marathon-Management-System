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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center text-center px-4 overflow-hidden relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-yellow-400 bg-opacity-10"
                        style={{
                            width: Math.random() * 100 + 50,
                            height: Math.random() * 100 + 50,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, Math.random() * 100 - 50],
                            x: [0, Math.random() * 100 - 50],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                        }}
                    />
                ))}
            </div>

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
                    className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 text-4xl sm:text-5xl md:text-6xl font-bold mt-4 mb-2"
                    variants={itemVariants}
                >
                    404 - Lost in Space
                </motion.h1>

                <motion.p 
                    className="text-gray-300 text-lg sm:text-xl md:text-2xl mt-2 font-medium max-w-2xl leading-relaxed"
                    variants={itemVariants}
                >
                    Houston, we have a problem! The page you're looking for doesn't exist or has been moved.
                </motion.p>

                <motion.div 
                    className="flex flex-wrap justify-center gap-4 mt-8"
                    variants={itemVariants}
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-transparent border-2 border-yellow-500 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500 
                        hover:text-black hover:bg-opacity-10 transition-all"
                        onClick={() => navigate('/')}
                    >
                        Return Home
                    </motion.button>
                </motion.div>

                <motion.div 
                    className="mt-12 text-gray-400 text-sm"
                    variants={itemVariants}
                >
                    <p>Error code: 404 | Status: Not Found</p>
                    <p className="mt-1">Meanwhile, here's some space to explore...</p>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default Error;