import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const WEBSITE_TYPES = [
  "E-commerce",
  "Portfolio",
  "Business",
  "Blog",
  "Landing Page",
  "Web App",
];

function StatCard({ label, value, sub, accent }) {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-l-4"
      style={{ borderLeftColor: accent }}
    >
      <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-400 uppercase">
        {label}
      </p>
      <p className="text-3xl font-bold mt-2" style={{ color: accent }}>
        {value}
      </p>
      <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function AddClientModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    websiteType: WEBSITE_TYPES[0],
    totalValue: "",
    balanceDue: "",
    lastPayment: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      ...form,
      totalValue: Number(form.totalValue) || 0,
      balanceDue: Number(form.balanceDue) || 0,
      lastPayment: form.lastPayment || "—",
    });
    setForm({
      name: "",
      email: "",
      company: "",
      websiteType: WEBSITE_TYPES[0],
      totalValue: "",
      balanceDue: "",
      lastPayment: "",
    });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Add Client</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Client name</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Acme Studios" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="e.g. client@example.com" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Company (optional)</label>
            <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. Acme Ltd" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Website type</label>
            <select name="websiteType" value={form.websiteType} onChange={handleChange} className={inputClass}>
              {WEBSITE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Total value (£)</label>
              <input name="totalValue" type="number" min="0" value={form.totalValue} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Balance due (£)</label>
              <input name="balanceDue" type="number" min="0" value={form.balanceDue} onChange={handleChange} placeholder="0" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Last payment date</label>
            <input name="lastPayment" type="date" value={form.lastPayment} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition">Cancel</button>
            <button type="submit" className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">Add Client</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const BADGE_COLORS = {
  "E-commerce": "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300",
  "Portfolio": "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
  "Business": "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-300",
  "Blog": "bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-300",
  "Landing Page": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300",
  "Web App": "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
};

function Clients() {
  const [clients, setClients] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Website Types");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // fetch("http://localhost:5000/api/clients"
    fetch(`${API}/api/clients`

      , {
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.log(err));
  }, []);

  const handleAddClient = async (client) => {
    const token = localStorage.getItem("token");
    const res = await 
    // fetch("http://localhost:5000/api/clients"
    fetch(`${API}/api/clients`
      , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        clientName: client.name,
        email: client.email,
        company: client.company,
        websiteType: client.websiteType,
        lastPayment: client.lastPayment,
        totalValue: client.totalValue,
        balanceDue: client.balanceDue,
      }),
    });
    const data = await res.json();
    setClients((prev) => [...prev, data]);
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    // await fetch(`http://localhost:5000/api/clients/${id}`, 
    await fetch(`${API}/api/clients/${id}`,
      {
      method: "DELETE",
      headers: { Authorization: token },
    });
    setClients((prev) => prev.filter((c) => c._id !== id));
  };

  const filteredClients =
    filter === "All Website Types"
      ? clients
      : clients.filter((c) => c.websiteType === filter);

  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, c) => sum + (c.totalValue || 0), 0);
  const pendingPayments = clients.reduce((sum, c) => sum + (c.balanceDue || 0), 0);
  const activeProjects = clients.filter((c) => c.balanceDue > 0).length;

  const currency = (value = 0) => `£${Number(value).toLocaleString("en-GB")}`;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-400">Clients</h1>
            <p className="text-gray-400 dark:text-slate-500 mt-1">Manage all your client relationships</p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            <span className="text-lg leading-none">+</span> Add Client
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Clients" value={totalClients} sub="All time" accent="#6366f1" />
          <StatCard label="Active Projects" value={activeProjects} sub="In progress" accent="#10b981" />
          <StatCard label="Pending Payments" value={currency(pendingPayments)} sub="Unpaid balance" accent="#f97316" />
          <StatCard label="Total Revenue" value={currency(totalRevenue)} sub="Contract value" accent="#3b82f6" />
        </div>

        <div className="flex items-center justify-between mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option>All Website Types</option>
            {WEBSITE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <span className="text-sm text-gray-400 dark:text-slate-500">
            {filteredClients.length} client{filteredClients.length !== 1 && "s"}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Client List</h2>
            <span className="text-sm text-gray-400 dark:text-slate-500">
              {filteredClients.length} client{filteredClients.length !== 1 && "s"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 dark:text-slate-500 uppercase text-xs tracking-wider border-b border-gray-100 dark:border-slate-700">
                  <th className="px-6 py-3 font-semibold">Client</th>
                  <th className="px-6 py-3 font-semibold">Website Type</th>
                  <th className="px-6 py-3 font-semibold">Last Payment</th>
                  <th className="px-6 py-3 font-semibold">Total Value</th>
                  <th className="px-6 py-3 font-semibold">Balance Due</th>
                  <th className="px-6 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-20 text-center">
                      <div className="text-5xl mb-4">👥</div>
                      <p className="text-lg font-bold text-gray-700 dark:text-slate-300">No clients found</p>
                      <p className="text-gray-400 dark:text-slate-500 mt-1">Add your first client to get started</p>
                    </td>
                  </tr>
                ) : (
                  filteredClients.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b border-gray-50 dark:border-slate-700 hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition"
                    >
                      {/* Client name + email */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-700 dark:text-slate-100">{c.clientName}</p>
                        {c.email && <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{c.email}</p>}
                      </td>

                      {/* Website type badge */}
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[c.websiteType] || "bg-gray-100 text-gray-600"}`}>
                          {c.websiteType}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{c.lastPayment || "—"}</td>

                      <td className="px-6 py-4 font-semibold text-indigo-700 dark:text-indigo-300">
                        {currency(c.totalValue)}
                      </td>

                      {/* Balance due — Paid badge or amount */}
                      <td className="px-6 py-4">
                        {c.balanceDue > 0 ? (
                          <span className="text-orange-500 font-semibold">{currency(c.balanceDue)}</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                            Paid ✓
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {/* Eye button */}
                          <button
                            onClick={() => navigate(`/dashboard/clients/${c._id}`)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition"
                            title="View details"
                          >
                            👁️
                          </button>
                          {/* Delete button */}
                          <button
                            onClick={() => handleDelete(c._id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/20 text-red-400 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 transition"
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <AddClientModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleAddClient} />
      </main>
    </div>
  );
}

export default Clients;