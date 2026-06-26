const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { getEffectiveAccessRole } = require("../permissions");
const { sendPasswordResetOtp } = require("../utils/mailer");

const buildSafeUser = (user, companyId = user.companyId || user._id) => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  accessRole: getEffectiveAccessRole(user),
  banned: user.banned,
  companyId,
  plan: user.plan,
  billingCycle: user.billingCycle,
  planPrice: user.planPrice,
  planCadence: user.planCadence,
  planStartedAt: user.planStartedAt,
  planEndsAt: user.planEndsAt,
  twoFactorEnabled: user.twoFactorEnabled,
});

const signup = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    console.log("REQUEST BODY:", req.body);
    console.log("ROLE RECEIVED:", role);

    const requestedRole = role === "admin" ? "admin" : "user";
    if (requestedRole !== "admin") {
      return res.status(403).json({
        message: "Public user signup is disabled. Please contact an administrator.",
      });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role: "admin",
      accessRole: "admin"
    });

    user.companyId = user._id;
    await user.save();

    console.log("USER CREATED:", user);

    const token = jwt.sign(
      { userId: user._id, role: user.role, accessRole: getEffectiveAccessRole(user), companyId: user.companyId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: buildSafeUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    res.status(500).json({
      message: error.message,
    });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.banned) {
      return res.status(403).json({
        message: "Your account has been suspended by admin",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const companyId = user.companyId || user._id;

    const token = jwt.sign(
      { userId: user._id, role: user.role, accessRole: getEffectiveAccessRole(user), companyId },
       process.env.JWT_SECRET,
       { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: buildSafeUser(user, companyId),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.banned) {
      return res.status(403).json({ message: "Your account has been suspended by admin" });
    }
    res.json({ success: true, user: buildSafeUser(user) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { plan, billingCycle, planPrice, planCadence, planStartedAt, planEndsAt } = req.body;

    if (!plan || !billingCycle || !planPrice || !planEndsAt) {
      return res.status(400).json({ message: "Plan details are required" });
    }

    if (!["monthly", "annual"].includes(billingCycle)) {
      return res.status(400).json({ message: "Invalid billing cycle" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.plan = plan;
    user.billingCycle = billingCycle;
    user.planPrice = planPrice;
    user.planCadence = planCadence || "";
    user.planStartedAt = planStartedAt ? new Date(planStartedAt) : new Date();
    user.planEndsAt = new Date(planEndsAt);
    await user.save();

    res.json({ success: true, user: buildSafeUser(user, user.companyId || user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetPasswordOtp = otp;
    user.resetPasswordOtpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendPasswordResetOtp({ to: user.email, otp });

    res.json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.resetPasswordOtp || user.resetPasswordOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (!user.resetPasswordOtpExpires || user.resetPasswordOtpExpires.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.password = newPassword;
    user.resetPasswordOtp = null;
    user.resetPasswordOtpExpires = null;
    await user.save();

    res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }
    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTwoFactor = async (req, res) => {
  try {
    const { enabled } = req.body;
    if (typeof enabled !== "boolean") {
      return res.status(400).json({ message: "Enabled must be true or false" });
    }

    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.twoFactorEnabled = enabled;
    await user.save();

    res.json({ success: true, user: buildSafeUser(user, user.companyId || user._id) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSession = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      session: {
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        accessRole: getEffectiveAccessRole(user),
        status: "Active",
        startedAt: user.updatedAt || user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ success: true, message: "Account permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { signup, signin, profile, updatePlan, requestPasswordReset, resetPasswordWithOtp, updatePassword, updateTwoFactor, getSession, deleteAccount };
