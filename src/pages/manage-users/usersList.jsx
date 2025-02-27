import { Plus, ChevronRight, ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import Users from "../../data/users";
import { Link, useNavigate } from "react-router-dom";

export default function UsersList() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredUsers = Users.filter((user) => {
    return (
      user.role === "admin" &&
      (user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm))
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredUsers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(Array.from({ length: currentItems.length }, (_, i) => i));
    } else {
      setSelectedRows([]);
    }
    setSelectAll(e.target.checked);
  };

  const handleRowSelect = (e, index) => {
    const newSelectedRows = e.target.checked
      ? [...selectedRows, index]
      : selectedRows.filter((id) => id !== index);
    setSelectedRows(newSelectedRows);
    setSelectAll(newSelectedRows.length === currentItems.length);
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
          <Link to="/manage-users/create" className="btn-secondary">
            {" "}
            {/* Changement du lien vers la création d'un utilisateur */}
            <Plus className="size-5" />
            Ajouter un utilisateur
          </Link>
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
                {user.lastName}
              </td>{" "}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.firstName}
              </td>{" "}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.email}
              </td>{" "}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.numero_de_tel}
              </td>{" "}
              <td className="px-4 py-4 border-b border-gray-200">
                {user.permission}
              </td>{" "}
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
