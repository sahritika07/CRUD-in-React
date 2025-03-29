import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user
    const user = users.find(u => 
      u.email === formData.email && u.password === formData.password
    );
    
    if (user) {
		localStorage.setItem('currentUser', JSON.stringify(user));
		navigate('/dashboard'); // Changed from '/' to '/dashboard'
	  
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="wrapper signIn">
      <div className="illustration"></div>
      <div className="form">
        <div className="heading">LOGIN</div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">E-Mail</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
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
          <button type="submit">
            Submit
          </button>
        </form>
        <p>
          Don't have an account ? <Link to="/signup"> Sign Up </Link>
        </p>
      </div>
    </div>
  );
}