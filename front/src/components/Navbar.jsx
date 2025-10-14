import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaIndustry, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false); // para desplegar servicios

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
    setServicesOpen(false);
  }, [location]);

  return (
    <header className="navbar">
      <div className="navbar-container">
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

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" className="nav-item">Inicio</Link>
          <Link to="/nosotros" className="nav-item">Nosotros</Link>

          {/* Menú desplegable de Servicios */}
          <div
            className={`nav-item dropdown ${servicesOpen ? "active" : ""}`}
            onMouseEnter={() => window.innerWidth > 900 && setServicesOpen(true)}
            onMouseLeave={() => window.innerWidth > 900 && setServicesOpen(false)}
            onClick={() => window.innerWidth <= 900 && setServicesOpen(!servicesOpen)}
          >
            <span className="dropdown-title">Servicios ▾</span>

            <div className={`dropdown-menu ${servicesOpen ? "show" : ""}`}>
              <Link to="/servicios/ingenieria-electrica" className="dropdown-link">
                Ingeniería Eléctrica y Electrónica
              </Link>
              <Link to="/servicios/ingenieria-industrial" className="dropdown-link">
                Ingeniería Industrial
              </Link>
              <Link to="/servicios/capacitaciones" className="dropdown-link">
                Capacitaciones y Entrenamientos
              </Link>
            </div>
          </div>

          <Link to="/contacto" className="nav-item">Contacto</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
