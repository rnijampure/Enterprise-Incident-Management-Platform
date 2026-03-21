import axios from "axios";
import { store } from "../../../app/store/store";
import { setSessionExpiring } from "../slice/authSlice";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://localhost:5000/api";
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Crucial for reading the Refresh Token Cookie
});

// Request Interceptor: Attach the Token from Redux
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Catch 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Trigger the "Stay Logged In" popup in the UI
      store.dispatch(setSessionExpiring(true));
    }
    return Promise.reject(error);
  },
);

export default api;
