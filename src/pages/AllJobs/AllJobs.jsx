import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const AllJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/jobs?sort=${sortOrder}`
        );
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error('Error fetching jobs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllJobs();
  }, [sortOrder]);

  const categories = [
    'all',
    ...new Set(jobs.map(job => job.category).filter(Boolean)),
  ];
  const filteredJobs =
    filterCategory === 'all'
      ? jobs
      : jobs.filter(job => job.category === filterCategory);

  const getJobStatus = job => {
    if (job.status === 'completed')
      return { text: 'COMPLETED', color: 'bg-blue-500', icon: '✅' };
    if (job.status === 'accepted')
      return { text: 'ACCEPTED', color: 'bg-yellow-500', icon: '🟡' };
    return { text: 'OPEN', color: 'bg-green-500', icon: '🟢' };
  };

  const handleViewDetails = (job, e) => {
    e.stopPropagation();
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-6"
          />
          <p className="text-gray-600 text-xl font-medium">
            Loading amazing opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore{' '}
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              Opportunities
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover freelance opportunities that match your skills and
            interests
          </p>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-lg text-gray-700 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
              <span className="font-semibold text-cyan-600">
                {filteredJobs.length}
              </span>{' '}
              {filterCategory === 'all'
                ? 'opportunities'
                : filterCategory.toLowerCase()}{' '}
              available
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
                <span className="text-gray-600 font-medium mr-3">
                  Category:
                </span>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-cyan-300 rounded-lg px-3 py-1 text-gray-700"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
                <span className="text-gray-600 font-medium mr-3">Sort by:</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSortOrder('desc')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      sortOrder === 'desc'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-cyan-300 hover:shadow-md'
                    }`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => setSortOrder('asc')}
                    className={`px-4 py-2 rounded-xl font-medium transition-all ${
                      sortOrder === 'asc'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-cyan-300 hover:shadow-md'
                    }`}
                  >
                    Oldest
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {filteredJobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-3xl shadow-lg border border-gray-200"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              No Opportunities Found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {filterCategory === 'all'
                ? 'No jobs available yet. Be the first to post a job!'
                : `No ${filterCategory.toLowerCase()} jobs available. Try another category.`}
            </p>
            {filterCategory !== 'all' && (
              <button
                onClick={() => setFilterCategory('all')}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl mr-4"
              >
                Show All Categories
              </button>
            )}
            <Link
              to="/addJob"
              className="inline-block bg-white border-2 border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Post New Job
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => {
              const jobStatus = getJobStatus(job);
              const isCompleted = job.status === 'completed';
              const isAccepted = job.status === 'accepted';

              return (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200/60 hover:border-cyan-300/80 transition-all duration-300 group cursor-pointer relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-300" />

                  <div className="h-48 overflow-hidden bg-gradient-to-br from-cyan-50 to-purple-50 flex items-center justify-center relative">
                    {job.coverImage ? (
                      <>
                        <img
                          src={job.coverImage}
                          alt={job.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300" />
                      </>
                    ) : (
                      <div className="text-gray-400 text-center">
                        <div className="text-4xl mb-2">💼</div>
                        <p className="text-sm">No Image</p>
                      </div>
                    )}

                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${jobStatus.color} text-white flex items-center gap-1 shadow-md`}
                      >
                        <span className="text-xs">{jobStatus.icon}</span>
                        {jobStatus.text}
                      </span>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/20">
                        {job.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 relative">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        📅 {new Date(job.created_at).toLocaleDateString()}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        ⚡ {job.experience || 'Any Level'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-cyan-600 transition-colors duration-300">
                      {job.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                      {job.summary}
                    </p>

                    {job.tags && job.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-gradient-to-r from-cyan-50 to-purple-50 text-cyan-700 rounded-lg text-xs font-medium border border-cyan-200/60"
                          >
                            #{tag}
                          </span>
                        ))}
                        {job.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                            +{job.tags.length - 3} more
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                          {job.postedBy?.charAt(0) || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {job.postedBy}
                          </p>
                          <p className="text-xs text-gray-500">Client</p>
                        </div>
                      </div>

                      <button
                        onClick={e => handleViewDetails(job, e)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                      >
                        <span>View Details</span>
                        <span className="text-xs">→</span>
                      </button>
                    </div>

                    {(isAccepted || isCompleted) && job.acceptedBy && (
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <p className="text-xs text-gray-600 flex items-center gap-1">
                          <span className="font-medium">
                            {isCompleted
                              ? '✅ Completed by:'
                              : '🟡 Accepted by:'}
                          </span>
                          <span
                            className={`${
                              isCompleted ? 'text-blue-600' : 'text-amber-600'
                            } font-medium`}
                          >
                            {job.acceptedBy}
                          </span>
                        </p>
                        {isCompleted && job.completed_at && (
                          <p className="text-xs text-gray-500 mt-1">
                            Completed on:{' '}
                            {new Date(job.completed_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-cyan-100 mb-6 max-w-2xl mx-auto">
              Join thousands of freelancers finding their next opportunity. View
              full job details to accept and start working.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-white text-cyan-600 hover:bg-cyan-50 font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                ← Back to Home
              </Link>
              <Link
                to="/addJob"
                className="bg-cyan-700 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && selectedJob && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <div className="relative h-64">
                <img
                  src={
                    selectedJob.coverImage ||
                    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
                  }
                  alt={selectedJob.title}
                  className="w-full h-full object-cover rounded-t-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl" />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-full text-sm font-medium">
                      {selectedJob.category}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        getJobStatus(selectedJob).color
                      } text-white flex items-center gap-1`}
                    >
                      <span className="text-xs">
                        {getJobStatus(selectedJob).icon}
                      </span>
                      {getJobStatus(selectedJob).text}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-cyan-100 flex items-center gap-2">
                    👤 Posted by {selectedJob.postedBy}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl text-cyan-500 mb-2">💰</div>
                    <div className="text-sm text-gray-600">Budget Range</div>
                    <div className="font-semibold text-gray-900">
                      $500 - $2000
                    </div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-2xl">
                    <div className="text-2xl text-purple-500 mb-2">⏰</div>
                    <div className="text-sm text-gray-600">Duration</div>
                    <div className="font-semibold text-gray-900">2-6 weeks</div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📖</span> Project Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedJob.summary}
                  </p>
                </div>

                {selectedJob.tags && selectedJob.tags.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <span>🎯</span> Skills Required
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-2 bg-gradient-to-r from-cyan-50 to-purple-50 text-cyan-700 rounded-lg text-sm border border-cyan-200 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6 p-4 bg-gray-50 rounded-2xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>👥</span> Client Information
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Company:</span>
                      <span className="font-semibold">
                        {selectedJob.postedBy}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="text-cyan-600">
                        {selectedJob.userEmail}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted:</span>
                      <span className="text-gray-700">
                        {new Date(selectedJob.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {(selectedJob.status === 'accepted' ||
                      selectedJob.status === 'completed') &&
                      selectedJob.acceptedBy && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            {selectedJob.status === 'completed'
                              ? 'Completed by:'
                              : 'Accepted by:'}
                          </span>
                          <span
                            className={`font-semibold ${
                              selectedJob.status === 'completed'
                                ? 'text-blue-600'
                                : 'text-amber-600'
                            }`}
                          >
                            {selectedJob.acceptedBy}
                          </span>
                        </div>
                      )}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold transition-all duration-300 hover:border-gray-400"
                  >
                    Close Preview
                  </button>
                  <Link
                    to={`/allJobs/${selectedJob._id}`}
                    className="flex-1"
                    onClick={closeModal}
                  >
                    <button className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg">
                      View Full Details
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllJobs;
