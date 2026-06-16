import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const TABS = ["Overview", "Projects", "Invoice History"];

const WEBSITE_TYPES = [
  "E-commerce", "Portfolio", "Business", "Blog", "Landing Page", "Web App",
];

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
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Total Value (£)</label>
              <input name="totalValue" type="number" min="0" value={form.totalValue} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Balance Due (£)</label>
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

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Overview");
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // fetch(`http://localhost:5000/api/clients/${id}`
    fetch(`${API}/api/clients/${id}`
    , {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => { setClient(data); setLoading(false); })
      .catch((err) => { console.log(err); setLoading(false); });
  }, [id]);

  const handleEditSave = async (updatedData) => {
    const token = localStorage.getItem("token");
    try {
      const res = await 
      // fetch(`http://localhost:5000/api/clients/${id}`
      fetch(`${API}/api/clients/${id}`
        , {
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

  const currency = (value = 0) => `£${Number(value).toLocaleString("en-GB")}`;
  const paidAmount = client ? (client.totalValue || 0) - (client.balanceDue || 0) : 0;
  const paymentPercent = client && client.totalValue > 0
    ? Math.round((paidAmount / client.totalValue) * 100) : 0;

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-indigo-400 text-lg font-semibold animate-pulse">Loading...</div>
        </main>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
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
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8 space-y-6">

        {/* Breadcrumb + Header */}
        <div>
          <p className="text-sm text-gray-400 dark:text-slate-500 mb-2">
            <span className="hover:text-indigo-500 cursor-pointer" onClick={() => navigate("/dashboard/clients")}>Clients</span>
            <span className="mx-1">›</span>
            <span className="text-gray-600 dark:text-slate-300">{client.clientName}</span>
          </p>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-300">{client.clientName}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/dashboard/clients")}
                className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition"
              >
                Back
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
            { label: "Total Projects", value: "0", accent: "#3b82f6" },
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
                    <p className="text-sm font-semibold text-gray-700 dark:text-slate-100">No project access assigned</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase mb-1">Invite Status</p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">pending</span>
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
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-sm text-center">
            <p className="text-4xl mb-3">📁</p>
            <p className="font-bold text-gray-700 dark:text-slate-300">No projects yet</p>
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Projects assigned to this client will appear here.</p>
          </div>
        )}

        {activeTab === "Invoice History" && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 shadow-sm text-center">
            <p className="text-4xl mb-3">🧾</p>
            <p className="font-bold text-gray-700 dark:text-slate-300">No invoices yet</p>
            <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">Invoice history will appear here once invoices are created.</p>
          </div>
        )}

      </main>

      <EditClientModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        client={client}
        onSave={handleEditSave}
      />
    </div>
  );
}

export default ClientDetail;
