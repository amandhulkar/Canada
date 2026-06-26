const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    projectType: String,
    client: String,
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      default: null,
      index: true,
    },
    startDate: String,
    deadline: String,
    status: { type: String, default: "Planning" },
    team: String,
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    progress: { type: Number, default: 0 },
    scopeOfWork: String,
    deliverables: String,
    templateId: String,
    tasks: {
      type: Array,
      default: [],
    },

  templateData: {
  type: Object,
  default: {},
},

completed: {
  type: Boolean,
  default: false,
},

    user: {
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

module.exports = mongoose.model("Project", projectSchema);