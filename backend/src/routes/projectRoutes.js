const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const protect = require("../middleware/authMiddleware");

// GET all projects — admin sees all, regular user sees only their own
router.get("/", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user.userId };
    const projects = await Project.find(query).populate("user");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create project
router.post("/", protect, async (req, res) => {
  try {
    const project = await Project.create({
      ...req.body,
      user: req.user.userId,
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update project — admin can update any, user only their own
router.put("/:id", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.userId };
    const project = await Project.findOneAndUpdate(query, req.body, { new: true });
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE project — admin can delete any, user only their own
router.delete("/:id", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.userId };
    const project = await Project.findOneAndDelete(query);
    if (!project) {
      return res.status(404).json({ message: "Project not found or unauthorized" });
    }
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET by ID — admin can view any, user only their own
router.get("/:id", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.userId };
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