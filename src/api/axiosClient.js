import axios from "axios";
import { getAccessToken } from "./getAccessToken";

const axiosClient = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

export default axiosClient;
