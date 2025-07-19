    // src/firebase.jsx

    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    import { getAuth } from "firebase/auth"; // Import getAuth
    import { getFirestore } from "firebase/firestore"; // Import getFirestore
    // If you plan to use Firebase Analytics, uncomment the line below:
    // import { getAnalytics } from "firebase/analytics";

    // Your web app's Firebase configuration (using environment variables)
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Include if present in your config
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Firebase services you are using
    const auth = getAuth(app);
    const db = getFirestore(app);
    // If you plan to use Firebase Analytics, uncomment the line below:
    // const analytics = getAnalytics(app);

    // Export the services you need
    export { auth, db };
    