import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AddAJob = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    coverImage: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const categories = [
    'Web Development',
    'Graphic Design',
    'Digital Marketing',
    'Content Writing',
    'Mobile Development',
    'SEO Services',
    'Data Science',
    'Video Editing',
    'UI/UX Design',
    'Other',
  ];

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    if (name === 'coverImage') setImagePreview(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Job title is required';
    else if (formData.title.length < 5)
      newErrors.title = 'Title must be at least 5 characters';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.summary.trim()) newErrors.summary = 'Description is required';
    else if (formData.summary.length < 20)
      newErrors.summary = 'Description must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('❌ Please fix the errors');
      return;
    }
    setLoading(true);
    const jobData = {
      ...formData,
      postedBy: user.displayName || user.name || 'Anonymous',
      userEmail: user.email.toLowerCase(),
      status: 'open',
      created_at: new Date().toISOString(),
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
    };

    console.log('Submitting job:', jobData);

    try {
      const res = await fetch(
        'https://freelance-marketplace-kohl.vercel.app/jobs',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData),
        }
      );

      if (res.ok) {
        toast.success('🎉 Job posted successfully!');
        setFormData({
          title: '',
          category: '',
          summary: '',
          coverImage: '',
          tags: '',
        });
        setImagePreview('');
        setTimeout(() => navigate('/allJobs'), 2000);
      } else throw new Error('Failed to post job');
    } catch (err) {
      toast.error('❌ Failed to post job');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const motionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-8 relative">
      {/* Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20"
            style={{
              width: 50 + Math.random() * 100,
              height: 50 + Math.random() * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="text-6xl md:text-7xl font-bold text-white mb-6"
          >
            Create{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Amazing
            </span>{' '}
            Opportunity
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-cyan-100 max-w-3xl mx-auto leading-relaxed"
          >
            Launch your project to thousands of skilled professionals. Craft the
            perfect job post and watch talent come to you.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 xl:grid-cols-12 gap-8"
        >
          {/* Form */}
          <motion.div
            variants={motionVariants}
            className="xl:col-span-8 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-cyan-600/20 to-purple-600/20 border-b border-white/10 p-6">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                Job Details
              </h2>
              <p className="text-cyan-100 mt-2">
                Fill in the details to attract the best talent
              </p>
            </div>
            <div className="p-8">
              <form onSubmit={onSubmit} className="space-y-8">
                {/** Title */}
                <motion.div variants={motionVariants}>
                  <label className="block text-sm font-semibold text-cyan-200 mb-4 flex items-center gap-2">
                    <span className="text-cyan-400">✦</span> Job Title *
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="e.g., Senior React Developer"
                    className="w-full px-6 py-5 bg-white/5 border border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 text-lg text-white placeholder-cyan-200/50 backdrop-blur-sm"
                  />
                  {errors.title && (
                    <p className="text-red-300 text-sm mt-3 flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-xl border border-red-400/30">
                      ⚠️ {errors.title}
                    </p>
                  )}
                </motion.div>

                {/** Category & Tags */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <motion.div variants={motionVariants}>
                    <label className="block text-sm font-semibold text-cyan-200 mb-4 flex items-center gap-2">
                      <span className="text-purple-400">✦</span> Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-6 py-5 bg-white/5 border border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-white backdrop-blur-sm"
                    >
                      <option value="">Select a category</option>
                      {categories.map(c => (
                        <option
                          key={c}
                          value={c}
                          className="bg-black text-white"
                        >
                          {c}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-300 text-sm mt-3 flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-xl border border-red-400/30">
                        ⚠️ {errors.category}
                      </p>
                    )}
                  </motion.div>
                  <motion.div variants={motionVariants}>
                    <label className="block text-sm font-semibold text-cyan-200 mb-4 flex items-center gap-2">
                      <span className="text-pink-400">✦</span> Tags
                    </label>
                    <input
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      type="text"
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-6 py-5 bg-white/5 border border-pink-500/30 rounded-2xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all duration-300 text-white placeholder-cyan-200/50 backdrop-blur-sm"
                    />
                  </motion.div>
                </div>

                {/** Description */}
                <motion.div variants={motionVariants}>
                  <label className="block text-sm font-semibold text-cyan-200 mb-4 flex items-center gap-2">
                    <span className="text-cyan-400">✦</span> Job Description *
                  </label>
                  <textarea
                    name="summary"
                    value={formData.summary}
                    onChange={handleInputChange}
                    rows="6"
                    placeholder="Describe project scope..."
                    className="w-full px-6 py-5 bg-white/5 border border-cyan-500/30 rounded-2xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none text-white placeholder-cyan-200/50 backdrop-blur-sm"
                  />
                  {errors.summary && (
                    <p className="text-red-300 text-sm mt-3 flex items-center gap-2 bg-red-500/20 px-4 py-2 rounded-xl border border-red-400/30">
                      ⚠️ {errors.summary}
                    </p>
                  )}
                </motion.div>

                {/** Cover Image */}
                <motion.div variants={motionVariants}>
                  <label className="block text-sm font-semibold text-cyan-200 mb-4 flex items-center gap-2">
                    <span className="text-purple-400">✦</span> Cover Image URL
                  </label>
                  <input
                    name="coverImage"
                    value={formData.coverImage}
                    onChange={handleInputChange}
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full px-6 py-5 bg-white/5 border border-purple-500/30 rounded-2xl focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-all duration-300 text-white placeholder-cyan-200/50 backdrop-blur-sm"
                  />
                </motion.div>

                {/** Submit */}
                <motion.div variants={motionVariants} className="pt-8">
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className={`w-full py-6 px-8 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden group ${
                      loading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-2xl hover:shadow-cyan-500/25'
                    } text-white`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3 relative z-10 animate-spin">
                        ⏳ Crafting...
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-3 relative z-10">
                        🚀 Launch Opportunity ✨
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Live Preview */}
          <motion.div
            variants={motionVariants}
            className="xl:col-span-4 bg-gradient-to-br from-cyan-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-400/20 overflow-hidden h-fit sticky top-8 p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse"></div>
              Live Preview
            </h3>
            <AnimatePresence>
              {imagePreview ? (
                <motion.img
                  key="img"
                  src={imagePreview}
                  alt="Cover"
                  className="w-full h-48 object-cover rounded-2xl mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center border-2 border-dashed border-cyan-400/30 mb-4 text-cyan-200 text-center">
                  🖼️ Cover image preview
                </div>
              )}
            </AnimatePresence>
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm border border-cyan-400/20 p-4 rounded-xl">
                <p className="text-white text-lg font-medium">
                  {formData.title || 'Your job title will appear here'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-purple-400/20 p-4 rounded-xl">
                <p className="text-white">
                  {formData.category || 'Select a category'}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-pink-400/20 p-4 rounded-xl min-h-[6rem]">
                <p className="text-cyan-100 text-sm">
                  {formData.summary || 'Job description will appear here...'}
                </p>
              </div>

              {/* Pro Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl p-5 mt-4"
              >
                <h4 className="font-bold text-cyan-300 mb-3 flex items-center gap-2 text-lg">
                  💫 Pro Tips
                </h4>
                <ul className="text-cyan-100 text-sm space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Be specific about project requirements
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                    Mention timeline and budget expectations
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-pink-400 rounded-full"></div>
                    Include required skills and experience
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    Add clear deliverables and milestones
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/allJobs')}
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg"
          >
            ← <span>Back to Opportunities</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AddAJob;
