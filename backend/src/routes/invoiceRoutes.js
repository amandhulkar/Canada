const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const protect = require("../middleware/authMiddleware");
const requirePermission = require("../middleware/permissionMiddleware");
const { PERMISSIONS } = require("../permissions");

const getCompanyId = (req) => req.user.companyId || req.user.userId;

const cleanInvoiceBody = (body) => {
  const { _id, user, createdBy, companyId, role, invoiceNumber, ...safeBody } = body;
  return safeBody;
};

// GET all invoices — each company sees only its own
router.get("/", protect, requirePermission(PERMISSIONS.VIEW_INVOICES), async (req, res) => {
  try {
    const query = { companyId: getCompanyId(req) };
    const invoices = await Invoice.find(query).populate("user", "fullName email");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create invoice
router.post("/", protect, requirePermission(PERMISSIONS.CREATE_INVOICES), async (req, res) => {
  try {
    const companyId = getCompanyId(req);
    const lastInvoice = await Invoice.findOne({ companyId }).sort({ invoiceNumber: -1 });
    const nextInvoiceNumber = lastInvoice && lastInvoice.invoiceNumber ? lastInvoice.invoiceNumber + 1 : 1001;

    const invoice = await Invoice.create({
      ...cleanInvoiceBody(req.body),
      invoiceNumber: nextInvoiceNumber,
      user: req.user.userId,
      companyId,
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update invoice — each company can update only its own
router.put("/:id", protect, requirePermission(PERMISSIONS.MANAGE_PAYMENTS), async (req, res) => {
  try {
    const query = { _id: req.params.id, companyId: getCompanyId(req) };
    const invoice = await Invoice.findOneAndUpdate(query, cleanInvoiceBody(req.body), { new: true });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE invoice — each company can delete only its own
router.delete("/:id", protect, requirePermission(PERMISSIONS.MANAGE_PAYMENTS), async (req, res) => {
  try {
    const query = { _id: req.params.id, companyId: getCompanyId(req) };
    const invoice = await Invoice.findOneAndDelete(query);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }
    res.json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
