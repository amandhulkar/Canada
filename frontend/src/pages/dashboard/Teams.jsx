import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
const ROLES = ["developer"];
const roleLabel = (role) => ({ admin: "Admin", developer: "Developer", client: "Client" }[role] || "Client");

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

function AddMemberModal({ open, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ROLES[0],
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) return;
    const saved = await onSave({ ...form });
    if (saved) setForm({ name: "", email: "", password: "", role: ROLES[0] });
  };

  const autofill = () => {
    setForm({
      name: "Aman Sharma",
      email: "aman@findtemplates.com",
      password: "Password@123",
      role: "developer",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Add Member</h2>
            <button
              type="button"
              onClick={autofill}
              className="mt-1 text-xs font-semibold text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Auto fill sample
            </button>
          </div>
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
              required
              placeholder="e.g. riya@findtemplates.com"
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
              Password
            </label>
            <input
              name="password"
              type="text"
              minLength={8}
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Minimum 8 characters"
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">
              Role
            </label>
            <select
              name="role"
              value="developer"
              disabled
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <option value="developer">Developer</option>
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
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm disabled:opacity-60"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditMemberModal({ member, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    accessRole: "client",
  });

  useEffect(() => {
    if (!member) return;
    setForm({
      fullName: member.fullName || "",
      email: member.email || "",
      accessRole: member.accessRole || "client",
    });
  }, [member]);

  if (!member) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName.trim() || !form.email.trim()) return;
    await onSave(member._id, form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400">Member Details</h2>
            <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">View and edit this team member</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition text-xl leading-none">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Full name</label>
            <input
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Role</label>
            <select
              value="developer"
              disabled
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-80"
            >
              <option value="developer">Developer</option>
            </select>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900 p-4 text-xs text-slate-500 dark:text-slate-400">
            <p><span className="font-semibold">Account ID:</span> {member._id}</p>
            <p className="mt-1"><span className="font-semibold">Status:</span> {member.banned ? "Suspended" : "Active"}</p>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition">Cancel</button>
            <button type="submit" disabled={loading} className="px-4 py-2 text-sm font-semibold text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition shadow-sm disabled:opacity-60">
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function initials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";
}

function Team() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [filter, setFilter] = useState("All Roles");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/users?t=${Date.now()}`, {
        headers: { Authorization: token },
        cache: "no-store",
      });
      const data = await res.json();
      setMembers(Array.isArray(data.users) ? data.users.filter((member) => member.accessRole === "developer") : []);

      const projectsRes = await fetch(`${API}/api/admin/projects?t=${Date.now()}`, {
        headers: { Authorization: token },
        cache: "no-store",
      });
      const projectsData = await projectsRes.json();
      setProjects(Array.isArray(projectsData.projects) ? projectsData.projects : []);
    } catch (error) {
      console.error("Failed to load team members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleAddMember = async (member) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          fullName: member.name,
          email: member.email,
          password: member.password,
          role: member.role === "admin" ? "admin" : "user",
          accessRole: member.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to add member");
        return false;
      }
      if (data.user?.accessRole === "developer") {
        setMembers((prev) => [data.user, ...prev]);
      }
      setModalOpen(false);
      return true;
    } catch (error) {
      alert("Network error: " + error.message);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleEditMember = async (id, updates) => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update member");
        return;
      }
      setMembers((prev) => prev.map((member) => member._id === id ? data.user : member));
      setEditingMember(null);
    } catch (error) {
      alert("Network error: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this member?")) return;
    try {
      const res = await fetch(`${API}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.message || "Failed to delete member");
        return;
      }
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${API}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.message || "Failed to delete project");
        return;
      }
      setProjects((prev) => prev.filter((project) => project._id !== id));
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  const getMemberRole = (member) => member.role === "admin" ? "admin" : member.accessRole || "client";
  const getAssignedProjects = (member) => projects.filter((project) => (
    String(project.assignedTo || "") === String(member._id) ||
    (!project.assignedTo && project.team === member.fullName)
  ));

  const filteredMembers =
    filter === "All Roles"
      ? members
      : members.filter((m) => getMemberRole(m) === filter);

  const totalMembers = members.length;
  const developers = members.filter((m) => getMemberRole(m) === "developer").length;
  const assignedProjects = projects.filter((project) => project.assignedTo || project.team).length;

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-indigo-900 dark:text-indigo-400">
              Team Members
            </h1>
            <p className="text-gray-400 dark:text-slate-500 mt-1">
              Add developers, then share their email and password for sign in
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <StatCard label="Total Developers" value={totalMembers} accent="#6366f1" />
          <StatCard label="Developers" value={developers} accent="#10b981" />
          <StatCard label="Assigned Projects" value={assignedProjects} accent="#3b82f6" />
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
                {roleLabel(r)}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="py-24 text-center text-gray-400 dark:text-slate-500">Loading team members...</div>
        ) : filteredMembers.length === 0 ? (
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
            {filteredMembers.map((m) => {
              const assignedProjects = getAssignedProjects(m);
              return (
              <div
                key={m._id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 font-bold flex items-center justify-center text-sm">
                    {initials(m.fullName)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-700 dark:text-slate-100">{m.fullName}</p>
                    <p className="text-sm text-gray-400 dark:text-slate-500">{m.email || "—"}</p>
                    <span className="inline-block mt-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 capitalize">
                      {roleLabel(getMemberRole(m))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingMember(m)}
                      className="text-gray-400 dark:text-slate-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition"
                      aria-label="View and edit member"
                      title="View / Edit"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDelete(m._id)}
                      className="text-gray-400 dark:text-slate-600 hover:text-red-500 dark:hover:text-red-400 transition"
                      aria-label="Remove member"
                      title="Remove"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Assigned Projects</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{assignedProjects.length}</span>
                      <button
                        onClick={() => navigate("/dashboard/projects", { state: { openAddProject: true, assignedTo: m._id, assignedTeam: m.fullName } })}
                        className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                  {assignedProjects.length === 0 ? (
                    <p className="text-xs text-slate-400 dark:text-slate-500">No assigned projects yet</p>
                  ) : (
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {assignedProjects.map((project) => (
                        <div key={project._id} className="flex items-start justify-between gap-2 rounded-lg bg-slate-50 dark:bg-slate-900 px-3 py-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">{project.name}</p>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 truncate">
                              {project.client || "No client"} • {project.status || "Planning"}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="shrink-0 text-xs text-slate-400 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition"
                            aria-label="Delete project"
                            title="Delete project"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )})}
          </div>
        )}

        <AddMemberModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleAddMember}
          loading={saving}
        />
        <EditMemberModal
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleEditMember}
          loading={saving}
        />
      </main>
    </div>
  );
}

export default Team;
