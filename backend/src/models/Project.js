const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: String,
    client: String,
    startDate: String,
    deadline: String,
    status: { type: String, default: "Planning" },
    team: String,
    progress: { type: Number, default: 0 },
    scopeOfWork: String,
    deliverables: String,
    templateId: String,

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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);