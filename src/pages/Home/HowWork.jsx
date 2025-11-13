import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const HowWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      icon: '🚀',
      title: 'Post Your Project',
      desc: 'Describe your vision and requirements in detail. Set your budget and timeline.',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-violet-50 to-purple-100',
      borderColor: 'border-violet-200',
      features: [
        'Detailed project brief',
        'Budget setting',
        'Timeline planning',
      ],
    },
    {
      icon: '🌟',
      title: 'Review Proposals',
      desc: 'Receive curated proposals from vetted professionals. Compare portfolios and ratings.',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-100',
      borderColor: 'border-cyan-200',
      features: ['Curated matches', 'Portfolio review', 'Rating comparison'],
    },
    {
      icon: '💫',
      title: 'Select Expert',
      desc: 'Choose the perfect freelancer. Conduct interviews and finalize terms.',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
      borderColor: 'border-emerald-200',
      features: ['Expert interviews', 'Term finalization', 'Contract signing'],
    },
    {
      icon: '🎯',
      title: 'Launch & Collaborate',
      desc: 'Start your project with secure payments and seamless communication tools.',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      borderColor: 'border-amber-200',
      features: [
        'Secure payments',
        'Real-time collaboration',
        'Progress tracking',
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -45,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
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
      y: -20,
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
    normal: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6 },
    },
  };

  // Animated connector component
  const Connector = ({ index, isActive }) => (
    <div className="hidden xl:block absolute top-24 left-1/2 w-full -translate-y-1/2 -z-10">
      <motion.div
        className="h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: 0.8 + index * 0.3, duration: 1 }}
      >
        <motion.div
          className={`h-full bg-gradient-to-r ${steps[index].color} rounded-full`}
          initial={{ scaleX: 0 }}
          animate={isActive ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </motion.div>
      <motion.div
        className={`absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r ${steps[index].color} shadow-lg`}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1 + index * 0.3, type: 'spring', stiffness: 200 }}
      />
    </div>
  );

  return (
    <section
      ref={ref}
      className="relative py-28 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-10 left-10 w-72 h-72 bg-violet-200 rounded-full blur-3xl opacity-40"
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
          className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-200 rounded-full blur-3xl opacity-30"
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
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={inView ? { scale: 1, rotate: 0 } : {}}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="inline-block mb-8"
          >
            <div className="text-7xl">✨</div>
          </motion.div>

          <h2 className="text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
            How It{' '}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light">
            Transform your ideas into reality with our streamlined 4-step
            process
            <span className="block text-violet-600 font-medium mt-3">
              Simple, secure, and efficient from start to finish
            </span>
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 relative"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              onHoverStart={() => setActiveStep(index)}
              className="relative group perspective-1000"
            >
              {/* Connector Lines */}
              {index < steps.length - 1 && (
                <Connector index={index} isActive={activeStep >= index} />
              )}

              {/* Card Glow Effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${step.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-500`}
              />

              {/* Main Card */}
              <motion.div
                variants={hoverVariants}
                className={`relative ${step.bgColor} backdrop-blur-sm rounded-3xl border-2 ${step.borderColor} p-8 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden h-full`}
              >
                {/* Animated Border */}
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${step.color
                      .replace('from-', '')
                      .replace('to-', '')
                      .split(' ')
                      .map(color => `var(--tw-gradient-${color})`)
                      .join(', ')})`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'exclude',
                    padding: '3px',
                  }}
                />

                {/* Step Number Badge */}
                <motion.div
                  className={`absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-black text-xl shadow-2xl`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.6 },
                  }}
                >
                  {index + 1}
                </motion.div>

                {/* Icon Container */}
                <motion.div
                  variants={iconVariants}
                  className={`inline-flex items-center justify-center p-5 rounded-2xl mb-8 bg-gradient-to-r ${step.color} shadow-lg`}
                >
                  <span className="text-4xl">{step.icon}</span>
                </motion.div>

                {/* Content */}
                <h3 className="text-3xl font-black text-gray-900 mb-6 leading-tight">
                  {step.title}
                </h3>

                <p className="text-gray-700 text-lg leading-relaxed mb-6 font-medium">
                  {step.desc}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {step.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{
                        delay: 1 + index * 0.2 + featureIndex * 0.1,
                      }}
                      className="flex items-center text-gray-600 font-medium"
                    >
                      <motion.span
                        className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mr-3`}
                        animate={{
                          scale: [1, 1.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: featureIndex * 0.5,
                        }}
                      />
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-4 px-6 bg-gradient-to-r ${step.color} text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`}
                >
                  Learn More →
                </motion.button>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 bg-gradient-to-r ${step.color} rounded-full opacity-0 group-hover:opacity-100`}
                      initial={{
                        x: Math.random() * 200,
                        y: Math.random() * 200,
                        scale: 0,
                      }}
                      animate={{
                        x: Math.random() * 200,
                        y: Math.random() * 200,
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.8,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
            className="relative group"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-all duration-1000 animate-pulse"></div>

            {/* Main Container */}
            <div className="relative bg-gradient-to-br from-white/90 via-white/80 to-purple-50/80 backdrop-blur-2xl rounded-3xl p-12 border-2 border-white/40 shadow-3xl shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-all duration-500 overflow-hidden">
              {/* Floating Particles */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-full opacity-20"
                    animate={{
                      y: [0, -30, 0],
                      x: [0, 20, 0],
                      scale: [1, 1.5, 1],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: i * 0.6,
                      ease: 'easeInOut',
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Content */}
              <div className="relative text-center">
                {/* Animated Icon */}
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="text-5xl">✨</div>
                </motion.div>

                {/* Heading */}
                <motion.h3
                  className="text-5xl font-black mb-6 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Ready to Launch Your Project?
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Join{' '}
                  <span className="font-bold text-transparent bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text">
                    5,000+
                  </span>{' '}
                  successful projects and turn your vision into reality
                </motion.p>

                {/* CTA Button */}
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 hover:from-violet-700 hover:via-purple-700 hover:to-cyan-700 text-white font-black text-xl py-6 px-20 rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-500 overflow-hidden"
                >
                  {/* Button Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  {/* Button Content */}
                  <span className="relative flex items-center justify-center">
                    <motion.span
                      className="mr-3"
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      🚀
                    </motion.span>
                    Start Your Journey Today
                    <motion.svg
                      className="w-6 h-6 ml-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </motion.svg>
                  </span>

                  {/* Button Border Animation */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                    <div className="absolute inset-[3px] rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600"></div>
                  </div>
                </motion.button>

                {/* Additional Info */}
                <motion.p
                  className="text-sm text-gray-500 mt-6 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ⚡ No upfront costs • 🛡️ 100% secure • 🌟 24/7 support
                </motion.p>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-violet-500/20 to-transparent rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-500/20 to-transparent rounded-bl-3xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWork;
