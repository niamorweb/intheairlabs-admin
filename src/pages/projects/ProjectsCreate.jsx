import { ChevronRight, Plus, Search } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProjectTypes from "../../data/projectTypes";
import companies from "../../data/companies";
import clients from "../../data/clients";
import Select from "react-select";

export default function ProjectsCreate() {
  const [formData, setFormData] = useState({
    projectName: "",
    hubspotProjectId: "",
    description: "",
    clientName: "",
    projectType: "",
    kmlFile: null,
    clientId: "",
    linkedCompanyId: "",
  });

  const handleChange = (e, valueGiven, elementGiven) => {
    if (valueGiven && elementGiven) {
      setFormData((prevData) => ({
        ...prevData,
        [elementGiven]: valueGiven,
      }));
    } else {
      const { name, value, type, files } = e.target;
      if (type === "file") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value || "",
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const clientsFormatted = clients.map((x) => {
    const company = companies.find(
      (company) => company.id === x.company_linked
    );
    return {
      id: x.id,
      companyId: x.company_linked,
      label: `${company ? company.entreprise : "Entreprise inconnue"} - ${
        x.nom_du_client
      } ${x.prenom_du_client}`,
    };
  });

  return (
    <div className="flex flex-col items-start w-full gap-8 max-w-[700px]">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex items-center gap-2">
          <Link to="/projects" className="text-custom-dark-grey">
            Projets
          </Link>
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
              />
            </div>

            {/* Hubspot project ID */}
            <div>
              <label
                className="required_input_label"
                htmlFor="hubspotProjectId"
              >
                Hubspot project ID
              </label>
              <input
                type="text"
                name="hubspotProjectId"
                value={formData.hubspotProjectId}
                onChange={handleChange}
                className="input"
                placeholder="Entrez le projectID de Hubspot"
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
              />
            </div>

            {/* Client Name */}
            <div className="flex flex-col gap-2">
              <label className="required_input_label" htmlFor="clientName">
                Client
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable
                isSearchable
                name="clientName"
                options={clientsFormatted}
                onChange={(selectedClient) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    clientName: selectedClient ? selectedClient.label : "",
                    clientId: selectedClient ? selectedClient.id : "", // ID du client
                    linkedCompanyId: selectedClient
                      ? selectedClient.companyId
                      : "", // ID de l'entreprise liée
                  }));
                }}
              />
            </div>

            {/* Project Type */}
            <div className="flex flex-col gap-2">
              <label className="required_input_label" htmlFor="projectType">
                Type de projet
              </label>
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={ProjectTypes[0].id}
                isClearable
                isSearchable
                name="projectType"
                options={ProjectTypes}
                onChange={(selectedOption) => {
                  setFormData((prevData) => ({
                    ...prevData,
                    projectType: selectedOption ? selectedOption.id : "", // Vérifie la sélection avant de l'ajouter
                  }));
                }}
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
              />
            </div>

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
