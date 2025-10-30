/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "../components/Banner";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./Service.css";
import {
  staggerContainer,
  fadeItem,
  hover3D,
} from "../utils/motionConfig";
import { useEffect } from "react";

import electricImg from "../assets/electrical.jpg";
import industrialImg from "../assets/industrial.jpg";
import trainingImg from "../assets/training.jpg";
import extraImg1 from "../assets/service-extra1.jpg";
import extraImg2 from "../assets/service-extra2.jpg";
import extraImg3 from "../assets/service-extra3.jpg";
import Spinner from "../components/Spinner";

const servicesContent = {
  "ingenieria-electrica": {
    title: "INGENIERÍA ELÉCTRICA Y ELECTRÓNICA",
    bannerImg: electricImg,
    sections: [
      {
        subtitle: "Sistemas Eléctricos",
        img: extraImg1,
        items: [
          "Levantamiento de infraestructura eléctrica.",
          "Diseño de redes eléctricas en baja tensión.",
          "Estudio de balances de carga.",
          "Estudio de sistema de tierras y pararrayos.",
          "Estudio de calidad de energía.",
          "Diseño e implementación de tableros de fuerza.",
          "Mantenimiento de variadores de frecuencia y arrancadores suaves.",
          "Mantenimiento de UPS.",
          "Tendido de cableado eléctrico.",
          "Mantenimiento de motores eléctricos (pruebas de aislamiento, rebobinaje, cambio de rodamientos, reparaciones).",
          "Implementación de sistemas de iluminación de ahorro energético.",
          "Implementación de sistemas de seguridad eléctrica basados en Norma NFPA 70E.",
          "Estudio de atmósferas explosivas basados en Norma NFPA 497.",
          "Implementación de programas de seguridad de maquinaria basados en ISO 14118 / ISO 14120.",
          "Implementación de programas de Bloqueo y etiquetado LOTO.",
        ],
      },
      {
        subtitle: "Automatización",
        img: extraImg2,
        items: [
         "Diseño e implementación de tableros de control.",
          "Programación de PLC´s (Controladores Lógicos Programables).",
          "Programación de paneles de operador HMI (Interface Humano Máquina).",
          "Configuración, montaje y puesta en servicio de variadores de frecuencia y arrancadores suaves.",
          "Configuración, montaje y puesta en servicio de controladores de temperatura.",
          "Montaje de equipos para instrumentación utilizados en el control de procesos (nivel, presión, flujo, temperatura, etc.).",
          "Calibración de equipos de control de procesos.",
        ],
      },
      {
        subtitle: "Programación & Mantenimiento",
        img: extraImg3,
        items: [
          "Mantenimiento de PCs y servidores.",
          "Configuración de servidores de impresión y correo electrónico.",
          "Automatización de información.",
          "Programación en INTOUCH, SQL, ACCESS.",
          "Office 365."
        ],
      },
    ],
  },
  "ingenieria-industrial": {
    title: "INGENIERÍA INDUSTRIAL",
    bannerImg: industrialImg,
    sections: [
      {
        subtitle: "Medición de Estándares",
        img: extraImg1,
        items: [
          "Establecimiento de estándares (tiempos requeridos) de paradas planeadas “Downtime” necesarios para el proceso productivo.",
          "Establecimiento del número de personas requeridas para el proceso productivo con el estudio de tiempos y movimientos.",
          "Establecimiento del porcentaje de pérdida por SKU´s.",
          "Establecimiento del consumo de energías necesarias para la transformación de Materias Primas en Producto Terminado.",
          "Definición de velocidades nominales por SKU y por línea.",
        ],
      },
      {
        subtitle: "Medición de Eficiencias",
        img: extraImg2,
        items: [
          "Levantamiento de diagramas de proceso por líneas prioritarias.",
          "Definición de equipos o líneas para medir la eficiencia y performance.",
          "Definición y categorización de Paros Planeados y Paros no Planeados de los equipos o líneas de producción.",
        ],
      },
      {
        subtitle: "Análisis de Capacidad",
        img: extraImg3,
        items: [
          "Definición de líneas prioritarias para análisis de capacidad.",
          "Definición de Bottlenecks (Cuellos de Botella) para líneas prioritarias.",
          "Análisis de la capacidad de Uso de líneas prioritarias.",
        ],
      },
    ],
  },
  "capacitaciones": {
    title: "CAPACITACIONES Y ENTRENAMIENTOS",
    bannerImg: trainingImg,
    sections: [
      {
        subtitle: "Seguridad Industrial",
        img: extraImg1,
        items: [
          "Prevención de riesgos laborales",
          "Evaluación de riesgos",
          "Comité paritario",
          "Permisos de trabajo",
          "Equipos de protección Personal individual y colectivo",
          "Seguridad eléctrica",
          "Atmósferas explosivas",
          "Bloqueo y etiquetado",
        ],
      },
      {
        subtitle: "Instrumentación & Automatización",
        img: extraImg2,
        items: [
          "Calibración de instrumentos de campo",
          "Programación básica de PLC, HMI, Variadores de velocidad",
          "Programación avanzada de PLC y HMI",
          "Lazos de control y sintonización de lazos",
        ],
      },
      {
        subtitle: "Productividad",
        img: extraImg3,
        items: [
          "Resolución de problemas básicos (nivel de resolución mediante visitas a la línea de producción, establecimiento de estándares, etc.).",
          "Resolución de problemas Avanzados (Metodología DMAIC, SIX SIGMA, nivel de resolución con herramientas estadísticas).",
          "Resolución de problemas con metodología SMED (Eliminación de tiempos muertos).",
          "Creación de árbol de indicadores (cascadeo de indicadores en todas las jerarquías).",
          "Implementación de KPI´s de gestión de manufactura.",
          "Creación de árbol de pérdidas.",
        ],
      },
    ],
  },
};

const Service = () => {
  const { serviceId } = useParams();
  const service = servicesContent[serviceId];
  const [loading, setLoading] = useState(true);
  setTimeout(() => setLoading(false), 200);

  useEffect(() => {
    if (window.innerWidth > 900) { // no aplica para movil
      let mounted = true;
      const imgs = Array.from(document.querySelectorAll(".section-img"));

      const syncHeights = () => {
        // delay por RAF para asegurar reflow completo
        window.requestAnimationFrame(() => {
          const sections = document.querySelectorAll(".service-section");
          sections.forEach((sec) => {
            const text = sec.querySelector(".section-text");
            const imgWrapper = sec.querySelector(".section-img-wrapper");
            if (!text || !imgWrapper) return;

            // altura real del contenido de texto (incluye padding/margins internos)
            const textHeight = Math.ceil(text.getBoundingClientRect().height + 32);

            // mínimo para evitar wrappers demasiado pequeños
            const minH = 380;

            // opcional padding visual extra
            const paddingExtra = 0; // puedes poner 12 o 16 si quieres más separación
            const desired = Math.max(textHeight + paddingExtra, minH);

            // solo actualizar si cambió (evita reflows innecesarios)
            const current = parseInt(imgWrapper.style.height || 0, 10);
            if (!current || Math.abs(current - desired) > 2) {
              imgWrapper.style.height = `${desired}px`;
            }
          });
        });
      };

      // Ejecutar inicialmente
      syncHeights();

      // Ejecutar otra vez cuando *todas* las imágenes hayan cargado
      const handleAllLoaded = () => {
        // pequeña espera adicional para garantizar layout final
        setTimeout(() => { if (mounted) syncHeights(); }, 60);
      };

      // Si alguna imagen no está lista, agregamos listener; si todas ya listas, ejecutamos
      const notLoaded = imgs.filter(img => !img.complete);
      if (notLoaded.length > 0) {
        let remaining = notLoaded.length;
        notLoaded.forEach(img => {
          const onLoad = () => {
            remaining--;
            img.removeEventListener("load", onLoad);
            if (remaining === 0) handleAllLoaded();
          };
          img.addEventListener("load", onLoad);
          // también captura error para no colgar
          const onErr = () => {
            remaining--;
            img.removeEventListener("error", onErr);
            if (remaining === 0) handleAllLoaded();
          };
          img.addEventListener("error", onErr);
        });
      } else {
        // todas cargadas ya
        handleAllLoaded();
      }

      // volver a calcular al cambiar tamaño
      const onResize = () => syncHeights();
      window.addEventListener("resize", onResize);

      // opcional: si tu contenido puede cambiar dinámicamente (p.e. agregar items),
      // puedes observar mutaciones en cada section-text -> recalc.
      const observers = [];
      document.querySelectorAll(".section-text").forEach(node => {
        const mo = new MutationObserver(syncHeights);
        mo.observe(node, { childList: true, subtree: true, characterData: true });
        observers.push(mo);
      });

      return () => {
        mounted = false;
        window.removeEventListener("resize", onResize);
        observers.forEach(o => o.disconnect());
        // quitamos listeners de imágenes por seguridad (no imprescindible aquí)
        imgs.forEach(img => {
          img.removeEventListener && img.removeEventListener("load", syncHeights);
        });
      };
    }
  }, [service]); // recalcula cuando cambie el servicio


  if (!service) return <p style={{ padding: "3rem" }}>Servicio no encontrado.</p>;

  return (
    <>
        {loading && <Spinner />}
      <div className="service-page">

        <section className="banner">
          <img src={service.bannerImg} alt={service.title} />
          <Banner/>
          <div className="banner-content">
              <motion.h1 {...hover3D} className="banner-title">{service.title}</motion.h1>
          </div>
        </section>

        {/* Contenido */}
        <div className="service-main">
          {service.sections.map((sec, idx) => {
            const isMobile= window.innerWidth < 768
            const isReverse = idx % 2 !== 0;

            // Render order control: if reverse, text first then image (or opposite)
            const ImageBlock = (
              <motion.div
                className="section-img-wrapper"
                key="img"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.img variants={fadeItem} src={sec.img} alt={sec.subtitle} className="section-img" />
              </motion.div>
            );

            const TextBlock = (
              <motion.div
                className="section-text"
                key="text"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.h2 variants={fadeItem}>{sec.subtitle}</motion.h2>

                <motion.div className="items-grid">
                  {sec.items.map((item, i) => (
                    <motion.div
                      key={i}
                      className="item-card"
                      variants={fadeItem}
                      whileHover={hover3D.whileHover}
                      whileTap={hover3D.whileTap}
                    >
                      <span className="item-icon">✔</span>
                      <p>{item}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            );

            return (
              <section
                key={idx}
                className={`service-section ${ !isMobile && isReverse ? "reverse" : ""}`}
              >
                {!isMobile && isReverse ? (
                  <>                 
                    {ImageBlock}
                    {TextBlock}
                  </>
                ) : (
                  <>
                    {TextBlock}
                    {ImageBlock}
                  </>
                )}
              </section>
            );
          })}
        </div>
      </div>
    </> 
  );
};

export default Service;