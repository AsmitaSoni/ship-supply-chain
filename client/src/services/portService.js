import API from "../api/axios";

export const getPorts = () => API.get("/ports");

export const createPort = (data) =>
  API.post("/ports", data);

export const updatePort = (id, data) =>
  API.put(`/ports/${id}`, data);

export const deletePort = (id) =>
  API.delete(`/ports/${id}`);