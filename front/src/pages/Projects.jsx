/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleParticlesLoaded = () => {
        // Espera un momento adicional para una transición más suave
        setTimeout(() => setLoading(false), 200);
  };


  return (
    <>
        {loading && <Spinner />}
    
        <div>
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
                    {proyectosData.map((proyecto) => (
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
                    <ul>
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
        </div>
    </>
  );
};

export default Projects;