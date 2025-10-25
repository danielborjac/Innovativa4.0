import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./AdminLayout.css"; // (opcional para estilos)

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Header />
        <main className="admin-main">
          <Outlet /> {/* Aquí se renderizan las páginas hijas */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;