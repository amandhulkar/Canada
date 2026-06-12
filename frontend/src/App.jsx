// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import HelpCenter from './pages/HelpCenter'
// import PrivacyPolicy from './pages/PrivacyPolicy'
// import SignupPage from './pages/SignupPage'
// import Navbar from './sections/Navbar'
// // import Footer from './sections/Footer'

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/help-center" element={<HelpCenter />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/signup" element={<SignupPage />} />
//       </Routes>
//       {/* <Footer /> */}
//     </BrowserRouter>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import HelpCenter from './pages/HelpCenter'
import PrivacyPolicy from './pages/PrivacyPolicy'
import SignupPage from './pages/SignupPage'
import Navbar from './sections/Navbar'
// import Footer from './sections/Footer'
import TemplateGallery from './pages/TemplatesPage'

function Layout() {
  const location = useLocation()
  const hideNavbar = location.pathname === '/signup'

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/templates" element={<TemplateGallery />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App  