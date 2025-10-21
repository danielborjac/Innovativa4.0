import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// instancia base segura de axios
const contactApi = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// pequeña sanitización contra inyección o XSS básico
const sanitize = (value) => {
  if (typeof value !== "string") return value;
  return value.replace(/[<>]/g, "");
};

// función principal para enviar contacto
export const sendContactMessage = async (data) => {
  try {
    // sanitizamos los valores antes de enviar
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitize(value)])
    );

    const response = await contactApi.post("/contact", sanitizedData);
    return response.data;
  } catch (error) {
    console.error("Error enviando formulario:", error);
    throw (
      error.response?.data?.message ||
      "No se pudo enviar el mensaje. Intenta nuevamente."
    );
  }
};
