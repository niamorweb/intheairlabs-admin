import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";

export default function ProjectsCreate() {
  const [formData, setFormData] = useState({
    projectName: "",
    hubspotProjectId: "",
    description: "",
    companyName: "",
    projectType: "",
    clientName: "",
    kmlFile: null, // On stocke un fichier pour le KML
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
    <div className="flex flex-col items-start w-full gap-8 max-w-[700px]">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center gap-2">
          <a href="/projects" className="text-custom-dark-grey">
            Projets
          </a>
          <ChevronRight className="size-4" />
          <span className="text-custom-black">Ajouter un nouveau projet</span>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">
              Ajouter un nouveau projet
            </h2>
            <p className=" text-custom-dark-grey">
              Champs obligatoires{" "}
              <span className="text-custom-secondary text-sm">*</span>
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="">
              <label htmlFor="projectName">Nom du projet</label>
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
            <div className="">
              <label htmlFor="hubspotProjectId">Hubspot project ID</label>
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
            <div className=" col-span-2">
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
            <div className="">
              <label htmlFor="companyName">Entreprise</label>
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
            <div className="">
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
            <div className="">
              <label htmlFor="clientName">Client</label>
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
            <div className="">
              <label htmlFor="kmlFile">Fichier KML</label>
              <input
                type="file"
                id="kmlFile"
                name="kmlFile"
                onChange={handleChange}
                className="input"
                required
              />
            </div>
            {/* <div></div> */}
            <button
              type="submit"
              className="w-fit self-end flex items-center gap-2 cursor-pointer py-3 px-4 bg-custom-secondary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              <Plus />
              Ajouter le projet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
