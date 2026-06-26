const express = require("express");
const jwt = require("jsonwebtoken");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");
const User = require("../models/User");
const {
  getTemplates,
  getTemplate,
  createTemplate,
  updateTemplate,
  deleteTemplate,
} = require("../controllers/templateController");

const router = express.Router();

const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let companyId = decoded.companyId;

    if (!companyId) {
      const user = await User.findById(decoded.userId).select("companyId");
      companyId = user?.companyId || user?._id;
    }

    req.user = {
      ...decoded,
      companyId,
    };
  } catch (error) {
    req.user = null;
  }
  next();
};

router.get("/", optionalAuth, getTemplates);
router.get("/:id", optionalAuth, getTemplate);
router.post("/", protect, adminOnly, requirePermission(PERMISSIONS.MANAGE_TEMPLATES), createTemplate);
router.put("/:id", protect, adminOnly, requirePermission(PERMISSIONS.MANAGE_TEMPLATES), updateTemplate);
router.delete("/:id", protect, adminOnly, requirePermission(PERMISSIONS.MANAGE_TEMPLATES), deleteTemplate);

module.exports = router;
