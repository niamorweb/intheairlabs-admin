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

const getAnUser = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/users/${id}/`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const createUser = async (data) => {
  try {
    const response = await axiosClient.post("users/", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const deleteUser = async (clientId) => {
  try {
    const response = await axiosClient.delete("/url", clientId);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const editUser = async (clientId, data) => {
  try {
    const response = await axiosClient.get("/url", { clientId, data });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { getUsers, createUser, deleteUser, editUser, getAnUser };
