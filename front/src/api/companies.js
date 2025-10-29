import { api } from "./auth";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getAllCompanies = async () => {
  const res = await api.get("/companies", getAuthHeader());
  return res.data;
};

export const getCompanyById = async (id) => {
  const res = await api.get(`/companies/${id}`, getAuthHeader());
  return res.data;
};

export const createCompany = async (data) => {
  const res = await api.post("/companies", data, getAuthHeader());
  return res.data;
};

export const updateCompany = async (id, data) => {
  const res = await api.put(`/companies/${id}`, data, getAuthHeader());
  return res.data;
};

export const deleteCompany = async (id) => {
  const res = await api.delete(`/companies/${id}`, getAuthHeader());
  return res.data;
};
