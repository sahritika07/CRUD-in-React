"use client";

import { useState } from "react";

export default function Dashboard() {
  const initialUsers = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active" },
    { id: "3", name: "Robert Johnson", email: "robert@example.com", role: "Manager", status: "inactive" },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, userId: null });

  // Open form for adding a new user
  const openAddForm = () => {
    setCurrentUser(null);``
    setIsFormOpen(true);
  };

  // Open form for editing an existing user
  const openEditForm = (user) => {
    setCurrentUser(user);
    setIsFormOpen(true);
  };

  // Add or update user
  const handleFormSubmit = (userData) => {
    if (currentUser) {
      // Update user
      setUsers(users.map((user) => (user.id === currentUser.id ? userData : user)));
    } else {
      // Add user
      const newUser = { ...userData, id: Math.random().toString(36).substring(2, 9) };
      setUsers([...users, newUser]);
    }
    setIsFormOpen(false);
  };

  // Open delete confirmation
  const openDeleteDialog = (id) => {
    setDeleteDialog({ isOpen: true, userId: id });
  };

  // Confirm delete user
  const confirmDelete = () => {
    setUsers(users.filter((user) => user.id !== deleteDialog.userId));
    setDeleteDialog({ isOpen: false, userId: null });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={openAddForm}>
        Add User
      </button>

      {/* User Table */}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
              <td className={`border p-2 ${user.status === "active" ? "text-green-600" : "text-red-600"}`}>
                {user.status}
              </td>
              <td className="border p-2">
                <button className="text-blue-500 mr-2" onClick={() => openEditForm(user)}>Edit</button>
                <button className="text-red-500" onClick={() => openDeleteDialog(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* User Form */}
      {isFormOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">{currentUser ? "Edit User" : "Add User"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleFormSubmit({
                  id: currentUser?.id || "",
                  name: e.target.name.value,
                  email: e.target.email.value,
                  role: e.target.role.value,
                  status: e.target.status.value,
                });
              }}
            >
              <input
                type="text"
                name="name"
                defaultValue={currentUser?.name || ""}
                placeholder="Name"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <input
                type="email"
                name="email"
                defaultValue={currentUser?.email || ""}
                placeholder="Email"
                className="w-full p-2 border rounded mb-2"
                required
              />
              <select
                name="role"
                defaultValue={currentUser?.role || "User"}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Admin">Admin</option>
                <option value="User">User</option>
                <option value="Manager">Manager</option>
              </select>
              <select
                name="status"
                defaultValue={currentUser?.status || "active"}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <div className="flex justify-between">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  {currentUser ? "Update" : "Add"}
                </button>
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setIsFormOpen(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setDeleteDialog({ isOpen: false, userId: null })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
