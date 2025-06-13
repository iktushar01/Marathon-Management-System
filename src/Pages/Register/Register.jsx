import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import GoogleLogin from "../../Shared/SocialLogin/GoogleLogin";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const redirect = location.state || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;
    const userData = { name, email, photoURL, password };

    // create user
    createUser(email, password)
      .then((result) => {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully',
          icon: 'success',
          confirmButtonText: 'Continue',
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          navigate(redirect);
        });
      })
      .catch((error) => {
        let errorMessage = 'Registration failed. Please try again.';
        
        // Handle specific Firebase errors
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already registered.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password should be at least 6 characters.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Please enter a valid email address.';
        }

        Swal.fire({
          title: 'Registration Error',
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
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col md:flex-row"
    >
      {/* Left Side with Background Video */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex w-1/2 items-center justify-center relative overflow-hidden"
      >
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

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative z-10 text-white text-center px-6 py-8 rounded-lg mx-4"
        >
          <motion.h1
            className="text-4xl lg:text-5xl font-bold leading-tight"
            whileHover={{ scale: 1.02 }}
          >
            Join <span className="text-yellow-400">Our Stridez</span>
          </motion.h1>
          <motion.p
            className="mt-4 text-sm lg:text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            Register now to manage and participate in marathons with our
            full-stack platform built for both organizers and runners.
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Register Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="w-full md:w-1/2 flex items-center justify-center py-10 bg-[url('https://i.postimg.cc/5N2L0MJd/nordwood-themes-R53t-Tg6-J4c-unsplash.jpg')] bg-cover bg-center min-h-screen"
      >
        <motion.form
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          onSubmit={handleRegister}
          className="w-80 space-y-5 my-30 md:my-0"
        >
          <motion.h2
            className="text-2xl font-semibold text-center text-gray-800"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Register
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GoogleLogin />
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="divider divider-warning"
          >
            Or
          </motion.div>

          {[
            {
              name: "name",
              placeholder: "Full Name",
              type: "text",
              delay: 0.6,
            },
            {
              name: "email",
              placeholder: "Email Address",
              type: "email",
              delay: 0.65,
            },
            {
              name: "photoURL",
              placeholder: "Photo URL",
              type: "text",
              delay: 0.7,
            },
            {
              name: "password",
              placeholder: "Password",
              type: "password",
              delay: 0.75,
            },
          ].map((field) => (
            <motion.div
              key={field.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: field.delay }}
            >
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border-2 border-yellow-400 rounded focus:outline-none"
                required={field.name !== "photoURL"}
              />
            </motion.div>
          ))}

          <motion.button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-2 font-semibold rounded transition duration-300 btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Register
          </motion.button>

          <motion.p
            className="text-sm text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Already have an account?{" "}
            <Link to="/signin" className="text-yellow-500 underline">
              Login
            </Link>
          </motion.p>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Register;