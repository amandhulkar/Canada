import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getCurrentUser, hasFeatureAccess, PERMISSIONS } from "../utils/permissions";

const ALL_LINKS = [
  { to: "/dashboard", label: "Dashboard", permission: PERMISSIONS.VIEW_DASHBOARD },
  { to: "/dashboard/analytics", label: "📊 Analytics", permission: PERMISSIONS.VIEW_REVENUE },
  { to: "/dashboard/templates", label: "Templates", permission: PERMISSIONS.MANAGE_TEMPLATES },
  { to: "/dashboard/clients", label: "Clients", permission: PERMISSIONS.VIEW_CLIENTS },
  { to: "/dashboard/teams", label: "Teams", permission: PERMISSIONS.MANAGE_TEAM },
  { to: "/dashboard/projects", label: "Projects", permission: PERMISSIONS.VIEW_PROJECTS },
  { to: "/dashboard/invoices", label: "Invoices", permission: PERMISSIONS.VIEW_INVOICES },
  { to: "/dashboard/services", label: "Services", permission: PERMISSIONS.VIEW_SERVICES },
  { to: "/dashboard/access-roles", label: "Access / Roles", permission: PERMISSIONS.ACCESS_SETTINGS },
  { to: "/dashboard/settings", label: "Settings", permission: PERMISSIONS.SYSTEM_SETTINGS },
  { to: "/dashboard/support", label: "Support Info", permission: PERMISSIONS.SUPPORT_INFO },
];

const isPlanExpired = (user) => {
  if (!user?.planEndsAt) return !["Plus", "Pro", "Business"].includes(user?.plan);
  const endDate = new Date(user.planEndsAt);
  return Number.isNaN(endDate.getTime()) || endDate.getTime() < Date.now();
};

const getPreferences = () => {
  try {
    return JSON.parse(localStorage.getItem("dashboardPreferences")) || {};
  } catch {
    return {};
  }
};

const isPlanAllowed = (user, link) => {
  const plan = isPlanExpired(user) ? null : user?.plan;
  if (!plan) {
    return link.to === "/dashboard" || link.to === "/dashboard/settings";
  }

  if (plan === "Plus") {
    return [
      "/dashboard",
      "/dashboard/projects",
      "/dashboard/settings",
      "/dashboard/support",
      "/dashboard/services",
      "/dashboard/access-roles",
    ].includes(link.to);
  }

  if (plan === "Pro") {
    return [
      "/dashboard",
      "/dashboard/projects",
      "/dashboard/settings",
      "/dashboard/support",
      "/dashboard/services",
      "/dashboard/access-roles",
      "/dashboard/invoices",
      "/dashboard/teams",
    ].includes(link.to);
  }

  return link.to !== "/dashboard/templates";
};

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const user = useMemo(() => getCurrentUser(), []);
  const [preferences, setPreferences] = useState(() => getPreferences());
  const collapsed = Boolean(preferences.sidebarCollapsed);
  const compact = Boolean(preferences.compactMode);

  useEffect(() => {
    const syncPreferences = () => setPreferences(getPreferences());
    window.addEventListener("dashboardPreferencesChanged", syncPreferences);
    window.addEventListener("storage", syncPreferences);
    return () => {
      window.removeEventListener("dashboardPreferencesChanged", syncPreferences);
      window.removeEventListener("storage", syncPreferences);
    };
  }, []);

  const links = useMemo(() => {
    return ALL_LINKS.filter((link) => hasFeatureAccess(user, link.permission) && isPlanAllowed(user, link));
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/signup");
  };

  return (
    <aside className={`w-full ${collapsed ? "md:w-20" : "md:w-64"} md:min-h-screen bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900 ${compact ? "p-3" : "p-4 md:p-6"} flex flex-col transition-all`}>
      <h1 className={`${collapsed ? "text-xl md:text-center" : "text-2xl md:text-3xl"} font-bold text-indigo-600 dark:text-indigo-400 mb-4 md:mb-6`}>
        {collapsed ? "FT" : "FindTemplates"}
      </h1>

      <nav className={`${compact ? "gap-2 md:space-y-2" : "gap-2 md:space-y-4"} flex md:block overflow-x-auto md:overflow-visible md:flex-1 pb-1 md:pb-0`}>
        {links.map((link) => {
          const isActive =
            link.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              title={collapsed ? link.label : undefined}
              className={`block whitespace-nowrap ${compact ? "p-2" : "p-3"} rounded-xl transition ${collapsed ? "md:text-center" : ""} ${
                isActive
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
            >
              {collapsed ? link.label.replace(/^📊\s*/, "").slice(0, 1) : link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        title={collapsed ? "Logout" : undefined}
        className="mt-4 md:mt-10 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        {collapsed ? "↩" : "Logout"}
      </button>
    </aside>
  );
}

export default Sidebar;
