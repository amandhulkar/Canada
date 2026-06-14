import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { pricingPlans } from "../../assets/siteData";

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
      <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
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
          ? "bg-gradient-to-br from-indigo-500 to-purple-500 text-white"
          : "bg-white dark:bg-slate-800"
      }`}
    >
      <p className={`font-bold ${highlight ? "text-white" : "text-gray-800 dark:text-slate-100"}`}>
        {title}
      </p>
      <p className={`text-sm mt-1 ${highlight ? "text-indigo-100" : "text-gray-400 dark:text-slate-400"}`}>
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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl w-full max-w-3xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition text-xl leading-none"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 text-center">
          Upgrade your plan
        </h2>
        <p className="text-gray-400 dark:text-slate-400 text-center mt-2 mb-8">
          Choose a plan to unlock full access after your trial ends.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 border ${
                plan.featured
                  ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 shadow-md"
                  : "border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-700"
              }`}
            >
              {plan.featured && (
                <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  Most popular
                </span>
              )}
              <h3 className="text-xl font-bold text-gray-800 dark:text-slate-100">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {plan.price}
                </span>
                {plan.cadence && (
                  <span className="text-gray-400 dark:text-slate-400">{plan.cadence}</span>
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
                onClick={() => onChoosePlan(plan.name)}
                className={`w-full mt-6 font-semibold px-4 py-2.5 rounded-xl transition ${
                  plan.featured
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60"
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

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const timeLeft = useCountdown();
  const [pricingOpen, setPricingOpen] = useState(false);
  const navigate = useNavigate();

  const handleChoosePlan = (planName) => {
    setPricingOpen(false);
    navigate(`/?plan=${encodeURIComponent(planName)}#pricing`);
  };

  const today = new Date().toLocaleDateString("en-GB", {
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
            {/* ✅ FIXED: + Invoice button */}
            <button
              onClick={() => navigate("/dashboard/invoices?modal=open")}
              className="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-900/60 transition"
            >
              + Invoice
            </button>

            {/* + Add Client */}
            <button
              onClick={() => navigate("/dashboard/clients")}
              className="bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-sm"
            >
              + Add Client
            </button>
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
          <StatCard label="Monthly Revenue" value="£0" sub="Up 12% vs last month" />
          <StatCard label="Active Projects" value="0" sub="Across all clients" />
          <StatCard label="Complete project" value="0" sub="Need attention" />
          <StatCard label="Pending Payments" value="£0" sub="Outstanding balance" />
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 mb-8">
          <QuickLink to="/dashboard/clients" title="Clients" sub="Clients" />
          <QuickLink to="/dashboard/projects" title="Projects" sub="Projects" />
          <QuickLink to="/dashboard/invoices" title="Invoices" sub="Invoices" />
          <QuickLink to="/dashboard/teams" title="Team" sub="Team" />
          <QuickLink to="/dashboard/services" title="Services" sub="Services" />
          <QuickLink to="/dashboard/roles" title="Roles" sub="Access" />
          <QuickLink to="/dashboard/settings" title="Settings" sub="Manage Account" />
          {/* ✅ FIXED: New Invoice quick link */}
          <QuickLink to="/dashboard/invoices?modal=open" title="New" sub="New Invoice" highlight />
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
    </div>
  );
}

export default Dashboard;