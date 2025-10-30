/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import industrialImg from "../assets/industrial-team.jpg";
import "./Home.css";
import {
  useFadeInLeft,
  useFadeInRight,
  useSlideRotateLeft,
  hover3D,
  useSlideRotateRight,
} from "../utils/motionConfig";
import Carousel from "../components/Carousel";
import img1 from "../assets/carousel1.jpg";
import img2 from "../assets/carousel2.jpg";
import img3 from "../assets/carousel3.jpg";
import ecuadorImg from "../assets/Ecuador.png";
import banner from "../assets/main-banner.jpg";
import Banner from "../components/Banner";
import { useState } from "react";
import Spinner from "../components/Spinner";
import Services from "../components/Services";
import TrustedCompanies from "../components/TrustedCompanies";
import AcademicAlliances from "../components/AcademicAlliances";

const Home = () => {

    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading && <Spinner />}

            <div className="home">
                {/* Banner hero */}
                <section className="banner">
                    <img src={banner} alt="home" />
                    <Banner/>
                    <div className="banner-content">
                        <motion.h1 {...hover3D} className="banner-title">SOLUCIONES INDUSTRIALES INNOVADORAS</motion.h1>
                        <motion.p {...hover3D} className="banner-subtitle">Más de 20 años optimizando la eficiencia operativa y energética.</motion.p>
                    </div>
                </section>

                {/* Sección: Servicios principales alternados */}
                <section className="home-description">
                    <motion.div {...useFadeInLeft()} className="service-text">
                        <h2>Eficiencia y Tecnología</h2>
                        <p>
                            Disponemos de un amplio portafolio de servicios en el área de Ingeniería Eléctrica, Electrónica, Informática, 
                            Industrial e implementación de proyectos para todo tipo de sector industrial. 
                        </p>
                        <p>
                            Contamos con un equipo de especialistas en la industria de manufactura con 12 años de experiencia que brinda 
                            un servicio personalizado a cada uno de nuestros clientes, cumpliendo normativas para el cuidado de la 
                            seguridad del personal y del medio ambiente.
                        </p>
                    </motion.div>

                    <motion.div {...useFadeInRight()} className="service-carousel">
                        <Carousel images={[img1, img2, img3]} interval={3000} />
                    </motion.div>
                </section>

                {/* Quiénes somos */}
                <section className="home-about bg-dots-pattern-2">
                    <motion.img {...useSlideRotateLeft()} src={industrialImg} alt="Industria moderna" className="about-img-left" />
                    <motion.div {...useFadeInRight()} className="about-text-bg">
                        <h2>¿Quiénes Somos?</h2>
                        <p>
                        Somos una empresa de soluciones industriales con más de 20 años de experiencia, 
                        especializada en ofrecer productos y servicios de calidad, con efectividad y alto valor agregado.
                        Trabajamos para incrementar la eficiencia operacional de nuestros clientes mediante 
                        la optimización de recursos, automatización y ahorro energético.
                        </p>
                        <Link to="/nosotros" className="btn-orange">
                        Conócenos
                        </Link>
                    </motion.div>
                </section>
                {/* Componente servicio */}
                <section>
                    <Services />
                </section>
                {/* Componente alianzas académicas */}
                <section className="home-section">
                    <AcademicAlliances />
                </section>
                {/* Proyectos Destacados */}
                <section className="home-about bg-dots-pattern-1">
                    <motion.div {...useSlideRotateLeft()} className="about-text-bg">
                        <h2>Nuestros proyectos en todo Ecuador</h2>
                        <p>
                        Nuestros proyectos en todo Ecuador reflejan la esencia de Innovativa 4.0: ingeniería avanzada, transformación digital y compromiso con 
                        la excelencia industrial. Desde la optimización de procesos hasta la automatización inteligente, cada iniciativa impulsa la productividad 
                        y sostenibilidad de las empresas ecuatorianas.
                        </p>
                        <Link to="/proyectos" className="btn-orange">
                        Ir a proyectos destacados
                        </Link>
                    </motion.div>
                    <motion.img {...useSlideRotateRight()} src={ecuadorImg} alt="Industria moderna" className="map-img-right" />
                </section>
                <section className="home-section">
                    <TrustedCompanies setIsLoading={setLoading}/>
                </section>          
            </div>
        </>
    );
};

export default Home;
