import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: "https://reqres.in",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "reqres-free-v1",
  },
});

// Create instance for internal API
// export const internalApi = axios.create({
//   baseURL: "https://reqres.in",
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//     "x-api-key": "reqres-free-v1",
//   },
//   withCredentials: true, // Important for cookies
// });

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.error("Unauthorized access");
    }
    return Promise.reject(error);
  }
);
