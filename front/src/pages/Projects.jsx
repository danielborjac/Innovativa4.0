/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getProjects } from "../api/projects";

import "./Projects.css";
import cil from "../assets/projects/proyecto-lactea.jpg";
import ref from "../assets/projects/proyecto-refineria.jpg";
import pes from "../assets/projects/proyecto-pesquero.jpg";
import banner from "../assets/projects/proyectos-banner.jpg";
import {
  fadeInUp,
  staggerContainer,
  fadeItem,
  hover3D,
  hover,
  hoverParallax
} from "../utils/motionConfig";
import Banner from "../components/Banner";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import contactBg from "../assets/contact/contact-banner.jpg"; // o el nombre que prefieras
import { useNavigate } from "react-router-dom";

const proyectosData = [
  {
    id: 1,
    titulo: "Industria Láctea – Ecuador (CIL)",
    descripcionCorta:
      "Optimización integral de procesos en la industria láctea nacional.",
    imagen: cil,
    detalles: [
      "Automatización de sistemas CIP",
      "Análisis de capacidades de líneas de producción",
      "Gestión de mantenimiento preventivo y correctivo",
      "Dashboards en tiempo real para el uso de químicos",
      "Manejo de mermas y mejora de IVPH",
      "Implementación de indicadores clave de negocio (KPI)",
      "Entrenamiento técnico al personal",
    ],
    impacto:
      "Mayor eficiencia operativa, reducción de costos y sostenibilidad del proceso.",
  },
  {
    id: 2,
    titulo: "Refinería del Pacífico – Esmeraldas",
    descripcionCorta:
      "Asesoría técnica en modernización de equipos industriales y automatización.",
    imagen: ref,
    detalles: [
      "Integración de sistemas de control y monitoreo",
      "Optimización energética de procesos",
      "Implementación de controladores redundantes",
      "Supervisión de mantenimiento predictivo con IA",
    ],
    impacto:
      "Incremento del rendimiento energético y reducción de tiempos de parada no planificada.",
  },
  {
    id: 3,
    titulo: "Corporación Pesquera del Ecuador (COPEMAR)",
    descripcionCorta:
      "Proyecto de digitalización de planta de procesamiento de productos marinos.",
    imagen: pes,
    detalles: [
      "Diseño e instalación de red industrial IoT",
      "Implementación de trazabilidad digital de producto",
      "Capacitación al personal técnico",
      "Monitoreo remoto en tiempo real de variables críticas",
    ],
    impacto:
      "Mejor trazabilidad, control de calidad y cumplimiento de estándares internacionales.",
  },
];

const Projects = () => {
  const [proyectos, setProyectos] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleParticlesLoaded = () => {
        // Espera un momento adicional para una transición más suave
        setTimeout(() => setLoading(false), 200);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        if (data && data.length > 0) {
          setProyectos(data);
        } else {
          // si el backend no devuelve nada, usa los mock
          setProyectos(proyectosData);
        }
      } catch (error) {
        console.error("Error cargando proyectos:", error);
        setProyectos(proyectosData); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="banner">
              <img src={banner} alt="proyectos" />
              <Banner onParticlesLoaded={handleParticlesLoaded}>
                  <motion.h1 {...fadeInUp} {...hover3D} className="banner-title">PROYECTOS DESTACADOS</motion.h1>
              </Banner>
          </section>
          <section className="proyectos-section">
            <div className="proyectos-header">
                <h4>
                Soluciones innovadoras que superan las expectativas de nuestros
                clientes.
                </h4>
            </div>
            <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
            >

                <motion.div className="proyectos-grid">
                    {proyectos.map((proyecto) => (
                    <motion.div
                        key={proyecto.id}
                        className="proyecto-card"
                        variants={fadeItem}
                        whileHover={hoverParallax.whileHover}
                        whileTap={hover.whileTap}
                        onClick={() => setProyectoSeleccionado(proyecto)}
                    >
                        <motion.img {... hover} src={proyecto.imagen} alt={proyecto.titulo} />
                        <div className="proyecto-info">
                        <h3>{proyecto.titulo}</h3>
                        <p>{proyecto.descripcionCorta}</p>
                        <span className="arrow">→</span>
                        </div>
                    </motion.div>
                    ))}
                </motion.div>
            </motion.div>
            {/* Modal */}
            {proyectoSeleccionado && (
              <div
                className="modal-overlay"
                onClick={() => setProyectoSeleccionado(null)}
              >
                <div
                    className="modal-content modern-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                      className="modal-close"
                      onClick={() => setProyectoSeleccionado(null)}
                    >
                    ✕
                    </button>
                    <img
                      src={proyectoSeleccionado.imagen}
                      alt={proyectoSeleccionado.titulo}
                      className="modal-image"
                    />
                    <h2>{proyectoSeleccionado.titulo}</h2>
                    <ul className="max-h-[200px] sm:max-h-[300px] overflow-y-auto mt-4 px-4 space-y-2 text-gray-700">
                      {proyectoSeleccionado.detalles.map((item, index) => (
                          <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <p className="impacto">
                      <strong>Impacto esperado:</strong> {proyectoSeleccionado.impacto}
                    </p>
                </div>
              </div>
            )}
          </section>
          <section
            className="contact-cta-section"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(30, 41, 58, 0.77) 0%, rgba(4, 8, 12, 0.74) 100%), url(${contactBg})`,
              backgroundAttachment: "fixed",
              backgroundSize: "cover",
              backgroundPosition: "center",

            }}
          >
            <div className="contact-cta-overlay">
              <motion.h3
                {...fadeInUp}
                className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg"
              >
                ¿Listo para transformar tu industria con Innovativa 4.0?
              </motion.h3>
              <motion.p
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-8"
              >
                Al ponerte en contacto con nuestro equipo, accederás a soluciones
                personalizadas, asesoría técnica especializada y la experiencia de
                profesionales comprometidos con la innovación y la eficiencia.
              </motion.p>
              <motion.button
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                onClick={() => navigate("/contacto")}
                className="btn-orange"
              >
                ¡Hablemos de tu proyecto!
              </motion.button>
            </div>
          </section>
        </>
      )}  
    </>
  );
};

export default Projects;