import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { hasPermission, getCurrentUser, PERMISSIONS } from "../../utils/permissions";
import { getMergedTemplates } from "../../utils/templatesApi";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const STATUSES = ["Planning", "Design", "Development", "Testing", "Live", "On Hold"];
const PROJECT_TYPES = ["Portfolio", "Business", "Blog", "E-commerce", "Photography", "Food & Dining", "Events", "Landing Page", "Web App", "Custom"];
const TRIAL_DAYS = 3;

const EMPTY_FORM = {
  name: "",
  projectType: "Business",
  client: "",
  clientId: "",
  startDate: new Date().toISOString().split("T")[0],
  deadline: "",
  status: "Planning",
  team: "",
  assignedTo: "",
  scopeOfWork: "",
  deliverables: "",
  templateId: "",
  templateData: {},
};

const sampleProjectForm = () => {
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 30);
  return {
    name: "Business Website Development",
    projectType: "Business",
    client: "Acme Studios",
    clientId: "",
    startDate: new Date().toISOString().split("T")[0],
    deadline: deadline.toISOString().split("T")[0],
    status: "Development",
    team: "Aman Sharma",
    assignedTo: "",
    scopeOfWork: "Build a responsive business website with homepage, services, contact form, and admin dashboard setup.",
    deliverables: "Source code, live deployment, admin access, and documentation",
    templateId: "",
    templateData: {},
  };
};

function useCountdown() {
  const [target] = useState(() => {
    const saved = localStorage.getItem("trialEndsAt");
    if (saved) return new Date(saved);
    const end = new Date();
    end.setDate(end.getDate() + TRIAL_DAYS);
    localStorage.setItem("trialEndsAt", end.toISOString());
    return end;
  });
  const [timeLeft, setTimeLeft] = useState("");
  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) { setTimeLeft("0d 00h 00m 00s"); return; }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(`${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);
  return timeLeft;
}

function StatCard({ label, value, accent }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-800" style={{ borderLeftColor: accent, borderLeftWidth: 4 }}>
      <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase">{label}</p>
      <p className="text-3xl font-bold mt-2" style={{ color: accent }}>{value}</p>
    </div>
  );
}

function statusBadgeClasses(status) {
  switch (status) {
    case "Live":        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400";
    case "On Hold":     return "bg-red-50 text-red-500 dark:bg-red-950/40 dark:text-red-400";
    case "Development": return "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400";
    case "Design":      return "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400";
    case "Testing":     return "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-300";
    default:            return "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400";
  }
}

function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  const timeLeft = useCountdown();
  const [projects, setProjects] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [filter, setFilter] = useState("All Statuses");
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const currentUser = getCurrentUser();
  const canManageProjects = hasPermission(currentUser, PERMISSIONS.MANAGE_PROJECTS);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = { Authorization: token };

    fetch(`${API}/api/projects`, { headers })
      .then((res) => res.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));

    fetch(`${API}/api/admin/users?t=${Date.now()}`, { headers, cache: "no-store" })
      .then((res) => res.ok ? res.json() : { users: [] })
      .then((data) => {
        const developersOnly = Array.isArray(data.users)
          ? data.users.filter((member) => member.accessRole === "developer")
          : [];
        setTeamMembers(developersOnly);
      })
      .catch((err) => console.log(err));

    fetch(`${API}/api/clients?t=${Date.now()}`, { headers, cache: "no-store" })
      .then((res) => res.ok ? res.json() : [])
      .then((data) => setClientOptions(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err));

    getMergedTemplates()
      .then((templates) => setProjectOptions(Array.isArray(templates) ? templates : []))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!location.state?.openAddProject) return;
    setForm((prev) => ({
      ...prev,
      team: location.state.assignedTeam || prev.team,
      assignedTo: location.state.assignedTo || prev.assignedTo,
    }));
    setShowAddModal(true);
    navigate(location.pathname, { replace: true });
  }, [location, navigate]);

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Project name is required.");
      return;
    }

    if (loading) return;

    const existingProject = projects.find((project) => (
      project.name === form.name &&
      project.client === form.client &&
      project.team === form.team
    ));

    if (existingProject) {
      alert("This project is already saved for this team member.");
      return;
    }

    const alreadyAssigned = projects.find((project) => (
      project.name === form.name &&
      project.client === form.client &&
      project.team &&
      project.team !== form.team
    ));

    if (alreadyAssigned) {
      alert(`This project is already assigned to ${alreadyAssigned.team}. Delete or reassign that project before assigning it to another developer.`);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create project");
      const newProj = data;
      setProjects((prev) => [newProj, ...prev]);
      setForm(EMPTY_FORM);
      setShowAddModal(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === "All Statuses" ? projects : projects.filter((p) => p.status === filter);
  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => ["Development", "Design", "Planning"].includes(p.status)).length;
  const liveCompleted = projects.filter((p) => p.status === "Live").length;
  const onHold = projects.filter((p) => p.status === "On Hold").length;
  const pendingReview = projects.filter((p) => p.status === "Testing").length;

  const handleDelete = async (id) => {
    if (!canManageProjects) {
      alert("You don't have permission to delete projects.");
      return;
    }
    if (!confirm("Delete this project?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API}/api/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: token },
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      alert(data.message || "Failed to delete project");
      return;
    }

    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100 md:flex-row">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-800 dark:text-slate-100">Projects</h1>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">Track all website projects and their progress</p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard label="Total Projects"    value={totalProjects} accent="#6366f1" />
          <StatCard label="In Progress"       value={inProgress}    accent="#3b82f6" />
          <StatCard label="Live / Completed"  value={liveCompleted} accent="#10b981" />
          <StatCard label="On Hold / Delayed" value={onHold}        accent="#ef4444" />
          <StatCard label="Pending Review"    value={pendingReview} accent="#f97316" />
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}
            className="rounded-xl border border-slate-100 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100">
            <option>All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Link to="/templates"
            className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm transition hover:bg-indigo-100 dark:border-indigo-900/30 dark:bg-indigo-950/40 dark:text-indigo-400 dark:hover:bg-indigo-950/60">
            Browse Templates
          </Link>
          {canManageProjects && (
            <button onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition">
              + Add Project
            </button>
          )}
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">All Projects</h2>
            <span className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-700 dark:text-slate-300">{filteredProjects.length} project{filteredProjects.length !== 1 && "s"}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left text-xs uppercase tracking-wider text-gray-400 dark:border-slate-800 dark:text-slate-500">
                  <th className="px-6 py-3 font-semibold">Project Name</th>
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Start Date</th>
                  <th className="px-6 py-3 font-semibold">Deadline</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Assigned Team</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-20 text-center">
                      <div className="text-5xl mb-4">📁</div>
                      <p className="text-lg font-bold text-gray-700 dark:text-slate-200">No projects found</p>
                      <p className="mt-1 text-gray-400 dark:text-slate-500">Create your first project to get started</p>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p._id} className="border-b border-gray-50 transition hover:bg-slate-50/80 dark:border-slate-700/60 dark:hover:bg-slate-700/20">
                      <td className="px-6 py-4 font-medium text-gray-700 dark:text-slate-200">
                        <Link to={`/dashboard/projects/${p._id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">{p.name}</Link>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.client}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.startDate}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.deadline}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClasses(p.status)}`}>{p.status}</span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.team || "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          {canManageProjects && (
                            <>
                              <button
                                onClick={() => navigate(`/dashboard/projects/${p._id}`, { state: { openWorkspace: true } })}
                                className="text-gray-400 transition hover:text-indigo-600 dark:text-slate-500 dark:hover:text-indigo-400"
                                title="Edit template"
                              >
                                ✏️
                              </button>
                              <button onClick={() => handleDelete(p._id)} className="text-gray-400 transition hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400">🗑️</button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 max-w-lg w-full shadow-2xl relative overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Add New Project
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Create a custom project manually without using a template.
                </p>
                <button
                  type="button"
                  onClick={() => setForm(sampleProjectForm())}
                  className="mt-2 text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Auto fill sample
                </button>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProject} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Project Name *
                  </label>
                  <select
                    required
                    value={form.name}
                    onChange={(e) => {
                      const selected = projectOptions.find((template) => template.name === e.target.value);
                      setForm({
                        ...form,
                        name: e.target.value,
                        projectType: selected?.category || form.projectType,
                        templateId: selected ? String(selected.id || selected._id || "") : "",
                        templateData: selected?.defaultData || {},
                      });
                    }}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  >
                    <option value="">Select project</option>
                    {projectOptions.map((template) => (
                      <option key={template.id || template._id || template.name} value={template.name}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Project Type
                  </label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  >
                    {PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Client Name
                </label>
                <select
                  value={form.clientId || form.client}
                  onChange={(e) => {
                    const selectedClient = clientOptions.find((client) => client._id === e.target.value || client.clientName === e.target.value);
                    const selectedTemplate = projectOptions.find((template) => template.name === selectedClient?.workspace);
                    const nextDeadline = new Date();
                    nextDeadline.setDate(nextDeadline.getDate() + 30);

                    setForm({
                      ...form,
                      clientId: selectedClient?._id || "",
                      client: selectedClient?.clientName || "",
                      name: selectedClient?.workspace || form.name,
                      projectType: selectedClient?.websiteType || selectedTemplate?.category || form.projectType,
                      deadline: form.deadline || nextDeadline.toISOString().split("T")[0],
                      templateId: selectedTemplate ? String(selectedTemplate.id || selectedTemplate._id || "") : form.templateId,
                      templateData: selectedTemplate?.defaultData || form.templateData,
                      scopeOfWork: form.scopeOfWork || (selectedClient?.workspace ? `Customize the ${selectedClient.workspace} template for ${selectedClient.clientName}.` : ""),
                      deliverables: form.deliverables || "Final editable website, source files, and live deployment",
                    });
                  }}
                  className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                >
                  <option value="">Select client</option>
                  {clientOptions.map((client) => (
                    <option key={client._id} value={client._id}>
                      {client.clientName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Deadline
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Status
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  >
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                    Assigned Team / Member
                  </label>
                  <select
                    value={form.assignedTo || form.team}
                    onChange={(e) => {
                      const selectedMember = teamMembers.find((member) => member._id === e.target.value || member.fullName === e.target.value);
                      setForm({
                        ...form,
                        assignedTo: selectedMember?._id || "",
                        team: selectedMember?.fullName || "",
                      });
                    }}
                    className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                  >
                    <option value="">Select member</option>
                    {teamMembers.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.fullName} {member.accessRole && member.accessRole !== "client" ? `(${member.accessRole})` : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Scope of Work
                </label>
                <textarea
                  value={form.scopeOfWork}
                  onChange={(e) => setForm({ ...form, scopeOfWork: e.target.value })}
                  placeholder="Describe the scope of work..."
                  rows="3"
                  className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Deliverables
                </label>
                <input
                  type="text"
                  value={form.deliverables}
                  onChange={(e) => setForm({ ...form, deliverables: e.target.value })}
                  placeholder="e.g. Figma file, Source code, Live deployment"
                  className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                />
              </div>

              <div className="flex gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 transition cursor-pointer"
                >
                  {loading ? "Creating..." : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Projects;