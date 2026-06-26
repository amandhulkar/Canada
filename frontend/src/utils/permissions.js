export const PERMISSIONS = {
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

export const ROLE_PERMISSIONS = {
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

export const PLAN_PERMISSIONS = {
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

export const ACCESS_ROLES = Object.keys(ROLE_PERMISSIONS);

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser"));
  } catch {
    return null;
  }
};

export const getEffectiveAccessRole = (user) => {
  if (user?.role === "admin") return "admin";
  return ACCESS_ROLES.includes(user?.accessRole) ? user.accessRole : "client";
};

export const hasPermission = (user, permission) => {
  if (!permission) return true;
  const accessRole = getEffectiveAccessRole(user);
  const permissions = ROLE_PERMISSIONS[accessRole] || [];
  return permissions.includes("*") || permissions.includes(permission);
};

export const isPlanExpired = (user) => {
  if (!user?.planEndsAt) return !["Plus", "Pro", "Business"].includes(user?.plan);
  const endDate = new Date(user.planEndsAt);
  return Number.isNaN(endDate.getTime()) || endDate.getTime() < Date.now();
};

export const hasActivePlan = (user) => {
  return ["Plus", "Pro", "Business"].includes(user?.plan) && !isPlanExpired(user);
};

export const hasPlanPermission = (user, permission) => {
  if (!permission) return true;
  const plan = hasActivePlan(user) ? user?.plan : null;
  const permissions = PLAN_PERMISSIONS[plan] || [];
  return permissions.includes("*") || permissions.includes(permission);
};

export const hasFeatureAccess = (user, permission) => {
  if (!permission) return true;
  if (permission === PERMISSIONS.VIEW_DASHBOARD || permission === PERMISSIONS.SYSTEM_SETTINGS) return true;

  const isInvitedUser = user?.companyId && user?._id && String(user.companyId) !== String(user._id);
  if (isInvitedUser) return hasPermission(user, permission);

  return hasPermission(user, permission) && hasPlanPermission(user, permission);
};
