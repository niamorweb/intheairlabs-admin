import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import ProjectTypes from "../../data/projectTypes";
import { Check, Trash, X } from "lucide-react";

export default function Addname() {
  const [formData, setFormData] = useState({
    name: "",
  });

  const [projectTypes, setProjectTypes] = useState(
    ProjectTypes.map((x) => ({ ...x, editedValue: x.label }))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProjectTypeChange = (index, value) => {
    const newProjectTypes = [...projectTypes];
    newProjectTypes[index].editedValue = value;
    setProjectTypes(newProjectTypes);
  };

  const handleUpdate = (index) => {
    const newProjectTypes = [...projectTypes];
    newProjectTypes[index].label = newProjectTypes[index].editedValue;
    setProjectTypes(newProjectTypes);
    console.log("Project Type Updated:", newProjectTypes[index]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Project Type Submitted:", formData);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-2xl font-semibold">Ajouter un type de projet</h2>
        <Popup
          trigger={<button className="btn-outline py-2">Gérer</button>}
          modal
          nested
          position="right center"
        >
          <div className="flex flex-col gap-6 p-5">
            <span className="text-2xl font-semibold">
              Tous les types de projet
            </span>
            <div className="flex flex-col gap-3 max-h-[70vh] p-2 overflow-auto">
              {projectTypes.map((x, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    className="flex-grow p-3 outline outline-custom-grey rounded-md"
                    value={x.editedValue}
                    onChange={(e) =>
                      handleProjectTypeChange(index, e.target.value)
                    }
                  />
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      className="btn-primary text-sm rounded-md"
                      disabled={x.label === x.editedValue}
                      onClick={() => handleUpdate(index)}
                    >
                      <span>Mettre à jour</span>
                    </button>
                    <button className="p-3 rounded-md bg-custom-secondary-very-low-opacity hover:bg-custom-secondary-low-opacity duration-150 text-custom-secondary">
                      <Trash className="size-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Popup>
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
