import { ChevronRight, Plus } from "lucide-react";
import React, { useState } from "react";

export default function TypesCreate() {
  return (
    <div className="flex flex-col items-start w-full max-w-[700px] gap-14">
      <div className="flex items-center gap-2">
        <a href="/projects" className="text-custom-dark-grey">
          Projets
        </a>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Ajouter des types</span>
      </div>

      <h1 className="text-4xl font-semibold">Ajouter des types</h1>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un type de projet</h2>
        </div>

        <form className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="project_type">Nom du type de projet</label>
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

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un type de donnée</h2>
        </div>

        <form className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="project_type">Nom du type de donnée</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Nom du type de donnée"
              required
            />
          </div>{" "}
          <div className="flex-1">
            <label htmlFor="project_type">Description du type de donnée</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Description du type de donnée"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="project_type">Fichier Shapefile</label>
            <p className="text-sm text-custom-dark-grey ">
              Télécharger le fichier Shapefile pour créer ce nouveau tableau de
              type de données
            </p>
            <input
              type="file"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Description du type de donnée"
              required
            />
          </div>
          <button className="btn-secondary">Ajouter</button>
        </form>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Ajouter un type de fichier</h2>
        </div>

        <form className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="project_type">Nom du type de fichier</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Nom du type de donnée"
              required
            />
          </div>{" "}
          <div className="flex-1">
            <label htmlFor="project_type">Description du type de fichier</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Description du type de donnée"
              required
            />
          </div>
          <button className="btn-secondary">Ajouter</button>
        </form>
      </div>

      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">
            Ajouter une extension de fichier
          </h2>
        </div>

        <form className="flex flex-col gap-6 w-full">
          <div className="flex-1">
            <label htmlFor="project_type">Extension</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Nom du type de donnée"
              required
            />
          </div>{" "}
          <div className="flex-1">
            <label htmlFor="project_type">Type de fichier</label>
            <input
              type="text"
              id="project_type"
              name="project_type"
              className="input"
              placeholder="Description du type de donnée"
              required
            />
          </div>
          <button className="btn-secondary">Ajouter</button>
        </form>
      </div>
    </div>
  );
}
