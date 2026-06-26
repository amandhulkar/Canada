import { useState } from "react";
import Sidebar from "../../components/Sidebar";

const EMPTY_FORM = { name: "", category: "", price: "", clients: "", description: "" };

export default function Services() {
  const [services, setServices] = useState([]);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(1);

  const totalRevenue = services.reduce((a, s) => a + s.price * s.clients, 0);
  const totalClients = services.reduce((a, s) => a + s.clients, 0);
  const topService = services.length
    ? services.reduce((a, s) => (s.price * s.clients > a.price * a.clients ? s : a))
    : null;

  function openModal() {
    setForm(EMPTY_FORM);
    setError("");
    setModal(true);
  }

  function closeModal() {
    setModal(false);
    setError("");
  }

  function addService() {
    if (!form.name.trim() || !form.price || !form.clients) {
      setError("Please fill in all required fields.");
      return;
    }
    setServices((prev) => [
      ...prev,
      {
        id: counter,
        name: form.name.trim(),
        category: form.category.trim() || "General",
        price: parseFloat(form.price),
        clients: parseInt(form.clients),
        description: form.description.trim(),
      },
    ]);
    setCounter((c) => c + 1);
    closeModal();
  }

  function deleteService(id) {
    setServices((prev) => prev.filter((s) => s.id !== id));
  }

  const fmt = (n) =>
    "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const inputClass =
    "border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400";

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-400">Services</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Manage your agency's service offerings and pricing</p>
          </div>
          <button
            onClick={openModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
          >
            + Add Service
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border-l-4 border-indigo-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3">Total Services</p>
            <p className="text-4xl font-bold text-slate-800 dark:text-slate-100">{services.length}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border-l-4 border-emerald-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3">Total Revenue</p>
            <p className="text-4xl font-bold text-emerald-500">{fmt(totalRevenue)}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">All services combined</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border-l-4 border-blue-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3">Active Clients</p>
            <p className="text-4xl font-bold text-blue-500">{totalClients}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">Across all services</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border-l-4 border-orange-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-3">Top Service</p>
            {topService ? (
              <>
                <p className="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">{topService.name}</p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Highest revenue</p>
              </>
            ) : (
              <>
                <div className="w-8 h-0.5 bg-orange-400 mb-3"></div>
                <p className="text-sm text-slate-400 dark:text-slate-500">Highest revenue</p>
              </>
            )}
          </div>
        </div>

        {/* Services Grid / Empty State */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-slate-300 dark:text-slate-600">
            <svg className="w-16 h-16 mb-4 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.654-4.654m5.614-4.615 3.03-2.496a2.652 2.652 0 0 0-3.533-3.534l-3.03 2.496m5.563 5.03-5.563-5.03" />
            </svg>
            <p className="text-lg font-semibold text-slate-500 dark:text-slate-400 mb-1">No services yet</p>
            <p className="text-sm text-slate-400 dark:text-slate-500">Add your first service offering</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {services.map((s) => (
              <div key={s.id} className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">{s.name}</h3>
                    <span className="inline-block mt-1 text-xs font-medium bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                      {s.category}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteService(s.id)}
                    className="text-slate-300 dark:text-slate-600 hover:text-red-400 dark:hover:text-red-400 transition-colors text-lg"
                    title="Delete"
                  >
                    ×
                  </button>
                </div>
                {s.description && (
                  <p className="text-xs text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{s.description}</p>
                )}
                <div className="flex justify-between items-center pt-3 border-t border-slate-50 dark:border-slate-700">
                  <div>
                    <p className="text-xs text-slate-400 dark:text-slate-500">Price</p>
                    <p className="text-base font-bold text-emerald-500">{fmt(s.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Clients</p>
                    <p className="text-base font-bold text-blue-500">{s.clients}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Revenue</p>
                    <p className="text-base font-bold text-indigo-600 dark:text-indigo-400">{fmt(s.price * s.clients)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Service Modal */}
      {modal && (
        <div
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-[460px] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-5">Add Service</h2>

            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Service Name *</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. SEO Audit"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Category</label>
                  <input
                    className={inputClass}
                    placeholder="e.g. Marketing"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Price ($) *</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    placeholder="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Active Clients *</label>
                  <input
                    type="number"
                    min="0"
                    className={inputClass}
                    placeholder="0"
                    value={form.clients}
                    onChange={(e) => setForm({ ...form, clients: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  placeholder="Brief description of the service..."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-orange-500 text-xs mt-2">{error}</p>}

            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={closeModal}
                className="border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addService}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
              >
                + Add Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}