import React from 'react';
import { Link } from 'react-router';
import { XCircle } from 'lucide-react';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-500 p-5">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 max-w-md w-full text-center animate-fadeIn">
        <XCircle
          size={80}
          className="mx-auto text-red-400 mb-5 animate-bounce"
        />
        <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-white/90 mb-5">
          Oops! Page Not Found
        </h2>
        <p className="text-white/70 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-pink-400/50 transform hover:scale-105 transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
