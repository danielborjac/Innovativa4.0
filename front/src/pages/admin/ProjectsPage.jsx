// src/pages/admin/ProjectsPage.jsx
import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projects";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    titulo: "",
    descripcionCorta: "",
    imagen: "",
    impacto: "",
    detalles: "",
  });
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");

  const fetchProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (err) {
      console.error("Error cargando proyectos:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        detalles: formData.detalles.split("\n").filter(Boolean),
      };

      if (editingProject) {
        await updateProject(editingProject.id, payload);
        setMessage("Proyecto actualizado correctamente ✅");
      } else {
        await createProject(payload);
        setMessage("Proyecto creado con éxito ✅");
      }

      setFormData({
        titulo: "",
        descripcionCorta: "",
        imagen: "",
        impacto: "",
        detalles: "",
      });
      setEditingProject(null);
      setShowForm(false);
      fetchProjects();
    } catch (err) {
      console.error(err);
      setMessage("Error al guardar el proyecto ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      titulo: project.titulo,
      descripcionCorta: project.descripcionCorta,
      imagen: project.imagen,
      impacto: project.impacto,
      detalles: project.detalles.join("\n"),
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Deseas eliminar este proyecto?")) return;
    try {
      await deleteProject(id);
      setMessage("Proyecto eliminado correctamente 🗑️");
      fetchProjects();
    } catch (err) {
      console.error(err);
      setMessage("Error al eliminar el proyecto ❌");
    }
  };

  return (
    <div className="projects-admin">
      <div className="projects-header">
        <h2>Gestión de Proyectos</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancelar" : "Nuevo Proyecto"}
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {showForm && (
        <form className="project-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="titulo"
            placeholder="Título del proyecto"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="descripcionCorta"
            placeholder="Descripción corta"
            value={formData.descripcionCorta}
            onChange={handleChange}
            required
          />
          <label className="image-label">
            Imagen del proyecto:
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                try {
                  setMessage("Subiendo imagen...");
                  const { uploadImageToCloudinary } = await import("../../utils/uploadImageToCloudinary");
                  const imageUrl = await uploadImageToCloudinary(file);
                  setFormData((prev) => ({ ...prev, imagen: imageUrl }));
                  setMessage("Imagen subida correctamente ✅");
                } catch (err) {
                  console.error(err);
                  setMessage("Error al subir la imagen ❌");
                }
              }}
            />
          </label>

          {formData.imagen && (
            <div className="preview-image">
              <img src={formData.imagen} alt="Previsualización" />
            </div>
          )}
          <textarea
            name="detalles"
            placeholder="Detalles (uno por línea)"
            value={formData.detalles}
            onChange={handleChange}
            rows="5"
          />
          <textarea
            name="impacto"
            placeholder="Impacto del proyecto"
            value={formData.impacto}
            onChange={handleChange}
            rows="3"
          />

          <button type="submit" className="btn-save" disabled={loading}>
            {loading ? "Guardando..." : editingProject ? "Actualizar" : "Crear"}
          </button>
        </form>
      )}

      <div className="projects-list">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((p) => (
            <div key={p.id} className="project-card">
              <img src={p.imagen} alt={p.titulo} />
              <div className="project-info">
                <h4>{p.titulo}</h4>
                <p>{p.descripcionCorta}</p>
                <div className="project-actions">
                  <button className="btn-edit" onClick={() => handleEdit(p)}>
                    ✏️ Editar
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(p.id)}>
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-projects">No hay proyectos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
