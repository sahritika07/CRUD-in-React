import React from "react";
import "./style.css";
import Login from "./Components/Login.jsx";
import Signup from "./Components/Signup.jsx";
import Error from "./Components/Error.jsx";
import UserDashboard from "./Components/Dashboard.jsx"; // Import the dashboard component
import { Route, Routes, Navigate } from "react-router-dom";

// Create a ProtectedRoute component to check authentication
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  return currentUser ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;