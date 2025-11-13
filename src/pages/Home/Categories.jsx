import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Categories = () => {
  const categories = [
    {
      name: 'Web Development',
      icon: '💻',
      description: 'Frontend, Backend, Full-stack development',
      jobs: '1,234',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Graphic Design',
      icon: '🎨',
      description: 'UI/UX, Logo, Brand identity design',
      jobs: '856',
      color: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Digital Marketing',
      icon: '📈',
      description: 'SEO, Social Media, Content Marketing',
      jobs: '942',
      color: 'from-green-500 to-emerald-500',
    },
    {
      name: 'Content Writing',
      icon: '✍️',
      description: 'Articles, Blogs, Copywriting',
      jobs: '723',
      color: 'from-orange-500 to-red-500',
    },
    {
      name: 'Mobile Development',
      icon: '📱',
      description: 'iOS, Android, React Native',
      jobs: '678',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      name: 'SEO Services',
      icon: '🔍',
      description: 'Search Engine Optimization',
      jobs: '512',
      color: 'from-yellow-500 to-amber-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore <span className="text-purple-500">Top Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find your perfect freelance opportunity across various categories
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{category.icon}</div>
                  <motion.div
                    className="text-sm font-bold text-gray-600"
                    whileHover={{ scale: 1.1 }}
                  >
                    {category.jobs} jobs
                  </motion.div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {category.name}
                </h3>

                <p className="text-gray-600 mb-6">{category.description}</p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/allJobs?category=${category.name}`}
                    className={`inline-flex items-center text-sm font-medium bg-gradient-to-r ${category.color} text-white px-4 py-2 rounded-lg transition-all duration-300`}
                  >
                    Explore Jobs
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for?
          </p>
          <Link
            to="/addAJob"
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg"
          >
            Post a Custom Job
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Categories;
