import React, { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { AuthContext } from '../AuthContext/AuthContext';
import { auth } from '../../firebase/firebase.init';
import { toast } from 'react-toastify';

const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleAuthProvider);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) {
      toast.error('User not logged in');
      return Promise.reject('User not logged in');
    }

    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name || '',
        photoURL: photoURL || '',
      });

      setUser({
        ...auth.currentUser,
        displayName: name,
        photoURL: photoURL,
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      throw error;
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const sendPasswordReset = email => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);

  const authInfo = {
    createUser,
    signInUser,
    signInWithGoogle,
    updateUserProfile,
    logOut,
    sendPasswordReset,
    user,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
