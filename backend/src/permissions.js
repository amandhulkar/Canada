const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_CLIENTS: "view_clients",
  EDIT_CLIENTS: "edit_clients",
  VIEW_PROJECTS: "view_projects",
  MANAGE_PROJECTS: "manage_projects",
  VIEW_TEMPLATES: "view_templates",
  MANAGE_TEMPLATES: "manage_templates",
  VIEW_REVENUE: "view_revenue",
  VIEW_INVOICES: "view_invoices",
  CREATE_INVOICES: "create_invoices",
  MANAGE_PAYMENTS: "manage_payments",
  MANAGE_TEAM: "manage_team",
  SYSTEM_SETTINGS: "system_settings",
  ACCESS_SETTINGS: "access_settings",
  SUPPORT_INFO: "support_info",
  VIEW_SERVICES: "view_services",
};

const ROLE_PERMISSIONS = {
  admin: ["*"],
  developer: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.VIEW_TEMPLATES,
    PERMISSIONS.VIEW_SERVICES,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.ACCESS_SETTINGS,
    PERMISSIONS.SUPPORT_INFO,
  ],
  client: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.VIEW_TEMPLATES,
    PERMISSIONS.ACCESS_SETTINGS,
    PERMISSIONS.SUPPORT_INFO,
  ],
};

const PLAN_PERMISSIONS = {
  Plus: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.SUPPORT_INFO,
    PERMISSIONS.ACCESS_SETTINGS,
    PERMISSIONS.VIEW_SERVICES,
  ],
  Pro: [
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_PROJECTS,
    PERMISSIONS.MANAGE_PROJECTS,
    PERMISSIONS.SYSTEM_SETTINGS,
    PERMISSIONS.SUPPORT_INFO,
    PERMISSIONS.ACCESS_SETTINGS,
    PERMISSIONS.VIEW_SERVICES,
    PERMISSIONS.VIEW_INVOICES,
    PERMISSIONS.CREATE_INVOICES,
    PERMISSIONS.MANAGE_PAYMENTS,
    PERMISSIONS.MANAGE_TEAM,
  ],
  Business: ["*"],
};

const ACCESS_ROLES = Object.keys(ROLE_PERMISSIONS);

const getEffectiveAccessRole = (user) => {
  if (user?.role === "admin") return "admin";
  return ACCESS_ROLES.includes(user?.accessRole) ? user.accessRole : "client";
};

const hasPermission = (user, permission) => {
  const accessRole = getEffectiveAccessRole(user);
  const permissions = ROLE_PERMISSIONS[accessRole] || [];
  return permissions.includes("*") || permissions.includes(permission);
};

const isPlanExpired = (user) => {
  if (!user?.planEndsAt) return !["Plus", "Pro", "Business"].includes(user?.plan);
  const endDate = new Date(user.planEndsAt);
  return Number.isNaN(endDate.getTime()) || endDate.getTime() < Date.now();
};

const hasActivePlan = (user) => ["Plus", "Pro", "Business"].includes(user?.plan) && !isPlanExpired(user);

const hasPlanPermission = (user, permission) => {
  const plan = hasActivePlan(user) ? user.plan : null;
  const permissions = PLAN_PERMISSIONS[plan] || [];
  return permissions.includes("*") || permissions.includes(permission);
};

const hasFeatureAccess = (user, permission) => {
  if (permission === PERMISSIONS.VIEW_DASHBOARD) return true;

  const isInvitedUser = user?.companyId && user?.userId && String(user.companyId) !== String(user.userId);
  if (isInvitedUser) return hasPermission(user, permission);

  return hasPermission(user, permission) && hasPlanPermission(user, permission);
};

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  PLAN_PERMISSIONS,
  ACCESS_ROLES,
  getEffectiveAccessRole,
  hasPermission,
  isPlanExpired,
  hasActivePlan,
  hasPlanPermission,
  hasFeatureAccess,
};
