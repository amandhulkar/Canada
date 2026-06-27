const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Client = require("../models/Client");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");

const getCompanyId = (req) => req.user.companyId || req.user.userId;
const normalizeName = (value = "") => value.trim().toLowerCase();

const projectScope = (req, extra = {}) => {
  const base = { companyId: getCompanyId(req), ...extra };
  if (req.user.role === "admin") return base;

  if (req.user.accessRole === "client") {
    return {
      ...base,
      $or: [
        { client: req.user.fullName || "" },
        { user: req.user.userId },
      ],
    };
  }

  return {
    ...base,
    $or: [
      { user: req.user.userId },
      { assignedTo: req.user.userId },
      { team: req.user.fullName || "" },
    ],
  };
};

const cleanProjectBody = (body) => {
  const { _id, user, createdBy, companyId, role, ...safeBody } = body;
  return safeBody;
};

const ensureProjectForClient = async (client, companyId, fallbackUserId) => {
  const existingProject = await Project.findOne({
    companyId,
    $or: [
      { clientId: client._id },
      { client: client.clientName },
    ],
  });

  if (existingProject || !client.workspace) return existingProject;

  return Project.create({
    name: client.workspace,
    projectType: client.websiteType || "Business",
    client: client.clientName,
    clientId: client._id,
    user: client.user || fallbackUserId,
    companyId,
    startDate: new Date().toISOString().split("T")[0],
    status: "Planning",
    progress: 0,
    scopeOfWork: `Customize the ${client.workspace} template for ${client.clientName}.`,
    deliverables: "Final editable website, source files, and live deployment",
  });
};

const normalizeProjectBody = async (req, safeBody) => {
  const companyId = getCompanyId(req);
  const normalized = { ...safeBody };

  if (normalized.clientId) {
    const client = await Client.findOne({ _id: normalized.clientId, companyId });
    if (!client) {
      const error = new Error("Please select a valid client.");
      error.status = 400;
      throw error;
    }
    normalized.clientId = client._id;
    normalized.client = client.clientName;
    normalized.user = client.user || req.user.userId;
  } else if (normalized.client) {
    const client = await Client.findOne({ companyId, clientName: normalized.client });
    if (client) {
      normalized.clientId = client._id;
      normalized.user = client.user || req.user.userId;
    }
  }

  if (normalized.assignedTo) {
    const developer = await User.findOne({ _id: normalized.assignedTo, companyId, accessRole: "developer" });
    if (!developer) {
      const error = new Error("Please select a valid developer.");
      error.status = 400;
      throw error;
    }
    normalized.assignedTo = developer._id;
    normalized.team = developer.fullName;
  } else if (normalized.team) {
    const developer = await User.findOne({ companyId, fullName: normalized.team, accessRole: "developer" });
    if (developer) {
      normalized.assignedTo = developer._id;
    }
  }

  return normalized;
};

// GET all projects — each company sees only its own
router.get("/", protect, requirePermission(PERMISSIONS.VIEW_PROJECTS), async (req, res) => {
  try {
    if (req.user.accessRole === "client") {
      const linkedClients = await Client.find({
        companyId: getCompanyId(req),
        $or: [
          { user: req.user.userId },
          { email: req.user.email },
          { clientName: req.user.fullName || "" },
        ],
      }).select("_id clientName workspace websiteType user");

      const clientIds = linkedClients.map((client) => client._id);
      const clientNames = [...new Set([req.user.fullName || "", ...linkedClients.map((client) => client.clientName)].filter(Boolean))];

      const projects = await Project.find({
        companyId: getCompanyId(req),
        $or: [
          { user: req.user.userId },
          { clientId: { $in: clientIds } },
          { client: { $in: clientNames } },
        ],
      }).populate("user");
      return res.json(projects);
    }

    const projects = await Project.find(projectScope(req)).populate("user");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET projects for a specific client — used by admin client detail
router.get("/client/:clientId", protect, requirePermission(PERMISSIONS.VIEW_PROJECTS), async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const client = await Client.findOne({ _id: req.params.clientId, companyId });
    if (!client) return res.status(404).json({ message: "Client not found" });

    const projects = await Project.find({
      companyId,
      $or: [
        { clientId: client._id },
        { client: client.clientName },
        { client: { $regex: `^${client.clientName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, $options: "i" } },
      ],
    }).populate("user");

    res.json(projects.filter((project) => (
      String(project.clientId || "") === String(client._id) ||
      normalizeName(project.client) === normalizeName(client.clientName)
    )));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create project
router.post("/", protect, requirePermission(PERMISSIONS.MANAGE_PROJECTS), async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const safeBody = await normalizeProjectBody(req, cleanProjectBody(req.body));

    if (req.user.plan === "Pro" && safeBody.templateId) {
      const usedTemplatesCount = await Project.countDocuments({
        companyId,
        templateId: { $exists: true, $ne: "" },
      });

      if (usedTemplatesCount >= 4) {
        return res.status(403).json({
          message: "You have reached the limit of 4 templates allowed under the Pro plan. Please upgrade to the Business plan for unlimited template access.",
        });
      }
    }

    const clientMatch = safeBody.clientId
      ? { clientId: safeBody.clientId }
      : { client: safeBody.client };
    const existingProject = await Project.findOne({
      companyId,
      name: safeBody.name,
      ...clientMatch,
    });

    if (existingProject) {
      const hasAssignedDeveloper = Boolean(existingProject.assignedTo || existingProject.team);

      if (hasAssignedDeveloper) {
        if (
          (safeBody.assignedTo && String(existingProject.assignedTo || "") === String(safeBody.assignedTo)) ||
          (!safeBody.assignedTo && existingProject.team === safeBody.team)
        ) {
          return res.status(409).json({
            message: "This project is already saved for this team member.",
          });
        }

        return res.status(409).json({
          message: `This project is already assigned to ${existingProject.team}. Delete or reassign that project before assigning it to another developer.`,
        });
      }

      const updatedProject = await Project.findByIdAndUpdate(
        existingProject._id,
        {
          ...safeBody,
          user: existingProject.user || safeBody.user || req.user.userId,
          companyId,
        },
        { new: true }
      );
      return res.json(updatedProject);
    }

    const project = await Project.create({
      ...safeBody,
      user: safeBody.user || req.user.userId,
      companyId,
    });
    res.json(project);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// PUT update project — each company can update only its own
router.put("/:id", protect, requirePermission(PERMISSIONS.MANAGE_PROJECTS), async (req, res) => {
  try {
    const query = projectScope(req, { _id: req.params.id });
    const project = await Project.findOneAndUpdate(query, await normalizeProjectBody(req, cleanProjectBody(req.body)), { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json(project);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
});

// DELETE project — each company can delete only its own
router.delete("/:id", protect, requirePermission(PERMISSIONS.MANAGE_PROJECTS), async (req, res) => {
  try {
    const query = projectScope(req, { _id: req.params.id });
    const project = await Project.findOneAndDelete(query);
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID — each company can view only its own
router.get("/:id", protect, requirePermission(PERMISSIONS.VIEW_PROJECTS), async (req, res) => {
  try {
    if (req.user.accessRole === "client") {
      const linkedClients = await Client.find({
        companyId: getCompanyId(req),
        $or: [
          { user: req.user.userId },
          { email: req.user.email },
          { clientName: req.user.fullName || "" },
        ],
      }).select("_id clientName workspace websiteType user");

      const clientIds = linkedClients.map((client) => client._id);
      const clientNames = [...new Set([req.user.fullName || "", ...linkedClients.map((client) => client.clientName)].filter(Boolean))];

      const project = await Project.findOne({
        _id: req.params.id,
        companyId: getCompanyId(req),
        $or: [
          { user: req.user.userId },
          { clientId: { $in: clientIds } },
          { client: { $in: clientNames } },
        ],
      });
      if (!project) {
        return res.status(404).json({ message: "Project not found or unauthorized" });
      }
      return res.json(project);
    }

    const query = projectScope(req, { _id: req.params.id });
    const project = await Project.findOne(query);
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
