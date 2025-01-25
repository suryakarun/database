// createAdminUser.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "./firebaseConfig";  // Import the Firebase initialization

const auth = getAuth(app);  // Initialize Firebase Authentication

const createAdminUser = () => {
  const email = "admin@123.com";
  const password = "admin@123";

  // Create the user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;  // User created successfully
      console.log("Admin user created:", user.email);
    })
    .catch((error) => {
      console.error("Error creating admin user:", error.message);
    });
};

// Call this function to create the admin user
createAdminUser();
