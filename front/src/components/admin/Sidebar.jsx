import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi"; // ícono hamburguesa

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Botón hamburguesa visible solo en móvil */}
      <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)}>
        <FiMenu size={24} />
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h3>Innovativa 4.0</h3>
        <nav>
          <NavLink to="/admin" end>Inicio</NavLink>
          <NavLink to="/admin/projects">Proyectos</NavLink>
          <NavLink to="/admin/alliances">Alianzas</NavLink>
        </nav>
        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </aside>
    </>
  );
};

export default Sidebar;