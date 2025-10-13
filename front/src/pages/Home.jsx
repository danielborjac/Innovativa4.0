/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import bannerImg from "../assets/banner-industrial.jpg";
import industrialImg from "../assets/industrial-team.jpg";
import "./Home.css";
import { fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeInZoom, slideRotateRight, slideRotateLeft,  blurReveal, hover3D, staggerContainer, fadeItem } from "../utils/motionConfig";
import Carousel from "../components/Carousel";
import img1 from "../assets/carousel1.jpg";
import img2 from "../assets/carousel2.jpg";
import img3 from "../assets/carousel3.jpg";
import Banner from "../components/Banner";
import { useState } from "react";
import Spinner from "../components/Spinner";

const Home = () => {

    const [loading, setLoading] = useState(true);

    const handleParticlesLoaded = () => {
        // Espera un momento adicional para una transición más suave
        setTimeout(() => setLoading(false), 300);
    };

    return (
        <>
            {loading && <Spinner />}

            <div className="home">
                {/* Banner hero */}
                <section className="home-banner">
                    <Banner onParticlesLoaded={handleParticlesLoaded}>
                        <motion.h1 {...fadeInUp} {...hover3D} className="banner-title">Soluciones Industriales Innovadoras</motion.h1>
                        <motion.p {...fadeInDown} {...hover3D} className="banner-subtitle">Más de 20 años optimizando la eficiencia operativa y energética.</motion.p>
                    </Banner>
                </section>

                {/* Sección: Servicios principales alternados */}
                <section className="home-services">
                    <motion.div {...fadeInLeft} className="service-text">
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

                    <motion.div {...fadeInRight} className="service-carousel">
                        <Carousel images={[img1, img2, img3]} interval={3000} />
                    </motion.div>
                </section>

                {/* Quiénes somos */}
                <section className="home-about">
                    <motion.img {...slideRotateLeft} src={industrialImg} alt="Industria moderna" className="about-img-left" />
                    <motion.div {...fadeInRight} className="about-text-bg">
                        <h3>¿Quiénes Somos?</h3>
                        <p>
                        Somos una empresa de soluciones industriales que ofrece productos y
                        servicios de calidad, efectividad y valor agregado en todas sus
                        actividades. Enfocados en incrementar la eficiencia operacional y
                        mejora continua a través de la optimización de recursos y ahorros
                        energéticos.
                        </p>
                        <Link to="/nosotros" className="btn-orange">
                        Conócenos
                        </Link>
                    </motion.div>
                </section>
            </div>
        </>
    );
};

export default Home;
