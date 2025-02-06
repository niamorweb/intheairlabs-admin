import axios from "axios";

const getSectors = async () => {
  try {
    const response = await axios.get("/url");
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const createSector = async (data) => {
  try {
    const response = await axios.post("/url", data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const deleteSector = async (clientId) => {
  try {
    const response = await axios.delete("/url", clientId);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

const editSector = async (clientId, data) => {
  try {
    const response = await axios.get("/url", { clientId, data });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des projets");
  }
};

export { getSectors, createSector, deleteSector, editSector };
