// src/firebase.jsx

// Import the functions you need from the Firebase SDKs
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// If you plan to use analytics, you can import getAnalytics here, but it's not strictly needed for the job tracker functionality
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration (PASTE YOUR COPIED CONFIG HERE)
const firebaseConfig = {
  apiKey: "AIzaSyAKC1gjTCPaGsz6saiILDlVN5Z4SXmG82o",
  authDomain: "job-tracker-ed069.firebaseapp.com",
  projectId: "job-tracker-ed069",
  storageBucket: "job-tracker-ed069.firebasestorage.app",
  messagingSenderId: "47833959138",
  appId: "1:47833959138:web:47c9be01d035d8e41cacbb",
  measurementId: "G-NT826698N1" // This is for analytics, optional for core functionality
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
// If you uncommented getAnalytics, you would initialize it here:
// const analytics = getAnalytics(app);

export { auth, db };