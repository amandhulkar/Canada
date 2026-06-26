const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Client = require("../models/Client");
const protect = require("../middleware/authMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");

const getCompanyId = (req) => req.user.companyId || req.user.userId;

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
      { team: req.user.fullName || "" },
    ],
  };
};

const cleanProjectBody = (body) => {
  const { _id, user, createdBy, companyId, role, ...safeBody } = body;
  return safeBody;
};

// GET all projects — each company sees only its own
router.get("/", protect, requirePermission(PERMISSIONS.VIEW_PROJECTS), async (req, res) => {
  try {
    const projects = await Project.find(projectScope(req)).populate("user");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create project
router.post("/", protect, requirePermission(PERMISSIONS.MANAGE_PROJECTS), async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const safeBody = cleanProjectBody(req.body);

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

    const alreadyAssigned = await Project.findOne({
      companyId,
      name: safeBody.name,
      client: safeBody.client,
      team: { $exists: true, $ne: "" },
    });

    if (alreadyAssigned) {
      if (alreadyAssigned.team === safeBody.team) {
        return res.status(409).json({
          message: "This project is already saved for this team member.",
        });
      }

      return res.status(409).json({
        message: `This project is already assigned to ${alreadyAssigned.team}. Delete or reassign that project before assigning it to another developer.`,
      });
    }

    const client = safeBody.client
      ? await Client.findOne({ companyId, clientName: safeBody.client })
      : null;

    const project = await Project.create({
      ...safeBody,
      user: client?.user || req.user.userId,
      companyId,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update project — each company can update only its own
router.put("/:id", protect, requirePermission(PERMISSIONS.MANAGE_PROJECTS), async (req, res) => {
  try {
    const query = projectScope(req, { _id: req.params.id });
    const project = await Project.findOneAndUpdate(query, cleanProjectBody(req.body), { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
