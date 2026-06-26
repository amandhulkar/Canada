  // import { useState } from "react";
  // import { useNavigate } from "react-router-dom";
  // import Container from "../components/Container";
  // import Footer from "../sections/Footer";
  // import templates, { categories } from "../data/templates";

  // function TemplateCard({ template, onPreview }) {
  //   const [hovered, setHovered] = useState(false)
  //   const [loading, setLoading] = useState(false)
  //   const navigate = useNavigate()
  //   const API = import.meta.env.VITE_API_URL || "http://localhost:5000"

  //   const handleUseTemplate = async () => {
  //     if (loading) return

  //     const token = localStorage.getItem("token")
  //     if (!token) {
  //       alert("Please login first to use a template.")
  //       navigate("/login")
  //       return
  //     }

  //     setLoading(true)
  //     try {
  //       const res = await fetch(`${API}/api/projects`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: token,
  //         },
  //         body: JSON.stringify({
  //           name: `${template.name} Project`,
  //           client: "Self",
  //           startDate: new Date().toLocaleDateString("en-US"),
  //           deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US"),
  //           status: "Planning",
  //           team: "You",
  //           progress: 10,
  //           scopeOfWork: `Customize the ${template.name} template inside the dashboard workspace.`,
  //           deliverables: `Final editable website based on the ${template.name} template.`,
  //           templateId: String(template.id),
  //           templateData: template.defaultData || {},
  //         }),
  //       })

  //       if (!res.ok) {
  //         const errText = await res.text()
  //         throw new Error(errText || `Request failed with status ${res.status}`)
  //       }

  //       const project = await res.json()
  //       if (!project?._id) {
  //         throw new Error("Project created but no project id returned from server.")
  //       }

  //       navigate(`/dashboard/projects/${project._id}`)
  //     } catch (err) {
  //       console.error("Failed to create project from template:", err)
  //       alert(`Something went wrong: ${err.message}`)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   return (
  //     <div
  //       className="overflow-hidden rounded-2xl border bg-white"
  //       style={{
  //         borderColor: "#efefef",
  //         boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  //       }}
  //     >
  //       <div
  //         className="relative overflow-hidden"
  //         style={{ height: 220 }}
  //         onMouseEnter={() => setHovered(true)}
  //         onMouseLeave={() => setHovered(false)}
  //       >
  //         <img
  //           src={template.image}
  //           alt={template.name}
  //           className="h-full w-full object-cover transition-transform duration-500"
  //           style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
  //         />

  //         {/* Dark overlay on hover */}
  //         <div
  //           className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
  //           style={{
  //             background: "rgba(0,0,0,0.55)",
  //             opacity: hovered ? 1 : 0,
  //           }}
  //         >
  //           <button
  //             // onClick={() => onPreview(template)}
  //             onClick={() => navigate(`/templates/preview/${template.id}`)}
  //             className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
  //             style={{ background: "#fff", color: "#14132a" }}
  //           >
  //             Preview
  //           </button>
  //           <button
  //             onClick={handleUseTemplate}
  //             disabled={loading}
  //             className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
  //             style={{ background: "#6c5ce7" }}
  //           >
  //             {loading ? "Loading..." : "Use Template"}
  //           </button>
  //         </div>

  //         {/* Badge */}
  //         {template.badge && (
  //           <div
  //             className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white"
  //             style={{
  //               background: template.badge === "New" ? "#22c97c" : "#6c5ce7",
  //             }}
  //           >
  //             {template.badge}
  //           </div>
  //         )}
  //       </div>

  //       {/* Card footer */}
  //       <div className="flex items-center justify-between px-4 py-4">
  //         <div>
  //           <p className="text-sm font-semibold" style={{ color: "#14132a" }}>
  //             {template.name}
  //           </p>
  //           <p className="text-xs" style={{ color: "#aaa" }}>
  //             {template.category}
  //           </p>
  //         </div>
  //         <div className="flex items-center gap-3">
  //           <span
  //             className="rounded-full px-3 py-1 text-xs font-semibold"
  //             style={{ background: "#f0faf5", color: "#22c97c" }}
  //           >
  //             {template.price}
  //           </span>
  //           <span
  //             className="flex items-center gap-1 text-xs"
  //             style={{ color: "#888" }}
  //           >
  //             ★ {template.rating}
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // function TemplatesPage() {
  //   const [activeCategory, setActiveCategory] = useState("All");
  //   const [previewTemplate, setPreviewTemplate] = useState(null);

  //   const filtered =
  //     activeCategory === "All"
  //       ? templates
  //       : templates.filter((t) => t.category === activeCategory);

  //   return (
  //     <div className="min-h-screen bg-white pt-20">
  //       <Container className="py-12">
  //         {/* Header */}
  //         <div className="mb-10">
  //           <h1
  //             className="text-4xl font-extrabold tracking-[-0.03em]"
  //             style={{ color: "#14132a" }}
  //           >
  //             Browse Templates
  //           </h1>
  //           <p className="mt-2 text-base" style={{ color: "#888" }}>
  //             Professional templates to launch your site in minutes.
  //           </p>
  //         </div>

  //         {/* Category filters */}
  //         <div className="mb-6 flex flex-wrap gap-2">
  //           {categories.map((cat) => (
  //             <button
  //               key={cat}
  //               onClick={() => setActiveCategory(cat)}
  //               className="rounded-full px-4 py-1.5 text-sm font-medium transition"
  //               style={
  //                 activeCategory === cat
  //                   ? { background: "#6c5ce7", color: "#fff" }
  //                   : { background: "#f5f4ff", color: "#6c5ce7" }
  //               }
  //             >
  //               {cat}
  //             </button>
  //           ))}
  //         </div>

  //         {/* Count */}
  //         <p className="mb-6 text-sm" style={{ color: "#aaa" }}>
  //           Showing {filtered.length} templates
  //         </p>

  //         {/* Grid */}
  //         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  //           {filtered.map((template) => (
  //             <TemplateCard
  //               key={template.id}
  //               template={template}
  //               onPreview={setPreviewTemplate}
  //             />
  //           ))}
  //         </div>
  //       </Container>
  //       <Footer />

  //       {/* Preview Modal */}
  //       {previewTemplate && (
  //         <div
  //           className="fixed inset-0 z-50 flex items-center justify-center p-4"
  //           style={{ background: "rgba(0,0,0,0.6)" }}
  //           onClick={() => setPreviewTemplate(null)}
  //         >
  //           <div
  //             className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white"
  //             onClick={(e) => e.stopPropagation()}
  //           >
  //             <button
  //               onClick={() => setPreviewTemplate(null)}
  //               className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold"
  //               style={{ background: "rgba(255,255,255,0.9)", color: "#14132a" }}
  //             >
  //               ×
  //             </button>
  //             <img
  //               src={previewTemplate.image}
  //               alt={previewTemplate.name}
  //               className="h-[420px] w-full object-cover"
  //             />
  //             <div className="p-6">
  //               <div className="flex items-center justify-between">
  //                 <div>
  //                   <h2 className="text-2xl font-bold" style={{ color: "#14132a" }}>
  //                     {previewTemplate.name}
  //                   </h2>
  //                   <p className="text-sm" style={{ color: "#888" }}>
  //                     {previewTemplate.category}
  //                   </p>
  //                 </div>
  //                 <span
  //                   className="rounded-full px-4 py-1.5 text-sm font-semibold"
  //                   style={{ background: "#f0faf5", color: "#22c97c" }}
  //                 >
  //                   {previewTemplate.price}
  //                 </span>
  //               </div>
  //               <div className="mt-6 flex justify-end gap-3">
  //                 <button
  //                   onClick={() => setPreviewTemplate(null)}
  //                   className="rounded-full px-6 py-2.5 text-sm font-semibold"
  //                   style={{ background: "#f5f4ff", color: "#6c5ce7" }}
  //                 >
  //                   Close
  //                 </button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //   );
  // }

  // export default TemplatesPage;

    import { useEffect, useState } from "react";
  import { useNavigate, useSearchParams } from "react-router-dom";
  import Container from "../components/Container";
  import Footer from "../sections/Footer";
  import { getMergedTemplates, getTemplateCategories, staticTemplates } from "../utils/templatesApi";

  function TemplateCard({ template, onPreview }) {
    const [hovered, setHovered] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"

    const handleUseTemplate = async () => {
      if (loading) return

      const token = localStorage.getItem("token")
      const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");
      if (!token || !currentUser?._id) {
        navigate("/signup?tab=signin")
        return
      }

      const planExpired = (() => {
        if (!currentUser?.planEndsAt) return false;
        const endDate = new Date(currentUser.planEndsAt);
        return !Number.isNaN(endDate.getTime()) && endDate.getTime() < Date.now();
      })();
      const plan = planExpired ? null : currentUser?.plan;
      const isAdmin = currentUser?.role === "admin";

      setLoading(true)
      try {
        if (!isAdmin) {
          if (!plan) {
            alert(planExpired ? "Your plan has expired. Please renew or upgrade to use templates." : "Templates require a subscription. Please subscribe to a Pro ($299) or Business ($399) plan to use templates.");
            setLoading(false);
            return;
          }
          if (plan === "Plus") {
            alert("Your Plus plan ($199) does not include free templates. Please upgrade to a Pro ($299) or Business ($399) plan to use templates.");
            setLoading(false);
            return;
          }
          if (plan === "Pro") {
            const checkRes = await fetch(`${API}/api/projects`, {
              headers: { Authorization: token },
            });
            if (checkRes.ok) {
              const projectsList = await checkRes.json();
              const usedTemplatesCount = (Array.isArray(projectsList) ? projectsList : []).filter(p => p.templateId).length;
              if (usedTemplatesCount >= 4) {
                alert("You have reached the limit of 4 templates allowed under the Pro plan ($299). Please upgrade to the Business plan ($399) for unlimited template access.");
                setLoading(false);
                return;
              }
            }
          }
        }

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
        })

        if (!res.ok) {
          if (res.status === 401) {
            navigate("/signup?tab=signin")
            return
          }
          const errText = await res.text()
          throw new Error(errText || `Request failed with status ${res.status}`)
        }

        const project = await res.json()
        if (!project?._id) {
          throw new Error("Project created but no project id returned from server.")
        }

        navigate(`/dashboard/projects/${project._id}`)
      } catch (err) {
        console.error("Failed to create project from template:", err)
        let message = err.message
        try {
          message = JSON.parse(err.message).message || message
        } catch {
          // Use original message when it is not JSON.
        }
        alert(message)
      } finally {
        setLoading(false)
      }
    }

    return (
      <div
        className="overflow-hidden rounded-2xl border bg-white"
        style={{
          borderColor: "#efefef",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}
      >
        <div
          className="relative overflow-hidden"
          style={{ height: 220 }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src={template.image}
            alt={template.name}
            className="h-full w-full object-cover transition-transform duration-500"
            style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
          />

          {/* Dark overlay on hover */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300"
            style={{
              background: "rgba(0,0,0,0.55)",
              opacity: hovered ? 1 : 0,
            }}
          >
            <button
              // onClick={() => onPreview(template)}
              onClick={() => navigate(`/templates/preview/${template.id}`)}
              className="rounded-full px-6 py-2.5 text-sm font-semibold transition hover:bg-gray-100"
              style={{ background: "#fff", color: "#14132a" }}
            >
              Preview
            </button>
            <button
              onClick={handleUseTemplate}
              disabled={loading}
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition disabled:opacity-60"
              style={{ background: "#6c5ce7" }}
            >
              {loading ? "Loading..." : "Use Template"}
            </button>
          </div>

          {/* Badge */}
          {template.badge && (
            <div
              className="absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{
                background: template.badge === "New" ? "#22c97c" : "#6c5ce7",
              }}
            >
              {template.badge}
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="flex items-center justify-between px-4 py-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#14132a" }}>
              {template.name}
            </p>
            <p className="text-xs" style={{ color: "#aaa" }}>
              {template.category}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: "#f0faf5", color: "#22c97c" }}
            >
              {template.price}
            </span>
            <span
              className="flex items-center gap-1 text-xs"
              style={{ color: "#888" }}
            >
              ★ {template.rating}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function TemplatesPage() {
    const [searchParams] = useSearchParams();
    const [activeCategory, setActiveCategory] = useState(searchParams.get("category") || "All");
    const [searchQuery, setSearchQuery] = useState("");
    const [previewTemplate, setPreviewTemplate] = useState(null);
    const [templates, setTemplates] = useState(staticTemplates);

    useEffect(() => {
      setActiveCategory(searchParams.get("category") || "All");
    }, [searchParams]);

    useEffect(() => {
      let isMounted = true;
      const loadTemplates = () => {
        getMergedTemplates().then((mergedTemplates) => {
          if (isMounted) setTemplates(mergedTemplates);
        });
      };

      loadTemplates();
      window.addEventListener("templates:changed", loadTemplates);
      window.addEventListener("focus", loadTemplates);

      return () => {
        isMounted = false;
        window.removeEventListener("templates:changed", loadTemplates);
        window.removeEventListener("focus", loadTemplates);
      };
    }, []);

    const categories = getTemplateCategories(templates);

    // const filtered =
    //   activeCategory === "All"
    //     ? templates
    //     : templates.filter((t) => t.category === activeCategory);

    const filtered = templates.filter((t) => {
    const matchesCategory = activeCategory === "All" || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

    return (
      <div className="min-h-screen bg-white pt-20">

        {/* HERO SECTION — YE ADD KAR */}
      <div style={{ background: "linear-gradient(135deg, #f5f5f5 0%, #efefef 50%, #f9f9f9 100%)" }}
        className="px-4 py-12 sm:py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#6c5ce7" }}>
          TEMPLATES
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] mb-4" style={{ color: "#14132a" }}>
          Select Your{" "}
          <span style={{ color: "#6c5ce7" }}>template</span>
        </h1>
        <p className="mx-auto max-w-2xl text-sm sm:text-base mb-8" style={{ color: "#888" }}>
          {templates.length} professionally designed templates for key business categories. Fully customizable — no design skills needed.
        </p>

        {/* Search Bar */}
        <div className="mx-auto max-w-xl px-4">
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3.5"
            style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.08)" }}>
            <span className="text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search templates (e.g. restaurant, portfolio, shop)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm outline-none"
              style={{ color: "#14132a" }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm" style={{ color: "#888" }}>
          <p><strong style={{ color: "#14132a" }}>{templates.length}</strong> Templates</p>
          <p><strong style={{ color: "#14132a" }}>{categories.length - 1}</strong> Categories</p>
          <p><strong style={{ color: "#14132a" }}>$199</strong> per download</p>
          <p><strong style={{ color: "#14132a" }}>Mobile</strong> Responsive</p>
        </div>
      </div>

        <Container className="py-12">
          {/* Header */}
          {/* <div className="mb-10">
            <h1
              className="text-4xl font-extrabold tracking-[-0.03em]"
              style={{ color: "#14132a" }}
            >
              Browse Templates
            </h1>
            <p className="mt-2 text-base" style={{ color: "#888" }}>
              Professional templates to launch your site in minutes.
            </p>
          </div> */}

          {/* Category filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition"
                style={
                  activeCategory === cat
                    ? { background: "#6c5ce7", color: "#fff" }
                    : { background: "#f5f4ff", color: "#6c5ce7" }
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count */}
          <p className="mb-6 text-sm" style={{ color: "#aaa" }}>
            Showing {filtered.length} templates
          </p>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
                onPreview={setPreviewTemplate}
              />
            ))}
          </div>
        </Container>
        <Footer />

        {/* Preview Modal */}
        {previewTemplate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.6)" }}
            onClick={() => setPreviewTemplate(null)}
          >
            <div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold"
                style={{ background: "rgba(255,255,255,0.9)", color: "#14132a" }}
              >
                ×
              </button>
              <img
                src={previewTemplate.image}
                alt={previewTemplate.name}
                className="h-56 sm:h-72 md:h-[420px] w-full object-cover"
              />
              <div className="p-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold" style={{ color: "#14132a" }}>
                      {previewTemplate.name}
                    </h2>
                    <p className="text-sm" style={{ color: "#888" }}>
                      {previewTemplate.category}
                    </p>
                  </div>
                  <span
                    className="rounded-full px-4 py-1.5 text-sm font-semibold"
                    style={{ background: "#f0faf5", color: "#22c97c" }}
                  >
                    {previewTemplate.price}
                  </span>
                </div>
                <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="rounded-full px-6 py-2.5 text-sm font-semibold"
                    style={{ background: "#f5f4ff", color: "#6c5ce7" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  export default TemplatesPage;