// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // <-- import auth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdZyaJmE-efJF5eQX7ev1ndnTv0Cn4i6Q",
  authDomain: "e-book-store-c655e.firebaseapp.com",
  projectId: "e-book-store-c655e",
  storageBucket: "e-book-store-c655e.appspot.com",  // fix typo here: should be .appspot.com
  messagingSenderId: "889857629394",
  appId: "1:889857629394:web:1e406123753d7ad626a10b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export it
export const auth = getAuth(app);

export default app;
