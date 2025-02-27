import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Users from "../../data/users";
import { ChevronRight } from "lucide-react";
import { createUser } from "../../api/usersApi";

export function UserCreate() {
  const navigate = useNavigate();
  const { userId } = useParams(); // Récupérer l'ID de l'utilisateur à éditer
  const isEditMode = !!userId;

  const initialUserState = {
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    phonenumber: "",
    role: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    Users.push(userData);
    console.log("Nouvel utilisateur ajouté:", userData);
    const response = await createUser(userData);
    console.log("response :::: ", response);

    // navigate("/manage-users");
  };

  return (
    <div className="flex flex-col items-start w-full gap-12 max-w-[700px]">
      <div className="flex items-center gap-2">
        <Link to="/manage-users" className="text-custom-dark-grey">
          Gérer les utilisateurs
        </Link>
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
                  htmlFor="lastname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nom
                </label>
                <input
                  id="lastname"
                  name="lastname"
                  type="text"
                  value={userData.lastname}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Prénom
                </label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  value={userData.firstname}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Numéro de téléphone
                </label>
                <input
                  id="phonenumber"
                  name="phonenumber"
                  type="tel"
                  value={userData.phonenumber}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rôle
                </label>
                <select
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md required_input_label"
                  required
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="admin">Admin</option>
                  <option value="superAdmin">Super Admin</option>
                </select>
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
