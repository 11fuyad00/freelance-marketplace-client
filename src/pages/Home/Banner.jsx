// Banner.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Banner = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.h1
            variants={textVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
          >
            Find Your Perfect
            <motion.span
              className="block mt-2"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              style={{
                background: 'linear-gradient(45deg, #00FFFF, #FF00FF, #FFFF00)',
                backgroundSize: '300% 300%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Freelance Match
            </motion.span>
          </motion.h1>

          <motion.p
            variants={textVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
            Connect with top talent worldwide. Post jobs, find opportunities,
            and grow your career on the most reliable freelance marketplace
            platform.
          </motion.p>

          <motion.div
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div variants={buttonVariants} whileHover="hover">
              <Link
                to="/allJobs"
                className="inline-block bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-2xl"
              >
                🔍 Browse Jobs
              </Link>
            </motion.div>

            <motion.div variants={buttonVariants} whileHover="hover">
              <Link
                to="/addAJob"
                className="inline-block border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 backdrop-blur-sm"
              >
                ➕ Create a Job
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={textVariants}
            className="grid grid-cols-3 gap-8 mt-16"
          >
            {[
              { number: '10K+', label: 'Active Jobs' },
              { number: '5K+', label: 'Freelancers' },
              { number: '98%', label: 'Success Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
