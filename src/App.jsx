import "./App.css";
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
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/manage-users"
        element={
          <ProtectedRoute>
            <Layout>
              <UsersList />
            </Layout>
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/my-account"
        element={
          <ProtectedRoute>
            <Layout>
              <MyAccount />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-users/create"
        element={
          <ProtectedRoute>
            <Layout>
              <UserCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <CompaniesList />
            </Layout>
          </ProtectedRoute>
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
          <ProtectedRoute>
            <Layout>
              <CompaniesEdit />
            </Layout>
          </ProtectedRoute>
        }
      />{" "}
      <Route
        path="/projects/types"
        element={
          <ProtectedRoute>
            <Layout>
              <TypesCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/companies/sectors"
        element={
          <ProtectedRoute>
            <Layout>
              <SectorsCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <ProtectedRoute>
            <Layout>
              <ProjectsList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/create"
        element={
          <ProtectedRoute>
            <Layout>
              <ProjectsCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/projects/:id/edit"
        element={
          <ProtectedRoute>
            <Layout>
              <ProjectsEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Layout>
              <ClientsList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/create"
        element={
          <ProtectedRoute>
            <Layout>
              <ClientCreate />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clients/:id/edit"
        element={
          <ProtectedRoute>
            <Layout>
              <ClientEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
