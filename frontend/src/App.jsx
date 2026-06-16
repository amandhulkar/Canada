import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignupPage from "./pages/SignupPage";
import Navbar from "./sections/Navbar";
// import Footer from './sections/Footer'
import TemplateGallery from "./pages/TemplatesPage";

import Dashboard from "./pages/dashboard/Dashboard";

import Clients from "./pages/dashboard/Clients";
import Teams from "./pages/dashboard/Teams";
import Projects from "./pages/dashboard/Projects";
import Services from "./pages/dashboard/Services";
import Invoices from "./pages/dashboard/Invoices";
import Settings from "./pages/dashboard/Settings";
import AccessRoles from "./pages/dashboard/AccessRoles";
import Support from "./pages/dashboard/Support";

// import ClientDetail from "./pages/dashboard/ClientDetail";
import ClientDetail from "./pages/dashboard/Clientdetail";



function Layout() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/templates" element={<TemplateGallery />} />
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/dashboard/clients" element={<Clients />} />
        <Route path="/dashboard/teams" element={<Teams />} />
        <Route path="/dashboard/projects" element={<Projects />} />
        <Route path="/dashboard/services" element={<Services />} />
        <Route path="/dashboard/invoices" element={<Invoices />} />
        <Route path="/dashboard/invoices/new" element={<Invoices />} />
        <Route path="/dashboard/access-roles" element={<AccessRoles />} /> 
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/support" element={<Support />} />
        <Route path="/dashboard/clients/:id" element={<ClientDetail />} /> 

      </Routes>
      {/* <Footer /> */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;