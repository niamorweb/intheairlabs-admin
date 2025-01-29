import { ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Clients from "../../data/clients";
import "react-responsive-combo-box/dist/index.css";
import Companies from "../../data/companies";
import { Combobox } from "../../components/Combobox";

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
    nom_du_client: client.nom_du_client || "",
    prenom_du_client: client.prenom_du_client || "",
    telephone: client.telephone || "",
    entreprise: client.entreprise || "",
    derniere_modification: client.derniere_modification || "",
    hubspot_id: client.hubspot_id || "",
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

  return (
    <div className="flex flex-col items-start w-full gap-12">
      <div className="flex items-center gap-2">
        <a href="/clients" className="text-custom-dark-grey">
          Clients
        </a>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Informations du client</span>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Informations du client
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 w-full">
        {/* ID (facultatif, à ajouter manuellement ou généré par l'API) */}
        <div className="mb-4 hidden">
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

        {/* Nom du client */}
        <div className="mb-4">
          <label htmlFor="nom_du_client">Nom du client</label>
          <input
            type="text"
            id="nom_du_client"
            name="nom_du_client"
            value={formData.nom_du_client}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Prénom du client */}
        <div className="mb-4">
          <label htmlFor="prenom_du_client">Prénom du client</label>
          <input
            type="text"
            id="prenom_du_client"
            name="prenom_du_client"
            value={formData.prenom_du_client}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Numéro de téléphone */}
        <div className="mb-4">
          <label htmlFor="telephone">Numéro de téléphone</label>
          <input
            type="text"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Nom de l'entreprise */}
        <div className="mb-4">
          <label htmlFor="entreprise">Nom de l'entreprise</label>
          {/* <input
            type="text"
            id="entreprise"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            className="input"
            required
          /> */}
          <Combobox
            placeholder="Selectionnez une entreprise:"
            data={Companies}
            elementToDisplay="nom_du_projet"
          />
        </div>

        {/* Dernière modification */}
        <div className="mb-4">
          <label htmlFor="derniere_modification">Dernière modification</label>
          <input
            type="date"
            id="derniere_modification"
            name="derniere_modification"
            value={formData.derniere_modification}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        {/* Hubspot ID */}
        <div className="mb-4">
          <label htmlFor="hubspot_id">Hubspot ID</label>
          <input
            type="text"
            id="hubspot_id"
            name="hubspot_id"
            value={formData.hubspot_id}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 col-span-2 px-4 bg-custom-primary text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Ajouter le client
        </button>
      </form>
    </div>
  );
}
