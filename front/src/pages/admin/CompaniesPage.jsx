import React, { useEffect, useState } from "react";
import {
  getAllCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "../../api/companies";
import "./CompaniesPage.css";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [formData, setFormData] = useState({ name: "", logo: "" });
  const [loading, setLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState("link"); // "link" o "file"
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      setLoading(true);
      const res = await getAllCompanies();
      setCompanies(res.data);
    } catch (err) {
      console.error("Error al cargar empresas:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let logoUrl = formData.logo;

        if (uploadMode === "file" && imageFile) {
        // Subir a Cloudinary y obtener URL
        logoUrl = await uploadImageToCloudinary(imageFile);
        }

        const payload = { ...formData, logo: logoUrl };

        if (editingCompany) {
        await updateCompany(editingCompany.id, payload);
        } else {
        await createCompany(payload);
        }

        setShowModal(false);
        setFormData({ name: "", logo: "" });
        setEditingCompany(null);
        setImageFile(null);
        loadCompanies();
    } catch (err) {
        console.error("Error al guardar empresa:", err);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setFormData({ name: company.name, logo: company.logo });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta empresa?")) {
      await deleteCompany(id);
      loadCompanies();
    }
  };

  const CreateCompany = () => {
    setEditingCompany(null);
    setImageFile(null);
    setFormData({ name: "", logo: "" });
    setShowModal(true);
  }

  return (
    <div className="companies-container">
      <h2>Empresas que confían en nosotros</h2>
      <button className="btn-primary" onClick={() => CreateCompany()}>
        + Nueva Empresa
      </button>

      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table className="companies-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Logo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>
                  <img src={c.logo} alt={c.name} className="company-logo" />
                </td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleEdit(c)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-companies-overlay">
          <div className="modal-companies-content">
            <h3>{editingCompany ? "Editar Empresa" : "Nueva Empresa"}</h3>
            <form onSubmit={handleSubmit}>
              <label>Nombre:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

                <label>Logo:</label>
                <div className="upload-mode-toggle">
                <button
                    type="button"
                    className={uploadMode === "link" ? "active" : ""}
                    onClick={() => setUploadMode("link")}
                >
                    Usar URL
                </button>
                <button
                    type="button"
                    className={uploadMode === "file" ? "active" : ""}
                    onClick={() => setUploadMode("file")}
                >
                    Subir archivo
                </button>
                </div>

                {uploadMode === "link" ? (
                <input
                    type="text"
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                />
                ) : (
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                />
                )}

              <div className="modal-buttons">
                <button type="submit" className="btn-primary">
                  Guardar
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCompany(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;
