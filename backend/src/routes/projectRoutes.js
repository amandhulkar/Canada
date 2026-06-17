const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// GET all projects
router.get("/", async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// POST create project
router.post("/", async (req, res) => {
  const project = await Project.create(req.body);
  res.json(project);
});

// PUT update project
router.put("/:id", async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// DELETE project
router.delete("/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// getbyID
router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.json(project);
});

module.exports = router;