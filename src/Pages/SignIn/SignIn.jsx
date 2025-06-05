import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom'; // Corrected import

const SignIn = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side with Background Video */}
      <div className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="https://res.cloudinary.com/dv13zq4xo/video/upload/v1749092827/Sony_A7S_III_X_Fitness_Commercial_s0auyl.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Foreground Content */}
        <div className="relative z-10 text-white text-center px-6 py-8 rounded-lg mx-4">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
            Welcome to <span className="text-yellow-400">Our Stridez</span>
          </h1>
          <p className="mt-4 text-sm lg:text-base">
            The <strong>Marathon Management System</strong> helps organize and manage marathon events by connecting organizers and participants. Sign up to access dashboards, register for events, and manage your progress easily.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10 bg-[url('https://i.postimg.cc/5N2L0MJd/nordwood-themes-R53t-Tg6-J4c-unsplash.jpg')] bg-cover bg-center min-h-screen">
        <form className="w-80 space-y-5 my-30 md:my-0">
          <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 font-semibold rounded transition duration-300"
          >
            Log in
          </button>

          <div className="text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-yellow-500 underline">
                Register
              </Link>
            </p>
          </div>

          {/* Google Login */}
          <div className="text-center">
            <button
              type="button"
              className="flex items-center gap-2 justify-center border-2 border-yellow-400 py-2 w-full rounded hover:bg-yellow-50 transition"
            >
              <FcGoogle size={22} />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
