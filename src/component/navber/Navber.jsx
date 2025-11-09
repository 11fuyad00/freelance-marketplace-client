import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const { user, logOut } = useContext(AuthContext);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Jobs', path: '/allJobs' },
    { name: 'Add a Job', path: '/addAJob' },
    { name: 'My Tasks', path: '/myTask' },
  ];

  const isActive = path => location.pathname === path;

  // Logout function with Toast
  const handleLogout = async () => {
    try {
      await logOut();
      toast.success('Logout successful');
    } catch (error) {
      toast.error('Logout failed', error.message);
    }
  };

  // Common button style
  const buttonStyle =
    'px-6 py-2.5 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center block';

  const activeButtonStyle =
    'px-6 py-2.5 rounded-lg font-semibold border-2 border-indigo-500 text-indigo-500 text-center block';

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl transition-all duration-300 ${
        isScrolled ? 'bg-white/95 shadow-lg' : 'bg-white/90'
      }`}
    >
      <div className="w-11/12 mx-auto flex items-center justify-between h-20">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
              TalentHub
            </h1>
            <p className="text-sm text-gray-400 font-medium">
              Freelance Marketplace
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden lg:flex items-center space-x-5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-semibold transition-all px-4 py-2 rounded-lg ${
                isActive(link.path)
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-600 hover:text-indigo-500 hover:bg-indigo-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* USER BUTTONS */}
        <div className="hidden lg:flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL || 'https://i.ibb.co/2NBGVHJ/user.png'}
                alt="user"
                className="w-8 h-8 rounded-full border"
              />
              <span className="text-sm font-medium text-gray-700">
                {user.displayName || 'User'}
              </span>
              <button onClick={handleLogout} className={buttonStyle}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className={isActive('/login') ? activeButtonStyle : buttonStyle}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={
                  isActive('/register') ? activeButtonStyle : buttonStyle
                }
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-md border border-gray-200"
        >
          {menuOpen ? (
            <svg
              className="w-6 h-6 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <div className="space-y-1">
              <div className="w-5 h-0.5 bg-gray-700"></div>
              <div className="w-5 h-0.5 bg-gray-700"></div>
              <div className="w-5 h-0.5 bg-gray-700"></div>
            </div>
          )}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white/95 shadow-md flex flex-col p-5 space-y-3">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg ${
                isActive(link.path)
                  ? 'bg-indigo-50 text-indigo-600 font-semibold'
                  : 'text-gray-700 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {user ? (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className={buttonStyle}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className={isActive('/login') ? activeButtonStyle : buttonStyle}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className={
                  isActive('/register') ? activeButtonStyle : buttonStyle
                }
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
