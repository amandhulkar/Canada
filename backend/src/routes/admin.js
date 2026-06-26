const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");
const {
  createUser,
  getAllUsers,
  deleteUser,
  banUser,
  updateAccessRole,
  updateUser,
  getAllProjects,
  getRevenueStats,
} = require("../controllers/adminController");

router.use(protect);
router.use(adminOnly);

router.get("/users", requirePermission(PERMISSIONS.MANAGE_TEAM), getAllUsers);
router.post("/users", requirePermission(PERMISSIONS.MANAGE_TEAM), createUser);
router.put("/users/:id", requirePermission(PERMISSIONS.MANAGE_TEAM), updateUser);
router.delete("/users/:id", requirePermission(PERMISSIONS.MANAGE_TEAM), deleteUser);
router.patch("/users/:id/ban", requirePermission(PERMISSIONS.MANAGE_TEAM), banUser);
router.patch("/users/:id/access-role", requirePermission(PERMISSIONS.MANAGE_TEAM), updateAccessRole);
router.get("/projects", requirePermission(PERMISSIONS.VIEW_PROJECTS), getAllProjects);
router.get("/stats", requirePermission(PERMISSIONS.VIEW_REVENUE), getRevenueStats);

module.exports = router;