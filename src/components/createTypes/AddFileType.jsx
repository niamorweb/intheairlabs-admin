import React, { useState } from "react";

export default function AddFileType() {
  const [formData, setFormData] = useState({
    fileType: "",
    description: "",
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
    console.log("File Type Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Ajouter un type de fichier</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex-1">
          <label className="required_input_label" htmlFor="file_type">
            Nom du type de fichier
          </label>
          <input
            type="text"
            id="file_type"
            name="fileType"
            className="input"
            placeholder="Nom du type de donnée"
            value={formData.fileType}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex-1">
          <label htmlFor="file_description">
            Description du type de fichier
          </label>
          <input
            type="text"
            id="file_description"
            name="description"
            className="input"
            placeholder="Description du type de donnée"
            value={formData.description}
            onChange={handleChange}
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
