const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const { signup, signin, profile, updatePlan, requestPasswordReset, resetPasswordWithOtp, updatePassword, updateTwoFactor, getSession, deleteAccount } = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPasswordWithOtp);
router.get("/profile", protect, profile);
router.get("/session", protect, getSession);
router.patch("/plan", protect, updatePlan);
router.patch("/password", protect, updatePassword);
router.patch("/two-factor", protect, updateTwoFactor);
router.delete("/account", protect, deleteAccount);

module.exports = router;