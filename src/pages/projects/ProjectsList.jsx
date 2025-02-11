import { useState } from "react";
import Projects from "../../data/projects";
import Clients from "../../data/clients";
import Companies from "../../data/companies";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function ProjectsList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: "dernière_modification",
    direction: "desc",
  });

  const itemsPerPage = 20;
  const navigate = useNavigate();

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const formattedProjects = Projects.map((project) => {
    const client = Clients.find((x) => x.id === project.id);
    const company = client ? Companies.find((x) => x.id === client.id) : null;

    return {
      ...project,
      client: client ? client.lastName + " " + client.firstName : null,
      company: company && company.tradeName,
    };
  });

  // Fonction pour filtrer les données
  const filteredProjects = formattedProjects.filter((project) => {
    return (
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.hubspotId.toString().includes(searchTerm) ||
      project.id.toString().includes(searchTerm)
    );
  });

  // // Fonction pour gérer le tri
  // const handleSort = (key) => {
  //   console.log("key key : : ", key);

  //   let direction = "asc";
  //   if (sortConfig.key === key && sortConfig.direction === "asc") {
  //     direction = "desc";
  //   }
  //   setSortConfig({ key, direction });
  // };

  // // Fonction pour trier les projets avec gestion des différents types (string, number, date)
  // const sortItems = (items, key, direction) => {
  //   return items.sort((a, b) => {
  //     const aValue = a[key];
  //     const bValue = b[key];

  //     let comparison = 0;

  //     // Si la valeur est une date (on suppose que la date est sous forme de string)
  //     if (Date.parse(aValue) && Date.parse(bValue)) {
  //       comparison = new Date(aValue) - new Date(bValue);
  //     } else {
  //       // Si ce sont des nombres
  //       if (typeof aValue === "number" && typeof bValue === "number") {
  //         comparison = aValue - bValue;
  //       } else {
  //         // Sinon, on compare les chaînes de caractères
  //         comparison = aValue.toString().localeCompare(bValue.toString());
  //       }
  //     }

  //     return direction === "asc" ? comparison : -comparison;
  //   });
  // };

  // // Tri des projets
  // const sortedProjects = sortItems(
  //   filteredProjects,
  //   sortConfig.key,
  //   sortConfig.direction
  // );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fonctions pour la pagination
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredProjects.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-medium">Listes des projets</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-custom-grey size-5" />
            <input
              type="search"
              placeholder="Rechercher.."
              className="py-3 pl-10 pr-3 flex items-center gap-2 rounded-full bg-custom-primary-very-low-opacity focus:outline-custom-grey"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <Link to="/projects/create" className="btn-secondary">
            Ajouter un projet
          </Link>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-custom-light-grey">
          <tr>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th
              className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 cursor-pointer"
              // onClick={() => handleSort("nom_du_projet")}
            >
              Nom du projet
              {/* {sortConfig.key === "nom_du_projet" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="inline w-4" />
                ) : (
                  <ChevronDown className="inline w-4" />
                ))} */}
            </th>
            <th
              // onClick={() => handleSort("type_de_projet")}
              className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Type de projet
              {/* {sortConfig.key === "type_de_projet" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="inline w-4" />
                ) : (
                  <ChevronDown className="inline w-4" />
                ))} */}
            </th>
            <th
              // onClick={() => handleSort("client")}
              className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Client
              {/* {sortConfig.key === "client" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="inline w-4" />
                ) : (
                  <ChevronDown className="inline w-4" />
                ))} */}
            </th>
            <th
              // onClick={() => handleSort("entreprise")}
              className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 cursor-pointer"
            >
              Entreprise
              {/* {sortConfig.key === "entreprise" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="inline w-4" />
                ) : (
                  <ChevronDown className="inline w-4" />
                ))} */}
            </th>
            {/* <th
              className="px-4 py-3 border-b flex items-center gap-1 border-gray-300 text-left text-sm font-semibold text-gray-700 cursor-pointer"
              onClick={() => handleSort("dernière_modification")}
            >
              Dernière modification
              {sortConfig.key === "dernière_modification" &&
                (sortConfig.direction === "asc" ? (
                  <ChevronUp className="inline w-4" />
                ) : (
                  <ChevronDown className="inline w-4" />
                ))}
            </th> */}
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Hubspot ID
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((x, i) => (
            <tr
              onClick={() =>
                navigate(`/projects/${x.id}/edit`, { state: { project: x } })
              }
              key={i}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td className="px-4 py-4 border-b border-gray-200">{x.id}</td>
              <td className="px-4 py-4 border-b border-gray-200">{x.name}</td>
              <td className="px-4 py-4 border-b border-gray-200">
                {x.projectType}
              </td>
              <td className="px-4 py-4 border-b border-gray-200">{x.client}</td>
              <td className="px-4 py-4 border-b border-gray-200">
                {x.company}
              </td>
              <td className="px-4 py-4 border-b border-gray-200">
                {x.hubspotId}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex justify-end gap-3">
        <button
          className={`py-2 px-3 flex items-center gap-2 rounded-full ${
            currentPage === 1
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed"
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Précedent
        </button>
        <button
          className={`py-3 px-4 flex items-center gap-2 rounded-full ${
            currentPage * itemsPerPage >= filteredProjects.length
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed"
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer"
          }`}
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredProjects.length}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
