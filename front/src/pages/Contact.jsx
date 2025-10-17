/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import team from "../assets/contact/team.jpg";
import banner from "../assets/contact/contact-banner.jpg";
import Banner from "../components/Banner";
import { useState } from "react";
import Spinner from "../components/Spinner";
import { fadeInDown, fadeInUp, hover3D, slideRotateLeft} from "../utils/motionConfig";

const Contact = () => {

    const [loading, setLoading] = useState(true);

    const handleParticlesLoaded = () => {
        // Espera un momento adicional para una transición más suave
        setTimeout(() => setLoading(false), 300);
    };

  return (
    <>
        {loading && <Spinner />}

        <section className="banner">
            <img src={banner} alt="home" />
            <Banner onParticlesLoaded={handleParticlesLoaded}>
                <motion.h1 {...fadeInUp} {...hover3D} className="banner-title">CONTACTA CON NOSOTROS</motion.h1>
            </Banner>
        </section>   
        <section className="contacto-section" style={{ backgroundImage: `url(${team})` }}>
            <div className="contacto-overlay">
                {/* --- Sección de información --- */}
                <section className="contacto-info">
                    <motion.div {...fadeInUp}>
                        <h2>¿TIENES ALGUNA PREGUNTA?</h2>
                        <h3>¡TE RESPONDEREMOS EN BREVEDAD!</h3>
                        <div className="info-item horario">
                            <h4>Horario de atención:</h4>
                            <p>Lunes a Viernes: 08h00 - 17h00</p>
                            <p>Sábados: 09h00 - 13h00</p>
                        </div>
                    </motion.div>
                    <motion.div {...fadeInDown}>
                        <div className="info-data"><FaPhoneAlt /> <p>+593 99 999 9999</p></div>
                        <div className="info-data"><FaEnvelope /> <p>info@innovativa40.com</p></div>
                        <div className="info-data"><FaMapMarkerAlt /> <p>Av. Amazonas y Colón, Quito - Ecuador</p></div>
                         <div className="redes">
                            <FaFacebook />
                            <FaLinkedin />
                            <FaInstagram />
                        </div>
                    </motion.div>
                </section>
                <motion.section className="contacto-container" {...slideRotateLeft}>
                    {/* --- Formulario de contacto --- */}
                    <div className="contacto-formulario">
                        <form>
                        <h3>Formulario de Contacto</h3>
                        <div className="grid-2">
                            <input type="text" placeholder="Nombre *" required />
                            <input type="text" placeholder="Apellidos" />
                        </div>
                        <input type="text" placeholder="Nombre de la empresa *" required />
                        <div className="grid-2">
                            <input type="tel" placeholder="Teléfono" />
                            <input type="email" placeholder="Email *" required />
                        </div>
                        <textarea rows="4" placeholder="Cuéntanos tu caso o consulta..."></textarea>

                        <div className="checkbox">
                            <input type="checkbox" id="consent" />
                            <label htmlFor="consent">
                            Autorizo el tratamiento de mis datos personales conforme a la política de privacidad.
                            </label>
                        </div>

                        <button type="submit" className="btn-orange">Enviar</button>
                        </form>
                    </div>
                </motion.section>
            </div>
        </section>
        <section>
            {/* --- Mapa --- */}
            <div className="contacto-mapa">
                <iframe
                    title="Ubicación Innovativa 4.0"
                    src="https://www.google.com/maps?q=0.037077696921034374,-78.14287608650861&z=15&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </section>
    </>
  );
};

export default Contact;
