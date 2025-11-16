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
            <li><a href="/servicios/ingenieria-electrica">Ingeniería Eléctrica y Automatización industrial</a></li>
            <li><a href="/servicios/ingenieria-industrial">Ingeniería Industrial</a></li>
            <li><a href="/servicios/capacitaciones">Capacitaciones y Entrenamientos</a></li>
            <li><a href="/servicios/mantenimiento">Mantenimiento y Proyectos Industriales</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h4>Contáctanos</h4>
          <ul>
            <li><a href="https://maps.app.goo.gl/cBrmxfoZf5FQ79KS6" target="_blank"><p><FaMapMarkerAlt /> 2VP4+QV6, Chile, Cayambe - Ecuador</p></a></li>
            <li><a href="https://wa.me/593988475968" target="_blank"><p><FaPhoneAlt /> +593 988 475 968</p></a></li>
            <li><a href="mailto:ingenieria@innovativa40.com"><p><FaEnvelope /> ingenieria@innovativa40.com</p></a></li>
          </ul>
          <div className="social-icons">
            <a href="https://www.facebook.com/innovativa4.0/?locale=es_LA" target="_blank"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/company/innovativa-4-0/?originalSubdomain=ec" target="_blank"><FaLinkedinIn /></a>
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