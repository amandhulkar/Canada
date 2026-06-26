import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { notifyTemplatesChanged } from "../../utils/templatesApi";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

const EMPTY_FORM = {
  name: "",
  category: "",
  price: "$199",
  rating: "4.8",
  badge: "",
  image: "",
  heroImage: "",
  heroTitle: "",
  heroSubtitle: "",
  aboutText: "",
};

const toForm = (template) => ({
  name: template.name || "",
  category: template.category || "",
  price: template.price || "$199",
  rating: String(template.rating || 4.8),
  badge: template.badge || "",
  image: template.image || "",
  heroImage: template.defaultData?.heroImage || "",
  heroTitle: template.defaultData?.heroTitle || "",
  heroSubtitle: template.defaultData?.heroSubtitle || "",
  aboutText: template.defaultData?.aboutText || "",
});

const toPayload = (form) => ({
  name: form.name.trim(),
  category: form.category.trim(),
  price: form.price.trim() || "$199",
  rating: Number(form.rating) || 4.8,
  badge: form.badge.trim(),
  image: form.image.trim(),
  defaultData: {
    heroImage: form.heroImage.trim() || form.image.trim(),
    heroTitle: form.heroTitle.trim(),
    heroSubtitle: form.heroSubtitle.trim(),
    aboutText: form.aboutText.trim(),
  },
});

function TemplatesAdmin() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const isAdmin = currentUser?.role === "admin";

  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/api/templates?t=${Date.now()}`, {
        headers: { Authorization: token },
        cache: "no-store",
      });
      const data = await res.json();
      setTemplates(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setEditingTemplate(null);
  };

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setForm(toForm(template));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) return;

    const token = localStorage.getItem("token");
    setSaving(true);
    try {
      const endpoint = editingTemplate
        ? `${API}/api/templates/${editingTemplate._id || String(editingTemplate.id).replace(/^db:/, "")}`
        : `${API}/api/templates`;
      const res = await fetch(endpoint, {
        method: editingTemplate ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify(toPayload(form)),
      });
      if (!res.ok) throw new Error(await res.text() || "Failed to save template");
      await fetchTemplates();
      notifyTemplatesChanged();
      resetForm();
      alert(editingTemplate ? "✅ Template updated" : "✅ Template added");
    } catch (error) {
      console.error(error);
      alert(`Something went wrong: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (template) => {
    if (!isAdmin) return;
    if (!confirm(`Delete ${template.name}?`)) return;

    const token = localStorage.getItem("token");
    try {
      const templateId = template._id || String(template.id).replace(/^db:/, "");
      const res = await fetch(`${API}/api/templates/${templateId}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      if (!res.ok) throw new Error(await res.text() || "Failed to delete template");
      await fetchTemplates();
      notifyTemplatesChanged();
      if (editingTemplate?.id === template.id) resetForm();
      alert("✅ Template deleted");
    } catch (error) {
      console.error(error);
      alert(`Something went wrong: ${error.message}`);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
        <Sidebar />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 text-center">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Admin only</h1>
            <p className="text-slate-400 dark:text-slate-500 mt-2">Only admin users can manage templates.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-100 dark:bg-slate-900">
      <Sidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-400">Template Management</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Add, edit, and remove admin-created templates.</p>
          </div>
          <button onClick={resetForm} className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition">
            + New Template
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6 items-start">
          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">{editingTemplate ? "Edit template" : "Add template"}</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Use image URLs for now. Uploads can be added later.</p>
            </div>

            {[
              ["Name", "name", "Fashion Store"],
              ["Category", "category", "Business"],
              ["Price", "price", "$199"],
              ["Rating", "rating", "4.8"],
              ["Badge", "badge", "New / Popular"],
              ["Card Image URL", "image", "https://..."],
              ["Hero Image URL", "heroImage", "https://..."],
              ["Hero Title", "heroTitle", "Your main heading"],
              ["Hero Subtitle", "heroSubtitle", "Your tagline"],
            ].map(([label, key, placeholder]) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</label>
                <input
                  required={["name", "category", "image", "heroTitle"].includes(key)}
                  value={form[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">About Text</label>
              <textarea
                rows="4"
                value={form.aboutText}
                onChange={(e) => handleChange("aboutText", e.target.value)}
                placeholder="Tell your story..."
                className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 resize-none"
              />
            </div>

            <div className="flex gap-3">
              <button disabled={saving} className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 disabled:opacity-60 transition">
                {saving ? "Saving..." : editingTemplate ? "Update Template" : "Add Template"}
              </button>
              {editingTemplate && (
                <button type="button" onClick={resetForm} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Admin-created templates</h2>
            {loading ? (
              <p className="text-slate-400">Loading...</p>
            ) : templates.length === 0 ? (
              <p className="text-slate-400">No admin-created templates yet.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900">
                    <img src={template.image} alt={template.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-bold text-slate-800 dark:text-slate-100">{template.name}</h3>
                          <p className="text-xs text-slate-400 mt-1">{template.category} • {template.price} • ★ {template.rating}</p>
                        </div>
                        {template.badge && <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-bold">{template.badge}</span>}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">{template.defaultData?.heroTitle || "No hero title"}</p>
                      <div className="flex gap-2 mt-4">
                        <button onClick={() => handleEdit(template)} className="flex-1 bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900 px-3 py-2 rounded-lg text-xs font-semibold">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(template)} className="flex-1 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 px-3 py-2 rounded-lg text-xs font-semibold">
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default TemplatesAdmin;
