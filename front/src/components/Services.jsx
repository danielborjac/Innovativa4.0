/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./Services.css";

import electricImg from "../assets/electrical.jpg";
import industrialImg from "../assets/industrial.jpg";
import trainingImg from "../assets/training.jpg";
import projectImg from "../assets/project.jpg";

const services = [
  {
    id: 1,
    title: "INGENIERÍA ELÉCTRICA Y AUTOMATIZACIÓN INDUSTRIAL",
    img: electricImg,
    desc: "Diseño, mantenimiento y optimización de sistemas eléctricos y electrónicos industriales. Implementamos soluciones energéticas eficientes y seguras.",
    link: "/servicios/ingenieria-electrica",
  },
  {
    id: 2,
    title: "INGENIERÍA INDUSTRIAL",
    img: industrialImg,
    desc: "Mejoramos la eficiencia de procesos industriales mediante análisis técnico, automatización y estrategias de optimización de recursos.",
    link: "/servicios/ingenieria-industrial",
  },
  {
    id: 3,
    title: "CAPACITACIONES Y ENTRENAMIENTOS",
    img: trainingImg,
    desc: "Formamos profesionales competentes con programas especializados en áreas técnicas e industriales para impulsar la innovación.",
    link: "/servicios/capacitaciones",
  },
  {
    id: 4,
    title: "MANTENIMIENTO Y PROYECTOS INDUSTRIALES",
    img: projectImg,
    desc: "Desarrollamos y ejecutamos proyectos industriales integrales, acompañados de planes de mantenimiento preventivo y correctivo que garantizan la continuidad operativa, la seguridad y la eficiencia de los sistemas productivos.",
    link: "/servicios/mantenimiento",
  },
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="services-section">
      <div className="services-slider">
        <h2 className="services-title">NUESTROS SERVICIOS</h2>

        {services.map((service) => (
          <motion.div
            key={service.id}
            className="service-card"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            onClick={() => navigate(service.link)}
          >
            <div
              className="service-bg"
              style={{ backgroundImage: `url(${service.img})` }}
            />
            <div className="overlay" />
            <div className="service-content">
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
              <span className="learn-more">Ver más</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;
