import axios from "axios";
import axiosClient from "./axiosClient";

const getCompanies = async () => {
  try {
    const response = await axiosClient.get("/posts");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const createCompany = async (data) => {
  try {
    const response = await axios.post("/url", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const deleteCompany = async (clientId) => {
  try {
    const response = await axios.delete("/url", clientId);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const editCompany = async (clientId, data) => {
  try {
    const response = await axios.get("/url", { clientId, data });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { getCompanies, createCompany, deleteCompany, editCompany };
