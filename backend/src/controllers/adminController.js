const User = require("../models/User");
const Project = require("../models/Project");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.banned = !user.banned;
    await user.save();
    res.json({ success: true, banned: user.banned });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("user", "fullName email");
    res.json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRevenueStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const bannedUsers = await User.countDocuments({ banned: true });
    const totalProjects = await Project.countDocuments();
    res.json({ success: true, totalUsers, bannedUsers, totalProjects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllUsers, deleteUser, banUser, getAllProjects, getRevenueStats };