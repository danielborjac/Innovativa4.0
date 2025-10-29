/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "./TrustedCompanies.css";
import { motion } from "framer-motion";
import { fadeInUp, fadeInDown } from "../utils/motionConfig";
import { getAllCompanies } from "../api/companies"; // 🔹 Asegúrate de tener este import correcto

// 🧩 Logos locales (para modo fallback)
import holandesa from "../assets/company/Holandesa.png";
import Universae from "../assets/company/Universae.png";
import Terranostra from "../assets/company/Terranostra.png";
import salgraf from "../assets/company/Salgraf.png";
import Nativaromas from "../assets/company/Nativaromas.png";
import ferrero from "../assets/company/Ferrero.png";
import reylacteos from "../assets/company/Reylacteos.png";
import globalservice from "../assets/company/Globalservice.png";
import Alinatura from "../assets/company/Alinatura.png";
import CTI from "../assets/company/CTI.png";
import ordeno from "../assets/company/ordeno.png";

// 🔹 Datos mockeados (fallback)
const mockCompanies = [
  { id: 1, name: "Rey lácteos", logo: reylacteos },
  { id: 2, name: "LA holandesa", logo: holandesa },
  { id: 3, name: "Universae", logo: Universae },
  { id: 4, name: "Terra nostra", logo: Terranostra },
  { id: 5, name: "Salgraf", logo: salgraf },
  { id: 6, name: "Nativaromas", logo: Nativaromas },
  { id: 7, name: "Alinatura", logo: Alinatura },
  { id: 8, name: "Ferrero", logo: ferrero },
  { id: 10, name: "Global service", logo: globalservice },
  { id: 11, name: "CTI", logo: CTI },
  { id: 12, name: "El Ordeño", logo: ordeno },
];

const TrustedCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [paused, setPaused] = useState(false);
  const [delay, setDelay] = useState(false);

  // 🔹 Cargar datos desde el backend
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await getAllCompanies();
        if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
          setCompanies(res.data);
        } else {
          console.warn("⚠️ No hay datos en la base, usando mock data");
          setCompanies(mockCompanies);
        }
      } catch (error) {
        console.error("❌ Error al cargar compañías:", error);
        setCompanies(mockCompanies);
      }
    };
    fetchCompanies();
  }, []);

  // 🔹 Control de pausa del carrusel
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
    }, 300);
  };

  // 🔹 Duplicamos el arreglo para lograr el loop infinito
  const loopCompanies = [...companies, ...companies];

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
                  <img
                    src={company.logo}
                    alt={company.name}
                    loading="lazy"
                    onError={(e) => {
                      // Si falla el logo, usa un placeholder
                      e.target.src = "/assets/img/placeholder-logo.png";
                    }}
                  />
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
