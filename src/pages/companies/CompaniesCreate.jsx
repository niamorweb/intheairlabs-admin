import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sectors from "../../data/sectors";
import Select from "react-select";
import toast from "react-hot-toast";

export default function CompaniesCreate() {
  const [formData, setFormData] = useState({
    siret: "",
    address: "",
    legalName: "",
    hubspotId: "",
    phoneNumber: "",
    sector: null,
    tradeName: "",
    logo: null,
  });

  const sectorsFormatted = Sectors.map((x) => ({
    id: x.id,
    label: x.label,
  }));

  // Manage input value change with a case of input file type
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sector) {
      toast.error("Veuillez ajouter le secteur de l'entreprise");
      return;
    }
    console.log("Form submitted:", formData);
    toast.success("Entreprise ajoutée");
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[700px] gap-8">
      <div className="flex items-center gap-2">
        <Link to="/companies" className="text-custom-dark-grey">
          Entreprises
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">
          Ajouter une nouvelle entreprise
        </span>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            Ajouter une nouvelle entreprise
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

          <div className="flex flex-col gap-2">
            <label className="required_input_label" htmlFor="clientName">
              Secteur de l'entreprise
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="clientName"
              options={sectorsFormatted}
              onChange={(selectedSector) => {
                setFormData((prevData) => ({
                  ...prevData,
                  sector: selectedSector ? selectedSector.id : "",
                }));
              }}
            />
          </div>

          <div className="">
            <label htmlFor="logo" className="required_input_label">
              Logo de l'entreprise
            </label>
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
            className="w-fit self-end cursor-pointer flex items-center gap-2 py-3 px-4 bg-custom-secondary text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Plus />
            Ajouter l'entreprise
          </button>
        </form>
      </div>
    </div>
  );
}
