import { ChevronRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function MyAccount() {
  const { authUser } = useAuth();

  return (
    <div className="flex flex-col items-start w-full gap-12 max-w-[700px]">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            Mes informations sur mon compte
          </h2>
          <p className=" text-custom-dark-grey">
            Champs obligatoires{" "}
            <span className="text-custom-secondary text-sm">*</span>
          </p>
        </div>
        <div className="w-full flex ">
          <div className="w-full">
            <form className="flex flex-col gap-3">
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={authUser && authUser.lastName}
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={authUser && authUser.firstName}
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={authUser && authUser.email}
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
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <button type="submit" className="btn-secondary mt-4">
                Modifier mes informations
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
