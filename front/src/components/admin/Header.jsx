import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "./Header.css";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  //Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout(); // llama a tu logoutRequest + limpia localStorage
    window.location.href = "/login"; // redirige al login
  };

  return (
    <header className="admin-header">
      <h1 className="header-title">Panel de administración</h1>

      <div className="user-menu" ref={menuRef}>
        <button
          className="user-button"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaUserCircle className="user-icon" />
          <span className="user-name">{user?.email || "Administrador"}</span>
        </button>

        {menuOpen && (
          <div className="dropdown-admin">
            <button className="logout-button" onClick={handleLogout}>
              <FaSignOutAlt /> Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;