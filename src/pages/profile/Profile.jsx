import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiUser,
  FiCamera,
  FiSave,
  FiUpload,
  FiCheck,
  FiMail,
  FiEdit3,
  FiAward,
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(''),
    [photoURL, setPhotoURL] = useState(''),
    [isLoading, setIsLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false),
    [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.displayName || '');
      setPhotoURL(user.photoURL || '');
      setImagePreview(user.photoURL || '');
    }
  }, [user]);

  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/'))
      return toast.error('Please select a valid image file');
    if (file.size > 5 * 1024 * 1024) return toast.error('Image must be <5MB');

    setIsImageUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoURL(reader.result);
      setImagePreview(reader.result);
      setIsImageUploading(false);
      toast.success('Image ready to update!');
    };
    reader.readAsDataURL(file);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    if (!name.trim()) return toast.error('Please enter your name');
    setIsLoading(true);
    toast.dismiss();
    try {
      await updateUserProfile(name, photoURL);
      toast.success(
        <div className="flex items-center gap-2">
          <FiCheck className="text-green-500" />
          Profile updated!
        </div>
      );
    } catch (err) {
      toast.error(<div>Profile update failed: {err.message}</div>);
    } finally {
      setIsLoading(false);
    }
  };

  const particleStyle = {
    w: 1,
    h: 1,
    bg: 'bg-cyan-400',
    rounded: 'rounded-full',
    absolute: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute ${particleStyle.w} ${particleStyle.h} ${particleStyle.bg} ${particleStyle.rounded}`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 text-center"
            >
              <div className="relative inline-block mb-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-400 to-purple-500 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden"
                >
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <FiUser className="text-white text-2xl" />
                  )}
                  <motion.label
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 transition-opacity cursor-pointer rounded-2xl"
                  >
                    <FiCamera className="text-white text-lg" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </motion.label>
                </motion.div>
                <AnimatePresence>
                  {isImageUploading && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-2 -right-2 bg-cyan-500 rounded-full p-1 shadow-lg"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <h3 className="text-white font-bold text-lg mb-1">
                {name || 'User Name'}
              </h3>
              <p className="text-cyan-200 text-sm mb-4">{user?.email}</p>
              <div className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center justify-between text-sm text-cyan-200 mb-2">
                  <span>Status</span>
                  <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                    Active
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-cyan-200">
                  <span>Member since</span>
                  <span>
                    {user?.metadata?.creationTime
                      ? new Date(user.metadata.creationTime).getFullYear()
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6"
            >
              <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FiAward className="text-cyan-400" />
                Quick Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-cyan-200 text-sm">
                  <span>Profile Complete</span>
                  <span className="bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">
                    85%
                  </span>
                </div>
                <div className="flex justify-between items-center text-cyan-200 text-sm">
                  <span>Last Updated</span>
                  <span>Today</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main */}
          <div className="xl:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Profile Settings
                  </h1>
                  <p className="text-cyan-200">
                    Manage your personal information and preferences
                  </p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <FiUser className="text-white text-xl" />
                </motion.div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                {/** Name **/}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <label className="block text-cyan-200 font-semibold">
                    Display Name
                  </label>
                  <div className="relative">
                    <FiEdit3 className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Enter your display name"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-cyan-400/30 rounded-2xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </motion.div>

                {/** Email **/}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="block text-cyan-200 font-semibold">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
                    <input
                      type="email"
                      value={user?.email || ''}
                      readOnly
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-cyan-400/30 rounded-2xl text-cyan-200 cursor-not-allowed"
                    />
                  </div>
                </motion.div>

                {/** Photo URL **/}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label className="block text-cyan-200 font-semibold">
                    Profile Photo URL
                  </label>
                  <div className="relative">
                    <FiUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-400 text-lg" />
                    <input
                      type="text"
                      value={photoURL}
                      onChange={e => {
                        setPhotoURL(e.target.value);
                        setImagePreview(e.target.value);
                      }}
                      placeholder="Paste image URL or upload above"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-cyan-400/30 rounded-2xl text-white placeholder-cyan-200/50 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  </div>
                </motion.div>

                {/* Image Preview */}
                <AnimatePresence>
                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2"
                    >
                      <label className="block text-cyan-200 font-semibold">
                        Photo Preview
                      </label>
                      <div className="border-2 border-dashed border-cyan-400/30 rounded-2xl p-6 bg-white/5 text-center">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-32 h-32 rounded-2xl object-cover mx-auto shadow-lg"
                          onError={() => {
                            toast.error('Failed to load image');
                            setImagePreview('');
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Update Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: isLoading ? 1 : 1.02 }}
                    whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    className={`w-full py-5 px-6 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 shadow-2xl flex items-center justify-center gap-3 ${
                      isLoading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:shadow-3xl'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      {isLoading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                      ) : (
                        <FiSave className="text-xl" />
                      )}{' '}
                      {isLoading ? 'Updating...' : 'Save Changes'}
                    </span>
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
