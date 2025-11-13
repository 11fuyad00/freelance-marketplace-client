// components/PlatformStats.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useCountUp } from 'react-countup';

const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
  const [inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const { countUpRef } = useCountUp({
    ref: countUpRef,
    end: inView ? end : 0,
    duration,
    suffix,
  });

  return <span ref={countUpRef} />;
};

const PlatformStats = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      number: 500,
      suffix: '+',
      label: 'Active Jobs',
      icon: '💼',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      number: 1000,
      suffix: '+',
      label: 'Freelancers',
      icon: '👥',
      color: 'from-green-500 to-emerald-500',
    },
    {
      number: 4.8,
      suffix: '/5',
      label: 'Client Satisfaction',
      icon: '⭐',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      number: 90,
      suffix: '%',
      label: 'Projects Completed',
      icon: '🚀',
      color: 'from-purple-500 to-pink-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotateY: 90,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-purple-500 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-cyan-500 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Our Platform in Numbers
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied clients and freelancers
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className="text-center group"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl group-hover:bg-white/15 transition-all duration-500">
                {/* Icon */}
                <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  {stat.icon}
                </div>

                {/* Animated Number */}
                <div
                  className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                >
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={3}
                  />
                </div>

                {/* Label */}
                <p className="text-xl text-gray-300 font-semibold">
                  {stat.label}
                </p>

                {/* Animated Underline */}
                <div
                  className={`w-0 group-hover:w-full h-1 bg-gradient-to-r ${stat.color} mx-auto mt-4 transition-all duration-500 rounded-full`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PlatformStats;
