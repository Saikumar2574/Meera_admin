import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Axios instance for general API requests
const apiAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Function to get the token from sessionStorage
const getTokenFromSessionStorage = () => {
  const token = sessionStorage.getItem("token");
  return token;
};

// Request interceptor for apiAxiosInstance
apiAxiosInstance.interceptors.request.use(
  (config) => {
    const token = getTokenFromSessionStorage(); // Get the token from sessionStorage
    if (config.url.includes("/signin") || config.url.includes("/signup")) {
      return config; // Do not attach token for sign-in and sign-up requests
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      window.location.href = "/auth/signin";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for apiAxiosInstance
apiAxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && response.status === 401) {
      // Token is either expired or invalid
      alert("Session expired or invalid token. Redirecting to sign in...");

      // Clear the token from sessionStorage
      sessionStorage.removeItem("token");

      // Redirect to the sign-in page using window.location.href
      window.location.href = "/auth/signin"; // Redirect to sign-in

      return; // Prevent further processing
    }

    return Promise.reject(error); // Handle other errors
  }
);

export { apiAxiosInstance };
