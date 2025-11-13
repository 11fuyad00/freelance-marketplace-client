import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light')
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  return (
    <div
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-1 flex items-center cursor-pointer shadow-lg"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center shadow-md" // Changed from bg-white to bg-gray-800
        style={{
          x: theme === 'light' ? 0 : 28, // Move circle left/right
        }}
      >
        {theme === 'light' ? (
          <svg
            className="w-4 h-4 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-white" // Changed to white for better contrast on black background
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </motion.div>
    </div>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', icon: '🏠' },
    { name: 'All Jobs', path: '/allJobs', icon: '💼' },
    ...(user
      ? [
          { name: 'Add a Job', path: '/addAJob', icon: '✨' },
          { name: 'My Tasks', path: '/MyTask', icon: '✅' },
          { name: 'My Jobs', path: '/myAddedJobs', icon: '📝' },
          { name: 'Profile', path: '/profile', icon: '👤' },
        ]
      : []),
  ];

  const isActive = path => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('🎉 Logout successful!');
    } catch (error) {
      toast.error('❌ Logout failed: ' + error.message);
    }
  };

  const Button = ({ children, to, onClick, active }) =>
    to ? (
      <Link
        to={to}
        onClick={onClick}
        className={`px-6 py-2 rounded-2xl font-bold shadow-lg transition-all duration-300 ${
          active
            ? 'bg-gradient-to-r from-cyan-200 to-purple-200 text-gray-800'
            : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-cyan-400/40'
        }`}
      >
        {children}
      </Link>
    ) : (
      <button
        onClick={onClick}
        className="px-6 py-2 rounded-2xl font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg hover:shadow-red-400/40 transition-all duration-300"
      >
        {children}
      </button>
    );

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-2xl transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 dark:bg-black/95 shadow-2xl'
          : 'bg-white/90 dark:bg-black/90'
      }`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between h-20 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <motion.svg
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </motion.svg>
          </div>
          <div>
            <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              TalentHub
            </h1>
            <p className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Freelance Marketplace
            </p>
          </div>
        </Link>

        <div className="hidden lg:flex items-center space-x-3">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-xl font-bold transition-all duration-300 flex items-center ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-cyan-200 to-purple-200 text-gray-800'
                  : 'text-gray-700 dark:text-gray-300 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10'
              }`}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <div className="flex items-center gap-4 relative group">
              <Link to="/profile" className="relative group">
                <img
                  src={user.photoURL || 'https://i.ibb.co/2NBGVHJ/user.png'}
                  alt="user"
                  className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-lg cursor-pointer"
                />
                <span className="absolute top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-slate-700 to-blue-600 text-white px-3 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-2xl font-semibold">
                  👋 {user.displayName || 'Welcome Back!'}
                </span>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full animate-pulse"></span>
              </Link>
              <Button onClick={handleLogout}>🚪 Logout</Button>
            </div>
          ) : (
            <>
              <Button to="/login" active={isActive('/login')}>
                Login
              </Button>
              <Button to="/register" active={isActive('/register')}>
                Register
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center lg:hidden gap-3">
          <ThemeToggle />
          {user && (
            <Link to="/profile">
              <img
                src={user.photoURL || 'https://i.ibb.co/2NBGVHJ/user.png'}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"
              />
            </Link>
          )}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 shadow-lg text-white"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl rounded-3xl shadow-lg p-5 mt-2 mx-4 space-y-3"
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-cyan-200 to-purple-200 text-gray-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-purple-500/10'
                }`}
              >
                <span className="text-xl mr-2">{link.icon}</span>
                {link.name}
              </Link>
            ))}
            {user ? (
              <Button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                🚪 Logout
              </Button>
            ) : (
              <div className="space-y-2">
                <Button to="/login" active={isActive('/login')}>
                  Login
                </Button>
                <Button to="/register" active={isActive('/register')}>
                  Register
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
