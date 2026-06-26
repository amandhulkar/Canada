import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { useToast } from "../../components/ToastProvider";
import jsPDF from "jspdf";

function fmt(n) {
  return "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  if (isNaN(Date.parse(dateStr))) return dateStr;
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

const defaultDue = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const EMPTY_FORM = { client: "", project: "", amount: "", due: defaultDue(), status: "pending" };
const SAMPLE_INVOICE_FORM = {
  client: "Acme Studios",
  project: "Business Website Development",
  amount: "1200",
  due: defaultDue(),
  status: "pending",
};
const TABS = ["all", "paid", "pending"];
const TAB_LABELS = { all: "All Invoices", paid: "Paid", pending: "Pending" };
const TABLE_HEADERS = ["Invoice #", "Client", "Project", "Amount", "Total", "Due Date", "Status", "Actions"];

export default function Invoices() {
  const [searchParams] = useSearchParams();
  const toast = useToast();
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
  const token = localStorage.getItem("token");

  const initialForm = () => ({
    ...EMPTY_FORM,
    client: searchParams.get("client") || "",
    project: searchParams.get("project") || "",
    due: defaultDue(),
  });
  const [invoices, setInvoices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [tab, setTab] = useState("all");
  const [modal, setModal] = useState(searchParams.get("modal") === "open");
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const fetchInvoices = async () => {
    try {
      const res = await fetch(`${API}/api/invoices`, {
        headers: { Authorization: token }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const formatted = data.map(inv => ({
          _id: inv._id,
          id: inv.invoiceNumber,
          client: inv.client,
          project: inv.project,
          amount: inv.amount,
          total: inv.total || inv.amount,
          due: formatDate(inv.due),
          status: inv.status
        }));
        setInvoices(formatted);
      }
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    const fetchProjectsAndClients = async () => {
      try {
        const headers = { Authorization: token };
        const [projectsRes, clientsRes] = await Promise.all([
          fetch(`${API}/api/projects`, { headers }),
          fetch(`${API}/api/clients?t=${Date.now()}`, { headers, cache: "no-store" })
        ]);
        const projectsData = await projectsRes.json();
        const clientsData = await clientsRes.json();
        setProjects(Array.isArray(projectsData) ? projectsData : []);
        setClients(Array.isArray(clientsData) ? clientsData : []);
      } catch (err) {
        console.error("Error fetching projects and clients:", err);
      }
    };

    fetchProjectsAndClients();
  }, []);

  function downloadPDF(inv) {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" });
    const W = doc.internal.pageSize.getWidth();

    // Header background
    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, W, 80, "F");

    // Logo text
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(255, 255, 255);
    doc.text("FindTemplates", 40, 48);

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("TAX INVOICE", W - 40, 48, { align: "right" });

    // Invoice number + dates
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice #${inv.id}`, 40, 120);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 120);
    doc.text(`Due Date: ${inv.due}`, 40, 140);
    doc.text(`Status: ${inv.status.toUpperCase()}`, 40, 158);

    // Divider
    doc.setDrawColor(220, 220, 235);
    doc.line(40, 172, W - 40, 172);

    // Bill To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 241);
    doc.text("BILL TO", 40, 195);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(13);
    doc.text(inv.client, 40, 215);
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 120);
    doc.text(`Project: ${inv.project}`, 40, 232);

    // Table header
    doc.setFillColor(245, 247, 255);
    doc.rect(40, 262, W - 80, 26, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(99, 102, 241);
    doc.text("Description", 52, 280);
    doc.text("Amount", W - 140, 280);
    doc.text("Total", W - 60, 280, { align: "right" });

    // Table row
    doc.setFont("helvetica", "normal");
    doc.setTextColor(30, 30, 30);
    doc.text(inv.project, 52, 308);
    doc.text(fmt(inv.amount), W - 140, 308);
    doc.text(fmt(inv.total), W - 60, 308, { align: "right" });

    doc.setDrawColor(220, 220, 235);
    doc.line(40, 322, W - 40, 322);

    // Grand Total
    doc.setFillColor(99, 102, 241);
    doc.rect(W - 200, 335, 160, 36, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text("TOTAL", W - 185, 358);
    doc.text(fmt(inv.total), W - 52, 358, { align: "right" });

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(160, 160, 180);
    doc.text("Thank you for your business · admin@findtemplates.com · FindTemplates.com", W / 2, 780, { align: "center" });

    doc.save(`Invoice-${inv.id}-${inv.client.replace(/\s+/g, "_")}.pdf`);
    toast({ type: "success", title: "PDF Downloaded", message: `Invoice #${inv.id} saved as PDF.` });
  }

  const paid = invoices.filter((i) => i.status === "paid");
  const pending = invoices.filter((i) => i.status === "pending");
  const sumPaid = paid.reduce((a, i) => a + i.total, 0);
  const sumPending = pending.reduce((a, i) => a + i.total, 0);
  const filtered = tab === "all" ? invoices : invoices.filter((i) => i.status === tab);

  const total = parseFloat((parseFloat(form.amount) || 0).toFixed(2));
  const clientNames = [
    ...new Set([
      ...clients.map((client) => client.clientName).filter(Boolean),
      ...projects.map((project) => project.client).filter(Boolean),
    ]),
  ];
  const selectedClientProjects = projects.filter((project) => project.client === form.client);

  function openModal() { setForm(initialForm()); setError(""); setModal(true); }
  function closeModal() { setModal(false); setError(""); }
  function autofillInvoice() { setForm({ ...SAMPLE_INVOICE_FORM, due: defaultDue() }); setError(""); }
  function selectClient(clientName) {
    const clientProjects = projects.filter((project) => project.client === clientName);
    setForm({
      ...form,
      client: clientName,
      project: clientProjects.length === 1 ? clientProjects[0].name : "",
    });
  }
  function selectProject(projectName) {
    const project = selectedClientProjects.find((item) => item.name === projectName) || projects.find((item) => item.name === projectName);
    setForm({
      ...form,
      project: projectName,
      client: project?.client || form.client,
    });
  }

  async function addInvoice() {
    if (!form.client.trim() || !form.project.trim() || !form.amount || !form.due) {
      setError("Please fill in all fields."); return;
    }
    const amount = parseFloat(form.amount);
    const totalVal = parseFloat(amount.toFixed(2));

    try {
      const res = await fetch(`${API}/api/invoices`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          client: form.client.trim(),
          project: form.project.trim(),
          amount,
          total: totalVal,
          due: form.due,
          status: form.status
        })
      });
      if (res.ok) {
        const data = await res.json();
        const newInv = {
          _id: data._id,
          id: data.invoiceNumber,
          client: data.client,
          project: data.project,
          amount: data.amount,
          total: data.total || data.amount,
          due: formatDate(data.due),
          status: data.status
        };
        setInvoices((prev) => [newInv, ...prev]);
        closeModal();
        toast({ type: "success", title: "Invoice Created", message: `Invoice #${data.invoiceNumber} for ${data.client} has been added.` });
      } else {
        const errData = await res.json();
        setError(errData.message || "Failed to create invoice");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  }

  async function toggleStatus(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    const nextStatus = inv.status === "paid" ? "pending" : "paid";
    try {
      const res = await fetch(`${API}/api/invoices/${inv._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ status: nextStatus })
      });
      if (res.ok) {
        setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: nextStatus } : i));
        toast({ type: nextStatus === "paid" ? "success" : "warning", title: "Status Updated", message: `Invoice #${id} marked as ${nextStatus}.` });
      } else {
        toast({ type: "error", title: "Error", message: "Failed to update invoice status" });
      }
    } catch (err) {
      toast({ type: "error", title: "Error", message: "Network error: " + err.message });
    }
  }

  async function deleteInvoice(id) {
    const inv = invoices.find(i => i.id === id);
    if (!inv) return;
    try {
      const res = await fetch(`${API}/api/invoices/${inv._id}`, {
        method: "DELETE",
        headers: { Authorization: token }
      });
      if (res.ok) {
        setInvoices((prev) => prev.filter((i) => i.id !== id));
        toast({ type: "error", title: "Invoice Deleted", message: `Invoice #${id} has been removed.` });
      } else {
        toast({ type: "error", title: "Error", message: "Failed to delete invoice" });
      }
    } catch (err) {
      toast({ type: "error", title: "Error", message: "Network error: " + err.message });
    }
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-400">Invoices</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Track all payments and billing</p>
          </div>
          <button
            onClick={openModal}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            + Create Invoice
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border-l-4 border-emerald-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Total Paid</p>
            <p className="text-3xl font-bold text-emerald-500">{fmt(sumPaid)}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{paid.length} invoice{paid.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border-l-4 border-orange-500">
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Pending</p>
            <p className="text-3xl font-bold text-orange-500">{fmt(sumPending)}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{pending.length} invoice{pending.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-3">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t
                  ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
                  : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {t === "paid" && <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded">✓</span>}
              {t === "pending" && <span className="border border-slate-300 dark:border-slate-600 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">◷</span>}
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500 text-right mb-2">{filtered.length} shown</p>

        {/* Table Card */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-slate-700">
            <span className="font-semibold text-indigo-900 dark:text-indigo-400 text-sm">
              {TAB_LABELS[tab] === "All Invoices" ? "All Invoices" : TAB_LABELS[tab] + " Invoices"}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700">
                  {TABLE_HEADERS.map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((inv) => (
                  <tr key={inv.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-indigo-600 dark:text-indigo-400">#{inv.id}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{inv.client}</td>
                    <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{inv.project}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{fmt(inv.amount)}</td>
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">{fmt(inv.total)}</td>
                    <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{inv.due}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        inv.status === "paid"
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                          : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
                      }`}>
                        {inv.status === "paid" ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => toggleStatus(inv.id)} title="Toggle status" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">⟳</button>
                        <button onClick={() => downloadPDF(inv)} title="Download PDF" className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors text-sm">⬇ PDF</button>
                        <button onClick={() => deleteInvoice(inv.id)} title="Delete" className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-slate-300 dark:text-slate-600">
              <div className="text-5xl mb-3 opacity-40">📄</div>
              <p className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-1">No invoices found</p>
              <p className="text-sm text-slate-400 dark:text-slate-500">Create your first invoice to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* Create Invoice Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={closeModal}>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[480px] max-w-[95vw] shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-400">Create Invoice</h2>
                <button
                  type="button"
                  onClick={autofillInvoice}
                  className="mt-1 text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Auto fill sample
                </button>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Client Name</label>
                <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.client} onChange={(e) => selectClient(e.target.value)}>
                  <option value="">Select client</option>
                  {clientNames.map((client) => {
                    const count = projects.filter((project) => project.client === client).length;
                    return (
                      <option key={client} value={client}>
                        {client}{count ? ` — ${count} project${count > 1 ? "s" : ""}` : ""}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Project</label>
                <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.project} onChange={(e) => selectProject(e.target.value)} disabled={!form.client}>
                  <option value="">{form.client ? "Select project" : "Select client first"}</option>
                  {selectedClientProjects.map((project) => (
                    <option key={project._id} value={project.name}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Amount ($)</label>
                <input type="number" min="0" className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Total (auto)</label>
                <input readOnly className="border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500" value={form.amount ? `$${total.toFixed(2)}` : "$0.00"} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Due Date</label>
                <input type="date" className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Status</label>
                <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
            </div>

            {error && <p className="text-orange-500 text-xs mb-3">{error}</p>}

            <div className="flex justify-end gap-2 mt-5">
              <button onClick={closeModal} className="border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition-colors">Cancel</button>
              <button onClick={addInvoice} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">+ Add Invoice</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 