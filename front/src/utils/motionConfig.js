/* eslint-disable no-unused-vars */
import { useInView, motion } from "framer-motion";
import { useRef } from "react";

/**
 * Hook generador de configuraciones animadas reactivas a la visibilidad.
 */
const useMotionConfig = (initial, animate, transition, viewport = { once: true, amount: 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);
  return {
    ref,
    initial,
    animate: isInView ? animate : {},
    transition,
  };
};

// 🔹 Fade hacia arriba (adaptativo)
export const useFadeInUp = () =>
  useMotionConfig(
    { opacity: 0, y: 150 },
    { opacity: 1, y: 0 },
    { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  );

// 🔹 Fade hacia abajo
export const useFadeInDown = () =>
  useMotionConfig(
    { opacity: 0, y: -150 },
    { opacity: 1, y: 0 },
    { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
  );

// 🔹 Fade lateral izquierda con blur
export const useFadeInLeft = () =>
  useMotionConfig(
    { opacity: 0, x: -200, filter: "blur(6px)" },
    { opacity: 1, x: 0, filter: "blur(0px)" },
    { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
  );

// 🔹 Fade lateral derecha con blur
export const useFadeInRight = () =>
  useMotionConfig(
    { opacity: 0, x: 200, filter: "blur(6px)" },
    { opacity: 1, x: 0, filter: "blur(0px)" },
    { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
  );

// 🔹 Zoom + leve rotación 3D
export const useFadeInZoom = () =>
  useMotionConfig(
    { opacity: 0, scale: 0.9, rotateX: 8 },
    { opacity: 1, scale: 1, rotateX: 0 },
    { duration: 1, ease: [0.25, 0.1, 0.25, 1] }
  );

// 🔹 Slide & Rotate (derecha / izquierda)
export const useSlideRotateRight = () =>
  useMotionConfig(
    { opacity: 0, x: 300, rotate: 8 },
    { opacity: 1, x: 0, rotate: 0 },
    { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
  );

export const useSlideRotateLeft = () =>
  useMotionConfig(
    { opacity: 0, x: -300, rotate: -8 },
    { opacity: 1, x: 0, rotate: 0 },
    { duration: 1.1, ease: [0.16, 1, 0.3, 1] }
  );

// 🔹 Blur Reveal
export const useBlurReveal = () =>
  useMotionConfig(
    { opacity: 0, filter: "blur(14px)" },
    { opacity: 1, filter: "blur(0px)" },
    { duration: 0.8, ease: "easeOut" }
  );

// 🔹 Hover 3D realista
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
  whileTap: { scale: 0.98 },
};

// 🔹 Stagger container
export const staggerContainer = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.1 },
  },
};

// 🔹 Item individual
export const fadeItem = {
  hidden: { opacity: 0, y: 25 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// 🔹 Clip Reveal
export const useClipReveal = () =>
  useMotionConfig(
    { clipPath: "inset(0 100% 0 0)" },
    { clipPath: "inset(0 0% 0 0)" },
    { duration: 1, ease: [0.33, 1, 0.68, 1] }
  );

// 🔹 Soft fade
export const useSoftFade = () =>
  useMotionConfig(
    { opacity: 0 },
    { opacity: 1 },
    { duration: 1.2, ease: "easeInOut" }
  );

// 🔹 Hover parallax
export const hoverParallax = {
  whileHover: { scale: 1.05, y: -10 },
  transition: { duration: 0.6, ease: "easeOut" },
};

// 🔹 Fade out
export const fadeOut = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  transition: { duration: 0.5 },
};
