import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from 'react-countup';

const AnimatedCounter = ({ end, suffix = '', duration = 2, delay = 0 }) => {
  const ref = useRef(null);
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { start } = useCountUp({
    ref: ref,
    end,
    suffix,
    duration,
    startOnMount: false,
    delay,
  });

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => start(), delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [inView, start, delay]);

  return (
    <span
      ref={node => {
        ref.current = node;
        inViewRef(node);
      }}
    />
  );
};

const PlatformStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isHovered, setIsHovered] = useState(null);

  const stats = [
    {
      number: 500,
      suffix: '+',
      label: 'Active Projects',
      icon: '💼',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'rgba(34, 211, 238, 0.1)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      description: 'Live opportunities waiting for you',
    },
    {
      number: 1000,
      suffix: '+',
      label: 'Expert Freelancers',
      icon: '🚀',
      color: 'from-emerald-400 to-green-500',
      bgColor: 'rgba(52, 211, 153, 0.1)',
      borderColor: 'rgba(52, 211, 153, 0.3)',
      description: 'Skilled professionals ready to work',
    },
    {
      number: 4.9,
      suffix: '/5',
      label: 'Client Rating',
      icon: '⭐',
      color: 'from-amber-400 to-orange-500',
      bgColor: 'rgba(251, 191, 36, 0.1)',
      borderColor: 'rgba(251, 191, 36, 0.3)',
      description: 'Based on 2,000+ reviews',
    },
    {
      number: 98,
      suffix: '%',
      label: 'Success Rate',
      icon: '🎯',
      color: 'from-purple-400 to-pink-500',
      bgColor: 'rgba(192, 132, 252, 0.1)',
      borderColor: 'rgba(192, 132, 252, 0.3)',
      description: 'Project completion ratio',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 60,
      rotateX: -45,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
        duration: 1.2,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -15,
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconVariants = {
    normal: {
      rotate: 0,
      scale: 1,
    },
    hover: {
      rotate: [0, -10, 10, 0],
      scale: 1.2,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Particle background component
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [null, -100, 100],
              x: [null, 50, -50],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      ref={ref}
      className="relative py-28 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden"
    >
      {/* Advanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <ParticleBackground />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="text-6xl mb-4">📊</div>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
            By The{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>

          <p className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            Trusted by thousands of businesses and freelancers worldwide.
            <span className="block text-cyan-300 font-medium mt-2">
              Real results, real success stories.
            </span>
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 max-w-7xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              custom={index}
              onHoverStart={() => setIsHovered(index)}
              onHoverEnd={() => setIsHovered(null)}
              className="relative group perspective-1000"
            >
              {/* Card Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
              />

              {/* Main Card */}
              <motion.div
                variants={hoverVariants}
                className="relative bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                }}
              >
                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${stat.color
                      .replace('from-', '')
                      .replace('to-', '')
                      .split(' ')
                      .map(color => `var(--tw-gradient-${color})`)
                      .join(', ')})`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '2px',
                  }}
                />

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  className={`inline-flex items-center justify-center p-4 rounded-2xl mb-6 bg-gradient-to-r ${stat.color} shadow-lg`}
                >
                  <span className="text-2xl">{stat.icon}</span>
                </motion.div>

                {/* Animated Number */}
                <div className="mb-4">
                  <div
                    className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent leading-none`}
                  >
                    <AnimatedCounter
                      end={stat.number}
                      suffix={stat.suffix}
                      duration={2.5}
                      delay={index * 0.4}
                    />
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  {stat.description}
                </p>

                {/* Progress Bar */}
                <motion.div
                  className="w-full bg-gray-700/50 rounded-full h-2 mt-6 overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{
                    delay: 1 + index * 0.2,
                    duration: 1.5,
                    ease: 'easeOut',
                  }}
                >
                  <motion.div
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{
                      delay: 1.5 + index * 0.2,
                      duration: 1,
                      ease: 'easeOut',
                    }}
                  />
                </motion.div>

                {/* Floating Particles */}
                {isHovered === index && (
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className={`absolute w-2 h-2 bg-gradient-to-r ${stat.color} rounded-full`}
                        initial={{
                          x: Math.random() * 200,
                          y: Math.random() * 200,
                          scale: 0,
                        }}
                        animate={{
                          x: Math.random() * 200,
                          y: Math.random() * 200,
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl inline-block">
            <p className="text-2xl text-gray-300 mb-6 font-light">
              Ready to be our next success story?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold text-xl py-4 px-12 rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            >
              Join Now 🚀
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
