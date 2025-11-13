import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Categories = () => {
  const categories = [
    {
      name: 'Web Development',
      icon: '🌐',
      description: 'Frontend, Backend, Full-stack development',
      jobs: '1,234',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-blue-100',
      borderColor: 'border-cyan-200',
      textColor: 'text-cyan-700',
    },
    {
      name: 'Graphic Design',
      icon: '🎨',
      description: 'UI/UX, Logo, Brand identity design',
      jobs: '856',
      color: 'from-fuchsia-500 to-purple-600',
      bgColor: 'bg-gradient-to-br from-fuchsia-50 to-purple-100',
      borderColor: 'border-fuchsia-200',
      textColor: 'text-fuchsia-700',
    },
    {
      name: 'Digital Marketing',
      icon: '🚀',
      description: 'SEO, Social Media, Content Marketing',
      jobs: '942',
      color: 'from-emerald-500 to-green-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-green-100',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
    },
    {
      name: 'Content Writing',
      icon: '✍️',
      description: 'Articles, Blogs, Copywriting',
      jobs: '723',
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-orange-100',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
    },
    {
      name: 'Mobile Development',
      icon: '📱',
      description: 'iOS, Android, React Native',
      jobs: '678',
      color: 'from-violet-500 to-indigo-600',
      bgColor: 'bg-gradient-to-br from-violet-50 to-indigo-100',
      borderColor: 'border-violet-200',
      textColor: 'text-violet-700',
    },
    {
      name: 'Data Science',
      icon: '📊',
      description: 'AI, Machine Learning, Analytics',
      jobs: '589',
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-gradient-to-br from-rose-50 to-red-100',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-700',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateZ: -1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -5, 0],
      scale: 1.2,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <span className="text-6xl">🚀</span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Discover{' '}
            <span className="bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Amazing
            </span>{' '}
            Categories
          </h2>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Explore thousands of premium freelance opportunities across diverse
            fields and technologies
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover="hover"
              className={`relative group rounded-3xl ${category.bgColor} border-2 ${category.borderColor} shadow-2xl shadow-black/5 backdrop-blur-sm overflow-hidden`}
            >
              {/* Animated Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-5 transition-all duration-700`}
              />

              {/* Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <div className="relative p-8">
                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    variants={iconVariants}
                    whileHover="hover"
                    className={`text-5xl p-4 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg`}
                  >
                    {category.icon}
                  </motion.div>
                  <motion.div
                    className={`px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg font-bold ${category.textColor}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {category.jobs} jobs
                  </motion.div>
                </div>

                <h3
                  className={`text-3xl font-black ${category.textColor} mb-4 leading-tight`}
                >
                  {category.name}
                </h3>

                <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                  {category.description}
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    to={`/allJobs?category=${category.name}`}
                    className={`group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white rounded-2xl bg-gradient-to-r ${category.color} shadow-lg shadow-black/25 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 overflow-hidden`}
                  >
                    {/* Button Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/0 to-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    <span className="relative">Explore Jobs</span>
                    <svg
                      className="w-5 h-5 ml-3 relative"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>

              {/* Corner Accents */}
              <div
                className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${category.color} opacity-20 rounded-tr-3xl`}
              />
              <div
                className={`absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr ${category.color} opacity-20 rounded-bl-3xl`}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            className="relative group"
          >
            {/* Animated Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-all duration-1000 animate-pulse"></div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: `linear-gradient(45deg, ${
                      i % 3 === 0
                        ? '#22d3ee'
                        : i % 3 === 1
                        ? '#a855f7'
                        : '#ec4899'
                    }, ${
                      i % 3 === 0
                        ? '#06b6d4'
                        : i % 3 === 1
                        ? '#9333ea'
                        : '#db2777'
                    })`,
                  }}
                  animate={{
                    y: [0, -40, 0],
                    x: [0, 20, 0],
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: 'easeInOut',
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Main Container */}
            <div className="relative bg-gradient-to-br from-white/95 via-white/90 to-purple-50/90 backdrop-blur-2xl rounded-3xl p-12 border-2 border-white/40 shadow-3xl shadow-purple-500/15 group-hover:shadow-purple-500/25 transition-all duration-500 overflow-hidden">
              {/* Shine Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-400/30 via-purple-500/20 to-pink-400/30 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-400/30 via-purple-500/20 to-cyan-400/30 rounded-bl-3xl"></div>

              {/* Content */}
              <div className="relative text-center">
                {/* Animated Icon */}
                <motion.div
                  className="inline-block mb-6"
                  animate={{
                    y: [0, -8, 0],
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="text-6xl">🎯</div>
                </motion.div>

                {/* Heading */}
                <motion.h3
                  className="text-5xl font-black mb-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  Ready to Launch Your Vision?
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-2xl text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Can't find the perfect match?{' '}
                  <span className="font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                    Create your custom job posting
                  </span>{' '}
                  and connect with the exact talent you need.
                </motion.p>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Link
                    to="/addAJob"
                    className="group relative inline-flex items-center justify-center px-16 py-6 text-xl font-black text-white rounded-2xl shadow-3xl shadow-purple-500/40 hover:shadow-4xl hover:shadow-purple-500/60 transition-all duration-500 overflow-hidden"
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 group-hover:from-cyan-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-500" />

                    {/* Moving Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-pink-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                      <div className="absolute inset-[3px] rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"></div>
                    </div>

                    <span className="relative flex items-center">
                      <motion.span
                        className="mr-3 text-2xl"
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        ✨
                      </motion.span>
                      Create Custom Job
                      <motion.svg
                        className="w-6 h-6 ml-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 6, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </motion.svg>
                    </span>
                  </Link>
                </motion.div>

                {/* Additional Features */}
                <motion.div
                  className="flex justify-center items-center gap-8 mt-8 text-sm font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center text-cyan-600">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></div>
                    Fast Setup
                  </div>
                  <div className="flex items-center text-purple-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                    Quality Talent
                  </div>
                  <div className="flex items-center text-pink-600">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mr-2 animate-pulse"></div>
                    Secure Payment
                  </div>
                </motion.div>
              </div>

              {/* Bottom Wave Effect */}
              <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
