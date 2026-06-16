const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { signup , signin } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

module.exports = router;