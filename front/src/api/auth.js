import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ✅ Instancia base de axios con configuración global
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // incluye cookies (refreshToken)
});

// 🔄 Función auxiliar para guardar el nuevo token
const saveToken = (token) => {
  if (token) localStorage.setItem("token", token);
};

// ✅ Interceptor: si el token expira, intenta refrescarlo automáticamente
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post(`${API_URL}/users/refresh`, {}, { withCredentials: true });

        const newAccessToken = data?.data?.accessToken;
        if (newAccessToken) {
          saveToken(newAccessToken);
          // Reintentar la solicitud original con el nuevo token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error("Error al refrescar el token:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Login
export const loginRequest = async (email, password) => {
  try {
    const { data } = await api.post("/users/login", { email, password });

    const { user, accessToken } = data.data;
    saveToken(accessToken);

    return { success: true, token: accessToken, user };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message || "Error al iniciar sesión. Verifica tus credenciales.",
    };
  }
};

// ✅ Logout
export const logoutRequest = async () => {
  try {
    await api.post("/users/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

// ✅ Refresh manual (por si quieres llamarlo desde el AuthProvider)
export const refreshTokenRequest = async () => {
  try {
    const { data } = await api.post("/users/refresh");
    const newAccessToken = data?.data?.accessToken;
    if (newAccessToken) saveToken(newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Error al refrescar token:", error);
    return null;
  }
};
