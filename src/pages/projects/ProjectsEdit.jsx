import { ChevronRight, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Companies from "../../data/companies";

export default function ProjectsEdit() {
  const location = useLocation();
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const companyFromState = location.state?.company; // Essaie d'obtenir l'objet `company` passé dans le state

  // Si l'objet `company` n'est pas dans `location.state`, on le récupère dans `Companies`
  const company =
    companyFromState || Companies.find((comp) => comp.id === parseInt(id));
  console.log("the company ::: ", company);

  if (!company) {
    return <div>Projet non trouvée</div>;
  }

  const [formData, setFormData] = useState({
    projectName: company.nom_du_projet || "",
    hubspotProjectId: company.hubspot_id || "",
    description: company.description || "",
    companyName: company.entreprise || "",
    projectType: company.type_du_projet || "",
    clientName: company.client || "",
    kmlFile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // On prend le premier fichier sélectionné
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement de la soumission (exemple : envoyer les données à une API)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex flex-col items-start w-full gap-6">
      <div className="flex items-center gap-2">
        <Link to="/projects" className="text-custom-dark-grey">
          Projets
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">
          Informations sur le projet et livrables
        </span>
      </div>
      <h2 className="text-2xl font-semibold">Informations sur le projet</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
        <div>
          <label className="required_input_label" htmlFor="projectName">
            Nom du projet
          </label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le nom du projet"
            required
          />
        </div>

        {/* Hubspot project ID */}
        <div>
          <label className="required_input_label" htmlFor="hubspotProjectId">
            Hubspot project ID
          </label>
          <input
            type="text"
            name="hubspotProjectId"
            value={formData.hubspotProjectId}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le projectID de Hubspot"
            required
          />
        </div>

        {/* Description */}
        <div className="col-span-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="input"
            placeholder="Entrez la description"
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="required_input_label" htmlFor="companyName">
            Entreprise
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="input"
            placeholder="Sélectionnez l'entreprise"
            required
          />
        </div>

        {/* Project Type */}
        <div>
          <label htmlFor="projectType">Type de projet</label>
          <input
            type="text"
            id="projectType"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
            className="input"
            placeholder="Sélectionnez le type de projet"
            required
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="required_input_label" htmlFor="clientName">
            Client
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            className="input"
            placeholder="Sélectionnez le client"
            required
          />
        </div>

        {/* KML File */}
        <div>
          <label className="required_input_label" htmlFor="kmlFile">
            Fichier KML
          </label>
          <input
            type="file"
            id="kmlFile"
            name="kmlFile"
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div></div>
        <div className="grid-cols-2 grid gap-6 mt-4">
          <button type="submit" className="btn-cancel">
            Annuler
          </button>
          <button type="submit" className=" btn-secondary">
            Sauvegarder les modifications{" "}
          </button>
        </div>
      </form>

      <div className="flex flex-col gap-10 mt-10 w-full">
        <h2 className="text-2xl font-semibold">Livrables</h2>

        <div className="flex flex-col gap-10">
          <div className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <label className="required_input_label" htmlFor="kmlFile">
                Fichier KML
              </label>
              <button
                type="submit"
                className="w-full cursor-pointer flex items-center gap-3 justify-center py-4 col-span-2 px-4 bg-custom-secondary-very-low-opacity hover:bg-custom-secondary-low-opacity duration-150 text-custom-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-custom-secondary focus:ring-opacity-50"
              >
                <Upload />
                Choisir les fichiers
              </button>
            </div>
            {/* <input
              type="file"
              id="kmlFile"
              name="kmlFile"
              onChange={handleChange}
              className="input w-full"
              required
            /> */}
          </div>

          <div className="flex flex-col gap-4">
            {[0, 1, 2].map(() => (
              <div className="flex items-center gap-3">
                <div className="grid grid-cols-2 items-center p-2 rounded-md flex-1 border border-custom-light-grey">
                  <div className="pr-8 w-full">
                    <input
                      className="p-3 w-full focus:outline-custom-light-grey rounded-md "
                      type="text"
                      defaultValue="filename.pdf"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>Type de fichier</span>
                    <select
                      className="bg-custom-very-light-grey p-2 cursor-pointer rounded-md"
                      name=""
                      id=""
                    >
                      <option>PDF</option>{" "}
                    </select>
                  </div>
                </div>
                <button className="h-14 cursor-pointer aspect-square rounded-md flex items-center justify-center bg-custom-secondary-very-low-opacity text-custom-secondary">
                  <X />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="self-end btn-secondary">
          Télécharger ces livrables
        </button>
      </div>
    </div>
  );
}
