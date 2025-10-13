// src/components/Carousel.jsx
import { useState, useEffect } from "react";
import "./Carousel.css";

const Carousel = ({ images, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);
/* eslint-disable no-unused-vars */
  const [direction, setDirection] = useState(1); // 1 = derecha, -1 = izquierda

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-inner" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={`slide-${i}`} className="carousel-img" />
        ))}
      </div>
      <div className="carousel-indicators">
        {images.map((_, i) => (
          <div
            key={i}
            className={`indicator ${i === current ? "active" : ""}`}
          />
        ))}
      </div>
      <button className="carousel-btn prev" onClick={handlePrev}>&lt;</button>
      <button className="carousel-btn next" onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default Carousel;
