import { FaFacebookF, FaLinkedinIn, FaInstagram, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section company">
          <h3>INNOVATIVA 4.0</h3>
          <p>
            Somos una empresa ecuatoriana especializada en soluciones industriales, automatización y optimización energética. 
            Más de 20 años brindando innovación y tecnología al servicio de la eficiencia.
          </p>
        </div>

        <div className="footer-section">
          <h4>Servicios</h4>
          <ul>
            <li>Ingeniería y Automatización</li>
            <li>Mantenimiento y Eficiencia Operativa</li>
            <li>Análisis y Mejora de Procesos</li>
            <li>Entrenamiento Técnico</li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contáctanos</h4>
          <p><FaMapMarkerAlt /> Quito, Ecuador</p>
          <p><FaPhoneAlt /> +593 988 475 968</p>
          <p><FaEnvelope /> ingenieria@innovativa40.com</p>

          <div className="social-icons">
            <a href="https://www.facebook.com/innovativa4.0/?locale=es_LA"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/company/innovativa-4-0/?originalSubdomain=ec"><FaLinkedinIn /></a>
            {/*<a href="#"><FaInstagram /></a>*/}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Innovativa 4.0. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;