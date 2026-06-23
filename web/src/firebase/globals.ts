import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQqCLKg1vFRMZr0VEos9zngZzXCBoumRM",
  authDomain: "nurture-253a3.firebaseapp.com",
  projectId: "nurture-253a3",
  storageBucket: "nurture-253a3.firebasestorage.app",
  messagingSenderId: "843554535115",
  appId: "1:843554535115:web:d515a7ff061c8bb7150d4e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);