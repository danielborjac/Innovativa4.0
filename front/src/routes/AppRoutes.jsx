import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import AcademicAlliance from "../pages/AcademicAlliance";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/servicios/:serviceId" element={<Service />} />
      <Route path="/alianzas/:AllianceId" element={<AcademicAlliance />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/Contacto" element={<Contact />} />
    </Routes>
  );
};

export default AppRoutes;