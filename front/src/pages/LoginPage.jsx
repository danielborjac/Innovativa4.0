import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginRequest } from "../api/auth";
import "./LoginPage.css";
import Spinner from "../components/Spinner";
//import logo from "../assets/logo-innovativa.png"; // ajusta el nombre según tu carpeta

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { success, token, user, message } = await loginRequest(email, password);
    if (success) {
      setLoading(false);
      login(user, token);
      navigate("/admin");
    } else {
      setLoading(false);
      setError(message);
    }
  };

  return (
    <>
      {loading && <Spinner />}
    
      <div className="login-wrapper">
        <div className="login-card">
          {/*<img src={logo} alt="Innovativa 4.0" className="login-logo" />*/}
          <h2>Panel Administrativo</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Ingresar</button>
            {error && <p className="error-msg">{error}</p>}
          </form>
        </div>
      </div>
    </> 
  );
};

export default LoginPage;
