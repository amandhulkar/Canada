const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const {
  getAllUsers,
  deleteUser,
  banUser,
  getAllProjects,
  getRevenueStats,
} = require("../controllers/adminController");

router.use(protect);
router.use(adminOnly);

router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/ban", banUser);
router.get("/projects", getAllProjects);
router.get("/stats", getRevenueStats);

module.exports = router;