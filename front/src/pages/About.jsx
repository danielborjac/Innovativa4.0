/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import { useState } from "react";
import aboutBanner from "../assets/about-banner.jpg";
import teamImg from "../assets/team-work.jpg";
import processImg from "../assets/process.jpg";
import "./About.css";
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeInZoom, slideRotateRight, slideRotateLeft,  blurReveal, hover3D, staggerContainer, fadeItem } from "../utils/motionConfig";
import Spinner from "../components/Spinner";
import { useLocation } from "react-router-dom";

const About = () => {
    const [loading, setLoading] = useState(true);
    const handleParticlesLoaded = () => {
          // Espera un momento adicional para una transición más suave
          setTimeout(() => setLoading(false), 200);
    };
  

  return (
    <>
      {loading && <Spinner />}
      <div className="about">
        {/* Banner */}
        {/*<section className="alter-banner">
          <img src={aboutBanner} alt="Equipo Innovativa" />
          <motion.h1 {...fadeInUp}>SOBRE NOSOTROS</motion.h1>
        </section>*/}

        <section className="banner">
          <img src={aboutBanner} alt="Equipo Innovativa" />
          <Banner onParticlesLoaded={handleParticlesLoaded}>
              <motion.h1 {...fadeInUp} {...hover3D} className="banner-title">SOBRE NOSOTROS</motion.h1>
          </Banner>
        </section>

        {/* Sección: Texto + imagen alternada */}
        <section className="about-main bg-dots-pattern-1">
          <motion.div {...fadeInLeft} className="about-text">
            <h2>Innovación y compromiso industrial</h2>
            <p>
              En <strong>INNOVATIVA-40 S.A.S.</strong> nos especializamos en diseñar y ejecutar
              soluciones integrales para la industria, con estrictos estándares de calidad y seguridad.
            </p>
            <p>
              👷‍♂️ Nuestro equipo está conformado por especialistas en manufactura y mejora de procesos.
            </p>
            <p>
              💡 Nos apasiona la innovación y el trabajo colaborativo, ofreciendo soluciones ajustadas a cada cliente.
            </p>
          </motion.div>

          <motion.img {...slideRotateRight} src={teamImg} alt="Equipo de trabajo" className="about-img" />
        </section>

        {/* Cita destacada */}
        <motion.section {...fadeInUp} className="about-quote">
          <blockquote>
            “Nos encantaría tener una entrevista personal para conocer sus expectativas y desarrollar juntos una estrategia que le permita obtener mayor rentabilidad.”
          </blockquote>
        </motion.section>

        {/* Imagen complementaria */}
        <section className="about-extra">
          <motion.img {...fadeInZoom} src={processImg} alt="Procesos industriales" />
        </section>
      </div>
    </>
  );
};

export default About;
