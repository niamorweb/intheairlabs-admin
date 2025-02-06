import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ClientCreate() {
  const [formData, setFormData] = useState({
    id: "", // Ajouté pour correspondre à l'ID unique du client
    nom_du_client: "",
    prenom_du_client: "",
    telephone: "",
    entreprise: "",
    derniere_modification: "",
    hubspot_id: "",
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
    console.log("Form submitted:", formData);
  };

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
            <label htmlFor="nom_du_client">Nom du client</label>
            <input
              type="text"
              id="nom_du_client"
              name="nom_du_client"
              value={formData.nom_du_client}
              onChange={handleChange}
              className="input"
              placeholder="Nom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="prenom_du_client">Prénom du client</label>
            <input
              type="text"
              id="prenom_du_client"
              name="prenom_du_client"
              value={formData.prenom_du_client}
              onChange={handleChange}
              className="input"
              placeholder="Prénom du client"
              required
            />
          </div>

          <div className="">
            <label htmlFor="telephone">Numéro de téléphone</label>
            <input
              type="text"
              id="telephone"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className="input"
              placeholder="Numéro de tél."
              required
            />
          </div>

          <div className="">
            <label htmlFor="entreprise">Nom de l'entreprise</label>
            <input
              type="text"
              id="entreprise"
              name="entreprise"
              value={formData.entreprise}
              onChange={handleChange}
              className="input"
              placeholder="Entreprise"
              required
            />
          </div>

          <div className="">
            <label htmlFor="hubspot_id">Hubspot ID</label>
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
