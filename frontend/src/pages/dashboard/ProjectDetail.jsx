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

//        {/* Template Workspace Tab */}
// {activeTab === "workspace" && (
//   <div className="bg-white rounded-xl shadow-sm overflow-hidden">

//     {/* Header */}
//     <div className="flex items-center justify-between p-6 border-b border-gray-100 flex-wrap gap-3">
//       <div>
//         <h2 className="text-lg font-bold text-gray-800">
//           Template Workspace
//         </h2>

//         <p className="text-sm text-gray-400 mt-1">
//           {template
//             ? `Editing "${template.name}" template`
//             : "Is project se koi template linked nahi hai"}
//         </p>
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={() => setEditMode(!editMode)}
//           className="text-sm font-semibold text-indigo-600 border border-indigo-200 px-4 py-2 rounded-lg hover:bg-indigo-50 transition"
//         >
//           {editMode ? "View Mode" : "Edit Mode"}
//         </button>

//         <button
//           onClick={handleSaveTemplate}
//           className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-200 transition"
//         >
//           Save Changes
//         </button>

//         <button
//           onClick={handleComplete}
//           className="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 transition"
//         >
//           Complete Project
//         </button>

//         {project.completed && (
//           <button
//             onClick={handleDownload}
//             className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-black transition"
//           >
//             ⬇ Download
//           </button>
//         )}
//       </div>
//     </div>

//     {/* No template case */}
//     {!template ? (
//       <div className="p-10 text-center text-gray-400 bg-gray-50">
//         Is project ke saath koi template select nahi hua.
//       </div>
//     ) : (
//       <>
//         {/* LIVE TEMPLATE PREVIEW */}
//         <BusinessTemplate data={templateData} />

//         {/* EDIT SECTION */}
//         <div className="p-10 max-w-2xl mx-auto text-center">

//           {editMode ? (
//             <>
//               <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">
//                 Hero Title
//               </label>

//               <input
//                 value={templateData.heroTitle || ""}
//                 onChange={(e) =>
//                   setTemplateData({
//                     ...templateData,
//                     heroTitle: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-200 rounded-lg p-3 mb-4"
//               />

//               <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">
//                 Hero Subtitle
//               </label>

//               <textarea
//                 value={templateData.heroSubtitle || ""}
//                 onChange={(e) =>
//                   setTemplateData({
//                     ...templateData,
//                     heroSubtitle: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-200 rounded-lg p-3 mb-4"
//                 rows={3}
//               />

//               <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">
//                 About Text
//               </label>

//               <textarea
//                 value={templateData.aboutText || ""}
//                 onChange={(e) =>
//                   setTemplateData({
//                     ...templateData,
//                     aboutText: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-200 rounded-lg p-3 mb-4"
//                 rows={4}
//               />

//               <label className="text-xs font-semibold text-gray-400 uppercase block mb-2">
//                 Hero Image URL
//               </label>

//               <input
//                 value={templateData.heroImage || ""}
//                 onChange={(e) =>
//                   setTemplateData({
//                     ...templateData,
//                     heroImage: e.target.value,
//                   })
//                 }
//                 className="w-full border border-gray-200 rounded-lg p-3"
//               />
//             </>
//           ) : (
//             <p className="text-gray-600">
//               {templateData.aboutText}
//             </p>
//           )}

//         </div>
//       </>
//     )}
//   </div>
// )}

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

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [editMode, setEditMode] = useState(false);

  const [templateData, setTemplateData] = useState({});

  const template = templates.find(
    (t) => String(t.id) === String(project?.templateId),
  );

  useEffect(() => {
    if (project) {
      const hasSavedData =
        project.templateData && Object.keys(project.templateData).length > 0;
      setTemplateData(
        hasSavedData ? project.templateData : template?.defaultData || {},
      );
    }
  }, [project]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/projects/${id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        setEditForm(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(editForm),
    });
    const updated = await res.json();
    setProject(updated);
    setShowEditModal(false);
  };

  const handleSaveTemplate = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ ...project, templateData }),
    });
    const updated = await res.json();
    setProject(updated);
    alert("Changes saved!");
  };

  const handleDownload = () => {
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>${templateData.heroTitle || project.name}</title>
<style>
  body{font-family:Arial,sans-serif;margin:0;color:#222;}
  .hero{position:relative;height:480px;background:url('${templateData.heroImage}') center/cover no-repeat;display:flex;align-items:center;justify-content:center;}
  .hero::before{content:"";position:absolute;inset:0;background:rgba(0,0,0,0.45);}
  .hero-content{position:relative;z-index:2;color:#fff;text-align:center;max-width:700px;padding:0 20px;}
  .hero-content h1{font-size:42px;margin-bottom:12px;}
  .about{max-width:700px;margin:0 auto;padding:60px 20px;text-align:center;}
  .about p{font-size:18px;line-height:1.6;color:#555;}
</style>
</head>
<body>
  <div class="hero">
    <div class="hero-content">
      <h1>${templateData.heroTitle || ""}</h1>
      <p>${templateData.heroSubtitle || ""}</p>
    </div>
  </div>
  <div class="about"><p>${templateData.aboutText || ""}</p></div>
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(project.name || "website").replace(/\s+/g, "_")}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  //   const handleComplete = async () => {
  //     const token = localStorage.getItem("token");
  //     const res = await fetch(`${API}/api/projects/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token,
  //       },
  //       body: JSON.stringify({ ...project, status: "Live" }),
  //     });
  //     const updated = await res.json();
  //     setProject(updated);
  //   };

  const handleComplete = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: token },
      body: JSON.stringify({ ...project, status: "Live", completed: true }),
    });
    const updated = await res.json();
    setProject(updated);
  };

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
              <span
                className="cursor-pointer hover:text-indigo-600"
                onClick={() => navigate("/dashboard/projects")}
              >
                Projects
              </span>
              {" › "}
              {project.name}
            </p>
            <h1 className="text-3xl font-bold text-gray-800">{project.name}</h1>
            <p className="text-gray-400 mt-1">{project.client}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full border">
              {project.status}
            </span>
            <button
              onClick={() => navigate("/dashboard/projects")}
              className="text-sm text-gray-500 hover:text-indigo-600"
            >
              ← Back
            </button>
            <button
              onClick={() => setShowEditModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
            >
              ✏️ Edit Project
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          {["overview", "taskboard", "workspace"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-semibold capitalize transition border-b-2 ${activeTab === tab ? "border-indigo-600 text-indigo-600" : "border-transparent text-gray-400 hover:text-gray-600"}`}
            >
              {tab === "overview"
                ? "Overview"
                : tab === "taskboard"
                  ? "Task Board"
                  : "Template Workspace"}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-indigo-700 mb-4">
                  Overall Progress
                </h2>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full transition-all"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mt-2">
                  <span>{project.progress || 0}% complete</span>
                  <span>
                    {project.deadline ? `Deadline: ${project.deadline}` : ""}
                  </span>
                </div>
              </div>

              {/* Project Overview */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-indigo-700 mb-4">
                  🎯 Project Overview
                </h2>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Scope of Work
                </p>
                <p className="text-gray-600 mb-4">
                  {project.scopeOfWork || "—"}
                </p>
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">
                  Deliverables
                </p>
                <p className="text-gray-600">{project.deliverables || "—"}</p>
              </div>
            </div>

            {/* Details + Milestones */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">📋 Details</h2>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-semibold">
                      Start Date
                    </p>
                    <p className="font-semibold">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-semibold">
                      Deadline
                    </p>
                    <p className="font-semibold">{project.deadline}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-semibold">
                      Client
                    </p>
                    <p className="font-semibold">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-semibold">
                      Assigned Team
                    </p>
                    <p className="font-semibold">{project.team}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 uppercase text-xs font-semibold">
                      Status
                    </p>
                    <p className="font-semibold">{project.status}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold mb-4">🏁 Milestones</h2>
                <div className="space-y-3">
                  {[
                    "Project Kickoff",
                    "Design Phase",
                    "Development",
                    "Testing",
                    "Go Live",
                  ].map((m, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-indigo-400 bg-white mt-0.5 flex-shrink-0"></div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          {m}
                        </p>
                        <p className="text-xs text-gray-400">
                          {
                            [
                              "Project initiated",
                              "Wireframes & UI",
                              "Build & code",
                              "QA & client review",
                              "Launch to production",
                            ][i]
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Task Board Tab */}
        {activeTab === "taskboard" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["To Do", "In Progress", "Done"].map((col) => (
              <div key={col} className="bg-white rounded-xl p-4 shadow-sm">
                <h3 className="font-bold text-gray-700 mb-4">{col}</h3>
                <div className="text-center py-10 text-gray-300 text-sm">
                  No tasks yet
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Template Workspace Tab */}

        {activeTab === "workspace" && (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-wrap gap-3 bg-gray-50">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  🖥 Template Workspace
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {template
                    ? `Editing "${template.name}"`
                    : "No template linked"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-xs font-semibold px-3 py-2 rounded-lg border transition"
                  style={{
                    borderColor: "#6366f1",
                    color: editMode ? "#fff" : "#6366f1",
                    background: editMode ? "#6366f1" : "transparent",
                  }}
                >
                  {editMode ? "👁 Preview Mode" : "✏️ Edit Mode"}
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-indigo-200 transition"
                >
                  💾 Save
                </button>
                <button
                  onClick={handleComplete}
                  className="bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-emerald-600 transition"
                >
                  ✅ Complete
                </button>
                {project.completed && (
                  <button
                    onClick={handleDownload}
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-black transition"
                  >
                    ⬇ Download
                  </button>
                )}
              </div>
            </div>

            {!template ? (
              <div className="p-10 text-center text-gray-400 bg-gray-50">
                Is project ke saath koi template select nahi hua.
              </div>
            ) : (
              <div
                className={`flex ${editMode ? "flex-col lg:flex-row" : "flex-col"}`}
              >
                {/* ── LEFT: Edit Panel (only in edit mode) ── */}
                {editMode && (
                  <div
                    className="w-full lg:w-80 flex-shrink-0 border-r border-gray-100 bg-gray-50 p-6 space-y-5 overflow-y-auto"
                    style={{ maxHeight: "80vh" }}
                  >
                    <h3 className="text-sm font-bold text-gray-700 mb-2">
                      Edit Content
                    </h3>

                    {/* Hero Title */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                        Hero Title
                      </label>
                      <input
                        value={templateData.heroTitle || ""}
                        onChange={(e) =>
                          setTemplateData({
                            ...templateData,
                            heroTitle: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="Your main heading"
                      />
                    </div>

                    {/* Hero Subtitle */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                        Hero Subtitle
                      </label>
                      <textarea
                        value={templateData.heroSubtitle || ""}
                        onChange={(e) =>
                          setTemplateData({
                            ...templateData,
                            heroSubtitle: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        rows={3}
                        placeholder="Your subtitle or tagline"
                      />
                    </div>

                    {/* About Text */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                        About Text
                      </label>
                      <textarea
                        value={templateData.aboutText || ""}
                        onChange={(e) =>
                          setTemplateData({
                            ...templateData,
                            aboutText: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        rows={4}
                        placeholder="Tell your story..."
                      />
                    </div>

                    {/* Hero Image URL */}
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase block mb-1">
                        Hero Image URL
                      </label>
                      <input
                        value={templateData.heroImage || ""}
                        onChange={(e) =>
                          setTemplateData({
                            ...templateData,
                            heroImage: e.target.value,
                          })
                        }
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        placeholder="https://..."
                      />
                      {templateData.heroImage && (
                        <img
                          src={templateData.heroImage}
                          alt="preview"
                          className="mt-2 w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                      )}
                    </div>

                    {/* Save Button */}
                    <button
                      onClick={handleSaveTemplate}
                      className="w-full py-2.5 rounded-lg font-semibold text-white text-sm hover:opacity-90 transition"
                      style={{ background: "#6366f1" }}
                    >
                      💾 Save Changes
                    </button>
                  </div>
                )}

                {/* ── RIGHT: Live Preview ── */}
                <div
                  className="flex-1 overflow-y-auto"
                  style={{ maxHeight: "80vh" }}
                >
                  <BusinessTemplate data={templateData} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Edit Project</h2>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Project Name *
                  </label>
                  <input
                    value={editForm.name || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Client Name
                    </label>
                    <input
                      value={editForm.client || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, client: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Status
                    </label>
                    <select
                      value={editForm.status || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, status: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    >
                      {[
                        "Planning",
                        "Design",
                        "Development",
                        "Testing",
                        "Live",
                        "On Hold",
                      ].map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={editForm.startDate || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, startDate: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Deadline
                    </label>
                    <input
                      type="date"
                      value={editForm.deadline || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, deadline: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Assigned Team
                    </label>
                    <input
                      value={editForm.team || ""}
                      onChange={(e) =>
                        setEditForm({ ...editForm, team: e.target.value })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">
                      Progress (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={editForm.progress || 0}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          progress: Number(e.target.value),
                        })
                      }
                      className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Scope of Work
                  </label>
                  <textarea
                    value={editForm.scopeOfWork || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, scopeOfWork: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600">
                    Deliverables
                  </label>
                  <textarea
                    value={editForm.deliverables || ""}
                    onChange={(e) =>
                      setEditForm({ ...editForm, deliverables: e.target.value })
                    }
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                >
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
