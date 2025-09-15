// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBFrj8RKlzt3dBU0oZUaQmW1xq-3s7MCTk",
  authDomain: "netflix-clone-app-ccd00.firebaseapp.com",
  projectId: "netflix-clone-app-ccd00",
  storageBucket: "netflix-clone-app-ccd00.firebasestorage.app",
  messagingSenderId: "267299843032",
  appId: "1:267299843032:web:80ac473ed0264dd98b20ad",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
