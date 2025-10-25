import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { refreshTokenRequest, logoutRequest } from "../api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("token");

      if (storedUser && storedToken) {
        try {
          // intenta refrescar token silenciosamente
          const newToken = await refreshTokenRequest();
          if (newToken) {
            localStorage.setItem("token", newToken);
            setUser(JSON.parse(storedUser));
          } else {
            await logoutRequest();
            setUser(null);
          }
        } catch (error) {
          console.error("Error restaurando sesión:", error);
          setUser(null);
        }
      }
      setLoading(false);
    };

    restoreSession();
  }, []);

  const login = (userData, token) => {
    if (!token || !userData) return;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await logoutRequest();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
