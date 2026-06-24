import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { findTemplateById } from "../utils/templatesApi";

const NAV_LINKS = ["Home", "About", "Features", "Contact"];

const DEMO_FEATURES = [
  {
    title: "Shoppable product spotlights",
    desc: "Highlight new arrivals, best sellers, and editorial photography in a premium ecommerce layout.",
  },
  {
    title: "Editorial collection banners",
    desc: "Highlight new arrivals, best sellers, and editorial photography in a premium ecommerce layout.",
  },
  {
    title: "Clean cart-focused CTAs",
    desc: "Highlight new arrivals, best sellers, and editorial photography in a premium ecommerce layout.",
  },
];

const DEMO_STATS = [
  { value: "24", label: "Products" },
  { value: "3",  label: "Banners"  },
  { value: "2.1s", label: "Speed"  },
  { value: "75%", label: "Repeat flow" },
];

function TemplatePreviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setPageLoading(true);
    findTemplateById(id).then((foundTemplate) => {
      if (isMounted) {
        setTemplate(foundTemplate || null);
        setPageLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (pageLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F8]">
        <p className="text-gray-500 text-lg">Loading template...</p>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F2F8]">
        <div className="text-center">
          <p className="text-4xl mb-4">😕</p>
          <h2 className="text-xl font-bold text-[#14132a] mb-2">Template not found</h2>
          <button
            onClick={() => navigate("/templates")}
            className="mt-4 rounded-full px-6 py-2.5 text-sm font-semibold text-white"
            style={{ background: "#6c5ce7" }}
          >
            ← Back to Templates
          </button>
        </div>
      </div>
    );
  }

  const previewData = template.defaultData || {};
  const previewTitle = previewData.heroTitle || "A stylish storefront built to sell collections fast.";
  const previewSubtitle = previewData.heroSubtitle || "Highlight new arrivals, best sellers, and editorial photography in a premium ecommerce layout.";
  const previewAbout = previewData.aboutText || "This demo combines product storytelling and fast purchase paths for fashion-focused brands.";
  const previewImage = template.image || previewData.heroImage;

  const handleUseTemplate = async () => {
    if (loading) return;
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first to use a template.");
      navigate("/login");
      return;
    }
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          name: `${template.name} Project`,
          client: "Self",
          startDate: new Date().toLocaleDateString("en-US"),
          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
          status: "Planning",
          team: "You",
          progress: 10,
          scopeOfWork: `Customize the ${template.name} template inside the dashboard workspace.`,
          deliverables: `Final editable website based on the ${template.name} template.`,
          templateId: String(template.id),
          templateData: template.defaultData || {},
        }),
      });
      if (!res.ok) throw new Error(await res.text() || `Status ${res.status}`);
      const project = await res.json();
      if (!project?._id) throw new Error("No project ID returned.");
      navigate(`/dashboard/projects/${project._id}`);
    } catch (err) {
      console.error(err);
      alert(`Something went wrong: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F8] font-sans">

      {/* ── Sticky Top Action Bar ── */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3"
        style={{ background: "#14132a" }}
      >
        <span className="text-sm font-semibold text-white/60 hidden sm:block">
          Preview — {template.name}
        </span>
        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => navigate("/templates")}
            className="rounded-full px-5 py-2 text-sm font-semibold transition hover:bg-white/10"
            style={{ color: "#fff", border: "1px solid rgba(255,255,255,0.25)" }}
          >
            ← Back to Templates
          </button>
          <button
            onClick={handleUseTemplate}
            disabled={loading}
            className="rounded-full px-5 py-2 text-sm font-semibold text-white transition disabled:opacity-60 hover:opacity-90"
            style={{ background: "#E91E8C" }}
          >
            {loading ? "Loading..." : "Use This Template"}
          </button>
        </div>
      </div>

      {/* ── Demo Navbar ── */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-[#E91E8C] font-bold text-xl tracking-tight">
            Maison Rue
          </span>
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <a href="#" className="text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-600 text-sm font-medium">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* Left: Text */}
          <div className="flex-1 max-w-xl">
            <p className="text-[#E91E8C] font-semibold text-sm mb-4 tracking-wide">
              Store Demo
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#1A1A2E] leading-tight mb-6">
              {previewTitle}
            </h1>
            <p className="text-gray-500 text-base mb-10 leading-relaxed">
              {previewSubtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleUseTemplate}
                disabled={loading}
                className="font-semibold px-7 py-3 rounded-full transition-all duration-200 shadow-md hover:scale-[1.02] active:scale-95 disabled:opacity-60"
                style={{ background: "#E91E8C", color: "#fff" }}
              >
                {loading ? "Loading..." : "Use This Template"}
              </button>
              <button
                onClick={() => navigate("/templates")}
                className="border-2 border-[#E91E8C] text-[#E91E8C] hover:bg-pink-50 font-semibold px-7 py-3 rounded-full transition-all duration-200 active:scale-95"
              >
                Back to Templates
              </button>
            </div>
          </div>

          {/* Right: Image Card */}
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-300/30 via-purple-200/20 to-transparent rounded-3xl blur-2xl scale-105 -z-10" />
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-white/60">
              <img
                src={previewImage}
                alt={template.name}
                className="w-full h-72 md:h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <h2 className="text-3xl font-extrabold text-[#1A1A2E] mb-2">
          Optimized for online sales
        </h2>
        <p className="text-gray-500 mb-10">
          {previewAbout}
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {DEMO_FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
            >
              <h3 className="font-bold text-[#1A1A2E] text-base mb-3">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {DEMO_STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
            >
              <p className="text-[#E91E8C] text-3xl font-extrabold mb-1">{s.value}</p>
              <p className="text-gray-500 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-200 mt-4">
        <p className="text-gray-400 text-sm">Demo website preview for FindTemplates templates.</p>
      </footer>

    </div>
  );
}

export default TemplatePreviewPage;