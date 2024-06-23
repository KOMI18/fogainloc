// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyCf1X64OUbpCf0hcRwXcONr46tGJbL1kII",
  authDomain: "locfogain.firebaseapp.com",
  projectId: "locfogain",
  storageBucket: "locfogain.appspot.com",
  messagingSenderId: "739195614910",
  appId: "1:739195614910:web:6de25805c3ccd6b72a50ef",
  measurementId: "G-EB71JGXH30"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
const firestore = getFirestore(app);
const auth = getAuth(app)
export  {firestore, auth };