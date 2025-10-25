import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./MainLayout.css";

const hideNavbarRoutes = ['/admin', '/login'];
const shouldShowNavbar = !hideNavbarRoutes.some(route =>
  location.pathname.startsWith(route)
);

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      {shouldShowNavbar && <Navbar />}
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;