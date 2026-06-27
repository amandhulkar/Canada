const crypto = require("crypto");
const User = require("../models/User");
const Project = require("../models/Project");
const { ACCESS_ROLES, getEffectiveAccessRole } = require("../permissions");

const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const normalizeEmail = (email = "") => email.toLowerCase().trim();

const getCompanyId = (req) => req.user.companyId || req.user.userId;

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ companyId: getCompanyId(req) }).select("-password");
    const safeUsers = users.map((user) => {
      const safeUser = user.toObject();
      safeUser.accessRole = getEffectiveAccessRole(safeUser);
      return safeUser;
    });
    res.json({ success: true, users: safeUsers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { fullName, name, email, password, role, accessRole } = req.body;
    const userName = (fullName || name || "").trim();
    const nextRole = role === "admin" ? "admin" : "user";
    const nextAccessRole = nextRole === "admin" ? "admin" : accessRole || "client";

    if (!userName || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (!ACCESS_ROLES.includes(nextAccessRole)) {
      return res.status(400).json({ message: "Invalid access role" });
    }

    const user = await User.create({
      fullName: userName,
      email: normalizeEmail(email),
      password: password || crypto.randomBytes(9).toString("base64"),
      role: nextRole,
      accessRole: nextAccessRole,
      createdBy: req.user.userId,
      companyId: getCompanyId(req),
    });

    const safeUser = user.toObject();
    delete safeUser.password;
    res.status(201).json({ success: true, user: safeUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (String(req.params.id) === String(req.user.userId)) {
      return res.status(400).json({ message: "You cannot delete your own account" });
    }

    const user = await User.findOneAndDelete({
      _id: req.params.id,
      companyId: getCompanyId(req),
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const banUser = async (req, res) => {
  try {
    if (String(req.params.id) === String(req.user.userId)) {
      return res.status(400).json({ message: "You cannot suspend your own account" });
    }

    const user = await User.findOne({
      _id: req.params.id,
      companyId: getCompanyId(req),
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    user.banned = !user.banned;
    await user.save();
    res.json({ success: true, banned: user.banned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAccessRole = async (req, res) => {
  try {
    const { accessRole } = req.body;
    if (!ACCESS_ROLES.includes(accessRole)) {
      return res.status(400).json({ message: "Invalid access role" });
    }

    const user = await User.findOne({
      _id: req.params.id,
      companyId: getCompanyId(req),
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    user.accessRole = user.role === "admin" ? "admin" : accessRole;
    await user.save();

    const safeUser = user.toObject();
    safeUser.accessRole = getEffectiveAccessRole(safeUser);
    res.json({ success: true, user: safeUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { fullName, email, accessRole } = req.body;

    if (!fullName?.trim() || !email?.trim()) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }
    if (accessRole && !ACCESS_ROLES.includes(accessRole)) {
      return res.status(400).json({ message: "Invalid access role" });
    }

    const user = await User.findOne({
      _id: req.params.id,
      companyId: getCompanyId(req),
    }).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    user.fullName = fullName.trim();
    user.email = normalizeEmail(email);
    user.accessRole = user.role === "admin" ? "admin" : accessRole || user.accessRole;
    await user.save();

    const safeUser = user.toObject();
    safeUser.accessRole = getEffectiveAccessRole(safeUser);
    res.json({ success: true, user: safeUser });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ companyId: getCompanyId(req) }).populate("user", "fullName email");
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRevenueStats = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const totalUsers = await User.countDocuments({ companyId });
    const bannedUsers = await User.countDocuments({ companyId, banned: true });
    const totalProjects = await Project.countDocuments({ companyId });
    res.json({ success: true, totalUsers, bannedUsers, totalProjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, getAllUsers, deleteUser, banUser, updateAccessRole, updateUser, getAllProjects, getRevenueStats };
