const { hasFeatureAccess } = require("../permissions");

const requirePermission = (permission) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Authentication required" });
  }

  if (!hasFeatureAccess(req.user, permission)) {
    return res.status(403).json({ message: "Insufficient permissions or inactive plan" });
  }

  next();
};

module.exports = requirePermission;
