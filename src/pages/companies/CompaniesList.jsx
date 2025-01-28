import {
  Building,
  LogOut,
  NotebookText,
  Plus,
  User,
  Users,
  UserCog,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

export function CompaniesList() {
  // Gérer l'état de la sélection des lignes
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Sélectionner toutes les lignes
      setSelectedRows([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]);
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
    setSelectAll(newSelectedRows.length === 14); // Mettre à jour l'état selectAll si toutes les lignes sont sélectionnées
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-4xl font-medium">Listes des entreprises</h1>
        <div className="flex items-center gap-3">
          <button className="py-2 px-3 flex items-center gap-2 rounded-full bg-custom-primary-very-low-opacity">
            <Filter className="size-5" />
            Filtrer par
          </button>
          <button className="p-2 flex items-center gap-3 rounded-full bg-custom-primary text-white">
            <Plus className="size-5" />
            Ajouter une entreprise
          </button>
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
              Nom du projet
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Type de projet
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Client
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Entreprise
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Dernière modification
            </th>
            <th className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
              Hubspot ID
            </th>
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((x, i) => (
            <tr key={i} className="hover:bg-gray-50 cursor-pointer">
              <td className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-center">
                  <input
                    className="size-4"
                    type="checkbox"
                    checked={selectedRows.includes(i)}
                    onChange={(e) => handleRowSelect(e, i)}
                  />
                </div>
              </td>
              <td className="px-4 py-3 border-b border-gray-200">3</td>
              <td className="px-4 py-3 border-b border-gray-200">
                Lorem Ipsum
              </td>
              <td className="px-4 py-3 border-b border-gray-200">Lorem</td>
              <td className="px-4 py-3 border-b border-gray-200">Lorem C</td>
              <td className="px-4 py-3 border-b border-gray-200">
                Entreprise
              </td>
              <td className="px-4 py-3 border-b border-gray-200">
                25 Janvier 2025
              </td>
              <td className="px-4 py-3 border-b border-gray-200">11223</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full flex justify-end gap-3">
        <button className="p-3 flex items-center gap-2 rounded-full bg-custom-primary-very-low-opacity text-custom-grey">
          <ChevronLeft />
          Précedent
        </button>
        <button className="p-3 flex items-center gap-2 rounded-full bg-custom-primary text-white">
          Suivant
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

// export function CompaniesList() {
//   return (
//     <div className="flex items-start h-full">
//       <div className="bg-custom-primary p-16 flex flex-col justify-between text-white h-screen">
//         <div className="flex flex-col gap-20">
//           <h1 className="text-5xl font-bold">IntheairLabs</h1>
//           <div className="flex flex-col gap-10">
//             <div className="flex flex-col gap-3">
//               <span className="uppercase">Clients</span>
//               <div className="flex flex-col gap-3">
//                 <a className="flex items-center gap-2" href="">
//                   <Users /> Liste des clients
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <Plus />
//                   Ajouter un client
//                 </a>
//               </div>
//             </div>{" "}
//             <div className="flex flex-col gap-3">
//               <span className="uppercase">Projets</span>
//               <div className="flex flex-col gap-3">
//                 <a className="flex items-center gap-2" href="">
//                   <NotebookText />
//                   Liste des projets
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <Plus />
//                   Ajouter un client
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <Plus />
//                   Ajouter un nouveau type
//                 </a>
//               </div>
//             </div>{" "}
//             <div className="flex flex-col gap-3">
//               <span className="uppercase">Entreprises</span>
//               <div className="flex flex-col gap-3">
//                 <a className="flex items-center gap-2" href="">
//                   <Building />
//                   Liste des entreprises
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <Plus />
//                   Ajouter une entreprise
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <Plus />
//                   Ajouter un secteur
//                 </a>
//               </div>
//             </div>{" "}
//             <div className="flex flex-col gap-3">
//               <span className="uppercase">Paramètres</span>
//               <div className="flex flex-col gap-3">
//                 <a className="flex items-center gap-2" href="">
//                   <User />
//                   Mon compte
//                 </a>
//                 <a className="flex items-center gap-2" href="">
//                   <UserCog />
//                   Gérer les utilisateurs
//                 </a>
//               </div>
//             </div>
//           </div>
//         </div>
//         <button className="bg-custom-very-light-grey duration-150 rounded-full p-3 text-custom-secondary flex items-center gap-3 justify-center ">
//           <LogOut />
//           Me déconnecter
//         </button>
//       </div>
//       <div className="p-12 w-full flex flex-col gap-10">
//         <div className="flex items-center justify-between w-full">
//           <h1 className="text-4xl font-medium">Listes des projets</h1>
//           <div className="flex items-center gap-3">
//             <button className="p-3 flex items-center gap-3 rounded-full bg-custom-primary-very-low-opacity">
//               <Filter />
//               Filtrer par
//             </button>
//             <button className="p-3 flex items-center gap-3 rounded-full bg-custom-primary text-white">
//               <Plus />
//               Ajouter un projet
//             </button>
//           </div>
//         </div>
//         <table class="min-w-full table-auto border-collapse border border-gray-200">
//           <thead className="bg-custom-light-grey">
//             <tr>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 ID
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Nom du projet
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Type de projet
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Client
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Entreprise
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Dernière modification
//               </th>
//               <th class="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700">
//                 Hubspot ID
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((x, i) => (
//               <tr key={i} class=" hover:bg-gray-50">
//                 <td class="px-4 py-3 border-b border-gray-200">3</td>
//                 <td class="px-4 py-3 border-b border-gray-200">
//                   Refonte Site Web
//                 </td>
//                 <td class="px-4 py-3 border-b border-gray-200">Web</td>
//                 <td class="px-4 py-3 border-b border-gray-200">Client C</td>
//                 <td class="px-4 py-3 border-b border-gray-200">Entreprise Z</td>
//                 <td class="px-4 py-3 border-b border-gray-200">
//                   25 Janvier 2025
//                 </td>
//                 <td class="px-4 py-3 border-b border-gray-200">11223</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="w-full flex justify-end gap-3">
//           <button className="p-3 flex items-center gap-2 rounded-full bg-custom-primary-very-low-opacity text-custom-grey">
//             <ChevronLeft />
//             Précedent
//           </button>
//           <button className="p-3 flex items-center gap-2 rounded-full bg-custom-primary text-white">
//             Suivant
//             <ChevronRight />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
