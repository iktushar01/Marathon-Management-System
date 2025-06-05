import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router';

const SignIn = () => {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side Graphic (Hidden on Mobile) */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-[#1e014b] text-white">
        <div className="text-center px-6">
          <h1 className="text-4xl font-bold">Welcome To <span className="text-yellow-400">Our Stridez</span></h1>
          <p className="mt-4">Grursus mal suada faci lisis Lorem ipsum...</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-10">
        <form className="w-80 space-y-4">
          <h2 className="text-2xl font-semibold text-center">Login</h2>

          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            required
          />

          <button type="submit" className="btn btn-primary w-full">Log in</button>

          <div className="text-center">
            <p className="text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-500 underline">
                Register
              </Link>
            </p>
          </div>

          {/* Google Login */}
          <div className="text-center mt-4">
            <button
              
              type="button"
              className="flex items-center gap-2 justify-center border w-full py-2 rounded"
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