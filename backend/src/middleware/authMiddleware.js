const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { getEffectiveAccessRole } = require("../permissions");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access Denied",
      });
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.userId).select("fullName email role accessRole companyId banned plan billingCycle planStartedAt planEndsAt");
    if (!user) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    if (user.banned) {
      return res.status(403).json({ message: "Your account has been suspended by admin" });
    }

    const companyId = user.companyId || user._id;

    req.user = {
      userId: user._id,
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      accessRole: getEffectiveAccessRole(user),
      companyId,
      banned: user.banned,
      plan: user.plan,
      billingCycle: user.billingCycle,
      planStartedAt: user.planStartedAt,
      planEndsAt: user.planEndsAt,
    };

    next();
  } catch (error) {
    console.log(error);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
