import React from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import AddProjectType from "../../components/createTypes/addprojectType";
import AddDataType from "../../components/createTypes/AddDataType";
import AddFileType from "../../components/createTypes/AddFileType";
import AddFileExtension from "../../components/createTypes/AddFileExtension";

export default function TypesCreate() {
  return (
    <div className="flex flex-col items-start w-full max-w-[700px] gap-14">
      <div className="flex items-center gap-2">
        <Link to="/projects" className="text-custom-dark-grey">
          Projets
        </Link>
        <ChevronRight className="size-4" />
        <span className="text-custom-black">Ajouter des types</span>
      </div>

      <h1 className="text-4xl font-semibold">Ajouter des types</h1>

      <AddProjectType />
      <AddDataType />
      <AddFileType />
      <AddFileExtension />
    </div>
  );
}
