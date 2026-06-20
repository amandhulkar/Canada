// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

// import Home from "./pages/Home";
// import HelpCenter from "./pages/HelpCenter";
// import PrivacyPolicy from "./pages/PrivacyPolicy";
// import SignupPage from "./pages/SignupPage";
// import Navbar from "./sections/Navbar";

// import TemplatesPage from "./pages/TemplatesPage";

// import Dashboard from "./pages/dashboard/Dashboard";
// import Clients from "./pages/dashboard/Clients";
// import Teams from "./pages/dashboard/Teams";
// import Projects from "./pages/dashboard/Projects";
// import Services from "./pages/dashboard/Services";
// import Invoices from "./pages/dashboard/Invoices";
// import Settings from "./pages/dashboard/Settings";
// import AccessRoles from "./pages/dashboard/AccessRoles";
// import Support from "./pages/dashboard/Support";

// import ClientDetail from "./pages/dashboard/ClientDetail";
// import ProjectDetail from "./pages/dashboard/ProjectDetail";

// import TemplatePreviewPage from "./templates/TemplatePreviewPage";

// function Layout() {
//   const location = useLocation();

//   const hideNavbar =
//     location.pathname === "/signup" ||
//     location.pathname.startsWith("/dashboard") ||
//     location.pathname.startsWith("/templates/preview");

//   return (
//     <>
//       {!hideNavbar && <Navbar />}

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/help-center" element={<HelpCenter />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* ✅ TEMPLATES ROUTES */}
//         <Route path="/templates" element={<TemplatesPage />} />
//         <Route path="/templates/preview/:id" element={<TemplatePreviewPage />} />

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/clients" element={<Clients />} />
//         <Route path="/dashboard/teams" element={<Teams />} />
//         <Route path="/dashboard/projects" element={<Projects />} />
//         <Route path="/dashboard/services" element={<Services />} />
//         <Route path="/dashboard/invoices" element={<Invoices />} />
//         <Route path="/dashboard/invoices/new" element={<Invoices />} />
//         <Route path="/dashboard/access-roles" element={<AccessRoles />} />
//         <Route path="/dashboard/settings" element={<Settings />} />
//         <Route path="/dashboard/support" element={<Support />} />

//         <Route path="/dashboard/clients/:id" element={<ClientDetail />} />
//         <Route path="/dashboard/projects/:id" element={<ProjectDetail />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   return (
//     <BrowserRouter>
//       <Layout />
//     </BrowserRouter>
//   );
// }

// export default App;

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

import ClientDetail from "./pages/dashboard/ClientDetail";
import ProjectDetail from "./pages/dashboard/ProjectDetail";

import TemplatePreviewPage from "./templates/TemplatePreviewPage";

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
        <Route path="/dashboard/analytics" element={<Analytics />} />

        <Route path="/dashboard/clients/:id" element={<ClientDetail />} />
        <Route path="/dashboard/projects/:id" element={<ProjectDetail />} />
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