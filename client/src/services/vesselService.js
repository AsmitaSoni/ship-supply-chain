import API from "../api/axios";

export const getVessels = () => API.get("/vessels");

export const createVessel = (data) =>
    API.post("/vessels", data);

export const updateVessel = (id, data) =>
    API.put(`/vessels/${id}`, data);

export const deleteVessel = (id) =>
    API.delete(`/vessels/${id}`);

