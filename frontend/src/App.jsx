import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import HelpCenter from "./pages/HelpCenter";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import SignupPage from "./pages/SignupPage";
import Navbar from "./sections/Navbar";

import TemplatesPage from "./pages/TemplatesPage";

import Dashboard from "./pages/dashboard/Dashboard";
import Clients from "./pages/dashboard/Clients";
import Teams from "./pages/dashboard/Teams";
import Projects from "./pages/dashboard/Projects";
import Services from "./pages/dashboard/Services";
import Invoices from "./pages/dashboard/Invoices";
import Settings from "./pages/dashboard/Settings";
import AccessRoles from "./pages/dashboard/AccessRoles";
import Support from "./pages/dashboard/Support";
import Analytics from "./pages/dashboard/Analytics";
import TemplatesAdmin from "./pages/dashboard/TemplatesAdmin";

import ClientDetail from "./pages/dashboard/ClientDetail";
import ProjectDetail from "./pages/dashboard/ProjectDetail";

import TemplatePreviewPage from "./templates/TemplatePreviewPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { PERMISSIONS } from "./utils/permissions";

import ScrollToHash from "./sections/ScrollToHash";

import ScrollToTop from "./sections/ScrollToTop";

function Layout() {
  const location = useLocation();

  const hideNavbar =
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/templates/preview");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/signup" element={<SignupPage />} />

       
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/templates/preview/:id" element={<TemplatePreviewPage />} />

        <Route path="/dashboard" element={<ProtectedRoute permission={PERMISSIONS.VIEW_DASHBOARD}><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/clients" element={<ProtectedRoute permission={PERMISSIONS.VIEW_CLIENTS}><Clients /></ProtectedRoute>} />
        <Route path="/dashboard/teams" element={<ProtectedRoute permission={PERMISSIONS.MANAGE_TEAM}><Teams /></ProtectedRoute>} />
        <Route path="/dashboard/projects" element={<ProtectedRoute permission={PERMISSIONS.VIEW_PROJECTS}><Projects /></ProtectedRoute>} />
        <Route path="/dashboard/services" element={<ProtectedRoute permission={PERMISSIONS.VIEW_SERVICES}><Services /></ProtectedRoute>} />
        <Route path="/dashboard/invoices" element={<ProtectedRoute permission={PERMISSIONS.VIEW_INVOICES}><Invoices /></ProtectedRoute>} />
        <Route path="/dashboard/invoices/new" element={<ProtectedRoute permission={PERMISSIONS.CREATE_INVOICES}><Invoices /></ProtectedRoute>} />
        <Route path="/dashboard/access-roles" element={<ProtectedRoute permission={PERMISSIONS.ACCESS_SETTINGS}><AccessRoles /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute permission={PERMISSIONS.SYSTEM_SETTINGS}><Settings /></ProtectedRoute>} />
        <Route path="/dashboard/support" element={<ProtectedRoute permission={PERMISSIONS.SUPPORT_INFO}><Support /></ProtectedRoute>} />
        <Route path="/dashboard/analytics" element={<ProtectedRoute permission={PERMISSIONS.VIEW_REVENUE}><Analytics /></ProtectedRoute>} />
        <Route path="/dashboard/templates" element={<ProtectedRoute permission={PERMISSIONS.MANAGE_TEMPLATES}><TemplatesAdmin /></ProtectedRoute>} />

        <Route path="/dashboard/clients/:id" element={<ProtectedRoute permission={PERMISSIONS.VIEW_CLIENTS}><ClientDetail /></ProtectedRoute>} />
        <Route path="/dashboard/projects/:id" element={<ProtectedRoute permission={PERMISSIONS.VIEW_PROJECTS}><ProjectDetail /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  );
}

export default App;