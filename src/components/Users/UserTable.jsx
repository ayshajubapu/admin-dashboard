import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import { gsap } from "gsap"; // Import GSAP
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS
import api from "../../utils/api";
import "./UserTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    role: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(true); // Added loading state

  // Fetch users when the component is mounted
  useEffect(() => {
    fetchUsers();
  }, []);

  // GSAP animation on users table row updates
  useEffect(() => {
    if (users.length) {
      gsap.from(".user-row", {
        backgroundColor: "#f0f0f0", // Subtle row highlight
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  }, [users]);

  // Fetch users data from API
  const fetchUsers = async () => {
    try {
      setLoading(true); // Start loading
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      toast.error("Error fetching users. Please try again."); // Error notification
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle user form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/users/${formData.id}`, formData);
        toast.info("User updated successfully!"); // Show info notification
      } else {
        await api.post("/users", formData);
        toast.success("New user added successfully!"); // Show success notification
      }
      resetForm();
      fetchUsers();
    } catch (error) {
      toast.error("Error saving user. Please try again."); // Show error notification
      console.error("Error saving user:", error);
    }
  };

  // Handle user edit action
  const handleEdit = (user) => {
    setFormData(user);
  };

  // Handle user delete action
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Reset form data
  const resetForm = () => {
    setFormData({ id: null, name: "", email: "", role: "", status: "Active" });
  };

  return (
    <div className="user-management">
      <ToastContainer /> {/* Add ToastContainer for notifications */}
      <h3>User Management</h3>

      {/* User Form */}
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button type="submit">
          {formData.id ? "Update" : "Add"} User
        </button>
        {formData.id && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="user-row">
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status}</td>
                  <td>
                    <FaEdit
                      className="icon edit-icon"
                      onClick={() => handleEdit(user)}
                      title="Edit User"
                    />
                    <FaTrash
                      className="icon delete-icon"
                      onClick={() => handleDelete(user.id)}
                      title="Delete User"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserTable;
