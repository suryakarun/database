import { auth } from "./firebaseConfig"; // Import auth from firebaseConfig
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to log in user
  const loginUser = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true);
    setError("");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User logged in:", user.email);
        // Navigate to Students Page after successful login
        navigate("/StudentsPage");
      })
      .catch((error) => {
        setError("Login failed: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={loginUser}> {/* Use onSubmit for the form */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username" 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"  // Fix autocomplete warning
        />
        <button type="submit" disabled={loading}> {/* Use type="submit" here */}
          {loading ? "Logging in..." : "Log In"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
