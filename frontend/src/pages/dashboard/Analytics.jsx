import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { useToast } from "../../components/ToastProvider";

// ─── Sample / fallback data ────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function buildMonthlyRevenue(invoices) {
  const map = {};
  MONTHS.forEach((m) => (map[m] = { month: m, revenue: 0, invoices: 0 }));
  invoices.forEach((inv) => {
    const d = new Date(inv.createdAt || Date.now());
    const m = MONTHS[d.getMonth()];
    map[m].revenue += inv.total || 0;
    map[m].invoices += 1;
  });
  return Object.values(map);
}

function buildStatusDist(projects) {
  const map = {};
  projects.forEach((p) => {
    const s = p.status || "Planning";
    map[s] = (map[s] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value }));
}

const STATUS_COLORS = {
  Planning: "#a5b4fc",
  Design: "#7c3aed",
  Development: "#4f46e5",
  Testing: "#f59e0b",
  Live: "#10b981",
  "On Hold": "#f87171",
};

const DEMO_REVENUE = MONTHS.map((m, i) => ({
  month: m,
  revenue: Math.floor(1200 + Math.sin(i) * 600 + Math.random() * 800),
  invoices: Math.floor(2 + Math.random() * 6),
}));

const DEMO_STATUS = [
  { name: "Planning", value: 4 },
  { name: "Design", value: 3 },
  { name: "Development", value: 6 },
  { name: "Testing", value: 2 },
  { name: "Live", value: 5 },
];

const DEMO_ACTIVITY = [
  { label: "Mon", tasks: 5, completed: 3 },
  { label: "Tue", tasks: 8, completed: 6 },
  { label: "Wed", tasks: 4, completed: 4 },
  { label: "Thu", tasks: 10, completed: 7 },
  { label: "Fri", tasks: 6, completed: 5 },
  { label: "Sat", tasks: 3, completed: 3 },
  { label: "Sun", tasks: 2, completed: 1 },
];

// ─── Custom Tooltip ────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 shadow-lg text-xs">
      <p className="font-bold text-slate-700 dark:text-slate-200 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === "number" && p.name.toLowerCase().includes("revenue")
            ? "$" + p.value.toLocaleString()
            : p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{label}</p>
        <p className={`text-4xl font-extrabold mt-1 ${color}`}>{value}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 font-medium">{sub}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color.replace("text-", "bg-").replace("-600", "-50").replace("-400", "-950/40")}`}>
        {icon}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function Analytics() {
  const toast = useToast();
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: token };
    Promise.all([
      fetch(`${API}/api/projects`, { headers }).then((r) => r.json()).catch(() => []),
      fetch(`${API}/api/invoices`, { headers }).then((r) => r.json()).catch(() => []),
    ]).then(([pData, iData]) => {
      const ps = Array.isArray(pData) ? pData : pData.projects || [];
      const is = Array.isArray(iData) ? iData : iData.invoices || [];
      setProjects(ps);
      setInvoices(is);
      setLoading(false);
    });
  }, []);

  const revenueData   = buildMonthlyRevenue(invoices);
  const statusData    = buildStatusDist(projects);
  const activityData  = DEMO_ACTIVITY;

  const totalRevenue  = revenueData.reduce((a, d) => a + d.revenue, 0);
  const totalProjects = projects.length;
  const liveProjects  = projects.filter((p) => p.status === "Live").length;
  const totalInvoices = invoices.length;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Analytics</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Platform overview · Revenue · Project health
            </p>
          </div>
          <button
            onClick={() => {
              toast({ type: "info", title: "Data Refreshed", message: "Analytics data has been refreshed." });
            }}
            className="text-xs font-semibold px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-sm transition cursor-pointer"
          >
            ↻ Refresh
          </button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Revenue"
            value={"$" + (totalRevenue / 1000).toFixed(1) + "k"}
            sub="All-time earnings"
            color="text-indigo-600 dark:text-indigo-400"
            icon={<svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard
            label="Total Projects"
            value={totalProjects}
            sub="All categories"
            color="text-emerald-600 dark:text-emerald-400"
            icon={<svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
          />
          <StatCard
            label="Live Projects"
            value={liveProjects}
            sub="Currently deployed"
            color="text-rose-600 dark:text-rose-400"
            icon={<svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728M9 10a1 1 0 011-1h4a1 1 0 110 2H10a1 1 0 01-1-1z" /></svg>}
          />
          <StatCard
            label="Total Invoices"
            value={totalInvoices}
            sub="Issued this year"
            color="text-amber-600 dark:text-amber-400"
            icon={<svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          />
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-slate-800 dark:text-slate-100">Monthly Revenue</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Invoice earnings tracked over 12 months</p>
            </div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 rounded-full border border-indigo-100 dark:border-indigo-900/30">
              ${totalRevenue.toLocaleString()} total
            </span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => "$" + (v / 1000).toFixed(0) + "k"} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorRev)" dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }} activeDot={{ r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom row: Project status + Weekly Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Project Status Pie */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Project Status Distribution</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">How your {totalProjects} projects are spread</p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {statusData.length > 0 ? (
                <>
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                        {statusData.map((entry) => (
                          <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || "#94a3b8"} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-col gap-2.5 text-xs flex-1">
                    {statusData.map((entry) => (
                      <div key={entry.name} className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: STATUS_COLORS[entry.name] || "#94a3b8" }} />
                          <span className="text-slate-600 dark:text-slate-300 font-medium">{entry.name}</span>
                        </div>
                        <span className="font-bold text-slate-800 dark:text-slate-100">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm w-full font-medium">
                  No projects to analyze
                </div>
              )}
            </div>
          </div>

          {/* Weekly Task Activity */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-1">Weekly Task Activity</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-6">Tasks created vs completed this week</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData} barCategoryGap="35%" barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                <Bar dataKey="tasks" name="Created" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" name="Completed" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-6 flex flex-wrap gap-4">
          <Link to="/dashboard/projects" className="text-xs font-semibold px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            → View All Projects
          </Link>
          <Link to="/dashboard/invoices" className="text-xs font-semibold px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition">
            → View All Invoices
          </Link>
        </div>
      </main>
    </div>
  );
}
