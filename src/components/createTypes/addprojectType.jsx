import React, { useState } from "react";

export default function Addname() {
  const [formData, setFormData] = useState({
    name: "",
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
    console.log("Project Type Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-semibold">Ajouter un type de projet</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
        <div className="flex-1">
          <label className="required_input_label" htmlFor="project_type">
            Nom du type de projet
          </label>
          <input
            type="text"
            id="project_type"
            name="name"
            className="input"
            placeholder="Type de projet"
            value={formData.name}
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
