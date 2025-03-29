import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.some(user => user.email === formData.email)) {
      setError('User with this email already exists');
      return;
    }
    
    // Create new user (in a real app, you'd hash the password)
    const newUser = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      password: formData.password
    };
    
    // Save to localStorage
   // Save to localStorage
localStorage.setItem('users', JSON.stringify([...users, newUser]));

// Also set current user in localStorage
localStorage.setItem('currentUser', JSON.stringify(newUser));

// Redirect to dashboard
navigate('/dashboard'); // Changed from '/' to '/dashboard'
  };

  return (
    <div className="wrapper signUp">
      <div className="illustration"></div>
      <div className="form">
        <div className="heading text-xl">CREATE AN ACCOUNT</div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Enter your name" 
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your mail" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Password Confirmation</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <h2 align="center" className="or">
            OR
          </h2>
        </form>
        <p>
          Have an account ? <Link to="/"> Login </Link>
        </p>
      </div>
    </div>
  );
}