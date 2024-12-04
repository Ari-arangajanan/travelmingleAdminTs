import axios, { AxiosInstance } from "axios";

const axioInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // Load the base URL from environment variables
  withCredentials: true, // Automatically send cookies with requests
});

// Add a request interceptor (Optional: Only if you want to log or debug requests)
axioInstance.interceptors.request.use(
  (config) => {
    // Debugging: Log the request being sent
    console.log("Sending request:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
axioInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      console.warn("Unauthorized! Redirecting to login.");
      window.location.href = "/login"; // Redirect to login
    }
    return Promise.reject(error);
  }
);
export default axioInstance;
