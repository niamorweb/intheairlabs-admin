import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

export default function ProjectsCreate() {
  const [formData, setFormData] = useState({
    siret: "",
    address: "",
    legalName: "",
    hubspotId: "",
    phoneNumber: "",
    sector: "",
    tradeName: "",
    logo: null, // On stocke un fichier pour le logo
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
    <div className="flex flex-col items-start w-full gap-12">
      <div className="flex items-center gap-2">
        <a href="/companies" className="text-custom-dark-grey">
          Entreprises
        </a>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">
          Ajouter une nouvelle entreprise
        </span>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Ajouter une nouvelle entreprise
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
        {/* Numéro de SIRET */}
        <div className="mb-4">
          <label htmlFor="siret">Numéro de SIRET</label>
          <input
            type="text"
            id="siret"
            name="siret"
            value={formData.siret}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le numéro de SIRET"
            required
          />
        </div>

        {/* Adresse */}
        <div className="mb-4">
          <label htmlFor="address">Adresse</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="input"
            placeholder="Entrez l'adresse de l'entreprise"
            required
          />
        </div>

        {/* Nom légal */}
        <div className="mb-4">
          <label htmlFor="legalName">Nom légal</label>
          <input
            type="text"
            id="legalName"
            name="legalName"
            value={formData.legalName}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le nom légal de l'entreprise"
            required
          />
        </div>

        {/* Hubspot ID */}
        <div className="mb-4">
          <label htmlFor="hubspotId">Hubspot ID</label>
          <input
            type="text"
            id="hubspotId"
            name="hubspotId"
            value={formData.hubspotId}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le Hubspot ID"
            required
          />
        </div>

        {/* Numéro de tél */}
        <div className="mb-4">
          <label htmlFor="phoneNumber">Numéro de tél</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le numéro de téléphone"
            required
          />
        </div>

        {/* Secteur de l'entreprise */}
        <div className="mb-4">
          <label htmlFor="sector">Secteur de l'entreprise</label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le secteur de l'entreprise"
            required
          />
        </div>

        {/* Nom commercial */}
        <div className="mb-4">
          <label htmlFor="tradeName">Nom commercial</label>
          <input
            type="text"
            id="tradeName"
            name="tradeName"
            value={formData.tradeName}
            onChange={handleChange}
            className="input"
            placeholder="Entrez le nom commercial de l'entreprise"
            required
          />
        </div>

        {/* Logo de l'entreprise */}
        <div className="mb-4">
          <label htmlFor="logo">Logo de l'entreprise</label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 col-span-2 px-4 bg-custom-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Créer l'entreprise
        </button>
      </form>
    </div>
  );
}
