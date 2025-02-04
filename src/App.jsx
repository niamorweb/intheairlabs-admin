import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  Building,
  LogOut,
  NotebookText,
  Plus,
  User,
  Users,
  UserCog,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CompaniesList } from "./pages/companies/CompaniesList";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import { ClientsList } from "./pages/clients/ClientsList";
import ClientCreate from "./pages/clients/ClientsCreate";
import ClientEdit from "./pages/clients/ClientsEdit";
import CompaniesCreate from "./pages/companies/CompaniesCreate";
import CompaniesEdit from "./pages/companies/CompaniesEdit";
import { ProjectsList } from "./pages/projects/ProjectsList";
import ProjectsCreate from "./pages/projects/ProjectsCreate";
import ProjectsEdit from "./pages/projects/ProjectsEdit";
import TypesCreate from "./pages/projects/TypesCreate";
import SectorsCreate from "./pages/companies/SectorsCreate";
import UsersList from "./pages/manage-users/usersList";
import { UserCreate } from "./pages/manage-users/UserCreate";
import { MyAccount } from "./pages/my-account/UserCreate";
import Login from "./pages/login/Login";

function App() {
  return (
    <Routes>
      {/* Page SignIn ne nécessite pas de layout */}
      {/* <Route path="/signin" element={<SignIn />} /> */}
      {/* Pages avec layout */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/manage-users"
        element={
          <Layout>
            <UsersList />
          </Layout>
        }
      />{" "}
      <Route
        path="/my-account"
        element={
          <Layout>
            <MyAccount />
          </Layout>
        }
      />
      <Route
        path="/manage-users/create"
        element={
          <Layout>
            <UserCreate />
          </Layout>
        }
      />
      <Route
        path="/"
        element={
          <Layout>
            <CompaniesList />
          </Layout>
        }
      />
      <Route
        path="/companies"
        element={
          <Layout>
            <CompaniesList />
          </Layout>
        }
      />
      <Route
        path="/companies/create"
        element={
          <Layout>
            <CompaniesCreate />
          </Layout>
        }
      />
      <Route
        path="/companies/:id/edit"
        element={
          <Layout>
            <CompaniesEdit />
          </Layout>
        }
      />{" "}
      <Route
        path="/projects/types"
        element={
          <Layout>
            <TypesCreate />
          </Layout>
        }
      />
      <Route
        path="/companies/sectors"
        element={
          <Layout>
            <SectorsCreate />
          </Layout>
        }
      />
      <Route
        path="/projects"
        element={
          <Layout>
            <ProjectsList />
          </Layout>
        }
      />
      <Route
        path="/projects/create"
        element={
          <Layout>
            <ProjectsCreate />
          </Layout>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <Layout>
            <ProjectsEdit />
          </Layout>
        }
      />
      <Route
        path="/clients"
        element={
          <Layout>
            <ClientsList />
          </Layout>
        }
      />
      <Route
        path="/clients/create"
        element={
          <Layout>
            <ClientCreate />
          </Layout>
        }
      />
      <Route
        path="/clients/:id/edit"
        element={
          <Layout>
            <ClientEdit />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
