import { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { getCurrentUser, hasFeatureAccess, PERMISSIONS as APP_PERMISSIONS } from "../../utils/permissions";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const ROLES = [
  { key: "admin", label: "Admin", initial: "A", badge: "Full Access", badgeColor: "#FF8FAB", desc: "Full access to all features, data, and settings. Can manage team and billing." },
  { key: "developer", label: "Developer", initial: "D", badge: "Task Access", badgeColor: "#B39DDB", desc: "Works on assigned tasks. Can update project status and files." },
  { key: "client", label: "Client", initial: "C", badge: "Limited", badgeColor: "#BDBDBD", desc: "Limited view of their own project progress and support info." },
];

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "developer", label: "Developer" },
  { value: "client", label: "Client" },
];

const PERMISSIONS = [
  { label: "View Dashboard", admin: true, developer: true, client: true },
  { label: "View Clients", admin: true, developer: false, client: false },
  { label: "Edit Client Info", admin: true, developer: false, client: false },
  { label: "View Projects", admin: true, developer: true, client: true },
  { label: "Manage Projects", admin: true, developer: true, client: false },
  { label: "View Template Workspace", admin: true, developer: true, client: true },
  { label: "Edit Template Workspace", admin: true, developer: true, client: false },
  { label: "Save Template Workspace", admin: true, developer: true, client: false },
  { label: "Complete Project Workspace", admin: true, developer: false, client: false },
  { label: "Download Project Output", admin: true, developer: false, client: false },
  { label: "View Revenue Data", admin: true, developer: false, client: false },
  { label: "Create Invoices", admin: true, developer: false, client: false },
  { label: "View Invoices", admin: true, developer: false, client: false },
  { label: "Manage Payments", admin: true, developer: false, client: false },
  { label: "Manage Team Members", admin: true, developer: false, client: false },
  { label: "System Settings", admin: true, developer: true, client: false },
  { label: "Invitation Control", admin: true, developer: false, client: false },
  { label: "Access Settings", admin: true, developer: true, client: true },
  { label: "Access Support Info", admin: true, developer: true, client: true },
  { label: "Sign Out", admin: true, developer: true, client: true },
  { label: "View Services", admin: true, developer: true, client: false },
];

const ROLE_COLS = ["admin", "developer", "client"];
const roleLabel = (role) => ROLE_OPTIONS.find((r) => r.value === role)?.label || "Client";
const roleFromLabel = (label) => ROLE_OPTIONS.find((r) => r.label === label)?.value || label || "client";
const initials = (name = "") => name.slice(0, 2).toUpperCase() || "U";

function InviteModal({ open, onClose, onInvite }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "developer" });

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.password) return;
    onInvite(form);
    setForm({ name: "", email: "", password: "", role: "developer" });
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Invite Member</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none">✕</button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Full Name</label>
            <input placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Password</label>
            <input type="text" minLength={8} placeholder="Minimum 8 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Role</label>
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className={inputClass}>
              {ROLE_OPTIONS.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition">Cancel</button>
            <button onClick={handleSubmit} className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm">Send Invite</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccessRoles() {
  const [members, setMembers] = useState([]);
  const [showInvite, setShowInvite] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [editIdx, setEditIdx] = useState(null);
  const [editRole, setEditRole] = useState("");
  const [showManage, setShowManage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const currentUser = useMemo(() => getCurrentUser(), []);
  const canManageTeam = hasFeatureAccess(currentUser, APP_PERMISSIONS.MANAGE_TEAM);
  const token = localStorage.getItem("token");

  const authHeaders = useMemo(() => ({ Authorization: token }), [token]);

  const fetchMembers = async () => {
    if (!token || !canManageTeam) {
      setLoading(false);
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await fetch(`${API}/api/admin/users?t=${Date.now()}`, { headers: authHeaders, cache: "no-store" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to load team members");
      setMembers(data.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [canManageTeam, token]);

  const handleInvite = async (form) => {
    try {
      setError("");
      const res = await fetch(`${API}/api/admin/users`, {
        method: "POST",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ fullName: form.name, email: form.email, password: form.password, role: form.role === "admin" ? "admin" : "user", accessRole: roleFromLabel(form.role) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to invite member");
      setMembers((prev) => [...prev, data.user]);
      setShowInvite(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRemove = async (idx) => {
    const member = members[idx];
    if (!member?._id) return;

    try {
      setError("");
      const res = await fetch(`${API}/api/admin/users/${member._id}`, { method: "DELETE", headers: authHeaders });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to remove member");
      setMembers((prev) => prev.filter((_, i) => i !== idx));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditRole = (idx) => {
    setEditIdx(idx);
    setEditRole(members[idx].accessRole || "client");
  };

  const handleSaveRole = async (idx) => {
    const member = members[idx];
    if (!member?._id) return;

    try {
      setError("");
      const res = await fetch(`${API}/api/admin/users/${member._id}/access-role`, {
        method: "PATCH",
        headers: { ...authHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ accessRole: editRole }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "Unable to save role");
      setMembers((prev) => prev.map((m, i) => (i === idx ? data.user : m)));
      setEditIdx(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-400">Access &amp; Roles</h1>
            <p className="text-gray-400 dark:text-slate-500 mt-1">Control what each role can see and do</p>
          </div>
          {canManageTeam && (
            <div className="flex items-center gap-3">
              <button onClick={() => setShowInvite(true)} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition">
                <span className="text-lg leading-none">+</span>
                Invite Member
              </button>
            </div>
          )}
        </div>

        {error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

        <section className="mb-8">
          <div className="mb-4">
            <span className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Role Overview</span>
            <span className="text-gray-400 dark:text-slate-500 text-sm"> — click a badge to view permissions</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ROLES.map((role) => (
              <div key={role.key} onClick={() => setSelectedRole(selectedRole === role.key ? null : role.key)} className={`bg-white dark:bg-slate-800 rounded-xl p-6 text-center cursor-pointer shadow-sm transition border-2 ${selectedRole === role.key ? "border-indigo-500" : "border-transparent hover:border-indigo-300 dark:hover:border-indigo-600"}`}>
                <div className="text-4xl font-light text-gray-700 dark:text-slate-200 mb-2">{role.initial}</div>
                <div className="font-semibold text-gray-800 dark:text-slate-100 mb-2">{role.label}</div>
                <p className="text-xs text-gray-400 dark:text-slate-500 mb-4 leading-relaxed">{role.desc}</p>
                <span className="rounded-full px-4 py-1 text-xs font-medium" style={{ background: role.badgeColor + "33", color: role.badgeColor === "#BDBDBD" ? "#888" : role.badgeColor }}>{role.badge}</span>
              </div>
            ))}
          </div>
        </section>

        {selectedRole && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm px-6 py-5 mb-6 border border-indigo-100 dark:border-slate-700">
            <strong className="text-indigo-600 dark:text-indigo-400">{ROLES.find((r) => r.key === selectedRole)?.label} Permissions</strong>
            <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PERMISSIONS.filter((p) => p[selectedRole]).map((p) => <li key={p.label} className="text-sm text-gray-600 dark:text-slate-300">✓ {p.label}</li>)}
            </ul>
          </div>
        )}

        <section className="mb-8">
          <div className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-4">Permissions Matrix</div>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-slate-700">
                    <th className="w-1/2 px-6 py-3 text-left text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">Permission</th>
                    {ROLES.map((role) => <th key={role.key} className="w-1/6 px-6 py-3 text-center text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">{role.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {PERMISSIONS.map((p, i) => (
                    <tr key={p.label} className={`border-b border-gray-50 dark:border-slate-700 ${i % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-slate-50 dark:bg-slate-700/40"}`}>
                      <td className="px-6 py-3 text-gray-700 dark:text-slate-200">{p.label}</td>
                      {ROLE_COLS.map((col) => <td key={col} className="px-6 py-3 text-center">{p[col] ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-gray-300 dark:text-slate-600">✗</span>}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {canManageTeam && (
          <section className="mb-8">
            <div className="text-lg font-bold text-indigo-700 dark:text-indigo-400 mb-4">Team Members &amp; Assigned Roles</div>
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
                <span className="font-bold text-indigo-700 dark:text-indigo-400">Current Team</span>
                <button onClick={() => setShowManage(!showManage)} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 rounded-full px-5 py-2 text-sm font-semibold transition">{showManage ? "Done" : "Manage Team"}</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-slate-700 text-left text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider">
                      {["Member", "Email", "Role", "Manage Projects", "See Revenue", "Create Invoices", "Manage Payments", "Actions"].map((h) => <th key={h} className="px-6 py-3">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} className="py-12 text-center text-gray-400">Loading team members...</td></tr>
                    ) : members.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-20 text-center">
                          <div className="text-5xl mb-4">👥</div>
                          <p className="text-lg font-bold text-gray-700 dark:text-slate-300">No team members</p>
                          <button onClick={() => setShowInvite(true)} className="text-indigo-500 hover:underline mt-1">Add team members</button>
                        </td>
                      </tr>
                    ) : (
                      members.map((m, idx) => {
                        const rk = m.accessRole || (m.role === "admin" ? "admin" : "client");
                        const perms = PERMISSIONS.reduce((acc, p) => ({ ...acc, [p.label]: p[rk] }), {});
                        return (
                          <tr key={m._id || idx} className="border-b border-gray-50 dark:border-slate-700 hover:bg-indigo-50/40 dark:hover:bg-slate-700/40 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <span className="bg-indigo-600 text-white rounded-full px-2 py-0.5 text-xs font-bold">{initials(m.fullName)}</span>
                                <span className="font-medium text-gray-700 dark:text-slate-100">{m.fullName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-gray-500 dark:text-slate-400">{m.email}</td>
                            <td className="px-6 py-4">
                              {editIdx === idx && m.role !== "admin" ? (
                                <select value={editRole} onChange={(e) => setEditRole(e.target.value)} className="rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-400">
                                  {ROLE_OPTIONS.filter((r) => r.value !== "admin").map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
                                </select>
                              ) : (
                                <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full px-3 py-1 text-xs font-semibold">{roleLabel(rk)}</span>
                              )}
                            </td>
                            {[perms["Manage Projects"], perms["View Revenue Data"], perms["Create Invoices"], perms["Manage Payments"]].map((val, i) => <td key={i} className="px-6 py-4 text-center">{val ? <span className="text-emerald-500 font-bold">✓</span> : <span className="text-gray-300 dark:text-slate-600">✗</span>}</td>)}
                            <td className="px-6 py-4">
                              {showManage && (
                                <div className="flex gap-2">
                                  {editIdx === idx ? (
                                    <button onClick={() => handleSaveRole(idx)} className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-3 py-1 text-xs font-semibold transition">Save</button>
                                  ) : (
                                    <button onClick={() => handleEditRole(idx)} disabled={m.role === "admin"} className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-3 py-1 text-xs font-semibold transition">Edit</button>
                                  )}
                                  <button onClick={() => handleRemove(idx)} disabled={m._id === currentUser?._id} className="bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-3 py-1 text-xs font-semibold transition">Remove</button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        <InviteModal open={showInvite} onClose={() => setShowInvite(false)} onInvite={handleInvite} />
      </main>
    </div>
  );
}
