import { api } from "./auth";

export const getProjects = async () => {
  const token = localStorage.getItem("token");
  const { data } = await api.get("/projects", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const getProjectById = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await api.get(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data.data;
};

export const createProject = async (project) => {
  const token = localStorage.getItem("token");
  const { data } = await api.post("/projects", project, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const updateProject = async (id, project) => {
  const token = localStorage.getItem("token");
  const { data } = await api.put(`/projects/${id}`, project, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem("token");
  const { data } = await api.delete(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
