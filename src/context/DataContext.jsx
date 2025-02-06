import React, { createContext, useState, useContext, useEffect } from "react";
import { getClients } from "../api/clientsApi";
import { getProjects } from "../api/projectsApi";
import { getCompanies } from "../api/companiesApi";
import { getUsers } from "../api/usersApi";

const DataContext = createContext();

export function useData() {
  return useContext(DataContext);
}

export const DataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsData, projectsData, companiesData, usersData] =
          await Promise.all([
            getClients(),
            getProjects(),
            getCompanies(),
            getUsers(),
          ]);
        setClients(clientsData);
        setProjects(projectsData);
        setCompanies(companiesData);
        setUsers(usersData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const value = {
    clients,
    projects,
    companies,
    users,
    loading,
    setClients,
    setProjects,
    setCompanies,
    setUsers,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
