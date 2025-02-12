import { Plus, Filter, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Clients from "../../data/clients";
import Companies from "../../data/companies";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getClients } from "../../api/clientsApi";
import toast from "react-hot-toast";
import { useData } from "../../context/DataContext";

export function ClientsList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la barre de recherche
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const itemsPerPage = 20; // Nombre d'éléments par page

  const { clients, users, projects, companies } = useData();

  const navigate = useNavigate();

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Réinitialiser la page à 1 lors de la recherche
  };

  const formattedClients = Clients.map((client) => {
    const company = Companies.find((x) => x.id === client.id);

    return {
      ...client,
      company: company ? company.tradeName : null,
    };
  });

  // Fonction pour filtrer les données en fonction du terme de recherche
  const filteredClients = formattedClients.filter((client) => {
    return (
      client.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.hubspotId.toString().includes(searchTerm)
    );
  });

  // Calculer les éléments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredClients.slice(indexOfFirstItem, indexOfLastItem);

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredClients.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Fonction pour revenir à la page précédente
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Sélectionner toutes les lignes de la page actuelle
      setSelectedRows(Array.from({ length: currentItems.length }, (_, i) => i)); // Met à jour la sélection avec toutes les lignes filtrées
    } else {
      // Désélectionner toutes les lignes
      setSelectedRows([]);
    }
    setSelectAll(e.target.checked);
  };

  const handleRowSelect = (e, index) => {
    getClients();
    const newSelectedRows = e.target.checked
      ? [...selectedRows, index]
      : selectedRows.filter((id) => id !== index);
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === currentItems.length); // Mettre à jour l'état selectAll si toutes les lignes filtrées sont sélectionnées
  };

  const notify = () => toast.success("Here is your toast.");

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-medium">Listes des clients</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="search"
              placeholder="Rechercher.."
              className="py-3 pl-10 pr-3 flex items-center gap-2 rounded-full bg-custom-primary-very-low-opacity focus:outline-custom-grey"
              value={searchTerm}
              onChange={handleSearch} // Mise à jour de l'état de recherche
            />
            <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-custom-grey size-5" />
          </div>
          <Link to="/clients/create" className="btn-secondary">
            <Plus className="size-5" />
            Ajouter un client
          </Link>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-custom-light-grey">
            <tr>
              <th>
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="size-4"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </div>
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                ID
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Nom
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Prénom
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Numéro de tél
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Entreprise
              </th>
              <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
                Hubspot ID
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((x, i) => (
              <tr
                onClick={() =>
                  navigate(`/clients/${x.id}/edit`, { state: { client: x } })
                }
                key={i}
                class=" hover:bg-gray-50 cursor-pointer duration-150"
              >
                <td
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-4 border-b border-gray-200"
                >
                  <div className="flex items-center justify-center">
                    <input
                      className="size-4"
                      type="checkbox"
                      checked={selectedRows.includes(i)}
                      onChange={(e) => {
                        handleRowSelect(e, i);
                      }}
                    />
                  </div>
                </td>
                <td class="px-4 py-4 border-b border-gray-200">{x.id}</td>
                <td class="px-4 py-4 border-b border-gray-200">{x.lastName}</td>
                <td class="px-4 py-4 border-b border-gray-200">
                  {x.firstName}
                </td>
                <td class="px-4 py-4 border-b border-gray-200">
                  {x.phoneNumber}
                </td>
                <td class="px-4 py-4 border-b border-gray-200">{x.company}</td>
                <td class="px-4 py-4 border-b border-gray-200">
                  {x.hubspotId}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end gap-3">
        <button
          className={`py-3 px-4 flex items-center gap-2 rounded-full ${
            currentPage === 1
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed"
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer"
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-5" />
          Précedent
        </button>
        <button
          className={`py-2 px-3 flex items-center gap-2 rounded-full ${
            currentPage * itemsPerPage >= filteredClients.length
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed" // Désactivé
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer" // Actif
          }`}
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredClients.length}
        >
          Suivant
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
