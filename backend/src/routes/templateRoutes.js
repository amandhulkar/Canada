const express = require("express");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

const router = express.Router();

router.get("/", getTemplates);
router.get("/:id", getTemplate);
router.post("/", protect, adminOnly, createTemplate);
router.put("/:id", protect, adminOnly, updateTemplate);
router.delete("/:id", protect, adminOnly, deleteTemplate);

module.exports = router;
