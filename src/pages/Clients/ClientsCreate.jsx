import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "../../api/clientsApi";
import toast from "react-hot-toast";
import companies from "../../data/companies";
import Select from "react-select";

export default function ClientCreate() {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    phoneNumber: "",
    hubspot_id: "",
    linkedin: "",
    companyId: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.companyId) {
      toast.error("Veuillez ajouter son entreprise");
      return;
    }
    console.log("Form submitted:", formData);
    toast.success("Client ajouté");
  };

  const companiesFormatted = companies.map((x) => ({
    id: x.id,
    label: x.tradeName,
  }));

  return (
    <div className="flex flex-col items-start w-full gap-8">
      <div className="flex items-center gap-2">
        <Link to="/clients" className="text-custom-dark-grey">
          Clients
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Ajouter un nouveau client</span>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un nouveau client</h2>
          <p className=" text-custom-dark-grey">
            Champs obligatoires{" "}
            <span className="text-custom-secondary text-sm">*</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-[700px]"
        >
          <div className="">
            <label htmlFor="lastName" className="required_input_label">
              Nom du client
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              placeholder="Nom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="firstName" className="required_input_label">
              Prénom du client
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              placeholder="Prénom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="phoneNumber" className="required_input_label">
              Numéro de téléphone
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input"
              placeholder="Numéro de tél."
              required
            />
          </div>

          <div className="">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              className="input"
              placeholder="Lien de son LinkedIn"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="required_input_label" htmlFor="clientName">
              Entreprise
            </label>
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="clientName"
              options={companiesFormatted}
              onChange={(selectedClient) => {
                setFormData((prevData) => ({
                  ...prevData,
                  companyId: selectedClient ? selectedClient.id : "",
                }));
              }}
            />
          </div>

          <div className="">
            <label htmlFor="hubspot_id" className="required_input_label">
              Hubspot ID
            </label>
            <input
              type="text"
              id="hubspot_id"
              name="hubspot_id"
              value={formData.hubspot_id}
              onChange={handleChange}
              className="input"
              placeholder="Hubspot ID"
              required
            />
          </div>
          <button type="submit" className="btn-secondary">
            <Plus />
            Ajouter le client{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
