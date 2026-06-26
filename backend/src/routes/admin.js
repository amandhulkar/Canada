const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
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

router.get("/users", getAllUsers);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id/ban", banUser);
router.patch("/users/:id/access-role", updateAccessRole);
router.get("/projects", getAllProjects);
router.get("/stats", getRevenueStats);

module.exports = router;