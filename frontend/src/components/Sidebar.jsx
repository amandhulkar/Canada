import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const ALL_LINKS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/analytics", label: "📊 Analytics" },
  { to: "/dashboard/clients", label: "Clients" },
  { to: "/dashboard/teams", label: "Teams" },
  { to: "/dashboard/projects", label: "Projects" },
  { to: "/dashboard/invoices", label: "Invoices" },
  { to: "/dashboard/services", label: "Services" },
  { to: "/dashboard/access-roles", label: "Access / Roles" },
  { to: "/dashboard/settings", label: "Settings" },
  { to: "/dashboard/support", label: "Support Info" },
];

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAdmin, plan } = useMemo(() => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      return { isAdmin: user?.role === "admin", plan: user?.plan };
    } catch {
      return { isAdmin: false, plan: null };
    }
  }, []);

  const links = useMemo(() => {
    if (isAdmin) {
      return ALL_LINKS;
    }
    // If they have no plan selected (e.g. trial/new user), show all links
    if (!plan) {
      return ALL_LINKS;
    }

    if (plan === "Plus") {
      return ALL_LINKS.filter(
        (link) =>
          link.to === "/dashboard" ||
          link.to === "/dashboard/projects" ||
          link.to === "/dashboard/settings" ||
          link.to === "/dashboard/support" ||
          link.to === "/dashboard/services" ||
          link.to === "/dashboard/access-roles"
      );
    }

    if (plan === "Pro") {
      return ALL_LINKS.filter(
        (link) =>
          link.to === "/dashboard" ||
          link.to === "/dashboard/projects" ||
          link.to === "/dashboard/settings" ||
          link.to === "/dashboard/support" ||
          link.to === "/dashboard/services" ||
          link.to === "/dashboard/access-roles" ||
          link.to === "/dashboard/invoices" ||
          link.to === "/dashboard/teams"
      );
    }

    // Business or higher plan gets all links
    return ALL_LINKS;
  }, [isAdmin, plan]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/signup");
  };

  return (
    <aside className="w-64 min-h-screen bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900 p-6 flex flex-col">
      <h1 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
        FindTemplates
      </h1>

      <nav className="space-y-4 flex-1">
        {links.map((link) => {
          const isActive =
            link.to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`block p-3 rounded-xl transition ${
                isActive
                  ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400"
                  : "text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="mt-10 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;