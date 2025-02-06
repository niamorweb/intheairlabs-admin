import axios from "axios";
import axiosClient from "./axiosClient";

const getUsers = async () => {
  try {
    const response = await axiosClient.get("/users");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const createUser = async (data) => {
  try {
    const response = await axios.post("/url", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const deleteUser = async (clientId) => {
  try {
    const response = await axios.delete("/url", clientId);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const editUser = async (clientId, data) => {
  try {
    const response = await axios.get("/url", { clientId, data });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { getUsers, createUser, deleteUser, editUser };
