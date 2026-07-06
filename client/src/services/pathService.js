import API from "../api/axios";

export const getPaths = () => API.get("/paths");

export const createPath = (data) =>
  API.post("/paths", data);

export const updatePath = (id, data) =>
  API.put(`/paths/${id}`, data);

export const deletePath = (id) =>
  API.delete(`/paths/${id}`);