// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Sidebar from "../../components/Sidebar";
// import { pricingPlans } from "../../assets/siteData";

// const TRIAL_DAYS = 3;

// function useCountdown() {
//   const [target] = useState(() => {
//     const saved = localStorage.getItem("trialEndsAt");
//     if (saved) return new Date(saved);
//     const end = new Date();
//     end.setDate(end.getDate() + TRIAL_DAYS);
//     localStorage.setItem("trialEndsAt", end.toISOString());
//     return end;
//   });

//   const [timeLeft, setTimeLeft] = useState("");

//   useEffect(() => {
//     const tick = () => {
//       const diff = target - new Date();
//       if (diff <= 0) {
//         setTimeLeft("0d 00h 00m 00s");
//         return;
//       }
//       const d = Math.floor(diff / (1000 * 60 * 60 * 24));
//       const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
//       const m = Math.floor((diff / (1000 * 60)) % 60);
//       const s = Math.floor((diff / 1000) % 60);
//       setTimeLeft(
//         `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
//       );
//     };
//     tick();
//     const interval = setInterval(tick, 1000);
//     return () => clearInterval(interval);
//   }, [target]);

//   return timeLeft;
// }

// function StatCard({ label, value, sub }) {
//   return (
//     <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
//       <h3 className="text-gray-700 dark:text-slate-300 font-semibold mb-2">{label}</h3>
//       <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
//       <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">{sub}</p>
//     </div>
//   );
// }

// function QuickLink({ to, title, sub, highlight }) {
//   return (
//     <Link
//       to={to}
//       className={`rounded-2xl p-5 shadow-sm transition hover:shadow-md ${
//         highlight
//           ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
//           : "bg-white dark:bg-slate-800"
//       }`}
//     >
//       <p className={`font-bold ${highlight ? "text-white" : "text-gray-800 dark:text-slate-100"}`}>
//         {title}
//       </p>
//       <p className={`text-sm mt-1 ${highlight ? "text-indigo-100" : "text-gray-400 dark:text-slate-400"}`}>
//         {sub}
//       </p>
//     </Link>
//   );
// }

// const PROJECT_STATUSES = [
//   { label: "Planning", color: "#a5b4fc" },
//   { label: "Design", color: "#7c3aed" },
//   { label: "Development", color: "#312e81" },
//   { label: "Testing", color: "#d1d5db" },
//   { label: "Live", color: "#10b981" },
//   { label: "On Hold", color: "#fb923c" },
// ];

// function PricingModal({ open, onClose, onChoosePlan }) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//       <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-3xl p-8 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-5 right-5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition text-xl leading-none"
//           aria-label="Close"
//         >
//           ✕
//         </button>

//         <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center">
//           Upgrade your plan
//         </h2>
//         <p className="text-gray-400 dark:text-slate-400 text-center mt-2 mb-8">
//           Choose a plan to unlock full access after your trial ends.
//         </p>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {pricingPlans.map((plan) => (
//             <div
//               key={plan.name}
//               className={`rounded-2xl p-6 border ${
//                 plan.featured
//                   ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md"
//                   : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-700"
//               }`}
//             >
//               {plan.featured && (
//                 <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
//                   Most popular
//                 </span>
//               )}
//               <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">{plan.name}</h3>
//               <p className="mt-2">
//                 <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
//                   {plan.price}
//                 </span>
//                 {plan.cadence && (
//                   <span className="text-gray-400 dark:text-slate-400">{plan.cadence}</span>
//                 )}
//               </p>
//               {plan.summary && (
//                 <p className="text-sm text-gray-400 dark:text-slate-400 mt-2">{plan.summary}</p>
//               )}

//               <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
//                 {plan.features.map((f) => (
//                   <li key={f} className="flex items-start gap-2">
//                     <span className="text-emerald-500 font-bold">✓</span>
//                     {f}
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() => onChoosePlan(plan.name)}
//                 className={`w-full mt-6 font-semibold px-4 py-2.5 rounded-xl transition ${
//                   plan.featured
//                     ? "bg-indigo-600 text-white hover:bg-indigo-700"
//                     : "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
//                 }`}
//               >
//                 Choose {plan.name}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// function Dashboard() {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   const timeLeft = useCountdown();
//   const [pricingOpen, setPricingOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleChoosePlan = (planName) => {
//     setPricingOpen(false);
//     navigate(`/?plan=${encodeURIComponent(planName)}#pricing`);
//   };

//   const today = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//   });

//   const getGreeting = () => {
//     const hour = new Date().getHours();
//     if (hour < 12) return "Good morning";
//     if (hour < 18) return "Good afternoon";
//     return "Good evening";
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
//       <Sidebar />

//       <main className="flex-1 p-8">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-6">
//           <div>
//             <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Dashboard</h1>
//             <p className="text-gray-400 dark:text-slate-500 mt-1">
//               {getGreeting()} - {today}
//             </p>
//           </div>

//           <div className="flex gap-3">
//             {/* ✅ FIXED: + Invoice button */}
//             <button
//               onClick={() => navigate("/dashboard/invoices?modal=open")}
//               className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition"
//             >
//               + Invoice
//             </button>

//             {/* + Add Client */}
//             <button
//               onClick={() => navigate("/dashboard/clients")}
//               className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
//             >
//               + Add Client
//             </button>
//           </div>
//         </div>

//         {/* Trial Banner */}
//         <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold">
//               {TRIAL_DAYS}-day dashboard trial is active
//             </h2>
//             <p className="text-emerald-50 mt-1">
//               You can use all dashboard features during the trial. Templates still require separate payment.
//             </p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="bg-white/15 rounded-2xl px-6 py-3 text-center">
//               <p className="text-sm text-emerald-50">Trial ends in</p>
//               <p className="text-2xl font-bold tabular-nums">{timeLeft}</p>
//             </div>
//             <div className="text-center">
//               <p className="text-sm text-emerald-50 mb-2">Full access to the website</p>
//               <button
//                 onClick={() => setPricingOpen(true)}
//                 className="bg-white text-emerald-600 font-bold px-5 py-2 rounded-xl hover:bg-emerald-50 transition"
//               >
//                 Upgrade Plan
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <StatCard label="Monthly Revenue" value="$0" sub="Up 12% vs last month" />
//           <StatCard label="Active Projects" value="0" sub="Across all clients" />
//           <StatCard label="Complete project" value="0" sub="Need attention" />
//           <StatCard label="Pending Payments" value="$0" sub="Outstanding balance" />
//         </div>

//         {/* Quick links */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
//           <QuickLink to="/dashboard/clients" title="Clients" sub="Clients" />
//           <QuickLink to="/dashboard/projects" title="Projects" sub="Projects" />
//           <QuickLink to="/dashboard/invoices" title="Invoices" sub="Invoices" />
//           <QuickLink to="/dashboard/teams" title="Team" sub="Team" />
//           <QuickLink to="/dashboard/services" title="Services" sub="Services" />
//           {/* <QuickLink to="/dashboard/roles" title="Roles" sub="Access" /> */}
//           <QuickLink to="/dashboard/access-roles" title="Roles" sub="Access" />
//           <QuickLink to="/dashboard/settings" title="Settings" sub="Manage Account" />
//           {/* ✅ FIXED: New Invoice quick link */}
//           <QuickLink to="/dashboard/invoices?modal=open" title="New" sub="New Invoice" highlight />
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
//           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
//             <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-6">
//               Website Projects by Status
//             </h3>
//             <div className="h-40 flex items-center justify-center text-gray-300 dark:text-slate-600 text-sm">
//               No project data yet
//             </div>
//             <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-4">
//               {PROJECT_STATUSES.map((s) => (
//                 <div key={s.label} className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
//                   <span className="w-4 h-4 rounded" style={{ backgroundColor: s.color }} />
//                   {s.label}
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
//                 Revenue Analytics - {new Date().getFullYear()}
//               </h3>
//               <span className="text-sm font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">
//                 No data
//               </span>
//             </div>
//             <p className="text-gray-400 dark:text-slate-500 text-sm mb-4">
//               No paid or pending invoice totals are available for {new Date().getFullYear()} yet.
//             </p>
//             <div className="h-40 flex items-center justify-center text-gray-300 dark:text-slate-600 text-sm">
//               Revenue chart will appear here
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 mb-6">
//           <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
//             Recent Activity
//           </h3>
//           <p className="text-gray-400 dark:text-slate-500">No recent real activity yet.</p>
//         </div>

//         {/* Urgent Alerts */}
//         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
//           <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
//             Urgent Alerts
//           </h3>
//           <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-semibold rounded-xl p-4">
//             No urgent real-data alerts right now.
//           </div>
//         </div>
//       </main>

//       <PricingModal
//         open={pricingOpen}
//         onClose={() => setPricingOpen(false)}
//         onChoosePlan={handleChoosePlan}
//       />
//     </div>
//   );
// }

// export default Dashboard;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { pricingPlans } from "../../assets/siteData";

function AdminDashboard({ user }) {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState(null);
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const headers = { Authorization: token };
    fetch(`${API}/api/admin/users`, { headers }).then((r) => r.json()).then((d) => setUsers(d.users || []));
    fetch(`${API}/api/admin/projects`, { headers }).then((r) => r.json()).then((d) => setProjects(d.projects || []));
    fetch(`${API}/api/admin/stats`, { headers }).then((r) => r.json()).then((d) => setStats(d));
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    await fetch(`${API}/api/admin/users/${id}`, { method: "DELETE", headers: { Authorization: token } });
    setUsers(users.filter((u) => u._id !== id));
  };

  const banUser = async (id) => {
    try {
      const res = await fetch(`${API}/api/admin/users/${id}/ban`, { method: "PATCH", headers: { Authorization: token } });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to suspend user");
        return;
      }
      setUsers(users.map((u) => u._id === id ? { ...u, banned: data.banned } : u));
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  };

  const getStatusBadge = (status) => {
    const s = status ? status.toLowerCase() : "";
    let colors = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
    if (s.includes("live") || s.includes("completed")) {
      colors = "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30";
    } else if (s.includes("development") || s.includes("dev")) {
      colors = "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/30";
    } else if (s.includes("design")) {
      colors = "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30";
    } else if (s.includes("planning")) {
      colors = "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30";
    } else if (s.includes("testing")) {
      colors = "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30";
    } else if (s.includes("hold")) {
      colors = "bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30";
    }
    return (
      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${colors}`}>
        {status || "Planning"}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Admin Console</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Oversee platform activity, manage registered accounts, and audit project metrics.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-3.5 py-1.5 rounded-full border border-indigo-100/50 dark:border-indigo-900/30">
              Admin Access
            </span>
            <button
              onClick={() => {
                localStorage.clear();
                navigate("/signup");
              }}
              className="text-xs font-semibold px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl shadow-sm transition cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Total Users</p>
                <p className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalUsers}</p>
                <p className="text-xs text-indigo-500 mt-1.5 font-medium">Registered accounts</p>
              </div>
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Total Projects</p>
                <p className="text-4xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{stats.totalProjects}</p>
                <p className="text-xs text-emerald-500 mt-1.5 font-medium">Active platform boards</p>
              </div>
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Banned Users</p>
                <p className="text-4xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{stats.bannedUsers}</p>
                <p className="text-xs text-rose-500 mt-1.5 font-medium">Suspended access accounts</p>
              </div>
              <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* Users Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm mb-8 overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">All Platform Users</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Manage permissions, status, and account actions.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
              {users.length} Users Listed
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">User Profile</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Email Address</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">System Role</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Access Status</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-bold">
                          {getInitials(u.fullName)}
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{u.fullName}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 dark:text-slate-400">{u.email}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-bold tracking-wide uppercase ${
                        u.role === "admin"
                          ? "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/30"
                          : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                        u.banned
                          ? "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30"
                          : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30"
                      }`}>
                        {u.banned ? "Suspended" : "Active"}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => banUser(u._id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                            u.banned
                              ? "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 dark:hover:bg-emerald-950/60"
                              : "bg-amber-50 hover:bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-950/60"
                          }`}
                        >
                          {u.banned ? "Reactivate" : "Suspend"}
                        </button>
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950/60 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Projects Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">All Client Projects</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Track project status, clients, deadlines, and assigned staff.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg">
              {projects.length} Active Projects
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Project Info</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Client Name</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Project Status</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Assigned User</th>
                  <th className="pb-3 font-semibold uppercase tracking-wider text-xs">Target Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {projects.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          💼
                        </div>
                        <span className="font-semibold text-slate-800 dark:text-slate-100">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 dark:text-slate-400 font-medium">{p.client}</td>
                    <td className="py-4">{getStatusBadge(p.status)}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center">
                          {getInitials(p.user?.fullName)}
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{p.user?.fullName || "N/A"}</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-500 dark:text-slate-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{p.deadline || "No deadline"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

const TRIAL_DAYS = 3;

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
      if (diff <= 0) {
        setTimeLeft("0d 00h 00m 00s");
        return;
      }
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);
      setTimeLeft(
        `${d}d ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return timeLeft;
}

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
      <h3 className="text-gray-700 dark:text-slate-300 font-semibold mb-2">{label}</h3>
      <p className="text-4xl font-bold text-green-600 dark:text-green-400">{value}</p>
      <p className="text-sm text-gray-400 dark:text-slate-500 mt-1">{sub}</p>
    </div>
  );
}

function QuickLink({ to, title, sub, highlight }) {
  return (
    <Link
      to={to}
      className={`rounded-2xl p-5 shadow-sm transition hover:shadow-md ${
        highlight
          ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <p className={`font-bold ${highlight ? "text-white" : "text-gray-800 dark:text-slate-100"}`}>
        {title}
      </p>
      <p className={`text-sm mt-1 ${highlight ? "text-green-100" : "text-gray-400 dark:text-slate-400"}`}>
        {sub}
      </p>
    </Link>
  );
}

const PROJECT_STATUSES = [
  { label: "Planning", color: "#a5b4fc" },
  { label: "Design", color: "#7c3aed" },
  { label: "Development", color: "#312e81" },
  { label: "Testing", color: "#d1d5db" },
  { label: "Live", color: "#10b981" },
  { label: "On Hold", color: "#fb923c" },
];

function PricingModal({ open, onClose, onChoosePlan }) {
  const [isAnnual, setIsAnnual] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-5xl p-8 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 text-center">
          Upgrade your plan
        </h2>
        <p className="text-gray-400 dark:text-slate-400 text-center mt-2 mb-5">
          Choose a plan to unlock full access after your trial ends.
        </p>

        <div className="flex items-center justify-center gap-3 mb-8">
          <span className={`text-sm font-semibold ${!isAnnual ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual((prev) => !prev)}
            className={`relative h-7 w-14 rounded-full transition cursor-pointer ${isAnnual ? "bg-green-600" : "bg-slate-200 dark:bg-slate-700"}`}
            aria-label="Toggle billing period"
          >
            <span
              className={`absolute left-0 top-1 h-5 w-5 rounded-full bg-white shadow transition-transform ${isAnnual ? "translate-x-8" : "translate-x-1"}`}
            />
          </button>
          <span className={`text-sm font-semibold ${isAnnual ? "text-green-600 dark:text-green-400" : "text-slate-400 dark:text-slate-500"}`}>
            Annual
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border ${
                plan.featured
                  ? "border-green-500 bg-green-50 dark:bg-green-900/30 shadow-md"
                  : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-700"
              }`}
            >
              {plan.featured && (
                <span className="inline-block bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {isAnnual ? plan.priceAnnual : plan.price}
                </span>
                {plan.cadence && (
                  <span className="text-gray-400 dark:text-slate-400">
                    {isAnnual ? plan.cadenceAnnual : plan.cadence}
                  </span>
                )}
              </p>
              {plan.summary && (
                <p className="text-sm text-gray-400 dark:text-slate-400 mt-2">{plan.summary}</p>
              )}

              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-300">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onChoosePlan(plan.name, isAnnual)}
                className={`w-full mt-6 font-semibold px-4 py-2.5 rounded-xl transition ${
                  plan.featured
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-green-50 dark:bg-green-900/40 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/60"
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserDashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const timeLeft = useCountdown();
  const [pricingOpen, setPricingOpen] = useState(false);
  const navigate = useNavigate();

  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const userName = user?.fullName || user?.name || "";

  useEffect(() => {
    if (selectedPlanForCheckout && !cardName) {
      setCardName(userName);
    }
  }, [selectedPlanForCheckout, userName]);

  const handleChoosePlan = (planName, isAnnual = false) => {
    setPricingOpen(false);
    const plan = pricingPlans.find(p => p.name === planName);
    setSelectedPlanForCheckout(plan ? { ...plan, isAnnual } : null);
  };

  const handleCloseCheckout = () => {
    setSelectedPlanForCheckout(null);
    setIsProcessing(false);
    setIsSuccess(false);
    setCardNumber('');
    setExpiry('');
    setCvc('');
  };

  const handlePayCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        const startDate = new Date();
        const endDate = new Date(startDate);
        if (selectedPlanForCheckout.isAnnual) {
          endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
          endDate.setDate(endDate.getDate() + 30);
        }

        const updatedUser = {
          ...user,
          plan: selectedPlanForCheckout.name,
          billingCycle: selectedPlanForCheckout.isAnnual ? "annual" : "monthly",
          planPrice: selectedPlanForCheckout.isAnnual ? selectedPlanForCheckout.priceAnnual : selectedPlanForCheckout.price,
          planCadence: selectedPlanForCheckout.isAnnual ? selectedPlanForCheckout.cadenceAnnual : selectedPlanForCheckout.cadence,
          planStartedAt: startDate.toISOString(),
          planEndsAt: endDate.toISOString(),
        };
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        handleCloseCheckout();
        navigate("/dashboard/settings");
      }, 2000);
    }, 1500);
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const planExpired = (() => {
    if (!user?.planEndsAt) return false;
    const endDate = new Date(user.planEndsAt);
    return !Number.isNaN(endDate.getTime()) && endDate.getTime() < Date.now();
  })();
  const plan = planExpired ? null : user?.plan;
  const hasAccess = (item) => {
    if (!plan) {
      // New user with no plan — basic pages only
      return ["projects", "settings", "support"].includes(item);
    }
    if (plan === "Business") return true;
    if (plan === "Pro") {
      return ["projects", "settings", "support", "services", "roles", "invoices", "teams"].includes(item);
    }
    if (plan === "Plus") {
      return ["projects", "settings", "support", "services", "roles"].includes(item);
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <Sidebar />

      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Dashboard</h1>
            <p className="text-gray-400 dark:text-slate-500 mt-1">
              {getGreeting()} - {today}
            </p>
          </div>

          <div className="flex gap-3">
            {hasAccess("invoices") && (
              <button
                onClick={() => navigate("/dashboard/invoices?modal=open")}
                className="bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 font-semibold px-4 py-2.5 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/60 transition"
              >
                + Invoice
              </button>
            )}

            {hasAccess("clients") && (
              <button
                onClick={() => navigate("/dashboard/clients")}
                className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
              >
                + Add Client
              </button>
            )}
          </div>
        </div>

        {/* Trial Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-6 mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {TRIAL_DAYS}-day dashboard trial is active
            </h2>
            <p className="text-emerald-50 mt-1">
              You can use all dashboard features during the trial. Templates still require separate payment.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/15 rounded-2xl px-6 py-3 text-center">
              <p className="text-sm text-emerald-50">Trial ends in</p>
              <p className="text-2xl font-bold tabular-nums">{timeLeft}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-emerald-50 mb-2">Full access to the website</p>
              <button
                onClick={() => setPricingOpen(true)}
                className="bg-white text-emerald-600 font-bold px-5 py-2 rounded-xl hover:bg-emerald-50 transition"
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Monthly Revenue" value="$0" sub="Up 12% vs last month" />
          <StatCard label="Active Projects" value="0" sub="Across all clients" />
          <StatCard label="Complete project" value="0" sub="Need attention" />
          <StatCard label="Pending Payments" value="$0" sub="Outstanding balance" />
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          {hasAccess("clients") && <QuickLink to="/dashboard/clients" title="Clients" sub="Clients" />}
          {hasAccess("projects") && <QuickLink to="/dashboard/projects" title="Projects" sub="Projects" />}
          {hasAccess("invoices") && <QuickLink to="/dashboard/invoices" title="Invoices" sub="Invoices" />}
          {hasAccess("teams") && <QuickLink to="/dashboard/teams" title="Team" sub="Team" />}
          {hasAccess("services") && <QuickLink to="/dashboard/services" title="Services" sub="Services" />}
          {hasAccess("roles") && <QuickLink to="/dashboard/access-roles" title="Roles" sub="Access" />}
          {hasAccess("settings") && <QuickLink to="/dashboard/settings" title="Settings" sub="Manage Account" />}
          {hasAccess("invoices") && <QuickLink to="/dashboard/invoices?modal=open" title="New" sub="New Invoice" highlight />}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-6">
              Website Projects by Status
            </h3>
            <div className="h-40 flex items-center justify-center text-gray-300 dark:text-slate-600 text-sm">
              No project data yet
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center mt-4">
              {PROJECT_STATUSES.map((s) => (
                <div key={s.label} className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
                  <span className="w-4 h-4 rounded" style={{ backgroundColor: s.color }} />
                  {s.label}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">
                Revenue Analytics - {new Date().getFullYear()}
              </h3>
              <span className="text-sm font-semibold text-blue-500 bg-blue-50 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1 rounded-full">
                No data
              </span>
            </div>
            <p className="text-gray-400 dark:text-slate-500 text-sm mb-4">
              No paid or pending invoice totals are available for {new Date().getFullYear()} yet.
            </p>
            <div className="h-40 flex items-center justify-center text-gray-300 dark:text-slate-600 text-sm">
              Revenue chart will appear here
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
            Recent Activity
          </h3>
          <p className="text-gray-400 dark:text-slate-500">No recent real activity yet.</p>
        </div>

        {/* Urgent Alerts */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100 mb-4">
            Urgent Alerts
          </h3>
          <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 font-semibold rounded-xl p-4">
            No urgent real-data alerts right now.
          </div>
        </div>
      </main>

      <PricingModal
        open={pricingOpen}
        onClose={() => setPricingOpen(false)}
        onChoosePlan={handleChoosePlan}
      />

      {/* Checkout Modal */}
      {selectedPlanForCheckout && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 max-w-md w-full shadow-2xl relative overflow-hidden transition-all duration-300 transform scale-100 animate-in fade-in zoom-in-95">
            {isSuccess ? (
              <div className="flex flex-col items-center text-center py-6">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center text-3xl mb-4 animate-bounce">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                  Subscription Activated!
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Thank you for upgrading to the <span className="font-semibold text-indigo-600 dark:text-indigo-400">{selectedPlanForCheckout.name}</span> plan.
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  Redirecting you to the settings page...
                </p>
              </div>
            ) : (
              <form onSubmit={handlePayCheckout} className="flex flex-col gap-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">
                    Subscription Checkout
                  </h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    Complete your payment details to activate the plan.
                  </p>
                </div>

                {/* Plan Summary */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/30 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {selectedPlanForCheckout.name} Plan
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {selectedPlanForCheckout.isAnnual ? "Billed annually" : "Billed monthly"}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-100">
                      {selectedPlanForCheckout.isAnnual ? selectedPlanForCheckout.priceAnnual : selectedPlanForCheckout.price}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {selectedPlanForCheckout.isAnnual ? selectedPlanForCheckout.cadenceAnnual : selectedPlanForCheckout.cadence}
                    </span>
                  </div>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        const limitedVal = val.substring(0, 16);
                        const parts = [];
                        for (let i = 0; i < limitedVal.length; i += 4) {
                          parts.push(limitedVal.substring(i, i + 4));
                        }
                        setCardNumber(parts.join(' '));
                      }}
                      placeholder="0000 0000 0000 0000"
                      className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, '');
                          const limitedVal = val.substring(0, 4);
                          if (limitedVal.length >= 3) {
                            setExpiry(limitedVal.substring(0, 2) + '/' + limitedVal.substring(2));
                          } else {
                            setExpiry(limitedVal);
                          }
                        }}
                        className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        required
                        maxLength="3"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ''))}
                        placeholder="•••"
                        className="w-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end mt-2">
                  <button
                    type="button"
                    onClick={handleCloseCheckout}
                    className="text-sm font-medium px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="text-sm font-semibold px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md disabled:opacity-50 transition flex items-center justify-center gap-2 min-w-[120px] cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        Processing...
                      </>
                    ) : (
                      "Pay & Upgrade"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user?.role === "admin") return <AdminDashboard user={user} />;
  return <UserDashboard user={user} />;
}

export default Dashboard;