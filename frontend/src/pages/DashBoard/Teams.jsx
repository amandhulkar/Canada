import Sidebar from "../../components/Sidebar";
import { useState } from "react";

const ROLES = ["Developer", "Designer", "Client", "Manager"];

function StatCard({ label, value, accent }) {
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
    </div>
  );
}

function AddMemberModal({ open, onClose, onSave }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: ROLES[0],
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ ...form });
    setForm({ name: "", email: "", role: ROLES[0] });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Add Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
              Full name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Riya Sharma"
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. riya@nexlance.com"
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm"
            >
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Team() {
  const [members, setMembers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState("All Roles");

  const handleAddMember = (member) => {
    setMembers((prev) => [...prev, { ...member, id: Date.now() }]);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const filteredMembers =
    filter === "All Roles"
      ? members
      : members.filter((m) => m.role === filter);

  const totalMembers = members.length;
  const developers = members.filter((m) => m.role === "Developer").length;
  const designers = members.filter((m) => m.role === "Designer").length;
  const Clients = members.filter((m) => m.role === "Client").length;

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-400">
              Team Members
            </h1>
            <p className="text-gray-400 dark:text-slate-500 mt-1">
              Manage your agency team and their access
            </p>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
          >
            <span className="text-lg leading-none">+</span>
            Add Member
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Members" value={totalMembers} accent="#6366f1" />
          <StatCard label="Developers" value={developers} accent="#3b82f6" />
          <StatCard label="Designers" value={designers} accent="#6366f1" />
          <StatCard label="Clients" value={Clients} accent="#10b981" />
        </div>

        <div className="mb-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 text-sm shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <option>All Roles</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-7xl font-extrabold text-gray-200 dark:text-slate-700 tracking-widest mb-4">
              TEAM
            </p>
            <p className="text-lg font-bold text-gray-700 dark:text-slate-300">
              No team members found
            </p>
            <p className="text-gray-400 dark:text-slate-500 mt-1">
              Add team members to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMembers.map((m) => (
              <div
                key={m.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center text-sm">
                  {initials(m.name)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700 dark:text-slate-100">{m.name}</p>
                  <p className="text-sm text-gray-400 dark:text-slate-500">{m.email || "—"}</p>
                  <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300">
                    {m.role}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-gray-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition"
                  aria-label="Remove member"
                  title="Remove"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        )}

        <AddMemberModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddMember}
        />
      </main>
    </div>
  );
}

export default Team;