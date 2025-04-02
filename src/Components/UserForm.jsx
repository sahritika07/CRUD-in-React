"use client"

import { useState } from "react"
import UserTable from "../Components/UserTable.jsx"
import UserForm from "../Components/UserForm.jsx"
import DeleteConfirmation from "../Components/DeleteConfirmation.jsx"

// Sample initial data
const initialUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "active",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "Manager",
    status: "inactive",
  },
]

export default function Dashboard() {
  // State for storing our list of users
  const [users, setUsers] = useState(initialUsers)

  // State for controlling the add/edit form dialog
  const [isFormOpen, setIsFormOpen] = useState(false)

  // State for the current user being edited (null when adding a new user)
  const [currentUser, setCurrentUser] = useState(null)

  // State for delete confirmation dialog
  const [deleteDialog, setDeleteDialog] = useState({
    isOpen: false,
    userId: null,
    userName: "",
  })

  // CREATE: Add a new user
  const addUser = (userData) => {
    // Create a new user object with a random ID
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
    }

    // Add the new user to our users array
    setUsers([...users, newUser])

    // Close the form
    setIsFormOpen(false)

    // Show success message (in a real app, you might use a toast notification)
    alert("User added successfully!")
  }

  // UPDATE: Update an existing user
  const updateUser = (updatedUser) => {
    // Map through users and replace the one that matches the ID
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))

    // Close the form
    setIsFormOpen(false)

    // Show success message
    alert("User updated successfully!")
  }

  // DELETE: Open confirmation dialog
  const openDeleteDialog = (id, name) => {
    setDeleteDialog({
      isOpen: true,
      userId: id,
      userName: name,
    })
  }

  // DELETE: Confirm and delete user
  const confirmDelete = () => {
    // Filter out the user with the matching ID
    setUsers(users.filter((user) => user.id !== deleteDialog.userId))

    // Close the dialog
    setDeleteDialog({
      isOpen: false,
      userId: null,
      userName: "",
    })

    // Show success message
    alert("User deleted successfully!")
  }

  // Open the form for adding a new user
  const openAddForm = () => {
    setCurrentUser(null)
    setIsFormOpen(true)
  }

  // Open the form for editing an existing user
  const openEditForm = (user) => {
    setCurrentUser(user)
    setIsFormOpen(true)
  }

  // Handle form submission (either add or update)
  const handleFormSubmit = (userData) => {
    if (currentUser) {
      updateUser(userData)
    } else {
      addUser(userData)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={openAddForm}>
          Add User
        </button>
      </div>

      {/* User Table Component */}
      <UserTable users={users} onEdit={openEditForm} onDelete={openDeleteDialog} />

      {/* User Form Component (conditionally rendered) */}
      {isFormOpen && <UserForm user={currentUser} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />}

      {/* Delete Confirmation Component */}
      <DeleteConfirmation
        isOpen={deleteDialog.isOpen}
        userName={deleteDialog.userName}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteDialog({ ...deleteDialog, isOpen: false })}
      />
    </div>
  )
}

