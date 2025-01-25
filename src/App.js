import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";
import StudentsPage from "./StudentsPage";
import Sidebar from "./Sidebar"; // Import Sidebar
import { auth } from "./firebaseConfig"; // Import auth from firebaseConfig
import { onAuthStateChanged } from "firebase/auth"; // Import auth state listener
import { useState, useEffect } from "react";

const App = () => {
  const [user, setUser] = useState(null);

  // Check if a user is logged in when the app starts
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Set the logged-in user in the state
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  return (
    <Router>
      <div className="app-container">
        {user && <Sidebar />} {/* Render Sidebar only when user is logged in */}
        <div className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/students-page" element={user ? <StudentsPage /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to={user ? "/students-page" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
