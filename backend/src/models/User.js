const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
    accessRole: {
      type: String,
      enum: ["admin", "developer", "client"],
      default: "client",
      required: true,
    },
    banned: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    plan: {
      type: String,
      default: "Individual - trial",
    },
    billingCycle: {
      type: String,
      enum: ["trial", "monthly", "annual"],
      default: "trial",
    },
    planPrice: {
      type: String,
      default: "Free",
    },
    planCadence: {
      type: String,
      default: "",
    },
    planStartedAt: {
      type: Date,
      default: null,
    },
    planEndsAt: {
      type: Date,
      default: null,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    resetPasswordOtp: {
      type: String,
      default: null,
    },
    resetPasswordOtpExpires: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);


module.exports = mongoose.model("User", userSchema);
