import axios from "axios";
import axiosClient from "./axiosClient";

const authLogin = async (data) => {
  try {
    const response = await axiosClient.post("/login/", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { authLogin };
