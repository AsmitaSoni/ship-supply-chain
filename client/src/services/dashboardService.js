import API from "../api/axios";

export const getDashboardStats = () =>
    API.get("/dashboard/stats");