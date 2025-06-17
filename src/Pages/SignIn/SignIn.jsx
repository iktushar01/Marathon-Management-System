import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { Helmet } from "react-helmet";

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const location = useLocation();
  const redirect = location.state || "/";
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSignIn = (e) => {
    e.preventDefault();
    setError(null);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have been logged in successfully',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then(() => {
          navigate(redirect);
        });
      })
      .catch((error) => {
        let errorMessage = 'Login failed. Please try again.';
        
        // Handle specific Firebase errors
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password. Please try again.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many attempts. Account temporarily locked.';
        }

        setError(errorMessage);
        
        Swal.fire({
          title: 'Login Error',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'Try Again',
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col md:flex-row"
    >
            <Helmet>
        <title>Sign In | stridez</title>
      </Helmet>
      {/* Left Side with Background Video */}
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden"
      >
        {/* Background Video */}
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

        {/* Foreground Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 text-white text-center px-6 py-8 rounded-lg mx-4"
        >
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-4xl lg:text-5xl font-bold leading-tight"
          >
            Welcome to <span className="text-yellow-400">Our Stridez</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-4 text-sm lg:text-base"
          >
            The <strong>Marathon Management System</strong> helps organize and
            manage marathon events by connecting organizers and participants.
            Sign up to access dashboards, register for events, and manage your
            progress easily.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 flex items-center justify-center py-10 bg-[url('https://i.postimg.cc/5N2L0MJd/nordwood-themes-R53t-Tg6-J4c-unsplash.jpg')] bg-cover bg-center min-h-screen"
      >
        <motion.form
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSignIn}
          className="w-80 space-y-5 my-30 md:my-0"
        >
          <motion.h2
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold text-center text-gray-800"
          >
            Login
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <GoogleLogin redirect={redirect} />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="divider divider-warning"
          >
            Or
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
              required
              aria-label="Email Address"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
              required
              aria-label="Password"
            />
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-red-600 text-sm"
              role="alert"
            >
              {error}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 font-semibold rounded transition duration-300 btn"
            >
              Log In
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-yellow-500 underline">
                Register
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default SignIn;