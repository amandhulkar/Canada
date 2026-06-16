const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createClient,
  getClients,
  deleteClient,
  getClientById,
  updateClient,
} = require("../controllers/clientController");

router.post("/", protect, createClient);
router.get("/", protect, getClients);
router.get("/:id", protect, getClientById); 
router.delete("/:id", protect, deleteClient);
router.put("/:id", protect, updateClient);

module.exports = router;