import { ChevronRight, Upload, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Projects from "../../data/projects";
import ProjectTypes from "../../data/projectTypes";
import Clients from "../../data/clients";
import Select from "react-select";

export default function ProjectsEdit() {
  const location = useLocation();
  const { id } = useParams();
  const companyFromState = location.state?.company;
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files).map((file) => ({
      name: file.name.split(".").slice(0, -1).join("."),
      extension: file.name.split(".").pop(),
      size: file.size,
      type: file.type,
    }));
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    console.log(selectedFiles);
  };

  const removeFileFromList = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const company =
    companyFromState || Projects.find((comp) => comp.id === parseInt(id));
  console.log("the company ::: ", company);

  if (!company) {
    return <div>Projet non trouvée</div>;
  }

  const [formData, setFormData] = useState({
    name: company.name || "",
    hubspotId: company.hubspotId || "",
    description: company.description || "",
    projectType: company.projectType || "",
    client: company.client || "",
    kmlFile: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
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
    console.log("Form submitted:", formData);
  };

  const clientsFormatted = Clients.map((x) => ({
    id: x.id,
    label: `${x.firstName} ${x.lastName}`,
  }));

  const defaultClient = clientsFormatted.find((x) => x.id === formData.client);

  const projectTypesFormatted = ProjectTypes.map((x) => ({
    id: x.id,
    label: x.label,
  }));
  projectTypesFormatted.forEach((projectType) => {
    console.log(
      `ID: ${projectType.id}, Type: ${typeof projectType.id}, Label: ${
        projectType.label
      }, Type: ${typeof projectType.label}`
    );
  });

  console.log(
    `tetetet: ${formData.projectType},  Type: ${typeof formData.projectType}`
  );
  console.log(formData);

  const defaultProjectType = projectTypesFormatted.find(
    (x) => x.id === formData.projectType
  );

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
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
            value={formData.name}
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
            value={formData.hubspotId}
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
        {/* <div>
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
        </div> */}

        {/* Project Type */}
        <div>
          <label htmlFor="projectType">Type de projet</label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable
            isSearchable
            name="clientName"
            defaultValue={defaultProjectType}
            options={projectTypesFormatted}
            onChange={(x) => {
              setFormData((prevData) => ({
                ...prevData,
                companyId: x ? x.id : "",
              }));
            }}
          />
        </div>

        {/* Client Name */}
        <div>
          <label className="required_input_label" htmlFor="clientName">
            Client
          </label>
          <Select
            className="basic-single"
            classNamePrefix="select"
            isClearable
            isSearchable
            name="clientName"
            defaultValue={defaultClient}
            options={clientsFormatted}
            onChange={(selectedClient) => {
              setFormData((prevData) => ({
                ...prevData,
                companyId: selectedClient ? selectedClient.id : "",
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
            required
          />
        </div>

        <div></div>
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
              <input
                type="file"
                multiple
                className="hidden "
                id="inputFiles"
                onChange={handleFileChange}
              />
              <button
                onClick={() => document.getElementById("inputFiles").click()}
                className="w-full cursor-pointer flex items-center gap-3 justify-center py-4 col-span-2 px-4 bg-custom-secondary-very-low-opacity hover:bg-custom-secondary-low-opacity duration-150 text-custom-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-custom-secondary focus:ring-opacity-50"
              >
                <Upload />
                Choisir les fichiers
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {files &&
              files.map((file, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="grid grid-cols-2 items-center p-2 rounded-md flex-1 border border-custom-light-grey">
                    <div className="pr-8 w-full flex items-center gap-2">
                      <input
                        className="p-3 w-full focus:outline-custom-light-grey rounded-md "
                        type="text"
                        defaultValue={file.name}
                      />
                      <span className="text-custom-grey text-sm whitespace-nowrap">
                        {formatBytes(file.size)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span>Type de fichier</span>
                      <select
                        className="bg-custom-very-light-grey p-2 cursor-pointer rounded-md"
                        name=""
                        id=""
                      >
                        <option>{file.type}</option>{" "}
                      </select>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFileFromList(i)}
                    className="h-14 cursor-pointer aspect-square rounded-md flex items-center justify-center bg-custom-secondary-very-low-opacity text-custom-secondary"
                  >
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
