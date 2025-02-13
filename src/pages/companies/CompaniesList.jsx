import { Plus, ChevronRight, ChevronLeft, Search } from "lucide-react";
import { useState } from "react";
import Companies from "../../data/companies";
import Sectors from "../../data/sectors";
import { Link, useNavigate } from "react-router-dom";

export function CompaniesList() {
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

  const formattedCompany = Companies.map((company) => {
    const sector = company
      ? Sectors.find((x) => x.id === company.sector)
      : null;

    return {
      ...company,
      sector: sector ? sector.label : null,
    };
  });

  const filteredCompanies = formattedCompany.filter((company) => {
    return (
      company.tradeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.sector &&
        company.sector.toLowerCase().includes(searchTerm.toLowerCase())) ||
      company.siret.toString().includes(searchTerm) ||
      company.hubspotId.toString().includes(searchTerm)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCompanies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < filteredCompanies.length) {
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
        <h1 className="text-4xl font-medium">Listes des entreprises</h1>
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
          <Link to="/companies/create" className="btn-secondary">
            <Plus className="size-5" />
            Ajouter une entreprise
          </Link>
        </div>
      </div>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead className="bg-custom-light-grey">
          <tr>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
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
              Logo
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Nom de l'entreprise
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Secteur
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Numéro de tél.
            </th>

            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              SIRET
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Hubspot ID
            </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((x, i) => (
            <tr
              onClick={() =>
                navigate(`/companies/${x.id}/edit`, { state: { company: x } })
              }
              key={i}
              className="hover:bg-gray-50 cursor-pointer"
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
                    onChange={(e) => handleRowSelect(e, i)}
                  />
                </div>
              </td>
              <td className="px-4 py-4 border-b border-gray-200">{x.id}</td>
              <td className="px-4 py-4 border-b border-gray-200">
                <img className="w-6" src={x.logo} alt="" />
              </td>
              <td className="px-4 py-4 border-b border-gray-200">
                {x.tradeName}
              </td>
              <td className="px-4 py-4 border-b border-gray-200">{x.sector}</td>
              <td className="px-4 py-4 border-b border-gray-200">
                {x.phoneNumber}
              </td>{" "}
              <td className="px-4 py-4 border-b border-gray-200">{x.siret}</td>
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
            currentPage * itemsPerPage >= filteredCompanies.length
              ? "bg-custom-primary-very-low-opacity text-custom-grey cursor-not-allowed" // Désactivé
              : "bg-custom-primary text-white hover:brightness-[0.85] duration-150 cursor-pointer" // Actif
          }`}
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= filteredCompanies.length}
        >
          Suivant
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
