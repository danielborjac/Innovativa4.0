import React, { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../api/auth";
import "./UsersPage.css";
import { useNavigate } from "react-router-dom";
import { getUserRole } from '../../utils/OnlyAdmin';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({ role: "", is_active: "" });
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    role: "editor",
    is_active: true,
  });

  const navigate = useNavigate();

  // ✅ Validar que solo admin acceda
  useEffect(() => {
    //const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedUser = getUserRole();
    if (!storedUser || storedUser !== "admin") {
      navigate("/admin"); // Redirige si no es admin
    }
  }, [navigate]);

  const loadUsers = async (page = 1) => {
    try {
      let data = "";
      if (filters.is_active) data = await getUsers(page, 10, filters.role, filters.is_active);    
      else data = await getUsers(page, 10, filters.role);
      setUsers(data.users);
      setPagination(data.pagination);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [filters]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData);
      } else {
        await createUser(formData);
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        role: "editor",
        is_active: true,
      });
      loadUsers();
    } catch (err) {
      console.error("Error guardando usuario:", err);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este usuario?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  const NewUser = () => {
    setEditingUser(null);
    setShowModal(true);

  }

  return (
    <div className="users-page">
      <div className="header-users">
        <h2>Gestión de Usuarios</h2>
        <button onClick={() => NewUser()}>+ Nuevo Usuario</button>
      </div>

      <div className="filters">
        <select
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
        </select>

        <select
          value={filters.is_active}
          onChange={(e) =>
            setFilters({ ...filters, is_active: e.target.value || "" })
          }
        >
          <option value="">Todos los estados</option>
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.first_name} {u.last_name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.is_active ? "Activo" : "Inactivo"}</td>
                <td>
                  {u.role != "admin" && (
                    <>
                      <button style={{cursor: "pointer"}} onClick={() => { setEditingUser(u); setFormData(u); setShowModal(true); }}>
                        ✏️
                      </button>
                      <button style={{cursor: "pointer"}} onClick={() => handleDelete(u.id)}>🗑️</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No hay usuarios disponibles</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        {pagination.page > 1 && (
          <button onClick={() => loadUsers(pagination.page - 1)}>⬅ Anterior</button>
        )}
        {pagination.page < pagination.totalPages && (
          <button onClick={() => loadUsers(pagination.page + 1)}>Siguiente ➡</button>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingUser ? "Editar Usuario" : "Nuevo Usuario"}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="first_name"
                placeholder="Nombre"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="last_name"
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {!editingUser && (
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              )}
              {/*<select name="role" value={formData.role} onChange={handleChange}>
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>*/}
              <select
                name="is_active"
                value={formData.is_active}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_active: e.target.value === "true",
                  })
                }
              >
                <option value="true">Activo</option>
                <option value="false">Inactivo</option>
              </select>

              <div className="modal-actions">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
