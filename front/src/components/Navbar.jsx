import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaIndustry, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Nosotros", path: "/nosotros" },
    {
      label: "Servicios",
      path: "/servicios",
      dropdown: [
        { label: "Ingeniería Eléctrica y Automatización", path: "/ingenieria-electrica" },
        { label: "Ingeniería Industrial", path: "/ingenieria-industrial" },
        { label: "Capacitaciones y Entrenamientos", path: "/capacitaciones" },
        { label: "Mantenimiento y Proyectos Industriales", path: "/mantenimiento" },
      ],
    },
    {
      label: "Alianzas Académicas",
      path: "/alianzas",
      dropdown: [
        { label: "Universidad Europea de España", path: "/alianzas/Universidad-Europea" },
      ],
    },
    { label: "Proyectos", path: "/proyectos" },
    { label: "Contacto", path: "/contacto" },
  ];

  // Determina si el item está activo
  const isItemActive = (item) => {
    if (item.dropdown) {
        return item.dropdown.some(sub => location.pathname === sub.path);
    }
    return location.pathname === item.path;
  };

  const handleDropdown = (label) => {
    if (window.innerWidth <= 900) {
      setActiveDropdown(activeDropdown === label ? null : label);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Botón hamburguesa */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Menú principal */}
        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {menuItems.map((item) =>
            item.dropdown ? (
              <div
                key={item.label}
                className={`nav-item dropdown ${activeDropdown === item.label ? "active" : ""} ${isItemActive(item) ? "active" : ""}`}
                onMouseEnter={() =>
                  window.innerWidth > 900 && setActiveDropdown(item.label)
                }
                onMouseLeave={() =>
                  window.innerWidth > 900 && setActiveDropdown(null)
                }
                onClick={() => handleDropdown(item.label)}
              >
                <span className="dropdown-title">{item.label} ▾</span>
                <div
                  className={`dropdown-menu ${
                    activeDropdown === item.label ? "show" : ""
                  }`}
                >
                  {item.dropdown.map((sub) => (
                    <Link key={sub.path} to={sub.path} className="dropdown-link">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isItemActive(item) ? "active" : ""}`}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;