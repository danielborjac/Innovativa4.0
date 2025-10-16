/* eslint-disable no-unused-vars */
import React from "react";
import "./AcademicAlliance.css";
import { useParams } from "react-router-dom";
import Banner from "../components/Banner";
import { useState } from "react";
import { motion } from "framer-motion";
import "./Service.css";
import {
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
  fadeItem,
  hover3D,
  slideRotateLeft,
} from "../utils/motionConfig";


import banner from "../assets/academics/banner-ueuropea.jpg";
import background from "../assets/academics/background-ueuropea.jpg";
import info from "../assets/academics/info-ueuropea.jpg";


const allianceData = {
    "Universidad-Europea": {
        title: "Universidad Europea de España",
        bannerImage: banner,
        background: background,
        infoImage: info,
        description:
        "INNOVATIVA-40 S.A.S. mantiene una alianza estratégica internacional con la Universidad Europea de España, enfocada en:",
        items: [
        "Pasantías internacionales para alumnos",
        "Desarrollo de proyectos conjuntos",
        "Formación continua especializada",
        "Transferencia de conocimientos técnicos",
        ],
        conclusion:
        "Esta colaboración refuerza nuestro compromiso con el desarrollo profesional, la educación y la innovación en la industria.",
        universityInfo:
        "La Universidad Europea es una de las instituciones privadas líderes en Europa, reconocida por su modelo educativo innovador, enfoque internacional y programas adaptados al mercado laboral. Destaca por sus recursos e instalaciones formativas de vanguardia, cuenta con más de 25 hectáreas, 5 edificios docentes y un extenso complejo deportivo dotado de piscinas, gimnasio, pista de atletismo, canchas de tenis, fútbol, pádel, pista de vóley-playa y pabellón deportivo. Su alianza con INNOVATIVA-40 impulsa la formación técnica avanzada y la creación de oportunidades académicas globales.",
    },
    "Universidad-Guayaquil": {
        title: "Universidad de Guayaquil",
        bannerImage: "",
        background: "/src/assets/academics/banner-uguayaquil.jpg",
        infoImage: "/src/assets/academics/info-uguayaquil.jpg",
        description:
        "INNOVATIVA-40 S.A.S. mantiene una alianza académica nacional con la Universidad de Guayaquil, orientada a fortalecer el desarrollo tecnológico y la educación superior en el Ecuador mediante:",
        items: [
        "Programas conjuntos de investigación aplicada",
        "Formación técnica y profesional especializada",
        "Desarrollo de proyectos de innovación educativa",
        "Transferencia de conocimiento en transformación digital",
        ],
        conclusion:
        "Esta cooperación impulsa la excelencia académica y refuerza el vínculo entre la universidad y el sector productivo nacional.",
        universityInfo:
        "La Universidad de Guayaquil es una de las instituciones públicas más emblemáticas del país, reconocida por su trayectoria académica y compromiso con la sociedad ecuatoriana. Su colaboración con INNOVATIVA-40 promueve el crecimiento tecnológico, la investigación aplicada y la capacitación profesional continua.",
    }
};

const AcademicAlliance = () => {
  const { AllianceId } = useParams();
  const Alliance = allianceData[AllianceId];

    const [loading, setLoading] = useState(true);
    const handleParticlesLoaded = () => {
          // Espera un momento adicional para una transición más suave
          setTimeout(() => setLoading(false), 300);
    };

  return (
    <main className="alliance-page">
      
        <section className="banner">
            <img src={banner} alt="europea" />
            <Banner onParticlesLoaded={handleParticlesLoaded}>
                <motion.h1 {...fadeInUp} {...hover3D} className="banner-title">{Alliance.title.toUpperCase()}</motion.h1>
            </Banner>
        </section>

        <section className="alliance-info">
            <div className="info-image">
                <motion.img {...slideRotateLeft} src={Alliance.infoImage} alt={Alliance.name}/>
            </div>
            <div className="info-text">
                <motion.h2 {...fadeInRight}>Sobre la Universidad</motion.h2>
                <motion.p {...fadeInDown}>{Alliance.universityInfo}</motion.p>
            </div>
        </section>

        <section
            className="alliance-hero"
            style={{ backgroundImage: `url(${Alliance.background})` }}
        >
            <div className="overlay"></div>

            <motion.div
                          className="hero-content"
                          key="text"
                          variants={staggerContainer}
                          initial="hidden"
                          whileInView="show"
                          viewport={{ once: true, amount: 0.25 }}
            >
                <motion.h5 {...fadeInLeft}>{Alliance.description}</motion.h5>
                {/*<ul>
                    {Alliance.items.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>*/}
                <motion.div style={{margin: "20px"}} className="items-grid">
                    {Alliance.items.map((item, i) => (
                        <motion.div
                        key={i}
                        style={{background:"#0a192f"}}
                        className="item-card"
                        variants={fadeItem}
                        whileHover={hover3D.whileHover}
                        whileTap={hover3D.whileTap}
                        >
                        <p  style={{color:"white"}}>{item}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.h5 {...fadeInRight}>{Alliance.conclusion}</motion.h5>
            </motion.div>
        </section>

      
    </main>
  );
};

export default AcademicAlliance;
