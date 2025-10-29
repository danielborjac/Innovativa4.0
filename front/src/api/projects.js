import { api } from "./auth";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getProjects = async () => {
  const { data } = await api.get("/projects", getAuthHeader());
  return data.data;
};

export const getProjectById = async (id) => {
  const { data } = await api.get(`/projects/${id}`, getAuthHeader());
  return data.data;
};

export const createProject = async (project) => {
  const { data } = await api.post("/projects", project, getAuthHeader());
  return data;
};

export const updateProject = async (id, project) => {
  const { data } = await api.put(`/projects/${id}`, project, getAuthHeader());
  return data;
};

export const deleteProject = async (id) => {
  const { data } = await api.delete(`/projects/${id}`, getAuthHeader());
  return data;
};
