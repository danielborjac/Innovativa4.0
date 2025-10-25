export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error("Faltan variables de entorno para Cloudinary.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error?.message || "Error al subir imagen");
    return data.secure_url; // URL pública de la imagen
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    throw error;
  }
};
