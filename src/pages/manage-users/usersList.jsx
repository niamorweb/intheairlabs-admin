import { Plus, ChevronRight, ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import Users from "../../data/users"; // Changement de "Projects" à "Users"
import { useNavigate } from "react-router-dom";

export default function UsersList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la barre de recherche
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const itemsPerPage = 20; // Nombre d'éléments par page

  const navigate = useNavigate();

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Réinitialiser la page à 1 lors de la recherche
  };

  // Fonction pour filtrer les données en fonction du terme de recherche
  const filteredUsers = Users.filter((user) => {
    // Changement de "Projects" à "Users"
    return (
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de nom_du_projet à nom
      user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de prénom
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement d'email
      user.numero_de_tel.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de numéro_de_tel
      user.permission.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de permission
      user.date_creation.toLowerCase().includes(searchTerm.toLowerCase()) || // Changement de date_creation
      user.id.toString().includes(searchTerm) // Conversion de id en string pour comparaison
    );
  });

  // Calculer les éléments à afficher pour la page actuelle
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(
    // Changement de "filteredProjects" à "filteredUsers"
    indexOfFirstItem,
    indexOfLastItem
  );

  // Fonction pour passer à la page suivante
  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredUsers.length) {
      // Changement de filteredProjects à filteredUsers
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
    const newSelectedRows = e.target.checked
      ? [...selectedRows, index]
      : selectedRows.filter((id) => id !== index);
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === currentItems.length); // Mettre à jour l'état selectAll si toutes les lignes filtrées sont sélectionnées
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-medium">Gérer les utilisateurs</h1>
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
          <a href="/manage-users/create" className="btn-secondary">
            {" "}
            {/* Changement du lien vers la création d'un utilisateur */}
            <Plus className="size-5" />
            Ajouter un utilisateur
          </a>
        </div>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-custom-light-grey">
          <tr>
            <th
              className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="size-4"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </div>
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Nom
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Prénom
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Email
            </th>{" "}
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Numéro de tél.
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Rôle
            </th>{" "}
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Date de création
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, i) => (
            <tr
              onClick={
                () => navigate(`/manage-users/create`, { state: { user } }) // Changement de "projects" à "users"
              }
              key={i}
              className="hover:bg-gray-50 cursor-pointer"
            >
              <td
                onClick={(e) => e.stopPropagation()}
                className="px-4 py-4 border-b border-gray-200 cursor-default"
              >
                <div className="flex items-center justify-center">
                  <input
                    className="size-4 cursor-pointer"
                    type="checkbox"
                    checked={selectedRows.includes(i)}
                    onChange={(e) => handleRowSelect(e, i)}
                  />
                </div>
              </td>
              <td className="px-4 py-4 border-b border-gray-200">{user.id}</td>
              <td className="px-4 py-4 border-b border-gray-200">
                {user.nom}
              </td>{" "}
              {/* Changement de "nom_du_projet" à "nom" */}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.prenom}
              </td>{" "}
              {/* Changement de "prenom" */}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.email}
              </td>{" "}
              {/* Changement d'email */}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.numero_de_tel}
              </td>{" "}
              {/* Changement de numéro_de_tel */}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.permission}
              </td>{" "}
              {/* Changement de permission */}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.date_creation}
              </td>{" "}
              {/* Changement de date_creation */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end gap-3">
        <button
          className={`py-2 px-3 flex items-center gap-2 rounded-full ${
            currentPage === 1
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed" // Désactivé
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer" // Actif
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="size-5" />
          Précedent
        </button>
        <button
          className={`py-3 px-4 flex items-center gap-2 rounded-full ${
            currentPage * itemsPerPage >= filteredUsers.length
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed" // Désactivé
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer" // Actif
          }`}
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredUsers.length}
        >
          Suivant
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
