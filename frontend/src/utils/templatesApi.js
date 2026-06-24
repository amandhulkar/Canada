import staticTemplates from "../data/templates";

const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

export const getTemplateCategories = (templates) => [
  "All",
  ...Array.from(new Set(templates.map((template) => template.category).filter(Boolean))),
];

export const getMergedTemplates = async () => {
  try {
    const res = await fetch(`${API}/api/templates`);
    if (!res.ok) throw new Error("Failed to fetch templates");
    const dynamicTemplates = await res.json();
    return [...staticTemplates, ...(Array.isArray(dynamicTemplates) ? dynamicTemplates : [])];
  } catch (error) {
    console.error("Failed to load admin templates:", error);
    return staticTemplates;
  }
};

export const findTemplateById = async (id) => {
  const templates = await getMergedTemplates();
  return templates.find((template) => String(template.id) === String(id));
};

export { staticTemplates };
