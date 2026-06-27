const Client = require("../models/Client");
const User = require("../models/User");
const Project = require("../models/Project");

const isValidEmail = (email = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
const normalizeEmail = (email = "") => email.toLowerCase().trim();

const getCompanyId = (req) => req.user.companyId || req.user.userId;

const cleanClientBody = (body) => {
  const { _id, createdBy, companyId, user, role, password, ...safeBody } = body;
  return safeBody;
};

const createClient = async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const email = req.body.email ? normalizeEmail(req.body.email) : "";

    if (email && !isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (email) {
      const existingClient = await Client.findOne({ email, companyId });
      if (existingClient) {
        return res.status(409).json({ message: "A client with this email already exists" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "An account with this email already exists" });
      }
    }

    const client = await Client.create({
      ...cleanClientBody({ ...req.body, email }),
      createdBy: req.user.userId,
      companyId,
    });

    if (email && req.body.password) {
      const user = await User.create({
        fullName: req.body.clientName || req.body.name || "Client",
        email,
        password: req.body.password,
        role: "user",
        accessRole: "client",
        createdBy: req.user.userId,
        companyId,
      });

      client.user = user._id;
      await client.save();
    }

    const projectName = client.workspace || `${client.clientName} Website`;
    const existingProject = await Project.findOne({
      companyId,
      clientId: client._id,
      name: projectName,
    });

    if (!existingProject) {
      await Project.create({
        name: projectName,
        projectType: client.websiteType || "Business",
        client: client.clientName,
        clientId: client._id,
        user: client.user || req.user.userId,
        companyId,
        startDate: new Date().toISOString().split("T")[0],
        status: "Planning",
        progress: 0,
        scopeOfWork: client.workspace ? `Customize the ${client.workspace} template for ${client.clientName}.` : "Build and deliver the client website.",
        deliverables: "Final editable website, source files, and live deployment",
      });
    }

    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getClients = async (req, res) => {
  try {
    const clients = await Client.find({
      companyId: getCompanyId(req),
    });

    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      companyId: getCompanyId(req),
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      message: "Client deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await Client.findOne({
      _id: req.params.id,
      companyId: getCompanyId(req),
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClient = async (req, res) => {
  try {
    const safeBody = cleanClientBody(req.body);
    if (safeBody.email) {
      safeBody.email = normalizeEmail(safeBody.email);
      if (!isValidEmail(safeBody.email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
      }
    }

    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, companyId: getCompanyId(req) },
      safeBody,
      { new: true }
    );
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClient, getClients, deleteClient, getClientById, updateClient };
