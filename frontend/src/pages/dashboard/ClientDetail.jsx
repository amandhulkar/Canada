import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import templates from "../../data/templates";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const TABS = ["Overview", "Projects"];
const STATUSES = ["Planning", "Design", "Development", "Testing", "Live", "On Hold"];
const TEMPLATE_OPTIONS = templates.map((template) => template.name);

const WEBSITE_TYPES = [
  "E-commerce", "Portfolio", "Business", "Blog", "Landing Page", "Web App",
];

function statusBadgeClasses(status) {
  switch (status) {
    case "Live":        return "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400";
    case "On Hold":     return "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400";
    case "Development": return "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400";
    case "Design":      return "bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400";
    case "Testing":     return "bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-300";
    default:             return "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400";
  }
}

function normalizeName(value = "") {
  return value.trim().toLowerCase();
}

function EditClientModal({ open, onClose, client, onSave }) {
  const [form, setForm] = useState({
    clientName: "",
    email: "",
    company: "",
    websiteType: "",
    totalValue: "",
    balanceDue: "",
    lastPayment: "",
  });

  useEffect(() => {
    if (client) {
      setForm({
        clientName: client.clientName || "",
        email: client.email || "",
        company: client.company || "",
        websiteType: client.websiteType || WEBSITE_TYPES[0],
        totalValue: client.totalValue || "",
        balanceDue: client.balanceDue || "",
        lastPayment: client.lastPayment || "",
      });
    }
  }, [client]);

  if (!open) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...form,
      totalValue: Number(form.totalValue) || 0,
      balanceDue: Number(form.balanceDue) || 0,
    });
  };

  const inputClass = "w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Edit Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Client Name</label>
            <input name="clientName" value={form.clientName} onChange={handleChange} required className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Company</label>
            <input name="company" value={form.company} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Website Type</label>
            <select name="websiteType" value={form.websiteType} onChange={handleChange} className={inputClass}>
              {WEBSITE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Total Value ($)</label>
              <input name="totalValue" type="number" min="0" value={form.totalValue} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Balance Due ($)</label>
              <input name="balanceDue" type="number" min="0" value={form.balanceDue} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Last Payment Date</label>
            <input name="lastPayment" type="date" value={form.lastPayment} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProjectModal({ open, onClose, clientName, teamMembers, onSave, error }) {
  const [form, setForm] = useState({
    name: TEMPLATE_OPTIONS[0] || "",
    startDate: "",
    deadline: "",
    status: STATUSES[0],
    team: "",
    assignedTo: "",
    progress: "0",
    scopeOfWork: "",
    deliverables: "",
  });

  useEffect(() => {
    if (open) {
      setForm({
        name: TEMPLATE_OPTIONS[0] || "",
        startDate: "",
        deadline: "",
        status: STATUSES[0],
        team: "",
        assignedTo: "",
        progress: "0",
        scopeOfWork: "",
        deliverables: "",
      });
    }
  }, [open]);

  if (!open) return null;

  const inputClass = "w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";
  const handleChange = (e) => {
    if (e.target.name === "assignedTo") {
      const selectedMember = teamMembers.find((member) => member._id === e.target.value);
      setForm({
        ...form,
        assignedTo: selectedMember?._id || "",
        team: selectedMember?.fullName || "",
      });
      return;
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Add Project</h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Client: {clientName}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Project / Template</label>
            <select name="name" value={form.name} onChange={handleChange} required className={inputClass}>
              {TEMPLATE_OPTIONS.map((templateName) => <option key={templateName} value={templateName}>{templateName}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Start Date</label>
              <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Deadline</label>
              <input name="deadline" type="date" value={form.deadline} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Assigned Team</label>
              <select name="assignedTo" value={form.assignedTo} onChange={handleChange} className={inputClass}>
                <option value="">Select developer</option>
                {teamMembers.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Progress (%)</label>
              <input name="progress" type="number" min="0" max="100" value={form.progress} onChange={handleChange} className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Scope of Work</label>
            <textarea name="scopeOfWork" value={form.scopeOfWork} onChange={handleChange} rows={3} className={inputClass} placeholder="What needs to be done?" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Deliverables</label>
            <textarea name="deliverables" value={form.deliverables} onChange={handleChange} rows={3} className={inputClass} placeholder="Pages, assets, or final delivery items" />
          </div>

          {error && <p className="text-sm font-medium text-red-500">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">+ Add Project</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editOpen, setEditOpen] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [projectError, setProjectError] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/clients/${id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => { setClient(data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });

    fetch(`${API}/api/admin/users?t=${Date.now()}`, { headers: { Authorization: token }, cache: "no-store" })
      .then((res) => res.ok ? res.json() : { users: [] })
      .then((data) => {
        const developersOnly = Array.isArray(data.users)
          ? data.users.filter((member) => member.accessRole === "developer")
          : [];
        setTeamMembers(developersOnly);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (!client?.clientName) return;

    const token = localStorage.getItem("token");
    setProjectsLoading(true);
    fetch(`${API}/api/projects/client/${client._id}`, {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => {
        const clientProjects = Array.isArray(data) ? data : [];
        setProjects(clientProjects.filter((p) => (
          String(p.clientId || "") === String(client._id) ||
          normalizeName(p.client) === normalizeName(client.clientName)
        )));
      })
      .catch((err) => console.log(err))
      .finally(() => setProjectsLoading(false));
  }, [client?.clientName]);

  const handleEditSave = async (updatedData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/clients/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      setClient(data);
      setEditOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddProject = async (projectData) => {
    if (!projectData.name.trim()) {
      setProjectError("Please enter a project name.");
      return;
    }

    const token = localStorage.getItem("token");
    const progress = Math.min(100, Math.max(0, Number(projectData.progress) || 0));
    const selectedTemplate = templates.find((template) => template.name === projectData.name);

    try {
      setProjectError("");
      const res = await fetch(`${API}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...projectData,
          name: projectData.name.trim(),
          client: client.clientName,
          clientId: client._id,
          progress,
          templateId: selectedTemplate ? String(selectedTemplate.id) : "",
          templateData: selectedTemplate?.defaultData || {},
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Project could not be added.");

      setProjects((prev) => [data, ...prev]);
      setProjectModalOpen(false);
    } catch (err) {
      setProjectError(err.message || "Project could not be added.");
    }
  };

  const handleAddInvoice = () => {
    navigate(`/dashboard/invoices?modal=open&client=${encodeURIComponent(client.clientName)}`);
  };

  const currency = (value = 0) => `$${Number(value).toLocaleString("en-US")}`;
  const paidAmount = client ? (client.totalValue || 0) - (client.balanceDue || 0) : 0;
  const paymentPercent = client && client.totalValue > 0
    ? Math.round((paidAmount / client.totalValue) * 100) : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
        <Sidebar />
        <main className="min-w-0 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="text-indigo-400 text-lg font-semibold animate-pulse">Loading...</div>
        </main>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
        <Sidebar />
        <main className="min-w-0 flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="text-center">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-lg font-bold text-gray-700 dark:text-slate-300">Client not found</p>
            <button onClick={() => navigate("/dashboard/clients")} className="mt-4 text-indigo-600 dark:text-indigo-400 text-sm hover:underline">← Back to Clients</button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8 space-y-6">

        {/* Breadcrumb + Header */}
        <div>
          <p className="text-sm text-gray-400 dark:text-slate-500 mb-2">
            <span className="hover:text-indigo-500 cursor-pointer" onClick={() => navigate("/dashboard/clients")}>Clients</span>
            <span className="mx-1">›</span>
            <span className="text-gray-600 dark:text-slate-300">{client.clientName}</span>
          </p>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">{client.clientName}</h1>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/dashboard/clients")}
                className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition"
              >
                Back
              </button>
              <button
                onClick={() => { setProjectError(""); setProjectModalOpen(true); }}
                className="px-5 py-2 text-sm font-semibold text-indigo-600 dark:text-indigo-300 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-xl shadow-sm transition"
              >
                + Add Project
              </button>
              <button
                onClick={handleAddInvoice}
                className="px-5 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm transition"
              >
                + Add Invoice
              </button>
              <button
                onClick={() => setEditOpen(true)}
                className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
              >
                Edit Client
              </button>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Contract Value", value: currency(client.totalValue), accent: "#6366f1" },
            { label: "Paid Amount", value: currency(paidAmount), accent: "#10b981" },
            { label: "Pending Amount", value: currency(client.balanceDue), accent: "#f97316" },
            { label: "Total Projects", value: projects.length, accent: "#3b82f6" },
          ].map((s) => (
            <div key={s.label} className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-l-4" style={{ borderLeftColor: s.accent }}>
              <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-400 uppercase">{s.label}</p>
              <p className="text-3xl font-bold mt-2" style={{ color: s.accent }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-slate-700">
          <div className="flex gap-6">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold border-b-2 transition ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                    : "border-transparent text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "Overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-5">Basic Information</h2>
                <div className="grid grid-cols-2 gap-y-5">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Full Name</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">{client.clientName}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Email</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">{client.email || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Company</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">{client.company || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Website Type</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">{client.websiteType}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-5">Access Details</h2>
                <div className="grid grid-cols-2 gap-y-5">
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Project Access</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">Selected Projects</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Assigned Projects</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">{projects.length ? `${projects.length} project${projects.length !== 1 ? "s" : ""}` : "No project access assigned"}</p>
                  </div>
                  {/* <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Invite Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">pending</span>
                  </div> */}
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Client Email</p>
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100 break-all">{client.email || "—"}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Workspace</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 break-all">{client.workspace || "—"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-bold text-indigo-600 dark:text-indigo-400 mb-5">Billing Overview</h2>
              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="rounded-xl p-4 bg-indigo-50/60 dark:bg-indigo-900/20 text-center">
                  <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-2">Total Contract</p>
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currency(client.totalValue)}</p>
                </div>
                <div className="rounded-xl p-4 bg-emerald-50 dark:bg-emerald-900/20 text-center">
                  <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-2">Paid</p>
                  <p className="text-2xl font-bold text-emerald-500">{currency(paidAmount)}</p>
                </div>
                <div className="rounded-xl p-4 bg-orange-50 dark:bg-orange-900/20 text-center">
                  <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-2">Pending</p>
                  <p className="text-2xl font-bold text-orange-500">{currency(client.balanceDue)}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 dark:text-slate-500 mb-2">Payment Progress</p>
                <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${paymentPercent}%` }} />
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">{paymentPercent}% paid</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Projects" && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Projects</h2>
                <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">Projects assigned to {client.clientName}</p>
              </div>
              <button
                onClick={() => { setProjectError(""); setProjectModalOpen(true); }}
                className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
              >
                + Add Project
              </button>
            </div>

            {projectsLoading ? (
              <div className="p-10 text-center text-indigo-400 font-semibold animate-pulse">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="p-10 text-center">
                <p className="text-4xl mb-3">📁</p>
                <p className="font-bold text-gray-700 dark:text-slate-300">No projects yet</p>
                <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Projects assigned to this client will appear here.</p>
                <button
                  onClick={() => { setProjectError(""); setProjectModalOpen(true); }}
                  className="mt-5 px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition"
                >
                  + Add Project
                </button>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-slate-700">
                {projects.map((project) => (
                  <div key={project._id} className="p-6 hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <Link to={`/dashboard/projects/${project._id}`} className="text-lg font-bold text-indigo-700 dark:text-indigo-400 hover:underline">
                            {project.name}
                          </Link>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClasses(project.status)}`}>{project.status || "Planning"}</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                          <p className="text-gray-500 dark:text-slate-400"><span className="font-semibold text-gray-700 dark:text-slate-200">Start:</span> {project.startDate || "—"}</p>
                          <p className="text-gray-500 dark:text-slate-400"><span className="font-semibold text-gray-700 dark:text-slate-200">Deadline:</span> {project.deadline || "—"}</p>
                          <p className="text-gray-500 dark:text-slate-400"><span className="font-semibold text-gray-700 dark:text-slate-200">Team:</span> {project.team || "—"}</p>
                        </div>
                      </div>
                      <div className="w-full lg:w-56">
                        <div className="flex items-center justify-between text-xs text-gray-400 dark:text-slate-500 mb-1">
                          <span>Progress</span>
                          <span>{Number(project.progress) || 0}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${Math.min(100, Math.max(0, Number(project.progress) || 0))}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


      </main>

      <EditClientModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        client={client}
        onSave={handleEditSave}
      />

      <AddProjectModal
        open={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        clientName={client.clientName}
        teamMembers={teamMembers}
        onSave={handleAddProject}
        error={projectError}
      />
    </div>
  );
}

export default ClientDetail;
