import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Building, LogOut, NotebookText, Plus, User, Users, UserCog, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { CompaniesList } from './pages/companies/CompaniesList'
import { Route, Routes } from 'react-router-dom'
import CompanyCreation from './pages/companies/CompanyCreation'
import CompanyEdit from './pages/companies/CompanyEdit'
import Layout from './Layout'
import { ClientsList } from './pages/Clients/ClientsList'
import ClientCreate from './pages/Clients/ClientsCreate'
import ClientEdit from './pages/Clients/ClientsEdit'

function App() {

  return (
    <Routes>
      {/* Page SignIn ne nécessite pas de layout */}
      {/* <Route path="/signin" element={<SignIn />} /> */}

      {/* Pages avec layout */}

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
            <CompanyCreation />
          </Layout>
        }
      />
      <Route
        path="/companies/:id/edit"
        element={
          <Layout>
            <CompanyEdit />
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

export default App
