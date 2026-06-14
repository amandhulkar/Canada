// import { useState } from "react";
// import Sidebar from "../../components/Sidebar";

// function fmt(n) {
//   return "£" + Number(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
// }

// function formatDate(dateStr) {
//   if (!dateStr) return "";
//   return new Date(dateStr).toLocaleDateString("en-GB", {
//     day: "2-digit", month: "short", year: "numeric",
//   });
// }

// const defaultDue = () => {
//   const d = new Date();
//   d.setDate(d.getDate() + 30);
//   return d.toISOString().split("T")[0];
// };

// const EMPTY_FORM = { client: "", project: "", amount: "", due: defaultDue(), status: "pending" };
// const TABS = ["all", "paid", "pending"];
// const TAB_LABELS = { all: "All Invoices", paid: "Paid", pending: "Pending" };
// const TABLE_HEADERS = ["Invoice #", "Client", "Project", "Amount", "GST (18%)", "Total", "Due Date", "Status", "Actions"];

// export default function Invoices() {
//   const [invoices, setInvoices] = useState([]);
//   const [tab, setTab] = useState("all");
//   const [modal, setModal] = useState(false);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [counter, setCounter] = useState(1001);
//   const [error, setError] = useState("");

//   const paid = invoices.filter((i) => i.status === "paid");
//   const pending = invoices.filter((i) => i.status === "pending");
//   const sumPaid = paid.reduce((a, i) => a + i.total, 0);
//   const sumPending = pending.reduce((a, i) => a + i.total, 0);
//   const filtered = tab === "all" ? invoices : invoices.filter((i) => i.status === tab);

//   const gst = parseFloat(((parseFloat(form.amount) || 0) * 0.18).toFixed(2));
//   const total = parseFloat(((parseFloat(form.amount) || 0) + gst).toFixed(2));

//   function openModal() { setForm({ ...EMPTY_FORM, due: defaultDue() }); setError(""); setModal(true); }
//   function closeModal() { setModal(false); setError(""); }

//   function addInvoice() {
//     if (!form.client.trim() || !form.project.trim() || !form.amount || !form.due) {
//       setError("Please fill in all fields."); return;
//     }
//     const amount = parseFloat(form.amount);
//     const gstVal = parseFloat((amount * 0.18).toFixed(2));
//     const totalVal = parseFloat((amount + gstVal).toFixed(2));
//     setInvoices((prev) => [{ id: counter, client: form.client.trim(), project: form.project.trim(), amount, gst: gstVal, total: totalVal, due: formatDate(form.due), status: form.status }, ...prev]);
//     setCounter((c) => c + 1);
//     closeModal();
//   }

//   function toggleStatus(id) {
//     setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === "paid" ? "pending" : "paid" } : i));
//   }

//   function deleteInvoice(id) { setInvoices((prev) => prev.filter((i) => i.id !== id)); }

//   return (
//     <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
//       <Sidebar />

//       <main className="flex-1 p-8">
//         {/* Page Header */}
//         <div className="flex items-start justify-between mb-6">
//           <div>
//             <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-400">Invoices</h1>
//             <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Track all payments and billing</p>
//           </div>
//           <button
//             onClick={openModal}
//             className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
//           >
//             + Create Invoice
//           </button>
//         </div>

//         {/* Stat Cards */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border-l-4 border-emerald-500">
//             <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Total Paid</p>
//             <p className="text-3xl font-bold text-emerald-500">{fmt(sumPaid)}</p>
//             <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{paid.length} invoice{paid.length !== 1 ? "s" : ""}</p>
//           </div>
//           <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border-l-4 border-orange-500">
//             <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">Pending</p>
//             <p className="text-3xl font-bold text-orange-500">{fmt(sumPending)}</p>
//             <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{pending.length} invoice{pending.length !== 1 ? "s" : ""}</p>
//           </div>
//         </div>

//         {/* Tabs */}
//         <div className="flex border-b border-slate-200 dark:border-slate-700 mb-3">
//           {TABS.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
//                 tab === t
//                   ? "border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400"
//                   : "border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
//               }`}
//             >
//               {t === "paid" && <span className="bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded">✓</span>}
//               {t === "pending" && <span className="border border-slate-300 dark:border-slate-600 text-slate-400 text-[10px] px-1.5 py-0.5 rounded">◷</span>}
//               {TAB_LABELS[t]}
//             </button>
//           ))}
//         </div>

//         <p className="text-xs text-slate-400 dark:text-slate-500 text-right mb-2">{filtered.length} shown</p>

//         {/* Table Card */}
//         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
//           <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100 dark:border-slate-700">
//             <span className="font-semibold text-indigo-900 dark:text-indigo-400 text-sm">
//               {TAB_LABELS[tab] === "All Invoices" ? "All Invoices" : TAB_LABELS[tab] + " Invoices"}
//             </span>
//             <span className="text-xs text-slate-400 dark:text-slate-500">
//               {filtered.length} invoice{filtered.length !== 1 ? "s" : ""}
//             </span>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full text-sm">
//               <thead>
//                 <tr className="border-b border-slate-100 dark:border-slate-700">
//                   {TABLE_HEADERS.map((h) => (
//                     <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((inv) => (
//                   <tr key={inv.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
//                     <td className="px-4 py-3 font-semibold text-indigo-600 dark:text-indigo-400">#{inv.id}</td>
//                     <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{inv.client}</td>
//                     <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{inv.project}</td>
//                     <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{fmt(inv.amount)}</td>
//                     <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{fmt(inv.gst)}</td>
//                     <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-200">{fmt(inv.total)}</td>
//                     <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{inv.due}</td>
//                     <td className="px-4 py-3">
//                       <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
//                         inv.status === "paid"
//                           ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
//                           : "bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400"
//                       }`}>
//                         {inv.status === "paid" ? "Paid" : "Pending"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <button onClick={() => toggleStatus(inv.id)} title="Toggle status" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mr-1">⟳</button>
//                       <button onClick={() => deleteInvoice(inv.id)} title="Delete" className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {filtered.length === 0 && (
//             <div className="text-center py-16 text-slate-300 dark:text-slate-600">
//               <div className="text-5xl mb-3 opacity-40">📄</div>
//               <p className="text-base font-semibold text-slate-500 dark:text-slate-400 mb-1">No invoices found</p>
//               <p className="text-sm text-slate-400 dark:text-slate-500">Create your first invoice to get started</p>
//             </div>
//           )}
//         </div>
//       </main>

//       {/* Create Invoice Modal */}
//       {modal && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center" onClick={closeModal}>
//           <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-[480px] max-w-[95vw] shadow-xl" onClick={(e) => e.stopPropagation()}>
//             <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-5">Create Invoice</h2>

//             <div className="grid grid-cols-2 gap-3 mb-4">
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Client Name</label>
//                 <input className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. Acme Corp" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Project</label>
//                 <input className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. Website Redesign" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Amount (£)</label>
//                 <input type="number" min="0" className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">GST 18% (auto)</label>
//                 <input readOnly className="border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500" value={form.amount ? `£${gst.toFixed(2)}` : "£0.00"} />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Total (auto)</label>
//                 <input readOnly className="border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500" value={form.amount ? `£${total.toFixed(2)}` : "£0.00"} />
//               </div>
//               <div className="flex flex-col gap-1">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Due Date</label>
//                 <input type="date" className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
//               </div>
//               <div className="flex flex-col gap-1 col-span-2">
//                 <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Status</label>
//                 <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
//                   <option value="pending">Pending</option>
//                   <option value="paid">Paid</option>
//                 </select>
//               </div>
//             </div>

//             {error && <p className="text-orange-500 text-xs mb-3">{error}</p>}

//             <div className="flex justify-end gap-2 mt-5">
//               <button onClick={closeModal} className="border border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm px-4 py-2 rounded-lg transition-colors">Cancel</button>
//               <button onClick={addInvoice} className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">+ Add Invoice</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

function fmt(n) {
  return "£" + Number(n).toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

const defaultDue = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().split("T")[0];
};

const EMPTY_FORM = { client: "", project: "", amount: "", due: defaultDue(), status: "pending" };
const TABS = ["all", "paid", "pending"];
const TAB_LABELS = { all: "All Invoices", paid: "Paid", pending: "Pending" };
const TABLE_HEADERS = ["Invoice #", "Client", "Project", "Amount", "GST (18%)", "Total", "Due Date", "Status", "Actions"];

export default function Invoices() {
  const [searchParams] = useSearchParams(); // ✅ URL params read karo
  const [invoices, setInvoices] = useState([]);
  const [tab, setTab] = useState("all");
  const [modal, setModal] = useState(searchParams.get("modal") === "open"); // ✅ auto open
  const [form, setForm] = useState(EMPTY_FORM);
  const [counter, setCounter] = useState(1001);
  const [error, setError] = useState("");

  const paid = invoices.filter((i) => i.status === "paid");
  const pending = invoices.filter((i) => i.status === "pending");
  const sumPaid = paid.reduce((a, i) => a + i.total, 0);
  const sumPending = pending.reduce((a, i) => a + i.total, 0);
  const filtered = tab === "all" ? invoices : invoices.filter((i) => i.status === tab);

  const gst = parseFloat(((parseFloat(form.amount) || 0) * 0.18).toFixed(2));
  const total = parseFloat(((parseFloat(form.amount) || 0) + gst).toFixed(2));

  function openModal() { setForm({ ...EMPTY_FORM, due: defaultDue() }); setError(""); setModal(true); }
  function closeModal() { setModal(false); setError(""); }

  function addInvoice() {
    if (!form.client.trim() || !form.project.trim() || !form.amount || !form.due) {
      setError("Please fill in all fields."); return;
    }
    const amount = parseFloat(form.amount);
    const gstVal = parseFloat((amount * 0.18).toFixed(2));
    const totalVal = parseFloat((amount + gstVal).toFixed(2));
    setInvoices((prev) => [{ id: counter, client: form.client.trim(), project: form.project.trim(), amount, gst: gstVal, total: totalVal, due: formatDate(form.due), status: form.status }, ...prev]);
    setCounter((c) => c + 1);
    closeModal();
  }

  function toggleStatus(id) {
    setInvoices((prev) => prev.map((i) => i.id === id ? { ...i, status: i.status === "paid" ? "pending" : "paid" } : i));
  }

  function deleteInvoice(id) { setInvoices((prev) => prev.filter((i) => i.id !== id)); }

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
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
                    <td className="px-4 py-3 text-slate-400 dark:text-slate-400">{fmt(inv.gst)}</td>
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
                      <button onClick={() => toggleStatus(inv.id)} title="Toggle status" className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors mr-1">⟳</button>
                      <button onClick={() => deleteInvoice(inv.id)} title="Delete" className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors">🗑</button>
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
            <h2 className="text-lg font-bold text-indigo-900 dark:text-indigo-400 mb-5">Create Invoice</h2>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Client Name</label>
                <input className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. Acme Corp" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Project</label>
                <input className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="e.g. Website Redesign" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Amount (£)</label>
                <input type="number" min="0" className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500" placeholder="0" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">GST 18% (auto)</label>
                <input readOnly className="border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500" value={form.amount ? `£${gst.toFixed(2)}` : "£0.00"} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Total (auto)</label>
                <input readOnly className="border border-slate-100 dark:border-slate-600 bg-slate-50 dark:bg-slate-700/50 rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500" value={form.amount ? `£${total.toFixed(2)}` : "£0.00"} />
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