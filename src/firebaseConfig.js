// firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyAwyau1SAMdcJw4xy3Oyc7T3XMgsilCfHQ", // Your Web API key
  authDomain: "student-d9922.firebaseapp.com",       // Derived from Project ID
  projectId: "student-d9922",                       // Your Project ID
  storageBucket: "student-d9922.appspot.com",       // Derived from Project ID
  messagingSenderId: "300003398808",                // Project Number
  appId: "1:300003398808:web:63dd4b0231737d31ca2ced" // Your App ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export both auth and db
