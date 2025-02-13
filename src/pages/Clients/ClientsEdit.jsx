import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Clients from "../../data/clients";
import "react-responsive-combo-box/dist/index.css";
import Companies from "../../data/companies";
import { Combobox } from "../../components/Combobox";
import Select from "react-select";
import companies from "../../data/companies";

export default function ClientCreate() {
  const location = useLocation();
  const { id } = useParams(); // Récupère l'ID depuis l'URL
  const clientFromState = location.state?.company; // Essaie d'obtenir l'objet `company` passé dans le state

  // Si l'objet `company` n'est pas dans `location.state`, on le récupère dans `Companies`
  const client =
    clientFromState || Clients.find((comp) => comp.id === parseInt(id));
  console.log("the company ::: ", client);

  if (!client) {
    return <div>Entreprise non trouvée</div>; // Si aucune entreprise n'est trouvée, afficher un message d'erreur
  }

  const [formData, setFormData] = useState({
    id: client.id || "", // Ajouté pour correspondre à l'ID unique du client
    firstName: client.firstName || "",
    lastName: client.lastName || "",
    phoneNumber: client.phoneNumber || "",
    company: client.company || "",
    hubspotId: client.hubspotId || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Traitement de la soumission (exemple : envoyer les données à une API)
    console.log("Form submitted:", formData);
  };

  const companiesFormatted = companies.map((x) => ({
    id: x.id,
    label: x.tradeName,
  }));

  const defaultCompany = companiesFormatted.find(
    (company) => company.id === formData.company
  );

  return (
    <div className="flex flex-col items-start w-full gap-12">
      <div className="flex items-center gap-2">
        <Link to="/clients" className="text-custom-dark-grey">
          Clients
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Informations du client</span>
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Informations sur le client</h2>
          <p className=" text-custom-dark-grey">
            Champs obligatoires{" "}
            <span className="text-custom-secondary text-sm">*</span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full max-w-[700px]"
        >
          <div className=" hidden">
            <label htmlFor="id">ID</label>
            <input
              type="text"
              id="id"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="input"
            />
          </div>

          <div className="">
            <label htmlFor="nom_du_client" className="required_input_label">
              Nom du client
            </label>
            <input
              type="text"
              id="nom_du_client"
              name="nom_du_client"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              placeholder="Nom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="prenom_du_client" className="required_input_label">
              Prénom du client
            </label>
            <input
              type="text"
              id="prenom_du_client"
              name="prenom_du_client"
              value={formData.lastName}
              onChange={handleChange}
              className="input"
              placeholder="Prénom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="telephone" className="required_input_label">
              Numéro de téléphone
            </label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="input"
              placeholder="Numéro de tél."
              required
            />
          </div>

          <div className="">
            <label htmlFor="entreprise" className="required_input_label">
              Nom de l'entreprise
            </label>
            {/* <input
              type="text"
              id="entreprise"
              name="entreprise"
              value={formData.company}
              onChange={handleChange}
              className="input"
              placeholder="Entreprise"
              required
            /> */}
            <Select
              className="basic-single"
              classNamePrefix="select"
              isClearable
              isSearchable
              name="clientName"
              defaultValue={defaultCompany}
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
              value={formData.hubspotId}
              onChange={handleChange}
              className="input"
              placeholder="Hubspot ID"
              required
            />
          </div>
          <button type="submit" className="btn-secondary">
            Modifier les informations
          </button>
        </form>
      </div>
    </div>
  );
}
