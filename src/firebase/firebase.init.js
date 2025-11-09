// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAOqPVNI3CKmReTaK-nFCUbOG13sWueenY',
  authDomain: 'freelance-marketplace-22602.firebaseapp.com',
  projectId: 'freelance-marketplace-22602',
  storageBucket: 'freelance-marketplace-22602.firebasestorage.app',
  messagingSenderId: '30556937239',
  appId: '1:30556937239:web:c2de7e3234bf8505889052',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
