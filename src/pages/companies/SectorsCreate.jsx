import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SectorsCreate() {
  const [formData, setFormData] = useState({
    label: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-start w-full max-w-[700px] gap-14">
      <div className="flex items-center gap-2">
        <Link to="/companies" className="text-custom-dark-grey">
          Entreprises
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Ajouter des secteurs</span>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un secteur</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="label" className="required_input_label">
              Secteur d'activité
            </label>
            <input
              type="text"
              id="label"
              name="label"
              className="input"
              placeholder="Nom du secteur"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              className="input"
              placeholder="Description du secteur"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-secondary">
            Ajouter
          </button>
        </form>
      </div>
    </div>
  );
}
