import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useState, useEffect } from "react";

const Banner = ({ children, onParticlesLoaded }) => {
  const [loaded, setLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [particleCount, setParticleCount] = useState(100);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setParticleCount(window.innerWidth < 768 ? 40 : 100);
      }
      else{
        setIsMobile(window.innerWidth < 768);
        setParticleCount(window.innerWidth < 768 ? 8 : 20);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async () => {
    setLoaded(true);
    if (onParticlesLoaded) onParticlesLoaded();
  };

  useEffect(() => {
    if (loaded && onParticlesLoaded) {
      onParticlesLoaded();
    }
  }, [loaded]);

  return (
    <section
      className={`relative h-[50vh] flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        
        options={{
          detectRetina: !isMobile,
          fullScreen: false,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: particleCount },
            color: { value: "#ff7b00" },
            shape: { type: "circle" },
            opacity: { value: 1 },
            size: { value: { min: 2, max: 4 } },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              outModes: "bounce",
            },
            links: {
              enable: true,
              color: "#ffffff",
              opacity: 1,
              distance: 100,
            },
          },
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
          },
        }}
      />    
      <div className="absolute z-20 text-center px-6 text-white">{children}</div>
    </section>
  );
};

export default Banner;