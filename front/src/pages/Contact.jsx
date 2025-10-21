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
import { sendContactMessage } from "../api/contact";

const Contact = () => {

    const [loading, setLoading] = useState(true);

    const handleParticlesLoaded = () => {
        // Espera un momento adicional para una transición más suave
        setTimeout(() => setLoading(false), 300);
    };
    
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        company: "",
        phone: "",
        email: "",
        message: "",
        consent_personal_data: false,
    });

    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState({ type: "", message: "" });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // validaciones mínimas
        if (!formData.first_name || !formData.email || !formData.company) {
        setStatus({
            type: "error",
            message: "Por favor, completa los campos obligatorios.",
        });
        return;
        }

        if (!formData.consent_personal_data) {
        setStatus({
            type: "error",
            message: "Debes autorizar el tratamiento de tus datos personales.",
        });
        return;
        }

        setSending(true);
        setStatus({ type: "", message: "" });

        try {
        await sendContactMessage(formData);
        setStatus({
            type: "success",
            message: "¡Mensaje enviado correctamente! Te contactaremos pronto.",
        });
        setFormData({
            first_name: "",
            last_name: "",
            company: "",
            phone: "",
            email: "",
            message: "",
            consent_personal_data: false,
        });
        } catch (err) {
        setStatus({ type: "error", message: err });
        } finally {
        setSending(false);
        }
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
                        <form onSubmit={handleSubmit}>
                            <h3>Formulario de Contacto</h3>
                            <div className="grid-2">
                                <input
                                type="text"
                                name="first_name"
                                placeholder="Nombre *"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                                />
                                <input
                                type="text"
                                name="last_name"
                                placeholder="Apellidos"
                                value={formData.last_name}
                                onChange={handleChange}
                                />
                            </div>

                            <input
                                type="text"
                                name="company"
                                placeholder="Nombre de la empresa *"
                                value={formData.company}
                                onChange={handleChange}
                                required
                            />

                            <div className="grid-2">
                                <input
                                type="tel"
                                name="phone"
                                placeholder="Teléfono"
                                value={formData.phone}
                                onChange={handleChange}
                                />
                                <input
                                type="email"
                                name="email"
                                placeholder="Email *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                />
                            </div>

                            <textarea
                                rows="4"
                                name="message"
                                placeholder="Cuéntanos tu caso o consulta..."
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>

                            <div className="checkbox">
                                <input
                                type="checkbox"
                                id="consent"
                                name="consent_personal_data"
                                checked={formData.consent_personal_data}
                                onChange={handleChange}
                                />
                                <label htmlFor="consent">
                                Autorizo el tratamiento de mis datos personales conforme a la política de privacidad.
                                </label>
                            </div>

                            {status.message && (
                                <p
                                className={`text-sm mt-2 ${
                                    status.type === "success" ? "text-green-400" : "text-red-400"
                                }`}
                                >
                                {status.message}
                                </p>
                            )}

                            <button type="submit" className="btn-orange" disabled={sending}>
                                {sending ? "Enviando..." : "Enviar"}
                            </button>
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
