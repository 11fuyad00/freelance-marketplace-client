import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Banner = () => {
  // text animations
  const textVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.3,
      },
    },
  };

  // animation title
  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: 'backOut',
      },
    },
  };

  // New animation for "Freelance Match"
  const freelanceMatchVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  };

  // button animations
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 1.2,
      },
    },
    hover: {
      scale: 1.08,
      y: -5,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      background: [
        'linear-gradient(45deg, #00FFFF, #FF00FF)',
        'linear-gradient(45deg, #FF00FF, #FFFF00)',
        'linear-gradient(45deg, #FFFF00, #00FFFF)',
      ],
      transition: {
        duration: 0.4,
        background: {
          duration: 1,
          repeat: Infinity,
          repeatType: 'reverse',
        },
      },
    },
  };

  const floatingShapes = [
    { color: 'from-cyan-400/20 to-blue-400/20', size: 'w-32 h-32', delay: 0 },
    { color: 'from-purple-400/20 to-pink-400/20', size: 'w-24 h-24', delay: 2 },
    {
      color: 'from-yellow-400/20 to-orange-400/20',
      size: 'w-40 h-40',
      delay: 4,
    },
    { color: 'from-green-400/20 to-teal-400/20', size: 'w-28 h-28', delay: 1 },
    { color: 'from-red-400/20 to-pink-400/20', size: 'w-36 h-36', delay: 3 },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 overflow-hidden">
      <div className="absolute inset-0">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r ${shape.color} blur-xl hidden sm:block`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${10 + i * 12}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Mobile optimized floating shapes */}
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={`mobile-${i}`}
            className={`absolute rounded-full bg-gradient-to-r ${shape.color} blur-lg sm:hidden`}
            style={{
              left: `${10 + i * 20}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 20, 0],
              scale: [0.8, 1, 0.8],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Animated grid pattern - hidden on mobile for performance */}
        <motion.div
          className="absolute inset-0 opacity-10 hidden sm:block"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px),
                             linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Particle system - reduced on mobile */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, -200],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 flex items-center min-h-screen">
        <div className="max-w-4xl mx-auto text-center text-white w-full">
          {/* Main Title with Character Stagger */}
          <motion.div
            variants={titleVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 sm:mb-6"
          >
            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 px-2">
              <motion.span className="block">
                {'Find Your Perfect'.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent"
                    style={{
                      backgroundSize: '200% 200%',
                      backgroundPosition: `${index * 5}% 50%`,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>

              {/* New Style for "Freelance Match" - Mobile Responsive */}
              <motion.span
                className="block mt-2 sm:mt-4"
                variants={freelanceMatchVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.span
                  className="inline-block relative"
                  variants={wordVariants}
                >
                  <span className="relative z-10 bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent font-black tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                    Freelance
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 blur-lg opacity-50"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.span>

                <motion.span
                  className="inline-block mt-1 sm:mt-2 relative"
                  variants={wordVariants}
                  transition={{ delay: 0.3 }}
                >
                  <span className="relative z-10 bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent font-black tracking-wider text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl">
                    Match
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 blur-lg opacity-50"
                    animate={{
                      opacity: [0.3, 0.7, 0.3],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 1,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.span>
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Subtitle effect - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="mb-6 sm:mb-8 px-2"
          >
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ delay: 2.5, duration: 1.5, ease: 'easeOut' }}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              Connect with top talent worldwide. Post jobs, find opportunities,
              and grow your career on the most reliable freelance marketplace
              platform.
            </motion.p>
          </motion.div>

          {/* CTA Buttons with enhanced animations - Mobile Responsive */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-16 px-2"
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              className="w-full sm:w-auto"
            >
              <Link
                to="/allJobs"
                className="inline-block bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold py-4 sm:py-5 px-6 sm:px-10 rounded-2xl text-base sm:text-lg w-full sm:w-auto text-center shadow-2xl relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'loop',
                  }}
                  style={{ zIndex: 1 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  🔍 <span className="hidden sm:inline">Browse</span> Jobs
                </span>
              </Link>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/addAJob"
                className="inline-block border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white font-bold py-4 sm:py-5 px-6 sm:px-10 rounded-2xl text-base sm:text-lg transition-all duration-300 backdrop-blur-sm bg-white/5 w-full sm:w-auto text-center relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-cyan-400"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  ➕ <span className="hidden sm:inline">Create</span> Job
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats with floating animation - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 1 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 px-2"
          >
            {[
              {
                number: '10K+',
                label: 'Active Jobs',
                color: 'from-cyan-400 to-blue-400',
              },
              {
                number: '5K+',
                label: 'Freelancers',
                color: 'from-purple-400 to-pink-400',
              },
              {
                number: '98%',
                label: 'Success Rate',
                color: 'from-green-400 to-teal-400',
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center relative"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 3.5 + index * 0.3,
                  type: 'spring',
                  stiffness: 100,
                }}
                whileHover={{
                  scale: 1.15,
                  y: -10,
                  transition: { type: 'spring', stiffness: 400 },
                }}
              >
                {/* background effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl sm:rounded-2xl blur-md opacity-20 hidden sm:block`}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 3 + index,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />

                <div className="relative z-10 p-3 sm:p-4 md:p-6 bg-white/5 backdrop-blur-lg rounded-xl sm:rounded-2xl border border-white/10">
                  <motion.div
                    className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                    animate={{
                      scale: [1, 1.1, 1],
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.7,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-300 text-xs sm:text-sm md:text-base font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll animation - Hidden on mobile */}
          <motion.div
            className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-cyan-400 rounded-full mt-2"
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
