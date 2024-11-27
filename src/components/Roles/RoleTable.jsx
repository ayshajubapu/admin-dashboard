import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons from React Icons
import { gsap } from "gsap"; // Import GSAP
import api from "../../utils/api";
import "./RoleTable.css"; // Import CSS for styling

const RoleTable = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "", permissions: [] });
  const [permissions, setPermissions] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      gsap.fromTo(
        ".styled-table tbody tr",
        {
          background: "linear-gradient(90deg, #f0f0f0, #ffffff)", // Initial gradient
        },
        {
          background: [
            "linear-gradient(90deg, #f0f0f0, #ffffff)",
            "linear-gradient(90deg, #ffffff, #e0e0e0)",
          ],
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "linear",
        }
      );
    }
  }, [roles]);

  const fetchRoles = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/roles");
      setRoles(data);
    } catch (err) {
      setError("Failed to fetch roles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const updatedFormData = {
      ...formData,
      permissions: Array.from(
        new Set(permissions.split(",").map((p) => p.trim()).filter(Boolean))
      ),
    };

    try {
      if (formData.id) {
        await api.put(`/roles/${formData.id}`, updatedFormData);
      } else {
        await api.post("/roles", updatedFormData);
      }
      resetForm();
      fetchRoles();
    } catch (err) {
      setError("Failed to save role. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (role) => {
    setFormData(role);
    setPermissions(role.permissions.join(", "));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    setSaving(true);
    setError(null);

    try {
      await api.delete(`/roles/${id}`);
      setRoles((prevRoles) => prevRoles.filter((role) => role.id !== id));
    } catch (err) {
      setError("Failed to delete role. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({ id: null, name: "", permissions: [] });
    setPermissions("");
  };

  return (
    <div className="role-table-container">
      <h3>Role Management</h3>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="role-form">
        <input
          type="text"
          placeholder="Role Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          disabled={saving}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Permissions (comma-separated)"
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          disabled={saving}
          className="input-field"
        />
        <button type="submit" disabled={saving} className="submit-button">
          {saving ? "Saving..." : formData.id ? "Update" : "Add"} Role
        </button>
        {formData.id && (
          <button
            type="button"
            onClick={resetForm}
            disabled={saving}
            className="cancel-button"
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p className="loading-message">Loading roles...</p>
      ) : (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.permissions.join(", ")}</td>
                <td>
                  <FaEdit
                    className="action-icon edit-icon"
                    onClick={() => handleEdit(role)}
                    title="Edit Role"
                  />
                  <FaTrash
                    className="action-icon delete-icon"
                    onClick={() => handleDelete(role.id)}
                    title="Delete Role"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RoleTable;
