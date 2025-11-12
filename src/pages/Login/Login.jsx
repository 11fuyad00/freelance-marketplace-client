import React, { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import googleImg from './google_356049.png';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Login = () => {
  const { signInUser, signInWithGoogle, sendPasswordReset } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Capture redirect path from PrivateRoute
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signInUser(formData.email, formData.password);
      toast.success('Successfully logged in!');
      navigate(from, { replace: true }); // Redirect to original path
    } catch (error) {
      console.error('Login error:', error);
      handleFirebaseError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithGoogle();

      const newUser = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
        provider: 'google',
        createdAt: new Date().toISOString(),
      };

      await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      }).catch(err => console.error('DB Save Error:', err));

      toast.success('Successfully logged in with Google!');
      navigate(from, { replace: true }); // Redirect to original path
    } catch (error) {
      console.error('Google login error:', error);
      handleFirebaseError(error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleResetPassword = async e => {
    e.preventDefault();
    if (!resetEmail) return toast.error('Please enter your email');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(resetEmail)) return toast.error('Enter a valid email');

    try {
      await sendPasswordReset(resetEmail);
      toast.success('Password reset link sent! Check your inbox.');
      setShowReset(false);
      setResetEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      handleFirebaseError(error);
    }
  };

  const handleFirebaseError = error => {
    const code = error.code;
    switch (code) {
      case 'auth/invalid-email':
        toast.error('Invalid email address');
        break;
      case 'auth/user-disabled':
        toast.error('This account has been disabled');
        break;
      case 'auth/user-not-found':
        toast.error('No account found with this email');
        break;
      case 'auth/wrong-password':
        toast.error('Incorrect password');
        break;
      case 'auth/too-many-requests':
        toast.error('Too many attempts. Try again later');
        break;
      case 'auth/popup-closed-by-user':
        toast.info('Login cancelled');
        break;
      case 'auth/network-request-failed':
        toast.error('Network error. Please check your connection');
        break;
      default:
        toast.error(error.message || 'Something went wrong!');
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-300 to-blue-400 overflow-hidden p-4">
      {/* Background animations */}
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

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/30 p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 font-medium">
            Sign in to continue your journey
          </p>
        </div>

        {/* Login / Reset */}
        {!showReset ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-500 transition"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-gray-700 text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-purple-400"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-purple-600 hover:underline text-sm cursor-pointer bg-transparent border-none"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:shadow-xl transition duration-300 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <h3 className="text-2xl font-semibold text-center text-gray-700 mb-4">
              Reset Password 🔑
            </h3>
            <div className="relative">
              <FiMail className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            >
              Send Reset Link
            </button>
            <button
              type="button"
              onClick={() => setShowReset(false)}
              className="w-full text-purple-600 text-center cursor-pointer hover:underline bg-transparent border-none"
            >
              Back to Login
            </button>
          </form>
        )}

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500">or continue with</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <motion.button
          onClick={handleGoogleSignIn}
          disabled={isGoogleLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-black bg-white shadow-lg hover:shadow-xl flex items-center justify-center gap-3 border border-gray-300 transition duration-300 ${
            isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isGoogleLoading ? (
            'Connecting...'
          ) : (
            <>
              <img src={googleImg} alt="Google" className="w-6 h-6" /> Continue
              with Google
            </>
          )}
        </motion.button>

        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-purple-600 hover:underline font-semibold"
          >
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
