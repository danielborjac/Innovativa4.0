import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Service from "../pages/Service";
import AcademicAlliance from "../pages/AcademicAlliance";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

// Dashboard
import LoginPage from "../pages/LoginPage";
import AdminLayout from "../components/admin/AdminLayout";
import DashboardHome from "../pages/admin/DashboardHome";
import ProjectsPage from "../pages/admin/ProjectsPage";
import AlliancesPage from "../pages/admin/AlliancesPage";
import UsersPage from "../pages/admin/UsersPage";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/nosotros" element={<About />} />
      <Route path="/servicios/:serviceId" element={<Service />} />
      <Route path="/alianzas/:AllianceId" element={<AcademicAlliance />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/contacto" element={<Contact />} />

      {/* Login */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="alliances" element={<AlliancesPage />} />
        <Route path="users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;