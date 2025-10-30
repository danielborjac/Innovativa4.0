/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Banner from "../components/Banner";
import { useState } from "react";
import aboutBanner from "../assets/about-banner.jpg";
import teamImg from "../assets/team-work.jpg";
import vision from "../assets/vision.jpg";
import mision from "../assets/mision.jpg";
import valores from "../assets/values.jpg";
import "./About.css";
import {
  useFadeInUp,
  useFadeInDown,
  useFadeInLeft,
  useFadeInRight,
  hover3D,
  useSlideRotateRight,
} from "../utils/motionConfig";
import Spinner from "../components/Spinner";
import TrustedCompanies from "../components/TrustedCompanies";

const About = () => {
    const [loading, setLoading] = useState(true);
  

  return (
    <>
      {loading && <Spinner />}
      <div className="about">
        {/* Banner */}

        <section className="banner">
          <img src={aboutBanner} alt="Equipo Innovativa" />
          <Banner/>
          <div className="banner-content">
              <motion.h1 {...hover3D} className="banner-title">SOBRE NOSOTROS</motion.h1>
          </div>
        </section>

        {/* Sección: Texto + imagen alternada */}
        <section className="about-main bg-dots-pattern-1">
          <motion.div {...useFadeInLeft()} className="about-text">
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

          <motion.img {...useSlideRotateRight()} src={teamImg} alt="Equipo de trabajo" className="about-img" />
        </section>

        {/* Cita destacada */}
        <motion.section {...useFadeInUp()} className="about-quote">
          <blockquote>
            “Nos encantaría tener una entrevista personal para conocer sus expectativas y desarrollar juntos una estrategia que le permita obtener mayor rentabilidad.”
          </blockquote>
        </motion.section>
        {/* Sección Misión y Visión */}
        <motion.section className="about-mission-vision bg-dots-pattern-1">
          <motion.div className="mv-container">
            {/* Tarjeta: Misión */}
            <motion.div {...useFadeInLeft()} className="mv-card">
              <div className="mv-inner">
                <div
                  className="mv-front"
                  style={{ backgroundImage: `url(${mision})` }}
                >
                  <div className="mv-overlay"></div>
                  <h2>MISIÓN</h2>
                  <p className="mv-phrase">Conoce nuestra razón de ser</p>
                </div>
                <div className="mv-back">
                  <p>
                    Brindamos asistencia técnica y soluciones integrales orientadas al sector industrial,
                    destacando en ingeniería eléctrica, electrónica, informática, instrumentación,
                    control de procesos y automatización.  
                    Impulsamos la innovación, sostenibilidad y mejora continua en cada proyecto.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tarjeta: Visión */}
            <motion.div {...useFadeInRight()} className="mv-card">
              <div className="mv-inner">
                <div
                  className="mv-front"
                  style={{ backgroundImage: `url(${vision})` }}
                >
                  <div className="mv-overlay"></div>
                  <h2>VISIÓN</h2>
                  <p className="mv-phrase">Descubre hacia dónde vamos</p>
                </div>
                <div className="mv-back">
                  <p>
                    Para 2030, seremos líderes en soluciones tecnológicas e industriales,
                    reconocidos a nivel nacional e internacional.  
                    Aspiramos a ser el aliado estratégico de nuestros clientes en la transformación
                    tecnológica y digital de la industria moderna.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.section>
        {/* --- SECCIÓN VALORES CORPORATIVOS --- */}
        <section className="values-section" id="valores">
          <div className="values-grid">
            {/* Columna izquierda (texto) */}
            <div 
              className="values-text"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <motion.h2 {...useFadeInDown()}>Valores Corporativos</motion.h2>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Innovación</h3>
                <p>
                  Impulsamos la creatividad y la aplicación de tecnologías de vanguardia en cada proyecto, 
                  desarrollando soluciones modernas, eficientes y adaptadas a las necesidades del sector industrial.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Excelencia Técnica</h3>
                <p>
                  Garantizamos la más alta calidad en nuestros servicios, cumpliendo con las normas nacionales e internacionales 
                  y asegurando resultados confiables, duraderos y de alto valor técnico.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Compromiso</h3>
                <p>
                  Asumimos con responsabilidad cada reto, trabajando con disciplina y dedicación para cumplir los objetivos 
                  de nuestros clientes y fortalecer relaciones basadas en la confianza y la transparencia.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Trabajo en Equipo</h3>
                <p>
                  Promovemos la colaboración, el respeto y la comunicación efectiva entre nuestros colaboradores, clientes 
                  y aliados estratégicos, convencidos de que el éxito se construye en conjunto.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Sostenibilidad</h3>
                <p>
                  Adoptamos prácticas responsables con el entorno, fomentando la eficiencia energética, 
                  el uso racional de los recursos y el desarrollo sostenible en todos nuestros proyectos.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Seguridad y Cumplimiento</h3>
                <p>
                  Velamos por la seguridad industrial, alimentaria y ocupacional, asegurando la integridad de las personas 
                  y el cumplimiento estricto de los estándares técnicos, normativos y legales.
                </p>
              </motion.div>

              <motion.div {...useFadeInUp()} className="value-item">
                <span className="value-dot-line"></span>
                <h3>Orientación al Cliente</h3>
                <p>
                  Nuestro trabajo está enfocado en la satisfacción total del cliente, ofreciendo soluciones personalizadas, 
                  oportunas y de alto impacto que optimizan su productividad y competitividad.
                </p>
              </motion.div>
            </div>

            {/* Columna derecha (imagen) */}
            <motion.div {...useFadeInRight()} className="values-image">
              <img src={valores} alt="Valores Corporativos" />
            </motion.div>
          </div>
        </section>
        <section className="home-section">
          <TrustedCompanies setIsLoading={setLoading}/>
        </section>
      </div>
    </>
  );
};

export default About;
