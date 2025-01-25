import React from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebaseConfig"; // Import auth to logout
import { signOut } from "firebase/auth"; // Firebase logout function
import { useNavigate } from "react-router-dom"; // Import navigate hook

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/students-page">Students Page</Link>
        </li>
        <li>
          <button className="logout" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
