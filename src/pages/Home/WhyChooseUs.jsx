// components/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: '🔒',
      title: 'Verified Freelancers',
      desc: 'All freelancers are thoroughly verified with background checks and skill assessments',
      color: 'from-green-500 to-emerald-500',
      delay: 0.1,
    },
    {
      icon: '💳',
      title: 'Secure Payments',
      desc: 'Escrow protection ensures your money is safe until project completion',
      color: 'from-blue-500 to-cyan-500',
      delay: 0.2,
    },
    {
      icon: '⚡',
      title: 'Quick Hiring',
      desc: 'Find and hire the perfect freelancer in less than 24 hours',
      color: 'from-purple-500 to-pink-500',
      delay: 0.3,
    },
    {
      icon: '🎯',
      title: 'Quality Work',
      desc: 'Guaranteed high-quality deliverables with our satisfaction policy',
      color: 'from-orange-500 to-red-500',
      delay: 0.4,
    },
    {
      icon: '🛡️',
      title: '24/7 Support',
      desc: 'Round-the-clock customer support to help you anytime',
      color: 'from-indigo-500 to-blue-500',
      delay: 0.5,
    },
    {
      icon: '💫',
      title: 'Easy Collaboration',
      desc: 'Built-in tools for seamless communication and project management',
      color: 'from-yellow-500 to-orange-500',
      delay: 0.6,
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={ref}
      className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Why Choose Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the difference with our premium freelance platform
            designed for success
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -15,
                scale: 1.02,
                transition: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 25,
                },
              }}
              custom={feature.delay}
              className="group relative"
            >
              {/* Main Card */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 group-hover:shadow-2xl transition-all duration-500 h-full relative z-10">
                {/* Icon Container */}
                <div
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-3xl text-white mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>

              {/* Floating Background Element */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500 -z-0`}
              ></div>

              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500 -z-10 scale-110`}
              ></div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
