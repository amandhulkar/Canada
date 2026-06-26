const Client = require("../models/Client");

const getCompanyId = (req) => req.user.companyId || req.user.userId;

const cleanClientBody = (body) => {
  const { _id, createdBy, companyId, user, role, ...safeBody } = body;
  return safeBody;
};

const createClient = async (req, res) => {
  try {
    const client = await Client.create({
      ...cleanClientBody(req.body),
      createdBy: req.user.userId,
      companyId: getCompanyId(req),
    });

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
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, companyId: getCompanyId(req) },
      cleanClientBody(req.body),
      { new: true }
    );
    if (!client) return res.status(404).json({ message: "Client not found" });
    res.json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createClient, getClients, deleteClient, getClientById, updateClient };
