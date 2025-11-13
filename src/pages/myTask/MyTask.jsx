import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const MyTask = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('active');

  const fetchTasks = async () => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/my-accepted-tasks?email=${user.email}`
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      const myTasks = data.filter(
        task =>
          task.acceptedBy === user.email &&
          (task.status === 'accepted' || task.status === 'completed')
      );
      setTasks(myTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      toast.error('Failed to fetch your tasks');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskAction = async (taskId, action) => {
    try {
      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/jobs/${taskId}/done`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action }),
        }
      );

      if (res.ok) {
        if (action === 'done') {
          toast.success('🎉 Task marked as completed!');
          setTasks(prev =>
            prev.map(task =>
              task._id === taskId
                ? { ...task, status: 'completed', completed_at: new Date() }
                : task
            )
          );
        } else {
          toast.success('Task cancelled');
          setTasks(prev => prev.filter(task => task._id !== taskId));
        }
      } else {
        throw new Error('Failed to update task');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user?.email]);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return task.status === 'accepted';
    if (filter === 'completed') return task.status === 'completed';
    return true;
  });

  const getStatusConfig = status => {
    const configs = {
      accepted: { color: 'bg-yellow-500', text: 'In Progress', icon: '🟡' },
      completed: { color: 'bg-green-500', text: 'Completed', icon: '✅' },
      open: { color: 'bg-blue-500', text: 'Open', icon: '🔵' },
    };
    return (
      configs[status] || { color: 'bg-gray-500', text: status, icon: '⚫' }
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <p className="text-cyan-100 text-xl font-medium">
            Loading your professional tasks...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            My{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Tasks
            </span>
          </h1>
          <p className="text-cyan-100 text-xl max-w-2xl mx-auto">
            Manage your accepted freelance opportunities and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-white mb-2">
              {tasks.length}
            </div>
            <div className="text-cyan-200 text-sm">Total Tasks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {tasks.filter(t => t.status === 'accepted').length}
            </div>
            <div className="text-cyan-200 text-sm">Active Tasks</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-cyan-200 text-sm">Completed</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setFilter('active')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              filter === 'active'
                ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                : 'bg-white/10 text-cyan-100 border border-white/20 hover:bg-white/20'
            }`}
          >
            Active Tasks ({tasks.filter(t => t.status === 'accepted').length})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
              filter === 'completed'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                : 'bg-white/10 text-cyan-100 border border-white/20 hover:bg-white/20'
            }`}
          >
            Completed ({tasks.filter(t => t.status === 'completed').length})
          </button>
        </div>

        <AnimatePresence>
          {filteredTasks.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">
                {filter === 'completed' ? '🎉' : '⏳'}
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                {filter === 'completed'
                  ? 'No Completed Tasks Yet'
                  : 'No Active Tasks'}
              </h3>
              <p className="text-cyan-100 text-lg mb-8 max-w-md mx-auto">
                {filter === 'completed'
                  ? "You haven't completed any tasks yet. Complete some active tasks to see them here!"
                  : "You don't have any active tasks. Accept some jobs to get started!"}
              </p>
              {filter === 'completed' && (
                <button
                  onClick={() => setFilter('active')}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl mr-4"
                >
                  View Active Tasks
                </button>
              )}
              <button
                onClick={() => (window.location.href = '/allJobs')}
                className="bg-white/10 hover:bg-white/20 text-cyan-100 border border-white/20 font-bold py-4 px-8 rounded-2xl transition-all duration-300"
              >
                Browse Opportunities
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredTasks.map((task, index) => {
                const statusConfig = getStatusConfig(task.status);
                return (
                  <motion.div
                    key={task._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:border-cyan-400/30 transition-all duration-300"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                          <h3 className="text-2xl font-bold text-white">
                            {task.title}
                          </h3>
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-bold ${statusConfig.color} text-white flex items-center gap-2`}
                          >
                            <span>{statusConfig.icon}</span>
                            {statusConfig.text}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 mb-4 text-cyan-100">
                          <span className="flex items-center gap-2 bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-400/30">
                            🏷️ {task.category}
                          </span>
                          <span className="flex items-center gap-2 bg-purple-500/20 px-3 py-1 rounded-lg border border-purple-400/30">
                            👤 {task.postedBy}
                          </span>
                          <span className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg border border-white/20">
                            📅 {new Date(task.created_at).toLocaleDateString()}
                          </span>
                          {task.completed_at && (
                            <span className="flex items-center gap-2 bg-green-500/20 px-3 py-1 rounded-lg border border-green-400/30">
                              ✅ Completed:{' '}
                              {new Date(task.completed_at).toLocaleDateString()}
                            </span>
                          )}
                        </div>

                        {task.summary && (
                          <p className="text-cyan-100 leading-relaxed mb-4">
                            {task.summary}
                          </p>
                        )}

                        {task.tags && task.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {task.tags.map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-200 rounded-lg text-sm border border-cyan-400/30"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {task.status === 'accepted' && (
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                          <button
                            onClick={() => handleTaskAction(task._id, 'done')}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[120px]"
                          >
                            <span>✅</span>
                            Mark Done
                          </button>
                          <button
                            onClick={() => handleTaskAction(task._id, 'cancel')}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[120px]"
                          >
                            <span>❌</span>
                            Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MyTask;
