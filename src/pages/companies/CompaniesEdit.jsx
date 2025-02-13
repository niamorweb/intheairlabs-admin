import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Companies from "../../data/companies";
import Select from "react-select";
import Sectors from "../../data/sectors";

export default function CompaniesEdit() {
  const location = useLocation();
  const { id } = useParams();
  const companyFromState = location.state?.company;

  // Si l'objet `company` n'est pas dans `location.state`, on le récupère dans `Companies`
  const company = Companies.find((comp) => comp.id === parseInt(id));
  console.log("the company ::: ", company);

  if (!company) {
    return <div>Entreprise non trouvée</div>; // Si aucune entreprise n'est trouvée, afficher un message d'erreur
  }

  console.log("company ::: ", company);

  const [formData, setFormData] = useState({
    siret: company.siret || "",
    address: company.address || "",
    legalName: company.legalName || "",
    hubspotId: company.hubspotId || "",
    phoneNumber: company.phoneNumber || "",
    sector: company.sector,
    tradeName: company.tradeName || "",
    logo: company.logo || null, // On stocke un fichier pour le logo
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

  const sectorsFormatted = Sectors.map((x) => ({
    id: x.id,
    label: x.label,
  }));

  console.log("sectorsFormatted ::: ", sectorsFormatted);
  console.log("formData.sector ::: ", formData.sector);

  const defaultSector = sectorsFormatted.find(
    (sector) => sector.id === formData.sector
  );
  sectorsFormatted.forEach((sector) => {
    console.log(sector.id);
  });

  console.log("defaultSector ::: ", defaultSector);

  return (
    <div className="flex flex-col items-start w-full gap-12 max-w-[700px]">
      <div className="flex items-center gap-2">
        <Link to="/companies" className="text-custom-dark-grey">
          Entreprises
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Informations sur l'entreprise</span>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            Informations sur l'entreprise
          </h2>
          <p className=" text-custom-dark-grey">
            Champs obligatoires{" "}
            <span className="text-custom-secondary text-sm">*</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="">
            <label htmlFor="siret" className="required_input_label">
              Numéro de SIRET
            </label>
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

          <div className="">
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

          <div className="grid grid-cols-2 gap-6">
            <div className="">
              <label htmlFor="legalName" className="required_input_label">
                Nom légal
              </label>
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

            <div className="">
              <label htmlFor="tradeName" className="required_input_label">
                Nom commercial
              </label>
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
          </div>

          <div className="">
            <label htmlFor="hubspotId" className="required_input_label">
              Hubspot ID
            </label>
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

          <div className="">
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

          <div className="">
            <label htmlFor="sector" className="required_input_label">
              Secteur de l'entreprise
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="clientName"
              defaultValue={defaultSector}
              options={sectorsFormatted}
              onChange={(selectedClient) => {
                setFormData((prevData) => ({
                  ...prevData,
                  companyId: selectedClient ? selectedClient.id : "",
                }));
              }}
            />
          </div>

          <div className="">
            <label htmlFor="logo" className="required_input_label">
              Logo de l'entreprise
            </label>

            {formData.logo ? (
              <div className="flex items-center gap-4">
                <img className="size-8" src={formData.logo} alt="" />
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleChange}
                  className="input"
                  placeholder="Changer le logo"
                  required
                />
              </div>
            ) : (
              <input
                type="file"
                id="logo"
                name="logo"
                onChange={handleChange}
                className="input"
                required
              />
            )}
          </div>
          <button
            type="submit"
            className="w-fit self-end cursor-pointer flex items-center gap-2 py-3 px-4 bg-custom-secondary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Modifier les informations
          </button>
        </form>
      </div>
    </div>
  );
}
