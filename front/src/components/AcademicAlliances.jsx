/* eslint-disable no-unused-vars */
import React from "react";
import "./AcademicAlliances.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeInUp, hover3D, slideRotateLeft} from "../utils/motionConfig";
import ue from "../assets/academics/ue.png";
import ug from "../assets/academics/ug.png";

const alliances = [
  {
    id: 1,
    name: "Universidad Europea de España",
    logo: ue,
    description: "Colaboración en programas de formación internacional y proyectos de innovación educativa.",
    link: "alianzas/Universidad-Europea"
  },
  {
    id: 2,
    name: "Universidad de Guayaquil",
    logo: ug,
    description: "Alianza académica enfocada en el desarrollo tecnológico y la educación superior en Ecuador.",
    link: "alianzas/Universidad-Guayaquil"
  },
];

const AcademicAlliances = () => {
  const navigate = useNavigate();

  return (
    <section className="alliances-section">
      <motion.h2 {...fadeInUp}>
        Alianzas Académicas
      </motion.h2>

      <div className="alliances-grid">
        {alliances.map((item) => (
          <motion.div {...slideRotateLeft} {... hover3D}
            key={item.id}
            className="alliance-card"
            onClick={() => navigate(item.link)}
          >
            <div className="alliance-logo">
              <img src={item.logo} alt={item.name} />
            </div>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AcademicAlliances;
