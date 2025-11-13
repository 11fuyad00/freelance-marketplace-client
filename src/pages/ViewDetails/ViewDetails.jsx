import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Project Overview', icon: '📋' },
    { id: 'requirements', label: 'Requirements', icon: '🎯' },
    { id: 'deliverables', label: 'Deliverables', icon: '📦' },
    { id: 'client', label: 'Client Info', icon: '👥' },
  ];

  const defaultJob = {
    description: `We are seeking an expert in web performance optimization to significantly improve our application's loading speed and user experience.`,
    requirements: [
      '5+ years of web performance optimization experience',
      'Expert knowledge of Webpack, Rollup, or Vite',
      'Experience with CDN configuration',
      'Strong understanding of Core Web Vitals',
    ],
    deliverables: [
      'Fully functional admin dashboard',
      'User management system',
      'Job moderation tools',
      'Comprehensive documentation',
    ],
    clientInfo: {
      name: 'Client Name',
      memberSince: '2023',
      totalJobs: 20,
      completedJobs: 18,
      rating: '4.7/5',
      location: 'Global',
    },
  };

  const getMockJob = id => ({
    _id: id,
    title: 'Performance Optimization — Reduce TTFB & Bundle Size',
    postedBy: 'ScaleLab',
    category: 'Performance',
    coverImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    userEmail: 'ops@scalelab.ai',
    created_at: '2024-09-12T11:00:00Z',
    status: 'open',
    acceptedBy: null,
    tags: ['performance', 'cdn', 'code-splitting', 'lazy-loading'],
    budget: '$1500 - $3000',
    deadline: '2024-04-15',
    experience: 'Advanced',
    duration: '3-4 weeks',
    ...defaultJob,
  });

  const fetchJob = async () => {
    try {
      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/jobs/${id}`
      );
      if (res.ok) {
        const data = await res.json();
        setJob({ ...defaultJob, ...data });
      } else setJob(getMockJob(id));
    } catch {
      setJob(getMockJob(id));
    } finally {
      setLoading(false);
    }
  };

  const formatDate = d =>
    d ? new Date(d).toLocaleDateString() : 'Not specified';
  const getSuccessRate = () =>
    job?.clientInfo?.totalJobs
      ? `${Math.round(
          (job.clientInfo.completedJobs / job.clientInfo.totalJobs) * 100
        )}%`
      : '0%';

  useEffect(() => {
    fetchJob();
  }, [id]);

  const handleAccept = async () => {
    if (!user) {
      toast.error('Please login first');
      return navigate('/login');
    }

    if (job.userEmail?.toLowerCase() === user?.email?.toLowerCase()) {
      toast.error("You can't accept your own job");
      return;
    }

    setAccepting(true);
    try {
      const acceptData = {
        userEmail: user.email,
        userName: user.displayName || user.name || 'User',
      };

      const res = await fetch(
        `https://freelance-marketplace-kohl.vercel.app/jobs/${id}/accept`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(acceptData),
        }
      );

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('🎉 Job accepted successfully!');
        setJob(prev => ({
          ...prev,
          status: 'accepted',
          acceptedBy: user.email,
        }));
        setTimeout(() => navigate('/mytask'), 2000);
      } else {
        toast.error(data.message || 'Failed to accept job');
      }
    } catch (err) {
      toast.error('Network error - Failed to accept job');
    } finally {
      setAccepting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );

  if (!job)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Job Not Found</div>
      </div>
    );

  const client = job.clientInfo || defaultJob.clientInfo;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <button
          onClick={() => navigate('/AllJobs')}
          className="text-cyan-300 mb-6 flex gap-2 items-center"
        >
          ← Back to Professional Opportunities
        </button>

        <div className="grid xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-white/10 rounded-3xl overflow-hidden">
              <div className="h-80 relative">
                <img
                  src={job.coverImage}
                  alt={job.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-6 left-6 flex gap-3">
                  <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-bold rounded-full">
                    {job.category}
                  </span>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-bold ${
                      job.status === 'open' ? 'bg-green-500' : 'bg-yellow-500'
                    } text-white`}
                  >
                    {job.status.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-6 left-6">
                  <h1 className="text-4xl font-bold text-white">{job.title}</h1>
                  <div className="flex gap-6 text-cyan-100 mt-2">
                    <div>👤 {job.postedBy}</div>
                    <div>📅 Posted {formatDate(job.created_at)}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { icon: '💰', label: 'Budget', value: job.budget },
                  {
                    icon: '⏰',
                    label: 'Deadline',
                    value: formatDate(job.deadline),
                  },
                  { icon: '🎯', label: 'Experience', value: job.experience },
                  { icon: '📅', label: 'Duration', value: job.duration },
                ].map(s => (
                  <div
                    key={s.label}
                    className="text-center p-4 bg-white/5 rounded-2xl"
                  >
                    <div className="text-2xl mb-2">{s.icon}</div>
                    <div className="text-cyan-200 text-sm mb-1">{s.label}</div>
                    <div className="text-white font-semibold">{s.value}</div>
                  </div>
                ))}
              </div>

              <div className="border-b border-white/10 flex overflow-x-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 border-b-2 ${
                      activeTab === tab.id
                        ? 'border-cyan-400 text-cyan-400 bg-cyan-400/10'
                        : 'border-transparent text-cyan-100'
                    }`}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {activeTab === 'overview' && (
                      <div className="whitespace-pre-line text-cyan-100">
                        {job.description}
                      </div>
                    )}
                    {activeTab === 'requirements' && (
                      <ul className="list-disc pl-5 text-cyan-100">
                        {job.requirements.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'deliverables' && (
                      <ul className="list-disc pl-5 text-cyan-100">
                        {job.deliverables.map((d, i) => (
                          <li key={i}>✅ {d}</li>
                        ))}
                      </ul>
                    )}
                    {activeTab === 'client' && (
                      <div className="text-cyan-100 space-y-2">
                        {Object.entries(client).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-cyan-200">{k}:</span>{' '}
                            <span className="text-white">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 p-6 rounded-3xl">
              <h3 className="font-bold text-xl text-white mb-3">
                Ready to Start?
              </h3>
              <p className="text-cyan-100 mb-4">
                Accept this professional opportunity and start working with{' '}
                {job.postedBy}
              </p>
              {job.status === 'open' ? (
                user?.email?.toLowerCase() === job.userEmail?.toLowerCase() ? (
                  <p className="text-yellow-300">
                    You cannot accept your own job
                  </p>
                ) : (
                  <button
                    onClick={handleAccept}
                    disabled={accepting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-bold text-white"
                  >
                    {accepting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Accepting...
                      </span>
                    ) : (
                      'Accept This Job'
                    )}
                  </button>
                )
              ) : (
                <p className="text-cyan-100 text-center py-2">
                  {job.status === 'accepted'
                    ? '✅ Already Accepted'
                    : '❌ Job Not Available'}
                </p>
              )}
            </div>

            <div className="bg-white/10 p-6 rounded-3xl">
              <h3 className="font-bold text-xl text-white mb-3">
                Skills Required
              </h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-cyan-500/20 rounded-lg text-sm text-cyan-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white/10 p-6 rounded-3xl">
              <h3 className="font-bold text-xl text-white mb-3">
                Client Profile
              </h3>
              <div className="space-y-2 text-cyan-100">
                <div>Company: {job.postedBy}</div>
                <div>Email: {job.userEmail}</div>
                <div>Rating: {client.rating}</div>
                <div>Success Rate: {getSuccessRate()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
