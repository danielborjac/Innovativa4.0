/* eslint-disable no-unused-vars */
import React from "react";
import Banner from "../components/Banner";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import "./Service.css";
import {
  staggerContainer,
  fadeItem,
  hover3D,
} from "../utils/motionConfig";
import { useEffect } from "react";
import { useRef} from "react";

import electricImg from "../assets/electrical.jpg";
import industrialImg from "../assets/industrial.jpg";
import trainingImg from "../assets/training.jpg";
import projectImg from "../assets/project.jpg";
import electrica1 from "../assets/ingenieria_electrica.jpg";
import electrica2 from "../assets/ingenieria_electrica2.jpg";
import electrica3 from "../assets/ingenieria_electrica3.jpg";
import ingIndustrial1 from "../assets/ingenieria-industrial1.jpg";
import ingIndustrial2 from "../assets/ingenieria-industrial2.jpg";
import ingIndustrial3 from "../assets/ingenieria-industrial3.jpg";
import capacitaciones1 from "../assets/capacitaciones1.jpg";
import capacitaciones2 from "../assets/capacitaciones2.jpg";
import mindustrial1 from "../assets/mantenimiento-industrial1.jpg";
import mindustrial2 from "../assets/mantenimiento-industrial2.jpg";

import Spinner from "../components/Spinner";

const servicesContent = {
  "ingenieria-electrica": {
    title: "Igeniería Eléctrica Y Automatización Industrial",
    bannerImg: electricImg,
    sections: [
      {
        subtitle: "Sistemas Eléctricos",
        img: electrica1,
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
        img: electrica2,
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
        img: electrica3,
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
    title: "Ingenieria Industrial",
    bannerImg: industrialImg,
    sections: [
      {
        subtitle: "Medición de Estándares",
        img: ingIndustrial1,
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
        img: ingIndustrial2,
        items: [
          "Levantamiento de diagramas de proceso por líneas prioritarias.",
          "Definición de equipos o líneas para medir la eficiencia y performance.",
          "Definición y categorización de Paros Planeados y Paros no Planeados de los equipos o líneas de producción.",
        ],
      },
      {
        subtitle: "Análisis de Capacidad",
        img: ingIndustrial3,
        items: [
          "Definición de líneas prioritarias para análisis de capacidad.",
          "Definición de Bottlenecks (Cuellos de Botella) para líneas prioritarias.",
          "Análisis de la capacidad de Uso de líneas prioritarias.",
        ],
      },
    ],
  },
  "capacitaciones": {
    title: "Capacitaciones Y Entrenamientos",
    bannerImg: trainingImg,
    sections: [
      {
        subtitle: "Instrumentación & Automatización",
        img: capacitaciones1,
        items: [
          "Calibración de instrumentos de campo",
          "Programación básica de PLC, HMI, Variadores de velocidad",
          "Programación avanzada de PLC y HMI",
          "Lazos de control y sintonización de lazos",
        ],
      },
      {
        subtitle: "Productividad",
        img: capacitaciones2,
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
  "mantenimiento": {
    title: "Mantenimiento y Proyectos Industriales",
    bannerImg: projectImg,
    sections: [
      {
        subtitle: "Mantenimiento preventivo Industrial",
        img: mindustrial1,
        items: [
          "Motores eléctricos.",
          "Instrumentación industrial.",
          "Equipos de llenado.",
          "Equipos de proceso térmico.",
          "Equipos transportadores.",
          "Planta de procesos - minería.",
        ],
      },
      {
        subtitle: "Proyectos Industriales",
        img: mindustrial2,
        items: [
          "Implementación de TPM en líneas de llenado.",
          "Implementación de sistema de gestión de mantenimiento In House.",
          "Control de peso neto.",
          "Montaje de Andamios certificados.",
        ],
      },
    ],
  },
};

const Service = () => {
  const { serviceId } = useParams();
  const service = servicesContent[serviceId];
  const [loading, setLoading] = useState(true);

  const animationRef = useRef(null); 
  const isInView = useInView(animationRef, { once: true, amount: 0.25 });

  useEffect(() => {
    if (service) {
      document.title = service.title + " | Innovativa 4.0";
    }
  }, [serviceId, service]);

  useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timer);
    }, [serviceId]);

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
      <meta
            name="description"
            content="Soluciones industriales, automatización, ingeniería eléctrica y proyectos especializados."
        />
        <link rel="canonical" href={`https://innovativa40.com/alianzas/${serviceId}`}/>
        {loading && <Spinner />}
      <div className="service-page" key={serviceId}>

        <section className="banner">
          <img src={service.bannerImg} alt={service.title} />
          <Banner/>
          <div className="banner-content">
              <motion.h1 {...hover3D} className="banner-title">{service.title.toUpperCase()}</motion.h1>
          </div>
        </section>

        {/* Contenido */}
        <div className="service-main" ref={animationRef}>
          {service.sections.map((sec, idx) => {
            const isMobile= window.innerWidth < 768
            const isReverse = idx % 2 !== 0;

            // Render order control: if reverse, text first then image (or opposite)
            const ImageBlock = (
              <motion.div
                className="section-img-wrapper"
                key="img"
                variants={staggerContainer}
                initial={loading ? false : "hidden"}
                animate={isInView ? "show" : "hidden"}
              >
                <motion.img variants={fadeItem} src={sec.img} alt={sec.subtitle} className="section-img" />
              </motion.div>
            );

            const TextBlock = (
              <motion.div
                className="section-text"
                key="text"
                variants={staggerContainer}
                initial={loading ? false : "hidden"}
                animate={isInView ? "show" : "hidden"}
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