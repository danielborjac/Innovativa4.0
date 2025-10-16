import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import AcademicAlliance from "../pages/AcademicAlliance";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/servicios/:serviceId" element={<Service />} />
      <Route path="/alianzas/:AllianceId" element={<AcademicAlliance />} />
    </Routes>
  );
};

export default AppRoutes;