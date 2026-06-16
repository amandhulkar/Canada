// const mongoose = require("mongoose");

// const leadSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: String,
//     phone: String,
//     source: String,

//     status: {
//       type: String,
//       default: "New",
//     },

//     createdBy: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Lead", leadSchema);