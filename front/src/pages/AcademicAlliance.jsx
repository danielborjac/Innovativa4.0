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
import Spinner from "../components/Spinner";

const allianceData = {
    "Universidad-Europea": {
        title: "Universidad Europea de España",
        bannerImage: banner,
        background: background,
        infoImage: info,
        description:
        "En INNOVATIVA-40 S.A.S fortalecemos nuestro compromiso con la formación profesional y la innovación tecnológica a través de nuestra alianza con la Universidad Europea, institución de prestigio internacional reconocida por su excelencia académica y enfoque global, etre los puntos más importantes:",
        items: [
        "fortalecemos el vínculo entre la academia y la industria ecuatoriana.",
        "Recibimos pasantes y profesionales de todo el mundo.",
        "Promovemos la innovación, el intercambio de conocimiento y el desarrollo de soluciones tecnológicas de alto nivel para el sector industrial.",
        "Formamos talento, impulsamos la industria.",
        ],
        conclusion:
        "Gracias a esta colaboración, recibimos pasantes y profesionales de distintas partes del mundo, quienes aportan nuevas perspectivas, conocimientos y experiencias a nuestros proyectos industriales. Esta alianza estratégica integra la academia y la industria ecuatoriana, fomentando la transferencia de conocimiento, la investigación aplicada y el desarrollo de soluciones innovadoras que impulsan la productividad y la competitividad del sector industrial nacional.",
        universityInfo:
        "La Universidad Europea es una de las instituciones privadas líderes en Europa, reconocida por su modelo educativo innovador, enfoque internacional y programas adaptados al mercado laboral. Destaca por sus recursos e instalaciones formativas de vanguardia, cuenta con más de 25 hectáreas, 5 edificios docentes y un extenso complejo deportivo dotado de piscinas, gimnasio, pista de atletismo, canchas de tenis, fútbol, pádel, pista de vóley-playa y pabellón deportivo. Su alianza con INNOVATIVA-40 impulsa la formación técnica avanzada y la creación de oportunidades académicas globales.",
    }
};

const AcademicAlliance = () => {
  const { AllianceId } = useParams();
  const Alliance = allianceData[AllianceId];

    const [loading, setLoading] = useState(true);
    const handleParticlesLoaded = () => {
          // Espera un momento adicional para una transición más suave
          setTimeout(() => setLoading(false), 200);
    };

  return (
    <>
        {loading && <Spinner />}
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
    </>
  );
};

export default AcademicAlliance;
