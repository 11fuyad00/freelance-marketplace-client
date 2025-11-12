import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white pt-20 pb-10 overflow-hidden ">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 -right-8 w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full blur-xl opacity-25 animate-ping"></div>
        <div className="absolute -bottom-8 right-1/4 w-28 h-28 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-2xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-11/12 mx-auto z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Company Info with Floating Animation */}
          <div className="lg:col-span-1 transform hover:scale-105 transition-transform duration-500">
            <Link
              to="/"
              className="flex items-center space-x-3 text-2xl font-bold text-white mb-6 group"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-2xl animate-float">
                  <svg
                    className="w-7 h-7 text-white"
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
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition-opacity duration-300"></div>
              </div>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent animate-gradient-x">
                FreelanceHub
              </span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
              Connect with top talent and find your dream projects. FreelanceHub
              is the leading marketplace for freelancers and clients worldwide.
            </p>
            <div className="flex space-x-3">
              {[
                {
                  icon: 'twitter',
                  color: 'hover:bg-sky-500',
                  bg: 'bg-gradient-to-br from-sky-400 to-blue-500',
                },
                {
                  icon: 'github',
                  color: 'hover:bg-gray-700',
                  bg: 'bg-gradient-to-br from-gray-600 to-gray-800',
                },
                {
                  icon: 'instagram',
                  color: 'hover:bg-pink-600',
                  bg: 'bg-gradient-to-br from-pink-400 to-rose-500',
                },
                {
                  icon: 'linkedin',
                  color: 'hover:bg-blue-700',
                  bg: 'bg-gradient-to-br from-blue-500 to-blue-700',
                },
              ].map((social, index) => (
                <a
                  key={social.icon}
                  href="#"
                  className={`${social.bg} w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 transform hover:-translate-y-2 hover:rotate-12 hover:shadow-2xl ${social.color} backdrop-blur-sm border border-white/20`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {social.icon === 'twitter' && (
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    )}
                    {social.icon === 'github' && (
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    )}
                    {social.icon === 'instagram' && (
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017z" />
                    )}
                    {social.icon === 'linkedin' && (
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links with Hover Effects */}
          <div className="transform hover:scale-105 transition-transform duration-500">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Browse Jobs', 'Post a Job', 'About Us', 'Contact'].map(
                (link, index) => (
                  <li key={link}>
                    <Link
                      to={
                        link === 'Home'
                          ? '/'
                          : `/${link.toLowerCase().replace(' ', '')}`
                      }
                      className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                      <span className="text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">
                        {link}
                      </span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Categories with Colorful Dots */}
          <div className="transform hover:scale-105 transition-transform duration-500">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Web Development', color: 'from-cyan-400 to-blue-500' },
                {
                  name: 'Graphic Design',
                  color: 'from-purple-400 to-pink-500',
                },
                {
                  name: 'Digital Marketing',
                  color: 'from-orange-400 to-red-500',
                },
                {
                  name: 'Content Writing',
                  color: 'from-emerald-400 to-green-500',
                },
                { name: 'SEO Services', color: 'from-amber-400 to-yellow-500' },
              ].map((category, index) => (
                <li key={category.name}>
                  <a
                    href="#"
                    className="group flex items-center space-x-3 p-2 rounded-xl hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div
                      className={`w-3 h-3 bg-gradient-to-r ${category.color} rounded-full group-hover:scale-150 transition-transform duration-300 shadow-lg`}
                    ></div>
                    <span className="text-gray-300 group-hover:text-white group-hover:font-medium transition-all duration-300">
                      {category.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter with Glow Effect */}
          <div className="transform hover:scale-105 transition-transform duration-500">
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-300 to-rose-300 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-300 mb-6 backdrop-blur-sm bg-white/5 p-4 rounded-2xl border border-white/10">
              Get the latest job opportunities and platform updates delivered to
              your inbox.
            </p>
            <div className="space-y-4">
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-cyan-500/50 text-white placeholder-gray-300 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/15"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur group-hover:blur-lg transition-all duration-500 -z-10"></div>
              </div>
              <button className="w-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 hover:from-cyan-600 hover:via-purple-600 hover:to-pink-600 text-white py-4 px-6 rounded-2xl font-bold transition-all duration-500 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg animate-gradient-x">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer with Animated Border */}
        <div className="relative border-t border-white/20 pt-8">
          <div className="absolute top-0 left-0 w-1/3 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-pulse"></div>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm backdrop-blur-sm bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <p>
                &copy; {new Date().getFullYear()} FreelanceHub. All rights
                reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="text-gray-400 hover:text-cyan-300 transition-all duration-300 transform hover:scale-110 px-3 py-1 rounded-full hover:bg-white/5"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {item}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA Button with Pulse Animation */}
      <div className="fixed bottom-8 right-8 z-50 animate-bounce hover:animate-none">
        <button className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 text-white p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></div>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
