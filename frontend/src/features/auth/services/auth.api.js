import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
    withCredentials: true,
});

export async function registerUser(userData){
    const response = await api.post("/auth/register", userData);
    return response.data;
}


export async function loginUser(userData){
    const response = await api.post("/auth/login", userData);
    return response.data;
}

export async function logoutUser(){
    const response = await api.post("/auth/logout");
    return response.data;
}

export async function getCurrentUser(){
    const response = await api.get("/auth/current-user");
    return response.data;
}