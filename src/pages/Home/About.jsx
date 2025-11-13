import { motion } from 'framer-motion';
import { Link } from 'react-router';

const About = () => {
  const features = [
    {
      icon: '🚀',
      title: 'Fast & Reliable',
      description:
        'Quick job posting and instant connections with qualified freelancers',
    },
    {
      icon: '🛡️',
      title: 'Secure Payments',
      description: 'Protected transactions with our secure payment system',
    },
    {
      icon: '🌟',
      title: 'Quality Talent',
      description: 'Access to vetted professionals with proven track records',
    },
    {
      icon: '📞',
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your needs',
    },
  ];

  const stats = [
    { number: '50K+', label: 'Completed Projects' },
    { number: '25K+', label: 'Happy Clients' },
    { number: '150+', label: 'Countries' },
    { number: '4.9/5', label: 'Rating' },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-cyan-300">FreelanceHub</span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              FreelanceHub is the leading marketplace connecting businesses with
              top freelance talent worldwide. Our platform makes it easy to find
              the perfect match for your projects, whether you're a startup or
              an established enterprise.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <div className="text-2xl">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-cyan-300 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/allJobs"
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-center"
              >
                Start Exploring
              </Link>
              <Link
                to="/addAJob"
                className="border-2 border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 text-center"
              >
                Post a Job
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <motion.div
                  className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-300 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Trusted By Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-gray-400 mb-8 text-lg">
            Trusted by companies worldwide
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['Google', 'Microsoft', 'Apple', 'Amazon', 'Netflix', 'Meta'].map(
              company => (
                <motion.div
                  key={company}
                  whileHover={{ scale: 1.1, opacity: 1 }}
                  className="text-xl font-bold text-gray-300"
                >
                  {company}
                </motion.div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
