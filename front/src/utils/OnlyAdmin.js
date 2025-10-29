import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded.role; // 👈 aquí tienes el rol (admin/editor)
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};