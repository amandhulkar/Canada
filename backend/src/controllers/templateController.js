const Template = require("../models/Template");

const normalizeTemplate = (template) => {
  const data = template.toObject ? template.toObject() : template;
  return {
    ...data,
    id: `db:${data._id}`,
  };
};

const cleanTemplateId = (id) => String(id || "").replace(/^db:/, "");

const getTemplates = async (req, res) => {
  try {
    const templates = await Template.find({ active: true }).sort({ createdAt: -1 });
    res.json(templates.map(normalizeTemplate));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};

const getTemplate = async (req, res) => {
  try {
    const template = await Template.findOne({ _id: cleanTemplateId(req.params.id), active: true });
    if (!template) return res.status(404).json({ message: "Template not found" });
    res.json(normalizeTemplate(template));
  } catch (error) {
    res.status(404).json({ message: "Template not found" });
  }
};

const createTemplate = async (req, res) => {
  try {
    const template = await Template.create({
      ...req.body,
      active: req.body.active !== false,
      createdBy: req.user.userId,
    });
    res.status(201).json(normalizeTemplate(template));
  } catch (error) {
    res.status(400).json({ message: error.message || "Failed to create template" });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndUpdate(
      cleanTemplateId(req.params.id),
      req.body,
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
    const template = await Template.findByIdAndUpdate(
      cleanTemplateId(req.params.id),
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
