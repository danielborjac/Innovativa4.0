import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaIndustry, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false); // cerrar menú al cambiar de página
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <FaIndustry className="navbar-icon" />
          <h1>INNOVATIVA 4.0</h1>
        </div>

        {/* Botón hamburguesa */}
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-item">Inicio</Link>
          <Link to="/nosotros" className="nav-item">Nosotros</Link>
          <Link to="/servicios" className="nav-item">Servicios</Link>
          <Link to="/contacto" className="nav-item">Contacto</Link>

        </nav>
      </div>
    </header>
  );
};

export default Navbar;