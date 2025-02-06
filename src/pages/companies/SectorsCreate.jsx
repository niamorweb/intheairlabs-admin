import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SectorsCreate() {
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

        <form className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="project_type" className="required_input_label">
              Secteur d'activité
            </label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Type de projet"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="project_type">Description</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Type de projet"
              required
            />
          </div>
          <button className="btn-secondary">Ajouter</button>
        </form>
      </div>
    </div>
  );
}
