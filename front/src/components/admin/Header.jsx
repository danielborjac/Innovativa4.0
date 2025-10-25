import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="admin-header">
      <h1>Panel de administración</h1>
      <div className="user-info">
        <span>{user?.name || "Administrador"}</span>
      </div>
    </header>
  );
};

export default Header;
