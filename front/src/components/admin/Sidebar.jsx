import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FiMenu } from "react-icons/fi"; // ícono hamburguesa
import { getUserRole } from '../../utils/OnlyAdmin';

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const storedUser = getUserRole();

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
          {storedUser === "admin" && ( 
            <NavLink to="/admin/users">Usuarios</NavLink>
          )}
          <NavLink to="/admin/contact">Contactos</NavLink>
          <NavLink to="/admin/projects">Proyectos</NavLink>
          <NavLink to="/admin/companies">Empresas</NavLink>
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