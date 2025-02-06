import axios from "axios";
import axiosClient from "./axiosClient";

const getClients = async () => {
  try {
    const response = await axiosClient.get("/todos");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const createClient = async (data) => {
  try {
    const response = await axios.post("/url", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete("/url", clientId);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const editClient = async (clientId, data) => {
  try {
    const response = await axios.get("/url", { clientId, data });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { getClients, createClient, deleteClient, editClient };
