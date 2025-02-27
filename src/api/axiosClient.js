import axios from "axios";
import { getAccessToken } from "./getAccessToken";

// Avoid fetch urls repetitions, so we set the baseURL that don't change and the Bearer token
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default axiosClient;
