// MotionConfig.js
// ⚡ Efectos de animación optimizados con Framer Motion
// Incluye variantes responsivas, suaves y overflow-safe

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// 🔹 Fade hacia arriba (adaptativo)
export const fadeInUp = {
  initial: { opacity: 0, y: isMobile ? 60 : 150 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true }, 
};

// 🔹 Fade hacia abajo
export const fadeInDown = {
  initial: { opacity: 0, y: isMobile ? -60 : -150 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true }, 
};

// 🔹 Fade lateral izquierda con blur suave (overflow-safe)
export const fadeInLeft = {
  initial: { opacity: 0, x: isMobile ? -80 : -200, filter: "blur(6px)" },
  whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true }, 
};

// 🔹 Fade lateral derecha con blur
export const fadeInRight = {
  initial: { opacity: 0, x: isMobile ? 80 : 200, filter: "blur(6px)" },
  whileInView: { opacity: 1, x: 0, filter: "blur(0px)" },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true }, 
};

// 🔹 Zoom + leve rotación 3D
export const fadeInZoom = {
  initial: { opacity: 0, scale: 0.9, rotateX: 8 },
  whileInView: { opacity: 1, scale: 1, rotateX: 0 },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  viewport: { once: true }, 
};

// 🔹 Efecto Slide & Rotate (para imágenes o cards grandes)
export const slideRotateRight = {
  initial: { opacity: 0, x: isMobile ? 150 : 300, rotate: 8 },
  whileInView: { opacity: 1, x: 0, rotate: 0 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true }, 
};

export const slideRotateLeft = {
  initial: { opacity: 0, x: isMobile ? -150 : -300, rotate: -8 },
  whileInView: { opacity: 1, x: 0, rotate: 0 },
  transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  viewport: { once: true }, 
};

// 🔹 Desenfoque progresivo (ideal para íconos o textos pequeños)
export const blurReveal = {
  initial: { opacity: 0, filter: "blur(14px)" },
  whileInView: { opacity: 1, filter: "blur(0px)" },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true }, 
};

// 🔹 Hover 3D realista (con efecto de profundidad)
export const hover3D = {
  whileHover: {
    scale: 1.06,
    rotateX: 6,
    rotateY: -6,
    translateZ: 10,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.35, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
    rotateX: 0,
    rotateY: 0,
  },
};

export const hover = {
  whileHover: {
    scale: 1.06,
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
  whileTap: {
    scale: 0.98,
    rotateX: 0,
    rotateY: 0,
  },
};
// 🔹 Stagger container (para animar varios hijos en secuencia)
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

// 🔹 Item individual dentro de stagger
export const fadeItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  viewport: { once: true }, 
};

// 🔹 Clip Reveal (animación tipo “scroll reveal” sin overflow)
export const clipReveal = {
  initial: { clipPath: "inset(0 100% 0 0)" },
  whileInView: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration: 1, ease: [0.33, 1, 0.68, 1] },
  },
};

// 🔹 Fade suave continuo (ideal para textos largos o headers)
export const softFade = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 1.2, ease: "easeInOut" },
  viewport: { once: true }, 
};

// 🔹 Parallax leve (para hover en imágenes)
export const hoverParallax = {
  whileHover: { scale: 1.05, y: -10 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// 🔹 Fade out al salir
export const fadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  transition: { duration: 0.5 },
  viewport: { once: true }, 
};
