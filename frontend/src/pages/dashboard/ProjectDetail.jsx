// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";

// import templates from "../../data/templates";

// import BusinessTemplate from "../../templates/BusinessTemplate";

// const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

// function ProjectDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [activeTab, setActiveTab] = useState("overview");
//   const [editMode, setEditMode] = useState(false);

//   const [templateData, setTemplateData] = useState({});

//   const template = templates.find(
//     (t) => String(t.id) === String(project?.templateId),
//   );

//   useEffect(() => {
//     if (project) {
//       const hasSavedData =
//         project.templateData && Object.keys(project.templateData).length > 0;
//       setTemplateData(
//         hasSavedData ? project.templateData : template?.defaultData || {},
//       );
//     }
//   }, [project]);

//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editForm, setEditForm] = useState({});

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     fetch(`${API}/api/projects/${id}`, {
//       headers: { Authorization: token },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setProject(data);
//         setEditForm(data);
//       })
//       .catch((err) => console.log(err));
//   }, [id]);

//   const handleSave = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API}/api/projects/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: token,
//       },
//       body: JSON.stringify(editForm),
//     });
//     const updated = await res.json();
//     setProject(updated);
//     setShowEditModal(false);
//   };

//   const handleSaveTemplate = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API}/api/projects/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json", Authorization: token },
//       body: JSON.stringify({ ...project, templateData }),
//     });
//     const updated = await res.json();
//     setProject(updated);
//     alert("Changes saved!");
//   };

//   const handleDownload = () => {
//     const html = `<!DOCTYPE html>
// <html>
// <head>
// <meta charset="UTF-8" />
// <title>${templateData.heroTitle || project.name}</title>
// <style>
//   body{font-family:Arial,sans-serif;margin:0;color:#222;}
//   .hero{position:relative;height:480px;background:url('${templateData.heroImage}') center/cover no-repeat;display:flex;align-items:center;justify-content:center;}
//   .hero::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,0.45);}
//   .hero-content{position:relative;z-index:2;color:#fff;text-align:center;max-width:700px;padding:0 20px;}
//   .hero-content h1{font-size:42px;margin-bottom:12px;}
//   .about{max-width:700px;margin:0 auto;padding:60px 20px;text-align:center;}
//   .about p{font-size:18px;line-height:1.6;color:#555;}
// </style>
// </head>
// <body>
//   <div class="hero">
//     <div class="hero-content">
//       <h1>${templateData.heroTitle || ""}</h1>
//       <p>${templateData.heroSubtitle || ""}</p>
//     </div>
//   </div>
//   <div class="about"><p>${templateData.aboutText || ""}</p></div>
// </body>
// </html>`;
//     const blob = new Blob([html], { type: "text/html" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `${(project.name || "website").replace(/\s+/g, "_")}.html`;
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   //   const handleComplete = async () => {
//   //     const token = localStorage.getItem("token");
//   //     const res = await fetch(`${API}/api/projects/${id}`, {
//   //       method: "PUT",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: token,
//   //       },
//   //       body: JSON.stringify({ ...project, status: "Live" }),
//   //     });
//   //     const updated = await res.json();
//   //     setProject(updated);
//   //   };

//   const handleComplete = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch(`${API}/api/projects/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json", Authorization: token },
//       body: JSON.stringify({ ...project, status: "Live", completed: true }),
//     });
//     const updated = await res.json();
//     setProject(updated);
//   };

//   if (!project)
//     return (
//       <div className="flex min-h-screen bg-slate-100">
//         <Sidebar />
//         <main className="flex-1 flex items-center justify-center">
//           <p className="text-gray-400 text-lg">Loading...</p>
//         </main>
//       </div>
//     );

//   return (
//     <div className="flex min-h-screen bg-slate-100">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <p className="text-sm text-gray-400 mb-1">
//               <span
//                 className="cursor-pointer hover:text-indigo-600"
//                 onClick={() => navigate("/dashboard/projects")}
//               >
//                 Projects
//               </span>
//               {" › "}
//               {project.name}
//             </p>
//             <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
//             <p className="text-gray-400 mt-1">{project.client}</p>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
//               {project.status}
//             </span>
//             <button
//               onClick={() => navigate("/dashboard/projects")}
//               className="text-sm text-gray-500 hover:text-indigo-600"
//             >
//               ← Back
//             </button>
//             <button
//               onClick={() => setShowEditModal(true)}
//               className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
//             >
//               ✏️ Edit Project
//             </button>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-6 border-b border-gray-200 mb-6">
//           {["overview", "taskboard", "workspace"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`pb-3 text-sm font-semibold capitalize transition border-b-2 ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
//             >
//               {tab === "overview"
//                 ? "Overview"
//                 : tab === "taskboard"
//                   ? "Task Board"
//                   : "Template Workspace"}
//             </button>
//           ))}
//         </div>

//         {/* Overview Tab */}
//         {activeTab === "overview" && (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2 space-y-6">
//               {/* Progress */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h2 className="text-lg font-bold text-indigo-700 mb-4">
//                   Overall Progress
//                 </h2>
//                 <div className="w-full bg-gray-100 rounded-full h-3">
//                   <div
//                     className="bg-indigo-500 h-3 rounded-full transition-all"
//                     style={{ width: `${project.progress || 0}%` }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-400 mt-2">
//                   <span>{project.progress || 0}% complete</span>
//                   <span>
//                     {project.deadline ? `Deadline: ${project.deadline}` : ""}
//                   </span>
//                 </div>
//               </div>

//               {/* Project Overview */}
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h2 className="text-lg font-bold text-indigo-700 mb-4">
//                   🎯 Project Overview
//                 </h2>
//                 <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
//                   Scope of Work
//                 </p>
//                 <p className="text-gray-600 mb-4">
//                   {project.scopeOfWork || "—"}
//                 </p>
//                 <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
//                   Deliverables
//                 </p>
//                 <p className="text-gray-600">{project.deliverables || "—"}</p>
//               </div>
//             </div>

//             {/* Details + Milestones */}
//             <div className="space-y-6">
//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h2 className="text-lg font-bold mb-4">📋 Details</h2>
//                 <div className="space-y-3 text-sm">
//                   <div>
//                     <p className="text-gray-400 uppercase text-xs font-semibold">
//                       Start Date
//                     </p>
//                     <p className="font-semibold">{project.startDate}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 uppercase text-xs font-semibold">
//                       Deadline
//                     </p>
//                     <p className="font-semibold">{project.deadline}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 uppercase text-xs font-semibold">
//                       Client
//                     </p>
//                     <p className="font-semibold">{project.client}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 uppercase text-xs font-semibold">
//                       Assigned Team
//                     </p>
//                     <p className="font-semibold">{project.team}</p>
//                   </div>
//                   <div>
//                     <p className="text-gray-400 uppercase text-xs font-semibold">
//                       Status
//                     </p>
//                     <p className="font-semibold">{project.status}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-xl p-6 shadow-sm">
//                 <h2 className="text-lg font-bold mb-4">🏁 Milestones</h2>
//                 <div className="space-y-3">
//                   {[
//                     "Project Kickoff",
//                     "Design Phase",
//                     "Development",
//                     "Testing",
//                     "Go Live",
//                   ].map((m, i) => (
//                     <div key={i} className="flex items-start gap-3">
//                       <div className="w-4 h-4 rounded-full border-2 border-indigo-400 bg-white mt-0.5 flex-shrink-0"></div>
//                       <div>
//                         <p className="text-sm font-semibold text-gray-700">
//                           {m}
//                         </p>
//                         <p className="text-xs text-gray-400">
//                           {
//                             [
//                               "Project initiated",
//                               "Wireframes & UI",
//                               "Build & code",
//                               "QA & client review",
//                               "Launch to production",
//                             ][i]
//                           }
//                         </p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Task Board Tab */}
//         {activeTab === "taskboard" && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {["To Do", "In Progress", "Done"].map((col) => (
//               <div key={col} className="bg-white rounded-xl p-4 shadow-sm">
//                 <h3 className="font-bold text-gray-700 mb-4">{col}</h3>
//                 <div className="text-center py-10 text-gray-300 text-sm">
//                   No tasks yet
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Template Workspace Tab */}

//         {activeTab === "workspace" && (
//           <div className="bg-white rounded-xl shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-3 bg-gray-50">
//               <div>
//                 <h2 className="text-base font-bold text-gray-800">
//                   🖥 Template Workspace
//                 </h2>
//                 <p className="text-xs text-gray-400 mt-0.5">
//                   {template
//                     ? `Editing "${template.name}"`
//                     : "No template linked"}
//                 </p>
//               </div>
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={() => setEditMode(!editMode)}
//                   className="text-xs font-semibold px-3 py-2 rounded-lg border transition"
//                   style={{
//                     borderColor: "#6366f1",
//                     color: editMode ? "#fff" : "#6366f1",
//                     background: editMode ? "#6366f1" : "transparent",
//                   }}
//                 >
//                   {editMode ? "👁 Preview Mode" : "✏️ Edit Mode"}
//                 </button>
//                 <button
//                   onClick={handleSaveTemplate}
//                   className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-200 transition"
//                 >
//                   💾 Save
//                 </button>
//                 <button
//                   onClick={handleComplete}
//                   className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition"
//                 >
//                   ✅ Complete
//                 </button>
//                 {project.completed && (
//                   <button
//                     onClick={handleDownload}
//                     className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-black transition"
//                   >
//                     ⬇ Download
//                   </button>
//                 )}
//               </div>
//             </div>

//             {!template ? (
//               <div className="p-10 text-center text-gray-400 bg-gray-50">
//                 Is project ke saath koi template select nahi hua.
//               </div>
//             ) : (
//               <div
//                 className={`flex ${editMode ? "flex-col lg:flex-row" : "flex-col"}`}
//               >
//                 {/* ── LEFT: Edit Panel (only in edit mode) ── */}
//                 {editMode && (
//                   <div
//                     className="w-full lg:w-80 flex-shrink-0 border-r border-gray-100 bg-gray-50 p-6 space-y-5 overflow-y-auto"
//                     style={{ maxHeight: "80vh" }}
//                   >
//                     <h3 className="text-sm font-bold text-gray-700 mb-2">
//                       Edit Content
//                     </h3>

//                     {/* Hero Title */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
//                         Hero Title
//                       </label>
//                       <input
//                         value={templateData.heroTitle || ""}
//                         onChange={(e) =>
//                           setTemplateData({
//                             ...templateData,
//                             heroTitle: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                         placeholder="Your main heading"
//                       />
//                     </div>

//                     {/* Hero Subtitle */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
//                         Hero Subtitle
//                       </label>
//                       <textarea
//                         value={templateData.heroSubtitle || ""}
//                         onChange={(e) =>
//                           setTemplateData({
//                             ...templateData,
//                             heroSubtitle: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                         rows={3}
//                         placeholder="Your subtitle or tagline"
//                       />
//                     </div>

//                     {/* About Text */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
//                         About Text
//                       </label>
//                       <textarea
//                         value={templateData.aboutText || ""}
//                         onChange={(e) =>
//                           setTemplateData({
//                             ...templateData,
//                             aboutText: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                         rows={4}
//                         placeholder="Tell your story..."
//                       />
//                     </div>

//                     {/* Hero Image URL */}
//                     <div>
//                       <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
//                         Hero Image URL
//                       </label>
//                       <input
//                         value={templateData.heroImage || ""}
//                         onChange={(e) =>
//                           setTemplateData({
//                             ...templateData,
//                             heroImage: e.target.value,
//                           })
//                         }
//                         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                         placeholder="https://..."
//                       />
//                       {templateData.heroImage && (
//                         <img
//                           src={templateData.heroImage}
//                           alt="preview"
//                           className="mt-2 w-full h-24 object-cover rounded-lg border border-gray-200"
//                         />
//                       )}
//                     </div>

//                     {/* Save Button */}
//                     <button
//                       onClick={handleSaveTemplate}
//                       className="w-full py-2.5 rounded-lg font-semibold text-white text-sm hover:opacity-90 transition"
//                       style={{ background: "#6366f1" }}
//                     >
//                       💾 Save Changes
//                     </button>
//                   </div>
//                 )}

//                 {/* ── RIGHT: Live Preview ── */}
//                 <div
//                   className="flex-1 overflow-y-auto"
//                   style={{ maxHeight: "80vh" }}
//                 >
//                   <BusinessTemplate data={templateData} />
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Edit Modal */}
//         {showEditModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold">Edit Project</h2>
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   className="text-gray-400 hover:text-gray-600 text-xl"
//                 >
//                   ✕
//                 </button>
//               </div>
//               <div className="space-y-4">
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Project Name *
//                   </label>
//                   <input
//                     value={editForm.name || ""}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, name: e.target.value })
//                     }
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                   />
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Client Name
//                     </label>
//                     <input
//                       value={editForm.client || ""}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, client: e.target.value })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Status
//                     </label>
//                     <select
//                       value={editForm.status || ""}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, status: e.target.value })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     >
//                       {[
//                         "Planning",
//                         "Design",
//                         "Development",
//                         "Testing",
//                         "Live",
//                         "On Hold",
//                       ].map((s) => (
//                         <option key={s}>{s}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Start Date
//                     </label>
//                     <input
//                       type="date"
//                       value={editForm.startDate || ""}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, startDate: e.target.value })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Deadline
//                     </label>
//                     <input
//                       type="date"
//                       value={editForm.deadline || ""}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, deadline: e.target.value })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     />
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Assigned Team
//                     </label>
//                     <input
//                       value={editForm.team || ""}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, team: e.target.value })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     />
//                   </div>
//                   <div>
//                     <label className="text-sm font-semibold text-gray-600">
//                       Progress (%)
//                     </label>
//                     <input
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={editForm.progress || 0}
//                       onChange={(e) =>
//                         setEditForm({
//                           ...editForm,
//                           progress: Number(e.target.value),
//                         })
//                       }
//                       className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Scope of Work
//                   </label>
//                   <textarea
//                     value={editForm.scopeOfWork || ""}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, scopeOfWork: e.target.value })
//                     }
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     rows={3}
//                   />
//                 </div>
//                 <div>
//                   <label className="text-sm font-semibold text-gray-600">
//                     Deliverables
//                   </label>
//                   <textarea
//                     value={editForm.deliverables || ""}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, deliverables: e.target.value })
//                     }
//                     className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
//                     rows={3}
//                   />
//                 </div>
//                 <button
//                   onClick={handleSave}
//                   className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default ProjectDetail;


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import templates from "../../data/templates";
import BusinessTemplate from "../../templates/BusinessTemplate";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const DEFAULT_TEMPLATE_DATA = {
  heroImage: "",
  heroTitle: "",
  heroSubtitle: "",
  aboutText: "",
  brandName: "",
  service1Title: "Fast Delivery",
  service1Desc: "Quick turnaround on all orders and projects.",
  service2Title: "Premium Quality",
  service2Desc: "Crafted with attention to every detail.",
  service3Title: "24/7 Support",
  service3Desc: "We're always here when you need us.",
  ctaHeading: "Ready to Get Started?",
  ctaSubtext: "Join thousands of happy customers today.",
  contactEmail: "",
  contactPhone: "",
  footerText: "",
};

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);
  const [templateData, setTemplateData] = useState(DEFAULT_TEMPLATE_DATA);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  const COLUMNS = ["To Do", "Design", "Development", "Testing", "Client Review"];

  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem(`tasks_project_${id}`);
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "task-default-1",
        title: "Review Design Deliverables",
        description: "Submit final UI layout templates for client feedback & approval.",
        status: "Client Review",
        priority: "High",
        deadline: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
      }
    ];
  });

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState("To Do");
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  useEffect(() => {
    localStorage.setItem(`tasks_project_${id}`, JSON.stringify(tasks));
  }, [tasks, id]);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStatus) => {
    const taskId = e.dataTransfer.getData("text/plain");
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: targetStatus };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    if (confirm("Delete this task?")) {
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const template = templates.find(
    (t) => String(t.id) === String(project?.templateId)
  );

  useEffect(() => {
    if (project) {
      const saved = project.templateData && Object.keys(project.templateData).length > 0;
      const base = saved ? project.templateData : template?.defaultData || {};
      setTemplateData({ ...DEFAULT_TEMPLATE_DATA, ...base });
    }
  }, [project]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/projects/${id}`, { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => { setProject(data); setEditForm(data); })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(editForm),
    });
    const updated = await res.json();
    setProject(updated);
    setShowEditModal(false);
  };

  const handleSaveTemplate = async () => {
    const token = localStorage.getItem("token");
    const projectToSave = { ...project, templateData };
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(projectToSave),
    });
    const updated = await res.json();
    setProject({ ...projectToSave, ...updated, templateData });
    alert("✅ Changes saved!");
  };

  const handleComplete = async () => {
    const token = localStorage.getItem("token");
    const completedProject = {
      ...project,
      status: "Live",
      completed: true,
      progress: 100,
      templateData,
    };
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify(completedProject),
    });
    const updated = await res.json();
    setProject({ ...completedProject, ...updated, progress: 100, templateData });
    setEditForm({ ...completedProject, ...updated, progress: 100, templateData });
  };

  const handleDownload = async () => {
    const getAssetFileName = (url, fallback = "hero-image") => {
      try {
        const pathname = new URL(url).pathname;
        const fileName = pathname.split("/").filter(Boolean).pop() || fallback;
        return fileName.includes(".") ? fileName : `${fileName}.jpg`;
      } catch {
        return `${fallback}.jpg`;
      }
    };

    const {
      heroImage = "",
      heroTitle = project.name || "My Website",
      heroSubtitle = "",
      aboutText = "",
      brandName = "",
      service1Title = "Fast Delivery",
      service1Desc = "Quick turnaround on all orders.",
      service2Title = "Premium Quality",
      service2Desc = "Crafted with attention to detail.",
      service3Title = "24/7 Support",
      service3Desc = "Always here when you need us.",
      ctaHeading = "Ready to Get Started?",
      ctaSubtext = "Join thousands of happy customers today.",
      contactEmail = "",
      contactPhone = "",
      footerText = "",
    } = templateData;

    const brand = brandName || heroTitle.split(" ").slice(0, 2).join(" ");
    const footer = footerText || `© 2026 ${brand}. All rights reserved.`;
    const heroImageFileName = heroImage ? getAssetFileName(heroImage) : "";
    const heroImagePath = heroImageFileName ? `assets/${heroImageFileName}` : "";

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>${heroTitle}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; scroll-behavior: smooth; }

    /* NAVBAR */
    nav {
      position: sticky; top: 0; z-index: 100;
      background: #fff; border-bottom: 1px solid #f0f0f0;
      padding: 16px 40px; display: flex; align-items: center; justify-content: space-between;
    }
    .brand { color: #E91E8C; font-size: 20px; font-weight: 800; }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a { text-decoration: none; color: #666; font-size: 14px; font-weight: 500; transition: color 0.2s; }
    .nav-links a:hover { color: #E91E8C; }
    .nav-cta { background: #E91E8C; color: #fff; border: none; cursor: pointer; padding: 10px 22px; border-radius: 999px; font-size: 14px; font-weight: 600; text-decoration: none; }

    /* HERO */
    .hero { position: relative; height: 520px; background: ${heroImagePath ? `url('${heroImagePath}') center/cover no-repeat` : "linear-gradient(135deg, #f472b6, #6366f1)"}; display: flex; align-items: center; justify-content: center; text-align: center; }
    .hero-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.52); }
    .hero-content { position: relative; z-index: 2; color: #fff; max-width: 750px; padding: 0 24px; }
    .hero-content h1 { font-size: 52px; font-weight: 900; line-height: 1.15; margin-bottom: 16px; }
    .hero-content p { font-size: 20px; opacity: 0.85; margin-bottom: 32px; }
    .hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
    .btn-primary { background: #E91E8C; color: #fff; border: none; padding: 14px 36px; border-radius: 999px; font-size: 15px; font-weight: 700; text-decoration: none; }
    .btn-outline { background: transparent; color: #fff; border: 2px solid #fff; padding: 14px 36px; border-radius: 999px; font-size: 15px; font-weight: 700; text-decoration: none; }

    /* SECTIONS */
    .section-label { color: #E91E8C; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
    .section-title { font-size: 32px; font-weight: 900; color: #1A1A2E; margin-bottom: 20px; }

    /* ABOUT */
    .about { background: #F0F2F8; padding: 80px 24px; text-align: center; }
    .about p.body-text { font-size: 18px; line-height: 1.8; color: #555; max-width: 680px; margin: 0 auto; }

    /* SERVICES */
    .services { background: #fff; padding: 72px 24px; }
    .services-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
    .services-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 40px; }
    .service-card { background: #F0F2F8; border-radius: 16px; padding: 32px 24px; text-align: center; }
    .service-icon { font-size: 40px; margin-bottom: 12px; }
    .service-card h3 { font-size: 17px; font-weight: 800; color: #1A1A2E; margin-bottom: 8px; }
    .service-card p { font-size: 14px; color: #666; line-height: 1.6; }

    /* CTA */
    .cta-banner { background: #E91E8C; padding: 64px 24px; text-align: center; }
    .cta-banner h2 { font-size: 36px; font-weight: 900; color: #fff; margin-bottom: 12px; }
    .cta-banner p { font-size: 18px; color: rgba(255,255,255,0.85); margin-bottom: 32px; }
    .btn-white { background: #fff; color: #E91E8C; border: none; padding: 14px 40px; border-radius: 999px; font-size: 15px; font-weight: 800; text-decoration: none; }

    /* CONTACT */
    .contact { background: #F0F2F8; padding: 72px 24px; }
    .contact-inner { max-width: 560px; margin: 0 auto; text-align: center; }
    .contact-info { display: flex; justify-content: center; gap: 32px; margin: 16px 0 32px; flex-wrap: wrap; }
    .contact-info a { color: #E91E8C; font-size: 14px; font-weight: 600; text-decoration: none; }
    .contact-form { background: #fff; border-radius: 20px; padding: 40px; text-align: left; }
    .contact-form input, .contact-form textarea { width: 100%; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 16px; font-size: 14px; margin-bottom: 16px; font-family: inherit; outline: none; }
    .contact-form input:focus, .contact-form textarea:focus { border-color: #E91E8C; box-shadow: 0 0 0 3px rgba(233,30,140,0.1); }
    .contact-form button { width: 100%; background: #E91E8C; color: #fff; border: none; cursor: pointer; padding: 14px; border-radius: 10px; font-size: 15px; font-weight: 700; }

    /* FOOTER */
    footer { background: #1A1A2E; color: rgba(255,255,255,0.45); text-align: center; padding: 24px; font-size: 13px; }

    @media (max-width: 600px) {
      .hero-content h1 { font-size: 32px; }
      nav { padding: 14px 20px; }
      .nav-links { display: none; }
    }
  </style>
</head>
<body>

  <nav>
    <span class="brand">${brand}</span>
    <ul class="nav-links">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#services">Services</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <a href="#contact" class="nav-cta">Get Started</a>
  </nav>

  <section class="hero" id="home">
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1>${heroTitle}</h1>
      <p>${heroSubtitle}</p>
      <div class="hero-buttons">
        <a href="#services" class="btn-primary">Explore</a>
        <a href="#about" class="btn-outline">Learn More</a>
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <p class="section-label">About Us</p>
    <h2 class="section-title">Who We Are</h2>
    <p class="body-text">${aboutText}</p>
  </section>

  <section class="services" id="services">
    <div class="services-inner">
      <p class="section-label">What We Offer</p>
      <h2 class="section-title">Our Services</h2>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">⚡</div>
          <h3>${service1Title}</h3>
          <p>${service1Desc}</p>
        </div>
        <div class="service-card">
          <div class="service-icon">🎨</div>
          <h3>${service2Title}</h3>
          <p>${service2Desc}</p>
        </div>
        <div class="service-card">
          <div class="service-icon">💬</div>
          <h3>${service3Title}</h3>
          <p>${service3Desc}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="cta-banner">
    <h2>${ctaHeading}</h2>
    <p>${ctaSubtext}</p>
    <a href="#contact" class="btn-white">Contact Us Now</a>
  </section>

  <section class="contact" id="contact">
    <div class="contact-inner">
      <p class="section-label">Get In Touch</p>
      <h2 class="section-title">Contact Us</h2>
      <div class="contact-info">
        ${contactEmail ? `<a href="mailto:${contactEmail}">📧 ${contactEmail}</a>` : ""}
        ${contactPhone ? `<a href="tel:${contactPhone}">📞 ${contactPhone}</a>` : ""}
      </div>
      <div class="contact-form">
        <input type="text" placeholder="Your Name"/>
        <input type="email" placeholder="Your Email"/>
        <textarea rows="4" placeholder="Your Message"></textarea>
        <button type="button">Send Message</button>
      </div>
    </div>
  </section>

  <footer>${footer}</footer>

</body>
</html>`;

    const folderName = (project.name || "website").replace(/\s+/g, "_");

    if (window.showDirectoryPicker) {
      try {
        const rootHandle = await window.showDirectoryPicker({ mode: "readwrite" });
        const projectHandle = await rootHandle.getDirectoryHandle(folderName, { create: true });
        const assetsHandle = await projectHandle.getDirectoryHandle("assets", { create: true });
        const publicHandle = await projectHandle.getDirectoryHandle("public", { create: true });

        const writeFile = async (directoryHandle, fileName, content, type = "text/plain") => {
          const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
          const writable = await fileHandle.createWritable();
          await writable.write(new Blob([content], { type }));
          await writable.close();
        };

        await writeFile(projectHandle, "index.html", html, "text/html");

        if (heroImage && heroImageFileName) {
          try {
            const imageRes = await fetch(heroImage);
            if (imageRes.ok) {
              const imageBlob = await imageRes.blob();
              const imageFileHandle = await assetsHandle.getFileHandle(heroImageFileName, { create: true });
              const imageWritable = await imageFileHandle.createWritable();
              await imageWritable.write(imageBlob);
              await imageWritable.close();
            }
          } catch (imageError) {
            console.error("Hero image download failed:", imageError);
            await writeFile(assetsHandle, "IMAGE_DOWNLOAD_NOTE.txt", `Could not download hero image automatically. Original image URL: ${heroImage}`);
          }
        }

        await writeFile(assetsHandle, "README.txt", "Website images, CSS, and JavaScript files belong in this assets folder.");
        await writeFile(publicHandle, "README.txt", "Add public/static files in this public folder.");
        alert(`✅ Website folder saved: ${folderName}`);
        return;
      } catch (error) {
        if (error?.name === "AbortError") return;
        console.error("Folder download failed:", error);
        alert("Folder save failed. Downloading HTML file instead.");
      }
    } else {
      alert("Your browser does not support folder save picker. Downloading HTML file instead.");
    }

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${folderName}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const updateField = (key, val) => setTemplateData((prev) => ({ ...prev, [key]: val }));

  if (!project)
    return (
      <div className="flex min-h-screen bg-slate-100">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-gray-400 text-lg">Loading...</p>
        </main>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              <span className="cursor-pointer hover:text-indigo-600" onClick={() => navigate("/dashboard/projects")}>
                Projects
              </span>{" › "}{project.name}
            </p>
            <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-gray-400 mt-1">{project.client}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">{project.status}</span>
            <button onClick={() => navigate("/dashboard/projects")} className="text-sm text-gray-500 hover:text-indigo-600">← Back</button>
            <button onClick={() => setShowEditModal(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">✏️ Edit Project</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {["overview", "taskboard", "workspace"].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition border-b-2 ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}>
              {tab === "overview" ? "Overview" : tab === "taskboard" ? "Task Board" : "Template Workspace"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-indigo-700 mb-4">Overall Progress</h2>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full transition-all" style={{ width: `${project.progress || 0}%` }} />
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{project.progress || 0}% complete</span>
                  <span>{project.deadline ? `Deadline: ${project.deadline}` : ""}</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-indigo-700 mb-4">🎯 Project Overview</h2>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Scope of Work</p>
                <p className="text-gray-600 mb-4">{project.scopeOfWork || "—"}</p>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">Deliverables</p>
                <p className="text-gray-600">{project.deliverables || "—"}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">📋 Details</h2>
                <div className="space-y-3 text-sm">
                  {[["Start Date", project.startDate], ["Deadline", project.deadline], ["Client", project.client], ["Assigned Team", project.team], ["Status", project.status]].map(([label, val]) => (
                    <div key={label}>
                      <p className="text-gray-400 uppercase text-xs font-semibold">{label}</p>
                      <p className="font-semibold">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">🏁 Milestones</h2>
                <div className="space-y-3">
                  {[["Project Kickoff","Project initiated"],["Design Phase","Wireframes & UI"],["Development","Build & code"],["Testing","QA & client review"],["Go Live","Launch to production"]].map(([m, sub]) => (
                    <div key={m} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-400 bg-white mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-gray-700">{m}</p>
                        <p className="text-xs text-gray-400">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Board */}
        {activeTab === "taskboard" && (
          <div className="space-y-4">
            {/* Board Controls */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">
                  Project Board
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
                  Drag and drop cards to update task status.
                </p>
              </div>
              <button
                onClick={() => {
                  setNewTaskStatus("To Do");
                  setShowTaskModal(true);
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <span>+</span> Add Task
              </button>
            </div>

            {/* Board Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              {COLUMNS.map((col) => {
                const columnTasks = tasks.filter((t) => t.status === col);
                return (
                  <div
                    key={col}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, col)}
                    className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 min-h-[500px] flex flex-col gap-3 transition-colors duration-200"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-50 dark:border-slate-700/50">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        <h4 className="font-bold text-slate-700 dark:text-slate-300 text-xs tracking-wide">
                          {col}
                        </h4>
                      </div>
                      <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-full text-[10px] font-bold">
                        {columnTasks.length}
                      </span>
                    </div>

                    {/* Column Add Trigger */}
                    <button
                      onClick={() => {
                        setNewTaskStatus(col);
                        setShowTaskModal(true);
                      }}
                      className="w-full border border-dashed border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 py-2 rounded-xl text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 text-xs font-medium bg-slate-50/50 dark:bg-slate-900/30 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>+</span> Add task
                    </button>

                    {/* Column Cards Container */}
                    <div className="flex-1 flex flex-col gap-2.5">
                      {columnTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3.5 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing hover:translate-y-[-1px] transition-all relative group"
                        >
                          {/* Delete Trigger */}
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="absolute top-2.5 right-2.5 text-slate-300 hover:text-rose-500 transition opacity-0 group-hover:opacity-100 text-[10px] cursor-pointer"
                            title="Delete Task"
                          >
                            ✕
                          </button>
                          
                          {/* Priority Badge */}
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                            task.priority === "High"
                              ? "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/20"
                              : task.priority === "Low"
                              ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20"
                              : "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/20"
                          }`}>
                            {task.priority}
                          </span>

                          <h5 className="font-semibold text-slate-800 dark:text-slate-100 text-xs mt-2.5 leading-snug">
                            {task.title}
                          </h5>

                          {task.description && (
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-normal line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-200/40 dark:border-slate-800/80">
                            <span className="text-[9px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                              📅 {task.deadline}
                            </span>
                          </div>
                        </div>
                      ))}

                      {columnTasks.length === 0 && (
                        <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200/30 dark:border-slate-800/40 rounded-2xl min-h-[120px] p-4 text-center">
                          <p className="text-[10px] text-slate-400 dark:text-slate-500">
                            Drop tasks here
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Task Creation Modal */}
            {showTaskModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 max-w-md w-full shadow-2xl relative overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95">
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const newTask = {
                      id: `task-${Date.now()}`,
                      title: newTaskTitle,
                      description: newTaskDesc,
                      status: newTaskStatus,
                      priority: newTaskPriority,
                      deadline: newTaskDeadline || new Date().toISOString().split('T')[0]
                    };
                    setTasks([...tasks, newTask]);
                    // Reset
                    setNewTaskTitle("");
                    setNewTaskDesc("");
                    setNewTaskPriority("Medium");
                    setNewTaskDeadline("");
                    setShowTaskModal(false);
                  }} className="flex flex-col gap-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                        Create New Task
                      </h3>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                        Add a new item to your project board.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3.5">
                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Task Title
                        </label>
                        <input
                          type="text"
                          required
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          placeholder="E.g., Implement login form"
                          className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Description
                        </label>
                        <textarea
                          rows="3"
                          value={newTaskDesc}
                          onChange={(e) => setNewTaskDesc(e.target.value)}
                          placeholder="Enter task details..."
                          className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                            Priority
                          </label>
                          <select
                            value={newTaskPriority}
                            onChange={(e) => setNewTaskPriority(e.target.value)}
                            className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm select-reset outline-none focus:border-indigo-400 transition"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                            Deadline
                          </label>
                          <input
                            type="date"
                            value={newTaskDeadline}
                            onChange={(e) => setNewTaskDeadline(e.target.value)}
                            className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                          Initial Column Status
                        </label>
                        <select
                          value={newTaskStatus}
                          onChange={(e) => setNewTaskStatus(e.target.value)}
                          className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm select-reset outline-none focus:border-indigo-400 transition"
                        >
                          {COLUMNS.map((col) => (
                            <option key={col} value={col}>{col}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-end mt-2">
                      <button
                        type="button"
                        onClick={() => setShowTaskModal(false)}
                        className="text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition cursor-pointer"
                      >
                        Create Task
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Workspace Tab */}
        {activeTab === "workspace" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-3 bg-gray-50">
              <div>
                <h2 className="text-base font-bold text-gray-800">🖥 Template Workspace</h2>
                <p className="text-xs text-gray-400 mt-0.5">{template ? `Editing "${template.name}"` : "No template linked"}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setEditMode(!editMode)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border transition"
                  style={{ borderColor: "#6366f1", color: editMode ? "#fff" : "#6366f1", background: editMode ? "#6366f1" : "transparent" }}>
                  {editMode ? "👁 Preview Mode" : "✏️ Edit Mode"}
                </button>
                <button onClick={handleSaveTemplate} className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-200 transition">💾 Save</button>
                <button onClick={handleComplete} className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition">✅ Complete</button>
                {project.completed && (
                  <button onClick={handleDownload} className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-black transition">⬇ Download Folder</button>
                )}
              </div>
            </div>

            {!template ? (
              <div className="p-10 text-center text-gray-400 bg-gray-50">No template linked to this project.</div>
            ) : (
              <div className={`flex ${editMode ? "flex-col lg:flex-row" : "flex-col"}`}>

                {/* Edit Panel */}
                {editMode && (
                  <div className="w-full lg:w-80 flex-shrink-0 border-r border-gray-100 bg-gray-50 p-5 space-y-4 overflow-y-auto" style={{ maxHeight: "85vh" }}>
                    <h3 className="text-sm font-bold text-gray-700 border-b pb-2">✏️ Edit Content</h3>

                    {/* BRAND */}
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-2">🏷 Brand</p>
                      <label className="text-xs text-gray-500 font-semibold block mb-1">Brand / Company Name</label>
                      <input value={templateData.brandName || ""} onChange={(e) => updateField("brandName", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="e.g. Maison Rue" />
                    </div>

                    {/* HERO */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">🦸 Hero Section</p>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">Hero Title</label>
                        <input value={templateData.heroTitle || ""} onChange={(e) => updateField("heroTitle", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="Your main heading" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">Hero Subtitle</label>
                        <textarea value={templateData.heroSubtitle || ""} onChange={(e) => updateField("heroSubtitle", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          rows={2} placeholder="Your tagline" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">Hero Image URL</label>
                        <input value={templateData.heroImage || ""} onChange={(e) => updateField("heroImage", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="https://..." />
                        {templateData.heroImage && (
                          <img src={templateData.heroImage} alt="preview" className="mt-2 w-full h-20 object-cover rounded-lg border border-gray-200" />
                        )}
                      </div>
                    </div>

                    {/* ABOUT */}
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">👥 About Section</p>
                      <label className="text-xs text-gray-500 font-semibold block mb-1">About Text</label>
                      <textarea value={templateData.aboutText || ""} onChange={(e) => updateField("aboutText", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        rows={3} placeholder="Tell your story..." />
                    </div>

                    {/* SERVICES */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">⚙️ Services</p>
                      {[1,2,3].map((n) => (
                        <div key={n} className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
                          <p className="text-xs font-bold text-gray-600">Service {n}</p>
                          <input value={templateData[`service${n}Title`] || ""} onChange={(e) => updateField(`service${n}Title`, e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder={`Service ${n} title`} />
                          <input value={templateData[`service${n}Desc`] || ""} onChange={(e) => updateField(`service${n}Desc`, e.target.value)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            placeholder={`Service ${n} description`} />
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">$ CTA Banner</p>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">CTA Heading</label>
                        <input value={templateData.ctaHeading || ""} onChange={(e) => updateField("ctaHeading", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="Ready to Get Started?" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">CTA Subtext</label>
                        <input value={templateData.ctaSubtext || ""} onChange={(e) => updateField("ctaSubtext", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="Join thousands of happy customers." />
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">📞 Contact Info</p>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">Email</label>
                        <input value={templateData.contactEmail || ""} onChange={(e) => updateField("contactEmail", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="hello@yourcompany.com" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 font-semibold block mb-1">Phone</label>
                        <input value={templateData.contactPhone || ""} onChange={(e) => updateField("contactPhone", e.target.value)}
                          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                          placeholder="+91 98765 43210" />
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div>
                      <p className="text-xs font-bold text-indigo-600 uppercase mb-1">🦶 Footer</p>
                      <label className="text-xs text-gray-500 font-semibold block mb-1">Footer Text</label>
                      <input value={templateData.footerText || ""} onChange={(e) => updateField("footerText", e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="© 2026 Your Company. All rights reserved." />
                    </div>

                    <button onClick={handleSaveTemplate}
                      className="w-full py-2.5 rounded-lg font-semibold text-white text-sm hover:opacity-90 transition"
                      style={{ background: "#6366f1" }}>
                      💾 Save All Changes
                    </button>
                  </div>
                )}

                {/* Live Preview */}
                <div className="flex-1 overflow-y-auto" style={{ maxHeight: "85vh" }}>
                  <BusinessTemplate data={templateData} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Project Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Edit Project</h2>
                <button onClick={() => setShowEditModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>
              <div className="space-y-4">
                {[["Project Name *","name"],["Client Name","client"],["Assigned Team","team"]].map(([label, field]) => (
                  <div key={field}>
                    <label className="text-sm font-semibold text-gray-600">{label}</label>
                    <input value={editForm[field] || ""} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                  </div>
                ))}
                <div>
                  <label className="text-sm font-semibold text-gray-600">Status</label>
                  <select value={editForm.status || ""} onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300">
                    {["Planning","Design","Development","Testing","Live","On Hold"].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[["Start Date","startDate"],["Deadline","deadline"]].map(([label, field]) => (
                    <div key={field}>
                      <label className="text-sm font-semibold text-gray-600">{label}</label>
                      <input type="date" value={editForm[field] || ""} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">Progress (%)</label>
                  <input type="number" min="0" max="100" value={editForm.progress || 0}
                    onChange={(e) => setEditForm({ ...editForm, progress: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" />
                </div>
                {[["Scope of Work","scopeOfWork"],["Deliverables","deliverables"]].map(([label, field]) => (
                  <div key={field}>
                    <label className="text-sm font-semibold text-gray-600">{label}</label>
                    <textarea value={editForm[field] || ""} onChange={(e) => setEditForm({ ...editForm, [field]: e.target.value })}
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300" rows={3} />
                  </div>
                ))}
                <button onClick={handleSave} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProjectDetail;