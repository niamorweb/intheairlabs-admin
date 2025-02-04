import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Users from "../../data/users";
import { ChevronRight } from "lucide-react";

export function UserCreate() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur à éditer
  const isEditMode = !!userId;

  const initialUserState = {
    id: "",
    nom: "",
    prenom: "",
    email: "",
    numero_de_tel: "",
    permission: "",
    date_creation: "",
  };

  const [userData, setUserData] = useState(
    isEditMode
      ? Users.find((user) => user.id === parseInt(userId)) || initialUserState
      : initialUserState
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Si en mode édition, mettre à jour l'utilisateur
      const updatedUsers = Users.map((user) =>
        user.id === parseInt(userId) ? { ...user, ...userData } : user
      );
      // Vous pouvez sauvegarder les données mises à jour dans un backend ou dans un état global
      console.log("Utilisateur mis à jour:", updatedUsers);
    } else {
      // Si en mode ajout, créer un nouvel utilisateur
      const newUser = { ...userData, id: Users.length + 1 }; // Assurez-vous d'attribuer un ID unique
      Users.push(newUser);
      console.log("Nouvel utilisateur ajouté:", newUser);
    }
    navigate("/users"); // Redirection vers la liste des utilisateurs après soumission
  };

  return (
    <div className="flex flex-col items-start w-full gap-12 max-w-[700px]">
      <div className="flex items-center gap-2">
        <a href="/manage-users" className="text-custom-dark-grey">
          Gérer les utilisateurs
        </a>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Ajouter un utilisateur</span>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un utilisateur</h2>
          <p className=" text-custom-dark-grey">
            Champs obligatoires{" "}
            <span className="text-custom-secondary text-sm">*</span>
          </p>
        </div>
        <div className="w-full flex ">
          <div className="w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label
                  htmlFor="nom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  value={userData.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="prenom"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  value={userData.prenom}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="numero_de_tel"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>
                <input
                  id="numero_de_tel"
                  name="numero_de_tel"
                  type="tel"
                  value={userData.numero_de_tel}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="permission"
                  className="block text-sm font-medium text-gray-700"
                >
                  Permission
                </label>
                <select
                  id="permission"
                  name="permission"
                  value={userData.permission}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Sélectionner une permission</option>
                  <option value="admin">Admin</option>
                  <option value="user">Super Admin</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="date_creation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date de création
                </label>
                <input
                  id="date_creation"
                  name="date_creation"
                  type="date"
                  value={userData.date_creation}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button type="submit" className="btn-secondary mt-4">
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
