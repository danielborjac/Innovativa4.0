import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useState, useEffect } from "react";

const Banner = ({ children, onParticlesLoaded }) => {
  const [loaded, setLoaded] = useState(false);

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
      style={{
        backgroundImage: 'radial-gradient(circle,rgb(69, 103, 148) 0%, rgb(12, 40, 77) 100%)',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          background: { color: { value: "transparent" } },
          particles: {
            number: { value: 100 },
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
      {/* Filtro oscuro */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div className="absolute z-20 text-center px-6 text-white">{children}</div>
    </section>
  );
};

export default Banner;