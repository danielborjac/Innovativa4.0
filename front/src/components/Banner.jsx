// Banner.jsx (Ajuste Final)

import { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadLinksPreset } from '@tsparticles/preset-links';

const Banner = () => {
    const [init, setInit] = useState(false);

    // Inicialización del Engine 
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadLinksPreset(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Configuración de Opciones
    const particlesOptions = useMemo(() => ({
        preset: 'links', 
        
        fullScreen: {
            enable: false,
            zIndex: 0,
        },
        background: {
            color: {
                value: 'transparent',
            },
        },

        particles: {
            color: {
                value: '#ff7b00', // Vértices Naranjas
            },
            links: {
                color: {
                    value: '#ffffff', // Líneas Blancas
                },
                distance: 150,
                opacity: 0.7,
                width: 1,
            },
            
            // 1. MÁS PARTÍCULAS 
            number: {
                value: 120, // Aumentado a 120 para más densidad en desktop
                density: {
                    enable: true,
                    value_area: 700, // Área de densidad reducida a 700. Esto hará que haya más partículas también en móvil de forma proporcional.
                },
            },
            
            move: {
                enable: true,
                speed: 0.5,
            },
            opacity: {
                value: 0.8,
            },
            size: {
                value: 4,
            }
        },

        // 2. EFECTO AL PASAR EL MOUSE
        interactivity: {
            events: {
                resize: true, 
                onHover: {
                    enable: true,
                    // El modo 'repulse' hace que las partículas se separen del puntero del mouse.
                    mode: 'repulse', 
                },
            },
            modes: {
                repulse: {
                    distance: 100, // Distancia de repulsión del mouse
                    duration: 0.4,
                },
                // Mantenemos 'grab' también por si quieres el efecto de unión al acercar el mouse
                grab: {
                    distance: 140,
                    links: {
                        opacity: 1,
                    },
                },
            },
        }
    }), []);

    if (!init) {
        return null;
    }

    return (
        <Particles 
            id="tsparticles-banner" 
            options={particlesOptions} 
            className="particles-container"
        />
    );
};

export default Banner;