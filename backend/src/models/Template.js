const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: String, default: "$199" },
    rating: { type: Number, default: 4.8 },
    badge: { type: String, default: "" },
    image: { type: String, default: "" },
    defaultData: {
      heroImage: { type: String, default: "" },
      heroTitle: { type: String, default: "" },
      heroSubtitle: { type: String, default: "" },
      aboutText: { type: String, default: "" },
    },
    active: { type: Boolean, default: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Template", templateSchema);
