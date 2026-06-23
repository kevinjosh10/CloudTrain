import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5COgAZFdXzI3o2VVnxvIBM2Hh7FfZi_I",
  authDomain: "cloudtrain-b154d.firebaseapp.com",
  projectId: "cloudtrain-b154d",
  storageBucket: "cloudtrain-b154d.firebasestorage.app",
  messagingSenderId: "347167056346",
  appId: "1:347167056346:web:f9c0add9fe3925639460e3",
  measurementId: "G-952T3V0JFE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
