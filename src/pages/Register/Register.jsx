import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from 'react-icons/fi';
import { toast } from 'react-toastify';
import googleImg from './google_356049.png';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Register = () => {
  const { createUser, signInWithGoogle, updateUserProfile } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    photoURL: '',
    password: '',
    confirmPassword: '',
    userType: 'freelancer',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveUserToDB = userData => {
    return fetch('http://localhost:3000/users', {
      // Correct endpoint
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(userData),
    }).then(res => res.json());
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    // Password mil check
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      setIsLoading(false);
      return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        'Password must include at least 1 uppercase, 1 lowercase, and be 6+ characters long.'
      );
      setIsLoading(false);
      return;
    }

    createUser(formData.email, formData.password)
      .then(result => {
        const user = result.user;

        // Update displayName and photoURL in Firebase
        updateUserProfile(formData.fullName, formData.photoURL)
          .then(() => {
            const newUser = {
              name: formData.fullName,
              email: formData.email,
              image: formData.photoURL || '',
              userType: formData.userType,
            };

            saveUserToDB(newUser)
              .then(() => {
                toast.success('Registration Successful! 🎉');
                setIsRegistering(true);
                setTimeout(() => {
                  setIsLoading(false);
                  navigate('/');
                }, 2000);
              })
              .catch(() => {
                toast.error('Failed to save user to database.');
                setIsLoading(false);
              });
          })
          .catch(() => {
            toast.error('Failed to update profile.');
            setIsLoading(false);
          });
      })
      .catch(err => {
        console.error(err);
        toast.error(err.message || 'Registration failed.');
        setIsLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(result => {
        const newUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
          userType: 'freelancer',
        };
        saveUserToDB(newUser)
          .then(() => {
            toast.success('Welcome to TalentHub ⚡');
            setTimeout(() => navigate('/'), 2000);
          })
          .catch(() => toast.error('Database save failed.'));
      })
      .catch(err => {
        console.error(err);
        toast.error('Google Sign-In failed.');
      });
  };

  useEffect(() => {
    if (isRegistering) {
      const timer = setTimeout(() => setIsRegistering(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isRegistering]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 overflow-hidden p-4">
      <motion.div
        className="absolute w-96 h-96 bg-purple-300 rounded-full opacity-30 top-[-15%] left-[-10%]"
        animate={{ x: [0, 50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-300 rounded-full opacity-20 bottom-[-15%] right-[-10%]"
        animate={{ x: [0, -50, 0], y: [0, -50, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.div
        className="absolute w-[28rem] h-[28rem] bg-blue-300 rounded-full opacity-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror' }}
      />

      {isRegistering && (
        <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-50">
          <div className="text-center space-y-6">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Welcome to TalentHub!
            </h3>
            <p className="text-gray-600 text-lg">
              Your account has been created successfully
            </p>
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 font-medium">
            Begin your TalentHub experience
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />

            <input
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <FiUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="photoURL"
              type="text"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Photo URL (optional)"
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 transition"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Confrm Password */}
          <div className="relative">
            <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition duration-300"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 transition"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* User type */}
          <div className="flex space-x-3">
            <label
              className={`flex-1 p-3 rounded-xl border cursor-pointer text-center ${
                formData.userType === 'freelancer'
                  ? 'bg-purple-100 border-purple-400'
                  : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="userType"
                value="freelancer"
                checked={formData.userType === 'freelancer'}
                onChange={handleChange}
                className="sr-only"
              />
              Freelancer
            </label>
            <label
              className={`flex-1 p-3 rounded-xl border cursor-pointer text-center ${
                formData.userType === 'client'
                  ? 'bg-purple-100 border-purple-400'
                  : 'border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="userType"
                value="client"
                checked={formData.userType === 'client'}
                onChange={handleChange}
                className="sr-only"
              />
              Client
            </label>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition duration-300 ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <motion.button
          onClick={handleGoogleSignIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 px-4 rounded-xl font-semibold text-black bg-white shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border border-gray-300 transition duration-300"
        >
          <img src={googleImg} alt="Google" className="w-6 h-6" />
          Continue with Google
        </motion.button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
