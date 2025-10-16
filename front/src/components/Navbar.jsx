import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaIndustry, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // 🔹 Definición centralizada de los menús
  const menuItems = [
    { label: "Inicio", path: "/" },
    { label: "Nosotros", path: "/nosotros" },
    {
      label: "Servicios",
      dropdown: [
        { label: "Ingeniería Eléctrica y Electrónica", path: "/servicios/ingenieria-electrica" },
        { label: "Ingeniería Industrial", path: "/servicios/ingenieria-industrial" },
        { label: "Capacitaciones y Entrenamientos", path: "/servicios/capacitaciones" },
      ],
    },
    {
      label: "Alianzas Académicas",
      dropdown: [
        { label: "Universidad Europea de España", path: "/alianzas/Universidad-Europea" },
        { label: "Universidad de Guayaquil", path: "/alianzas/Universidad-Guayaquil" },
      ],
    },
    { label: "Contacto", path: "/contacto" },
  ];

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
          <FaIndustry className="navbar-icon" />
          <Link to="/">
            <h1>INNOVATIVA 4.0</h1>
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
                className={`nav-item dropdown ${activeDropdown === item.label ? "active" : ""}`}
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
              <Link key={item.path} to={item.path} className="nav-item">
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
