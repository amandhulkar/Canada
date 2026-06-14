import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const STATUSES = ["Planning", "Design", "Development", "Testing", "Live", "On Hold"];
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
    <div className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm border-l-4" style={{ borderLeftColor: accent }}>
      <p className="text-xs font-semibold tracking-wider text-gray-400 dark:text-slate-500 uppercase">{label}</p>
      <p className="text-3xl font-bold mt-2" style={{ color: accent }}>{value}</p>
    </div>
  );
}

function statusBadgeClasses(status) {
  switch (status) {
    case "Live":        return "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400";
    case "On Hold":     return "bg-red-50 dark:bg-red-900/30 text-red-500 dark:text-red-400";
    case "Development": return "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400";
    case "Design":      return "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400";
    case "Testing":     return "bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-300";
    default:            return "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400";
  }
}

function Projects() {
  const timeLeft = useCountdown();
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState("All Statuses");

  const filteredProjects = filter === "All Statuses" ? projects : projects.filter((p) => p.status === filter);

  const totalProjects = projects.length;
  const inProgress = projects.filter((p) => ["Development", "Design", "Planning"].includes(p.status)).length;
  const liveCompleted = projects.filter((p) => p.status === "Live").length;
  const onHold = projects.filter((p) => p.status === "On Hold").length;
  const pendingReview = projects.filter((p) => p.status === "Testing").length;

  const handleDelete = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">Projects</h1>
          <p className="text-gray-400 dark:text-slate-500 mt-1">Track all website projects and their progress</p>
        </div>

        {/* Trial Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold">Your {TRIAL_DAYS}-day dashboard trial is active</h2>
            <p className="text-emerald-50 mt-1">The dashboard is unlocked during this trial. Templates still require separate payment.</p>
          </div>
          <div className="bg-white/15 rounded-2xl px-6 py-3 text-center">
            <p className="text-sm text-emerald-50">Trial ends in</p>
            <p className="text-2xl font-bold tabular-nums">{timeLeft}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <StatCard label="Total Projects"     value={totalProjects}  accent="#6366f1" />
          <StatCard label="In Progress"        value={inProgress}     accent="#3b82f6" />
          <StatCard label="Live / Completed"   value={liveCompleted}  accent="#10b981" />
          <StatCard label="On Hold / Delayed"  value={onHold}         accent="#ef4444" />
          <StatCard label="Pending Review"     value={pendingReview}  accent="#f97316" />
        </div>

        {/* Filter + Browse templates */}
        <div className="flex items-center gap-4 mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg px-4 py-2 text-sm shadow-sm border border-gray-100 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option>All Statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <Link
            to="/templates"
            className="bg-white dark:bg-slate-800 rounded-lg px-4 py-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 shadow-sm border border-gray-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
          >
            Browse Templates
          </Link>
        </div>

        {/* Project table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">All Projects</h2>
            <span className="text-sm text-gray-400 dark:text-slate-500">
              {filteredProjects.length} project{filteredProjects.length !== 1 && "s"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 dark:text-slate-500 uppercase text-xs tracking-wider border-b border-gray-100 dark:border-slate-700">
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
                      <p className="text-lg font-bold text-gray-700 dark:text-slate-300">No projects found</p>
                      <p className="text-gray-400 dark:text-slate-500 mt-1">Create your first project to get started</p>
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 dark:border-slate-700 hover:bg-indigo-50/40 dark:hover:bg-slate-700/50 transition">
                      <td className="px-6 py-4 font-medium text-gray-700 dark:text-slate-200">{p.name}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.client}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.startDate}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.deadline}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusBadgeClasses(p.status)}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{p.team || "—"}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-3">
                          <button className="text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition" aria-label="Edit project" title="Edit">✏️</button>
                          <button onClick={() => handleDelete(p.id)} className="text-gray-400 hover:text-red-500 transition" aria-label="Delete project" title="Delete">🗑️</button>
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
    </div>
  );
}

export default Projects;  