const Template = require("../models/Template");

const getCompanyId = (req) => req.user?.companyId || req.user?.userId;

const normalizeTemplate = (template) => {
  const data = template.toObject ? template.toObject() : template;
  return {
    ...data,
    id: `db:${data._id}`,
  };
};

const cleanTemplateId = (id) => String(id || "").replace(/^db:/, "");

const cleanTemplateBody = (body) => {
  const { _id, id, createdBy, companyId, role, ...safeBody } = body;
  return safeBody;
};

const templateScope = (req, extra = {}) => {
  const companyId = getCompanyId(req);
  return {
    active: true,
    ...(companyId
      ? { companyId }
      : { $or: [{ companyId: null }, { companyId: { $exists: false } }] }),
    ...extra,
  };
};

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find(templateScope(req)).sort({ createdAt: -1 });
    res.json(templates.map(normalizeTemplate));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

const getTemplate = async (req, res) => {
  try {
    const template = await Template.findOne(templateScope(req, { _id: cleanTemplateId(req.params.id) }));
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(normalizeTemplate(template));
  } catch (error) {
    res.status(404).json({ message: "Template not found" });
  }
};

const createTemplate = async (req, res) => {
  try {
    const template = await Template.create({
      ...cleanTemplateBody(req.body),
      active: req.body.active !== false,
      createdBy: req.user.userId,
      companyId: getCompanyId(req),
    });
    res.status(201).json(normalizeTemplate(template));
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create template" });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { _id: cleanTemplateId(req.params.id), companyId: getCompanyId(req) },
      cleanTemplateBody(req.body),
      { new: true, runValidators: true }
    );
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(normalizeTemplate(template));
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to update template" });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findOneAndUpdate(
      { _id: cleanTemplateId(req.params.id), companyId: getCompanyId(req) },
      { active: false },
      { new: true }
    );
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json({ message: "Template deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to delete template" });
  }
};

module.exports = {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
};
