const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const protect = require("../middleware/authMiddleware");

// GET all invoices — admin sees all, regular user sees only their own
router.get("/", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin" ? {} : { user: req.user.userId };
    const invoices = await Invoice.find(query).populate("user", "fullName email");
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create invoice
router.post("/", protect, async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ invoiceNumber: -1 });
    const nextInvoiceNumber = lastInvoice && lastInvoice.invoiceNumber ? lastInvoice.invoiceNumber + 1 : 1001;

    const invoice = await Invoice.create({
      ...req.body,
      invoiceNumber: nextInvoiceNumber,
      user: req.user.userId,
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT update invoice — admin can update any, user only their own
router.put("/:id", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.userId };
    const invoice = await Invoice.findOneAndUpdate(query, req.body, { new: true });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found or unauthorized" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE invoice — admin can delete any, user only their own
router.delete("/:id", protect, async (req, res) => {
  try {
    const query = req.user.role === "admin"
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user.userId };
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
