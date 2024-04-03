


	// apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	// authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	// projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	// storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	// messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	// appId: import.meta.env.VITE_FIREBASE_APP_ID,
	// measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,



import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyB4SSuN_-377snqQVGwoxm6V_YVrEEOTgA",
  authDomain: "instagram-clone-fa108.firebaseapp.com",
  projectId: "instagram-clone-fa108",
  storageBucket: "instagram-clone-fa108.appspot.com",
  messagingSenderId: "341614897983",
  appId: "1:341614897983:web:8d677b8aebc55e3406818a",
  measurementId: "G-7JP7S88PJZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// // firestore : to add user insta info (which is stored here)
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
