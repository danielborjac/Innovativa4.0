/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./TrustedCompanies.css";
import { motion } from "framer-motion";
import { fadeInUp, fadeInDown } from "../utils/motionConfig";
import pichincha from "../assets/company/pichincha.png";
import cfavorita from "../assets/company/cfavorita.png";
import cnt from "../assets/company/cnt.png";
import tonicorp from "../assets/company/tonicorp.png";
import primax from "../assets/company/primax.png";
import pronaca from "../assets/company/pronaca.png";
import kia from "../assets/company/kia.png";
import nestle from "../assets/company/nestle.png";

const companies = [
  { id: 1, name: "Banco Pichincha", logo: pichincha },
  { id: 2, name: "Corporación Favorita", logo: cfavorita },
  { id: 3, name: "CNT EP", logo: cnt },
  { id: 4, name: "Tonicorp", logo: tonicorp },
  { id: 5, name: "Primax", logo: primax },
  { id: 6, name: "Pronaca", logo: pronaca },
  { id: 7, name: "Kia Ecuador", logo: kia },
  { id: 8, name: "Nestlé Ecuador", logo: nestle },
];

// Duplicamos el arreglo para lograr el loop infinito
const loopCompanies = [...companies, ...companies];

const TrustedCompanies = () => {
  const [paused, setPaused] = useState(false);
  const [delay, setDelay] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--animation-play", paused ? "paused" : "running");
  }, [paused]);

  const handleMouseEnter = () => setPaused(true);
  const handleMouseLeave = () => {
    setDelay(true);
    setTimeout(() => {
      setPaused(false);
      setDelay(false);
    }, 1000);
  };

  return (
    <section
      className="trusted-section"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div {...fadeInDown}>
        <h2>Empresas que han confiado en nosotros</h2>
      </motion.div>
      <motion.div {...fadeInUp}>
        <div className="trusted-carousel">
            <div className="trusted-track">
            {loopCompanies.map((company, index) => (
                <div className="trusted-card" key={index}>
                <div className="trusted-logo">
                    <img src={company.logo} alt={company.name} />
                </div>
                <p>{company.name}</p>
                </div>
            ))}
            </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TrustedCompanies;
