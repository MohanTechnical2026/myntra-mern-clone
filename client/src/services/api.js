// This file creates one shared axios instance for the whole app,
// so every page/component calls the same configured API client
// instead of repeating base URLs and headers everywhere.

import axios from "axios";

const api = axios.create({
    baseURL: "/api", // Vite proxy forwards this to http://localhost:5000/api
});

// Before every request, automatically attach the login token (if we have one)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
