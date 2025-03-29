import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function UserDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleDelete = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditFormData({
      username: user.username,
      email: user.email
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUsers = users.map(user => 
      user.id === editingUserId 
        ? { ...user, ...editFormData }
        : user
    );
    
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setEditingUserId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  // Get current user
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser) {
    return (
      <div>
        <h2>Please log in to view this page</h2>
        <Link to="/">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
      
      <h2>Welcome, {currentUser.username}!</h2>
      
      <h3>All Users</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="text"
                    name="username"
                    value={editFormData.username}
                    onChange={handleEditChange}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <input
                    type="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleEditChange}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUserId === user.id ? (
                  <>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingUserId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(user)}>Edit</button>
                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}