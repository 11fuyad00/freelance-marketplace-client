import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', color: 'blue' },
    { name: 'All Jobs', path: '/allJobs', color: 'green' },
    { name: 'Add a Job', path: '/addJob', color: 'purple' },
    { name: 'My Tasks', path: '/my-accepted-tasks', color: 'orange' },
  ];

  const isActive = path => location.pathname === path;

  return (
    <nav
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b transition-all duration-300 ${
        scroll
          ? 'border-indigo-200 shadow-xl shadow-indigo-100'
          : 'border-transparent shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-105">
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
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                TalentHub
              </span>
              <span className="text-sm text-gray-400 font-medium">
                Freelance Marketplace
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-5 py-3 font-semibold transition-all duration-300 rounded-lg ${
                  isActive(link.path)
                    ? `text-${link.color}-600 font-bold`
                    : 'text-gray-600 hover:text-indigo-500'
                }`}
              >
                {isActive(link.path) && (
                  <span
                    className={`absolute inset-0 bg-gradient-to-r from-${link.color}-100 to-${link.color}-200 rounded-lg`}
                  ></span>
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              to="/login"
              className={`px-5 py-2 font-semibold border rounded-lg transition-all duration-300 ${
                isActive('/login')
                  ? 'bg-indigo-50 text-indigo-600 border-indigo-200 font-bold'
                  : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-6 py-2.5 font-bold rounded-lg shadow-md transition-all duration-300 ${
                isActive('/register')
                  ? 'bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 shadow-sm"
          >
            {!open ? (
              <div className="space-y-1">
                <div className="w-5 h-0.5 bg-gray-600 rounded-full"></div>
                <div className="w-5 h-0.5 bg-gray-600 rounded-full"></div>
                <div className="w-5 h-0.5 bg-gray-600 rounded-full"></div>
              </div>
            ) : (
              <svg
                className="w-5 h-5 text-indigo-600"
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
            )}
          </button>
        </div>

        {/* Mobile  */}
        {open && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-xl absolute top-20 left-0 right-0 z-40 py-5 flex flex-col justify-between min-h-[85vh] animate-in fade-in slide-in-from-top-5 duration-300">
            <div className="flex flex-col space-y-2 px-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? `bg-gradient-to-r from-${link.color}-50 to-${link.color}-100 text-${link.color}-600 font-semibold border border-${link.color}-200`
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-3 border-t border-gray-200 mt-3 flex flex-col space-y-2">
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-center rounded-lg bg-gray-50 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-center rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow hover:shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>

            {/* Cross Icon (Bottom) */}
            <div className="flex justify-center items-center pb-5 mt-auto">
              <button
                onClick={() => setOpen(false)}
                className="p-3 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 hover:from-fuchsia-600 hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <svg
                  className="w-6 h-6 text-white"
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
              </button>
            </div>
          </div>
        )}
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden animate-in fade-in duration-300"
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
