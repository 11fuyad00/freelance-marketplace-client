import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    summary: '',
    coverImage: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;
    (async () => {
      try {
        const res = await fetch(
          'https://freelance-marketplace-kohl.vercel.app/jobs'
        );
        const data = await res.json();
        setJobs(
          data.filter(
            j => j.userEmail?.toLowerCase() === user.email.toLowerCase()
          )
        );
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to load your jobs');
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  const openEditModal = job => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      category: job.category,
      summary: job.summary,
      coverImage: job.coverImage,
    });
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/jobs/${editingJob._id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editingJob, ...formData }),
        }
      );
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success('🎉 Job updated successfully!');
        setJobs(prev =>
          prev.map(job =>
            job._id === editingJob._id ? { ...job, ...formData } : job
          )
        );
        setEditingJob(null);
      }
    } catch (err) {
      toast.error('❌ Failed to update job');
      console.error(err);
    }
  };

  const handleDelete = job => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    try {
      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/jobs/${jobToDelete._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success('🗑️ Job deleted successfully!');
        setJobs(prev => prev.filter(job => job._id !== jobToDelete._id));
      }
    } catch (err) {
      toast.error('❌ Failed to delete job');
    } finally {
      setShowDeleteModal(false);
      setJobToDelete(null);
    }
  };

  const getStatusColor = s =>
    ({
      open: 'from-green-500 to-emerald-500',
      accepted: 'from-blue-500 to-cyan-500',
      done: 'from-gray-500 to-gray-600',
    }[s] || 'from-yellow-500 to-amber-500');

  const getStatusText = s =>
    ({
      open: 'Active',
      accepted: 'In Progress',
      done: 'Completed',
    }[s] || s);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <p className="text-white text-2xl font-semibold">
          Please login to see your jobs
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Posted Jobs
            </span>
          </h1>
          <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
            Manage all the jobs you've posted. Edit details, track status, and
            make updates.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20">
            <div className="text-8xl mb-6">💼</div>
            <h3 className="text-3xl font-bold text-white mb-4">
              No Jobs Posted Yet
            </h3>
            <p className="text-cyan-100 text-lg mb-8">
              Start by creating your first job post and find the perfect
              freelancer!
            </p>
            <Link to="/addJob">
              <button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg text-lg">
                Post Your First Job
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {jobs.map(job => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-2xl rounded-3xl p-6 border border-white/20 shadow-2xl overflow-hidden relative hover:border-cyan-400/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 bg-gradient-to-r ${getStatusColor(
                      job.status
                    )} text-white text-sm font-bold rounded-full backdrop-blur-sm shadow-lg`}
                  >
                    {getStatusText(job.status)}
                  </span>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <img
                    src={job.coverImage}
                    alt={job.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 bg-black/70 text-white text-sm rounded-full backdrop-blur-sm">
                      {job.category}
                    </span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">
                  {job.title}
                </h2>
                <p className="text-cyan-100 text-sm mb-4 line-clamp-3">
                  {job.summary}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Budget:</span>
                    <span className="text-green-400 font-semibold">
                      {job.budget || 'Negotiable'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-cyan-200">Posted:</span>
                    <span className="text-white">
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openEditModal(job)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    ✏️ Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(job)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    🗑️ Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {editingJob && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-cyan-500/30 shadow-2xl"
              >
                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">✏️</div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Edit Job
                  </h2>
                  <p className="text-cyan-100">Update your job details</p>
                </div>
                <form onSubmit={handleUpdate} className="space-y-4">
                  {['title', 'category', 'summary', 'coverImage'].map(field =>
                    field === 'summary' ? (
                      <div key={field}>
                        <label className="text-cyan-200 text-sm font-medium mb-2 block">
                          {field[0].toUpperCase() + field.slice(1)}
                        </label>
                        <textarea
                          placeholder="Job Summary"
                          value={formData[field]}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                          rows="3"
                          className="w-full bg-white/10 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm resize-none"
                          required
                        />
                      </div>
                    ) : (
                      <div key={field}>
                        <label className="text-cyan-200 text-sm font-medium mb-2 block">
                          {field[0].toUpperCase() + field.slice(1)}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            field === 'coverImage' ? 'Image URL' : 'Job Title'
                          }
                          value={formData[field]}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              [field]: e.target.value,
                            })
                          }
                          className="w-full bg-white/10 border border-cyan-500/30 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 backdrop-blur-sm"
                          required
                        />
                      </div>
                    )
                  )}
                  <div className="flex gap-3 pt-4">
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setEditingJob(null)}
                      className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                    >
                      ✅ Update Job
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-6xl mb-4"
                >
                  🗑️
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Delete Job?
                </h3>
                <p className="text-cyan-100 mb-4">
                  Are you sure you want to delete "{jobToDelete?.title}"? This
                  action cannot be undone.
                </p>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowDeleteModal(false);
                      setJobToDelete(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    🗑️ Delete
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="text-center mt-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/allJobs')}
            className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm border border-cyan-400/30 text-cyan-300 hover:text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
          >
            ← Back to All Jobs
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MyAddedJobs;
