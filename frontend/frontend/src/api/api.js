import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

// Automatically attach token (like Postman Authorization tab)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses — redirect to login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            // Only redirect if not already on login/signup pages
            if (
                !window.location.pathname.includes("/login") &&
                !window.location.pathname.includes("/signup")
            ) {
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    },
);

export default api;
