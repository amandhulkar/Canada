const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");

const {
  createClient,
  getClients,
  deleteClient,
  getClientById,
  updateClient,
} = require("../controllers/clientController");

router.post("/", protect, requirePermission(PERMISSIONS.EDIT_CLIENTS), createClient);
router.get("/", protect, requirePermission(PERMISSIONS.VIEW_CLIENTS), getClients);
router.get("/:id", protect, requirePermission(PERMISSIONS.VIEW_CLIENTS), getClientById);
router.delete("/:id", protect, requirePermission(PERMISSIONS.EDIT_CLIENTS), deleteClient);
router.put("/:id", protect, requirePermission(PERMISSIONS.EDIT_CLIENTS), updateClient);

module.exports = router;