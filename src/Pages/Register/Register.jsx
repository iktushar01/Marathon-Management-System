import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side with Background Video */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://res.cloudinary.com/dv13zq4xo/video/upload/v1749092827/Sony_A7S_III_X_Fitness_Commercial_s0auyl.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className="relative z-10 text-white text-center px-6 py-8 rounded-lg mx-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Join <span className="text-yellow-400">Our Stridez</span>
          </h1>
          <p className="mt-4 text-sm lg:text-base">
            Register now to manage and participate in marathons with our full-stack platform built for both organizers and runners.
          </p>
        </div>
      </div>

      {/* Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10">
        <form className="w-80 space-y-5 my-30 md:my-0">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Register</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            required
          />

          <input
            type="text"
            name="photoURL"
            placeholder="Photo URL"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 font-semibold rounded transition duration-300"
          >
            Register
          </button>

          <p className="text-sm text-center">
            Already have an account?{' '}
            <Link to="/signin" className="text-yellow-500 underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
