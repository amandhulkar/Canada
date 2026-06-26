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

module.exports = {
  PERMISSIONS,
  ROLE_PERMISSIONS,
  ACCESS_ROLES,
  getEffectiveAccessRole,
  hasPermission,
};
