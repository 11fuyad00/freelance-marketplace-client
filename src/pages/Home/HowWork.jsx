// components/HowItWorks.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HowWork = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const steps = [
    {
      icon: '📝',
      title: 'Post a Job',
      desc: 'Describe your project and requirements in detail',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: '💼',
      title: 'Get Proposals',
      desc: 'Receive bids from skilled freelancers worldwide',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: '⭐',
      title: 'Choose Freelancer',
      desc: 'Select the best candidate based on portfolio and reviews',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🚀',
      title: 'Complete Project',
      desc: 'Work together and successfully finish your project',
      color: 'from-orange-500 to-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-gray-50 to-blue-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your project done in 4 simple steps with our platform
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { type: 'spring', stiffness: 300 },
              }}
              className="relative group"
            >
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2 z-0" />
              )}

              <div className="relative z-10 bg-white rounded-2xl p-8 shadow-lg border border-gray-100 group-hover:shadow-2xl transition-all duration-300">
                {/* Step Number */}
                <div
                  className={`absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}
                >
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}
                >
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{step.desc}</p>

                {/* Animated Border */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}
                >
                  <div className="absolute inset-[2px] rounded-2xl bg-white"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWork;
