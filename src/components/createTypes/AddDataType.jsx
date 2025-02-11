import React, { useState } from "react";

export default function AddDataType() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    shapefile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data Type Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Ajouter un type de donnée</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex-1">
          <label className="required_input_label" htmlFor="data_type_name">
            Nom du type de donnée
          </label>
          <input
            type="text"
            id="data_type_name"
            name="name"
            className="input"
            placeholder="Nom du type de donnée"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="required_input_label" htmlFor="data_description">
            Description du type de donnée
          </label>
          <input
            type="text"
            id="data_description"
            name="description"
            className="input"
            placeholder="Description du type de donnée"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label className="required_input_label" htmlFor="shapefile">
            Fichier Shapefile
          </label>
          <p className="text-sm text-custom-dark-grey">
            Télécharger le fichier Shapefile pour créer ce nouveau tableau de
            type de données
          </p>
          <input
            type="file"
            id="shapefile"
            name="shapefile"
            className="input"
            onChange={handleFileChange}
            required
          />
        </div>
        <button className="btn-secondary" type="submit">
          Ajouter
        </button>
      </form>
    </div>
  );
}
