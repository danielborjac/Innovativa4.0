/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./TrustedCompanies.css";
import { motion } from "framer-motion";
import { fadeInUp, fadeInDown } from "../utils/motionConfig";

const companies = [
  { id: 1, name: "Banco Pichincha", logo: "/src/assets/company/pichincha.png" },
  { id: 2, name: "Corporación Favorita", logo: "src/assets/company/cfavorita.png" },
  { id: 3, name: "CNT EP", logo: "src/assets/company/cnt.png" },
  { id: 4, name: "Tonicorp", logo: "src/assets/company/tonicorp.png" },
  { id: 5, name: "Primax", logo: "src/assets/company/primax.png" },
  { id: 6, name: "Pronaca", logo: "src/assets/company/pronaca.png" },
  { id: 7, name: "Kia Ecuador", logo: "src/assets/company/kia.png" },
  { id: 8, name: "Nestlé Ecuador", logo: "src/assets/company/nestle.png" },
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
