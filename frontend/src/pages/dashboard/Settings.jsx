import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

// ✅ localStorage se dynamic user data lo
const roleLabel = (user) => {
  if (user?.role === "admin") return "Admin";
  if (user?.accessRole === "developer") return "Developer";
  return "Client";
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const name = user.fullName || user.name || "Guest User";
  const email = user.email || "";
  const accountType = user.accountType || "Personal account";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return {
    name,
    email,
    accountType,
    initials,
    role: user.role || "user",
    accessRole: user.accessRole || "client",
    displayRole: roleLabel(user),
    plan: user.plan || "Individual - trial",
    billingCycle: user.billingCycle || "trial",
    planPrice: user.planPrice || "Free",
    planCadence: user.planCadence || "",
    planStartedAt: user.planStartedAt || "",
    planEndsAt: user.planEndsAt || "",
  };
};

const formatPlanDate = (date) => {
  if (!date) return "Not set";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not set";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDaysLeft = (date) => {
  if (!date) return "Not set";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not set";
  const diff = Math.ceil((parsed.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return "Expired";
  if (diff === 0) return "Ends today";
  return `${diff} days left`;
};

const NAV_ITEMS = [
  { key: "profile", label: "Profile", desc: "User details and account summary" },
  { key: "theme", label: "Theme", desc: "Dark or bright dashboard mode" },
  { key: "preferences", label: "Preferences", desc: "Workspace behavior and shortcuts" },
  { key: "security", label: "Security", desc: "Access, sessions, and password tools" },
  { key: "account", label: "Account", desc: "Logout and delete account" },
];

const PLAN_DETAILS = {
  Plus: {
    badge: "Active",
    name: "Plus",
    price: "$199",
    annualPrice: "$1592",
    cadence: "/month",
    annualCadence: "/year",
    summary:
      "Access dashboard pages including Projects, Settings, Support Info, Access/Role, and Services.",
    features: [
      "Projects page access",
      "Settings page access",
      "Support Info page access",
      "Access/Role page access",
      "Services page access",
    ],
  },
  Pro: {
    badge: "Active",
    name: "Pro",
    price: "$299",
    annualPrice: "$2499",
    cadence: "/month",
    annualCadence: "/year",
    summary:
      "Access dashboard pages including Projects, Settings, Support Info, Access/Role, Services, Invoices, and Team, plus any 4 templates.",
    features: [
      "Projects and Settings access",
      "Support Info and Access/Role access",
      "Services and Invoices access",
      "Team page access",
      "Access to any 4 templates",
    ],
  },
  Business: {
    badge: "Most popular",
    name: "Business",
    price: "$399",
    annualPrice: "$3499",
    cadence: "/month",
    annualCadence: "/year",
    summary:
      "Complete dashboard access including Projects, Settings, Support Info, Access/Role, Services, Invoices, Team, Clients, and Reports, plus all 8 templates.",
    features: [
      "Complete dashboard access",
      "Projects, Settings, and Support Info",
      "Access/Role, Services, and Invoices",
      "Team, Clients, and Reports access",
      "Access to all 8 templates",
      "Priority support",
    ],
  },
};

function ProfileSection({ user }) {
  const activePlan = PLAN_DETAILS[user.plan];
  const isAnnual = user.billingCycle === "annual";
  const displayPrice = user.planPrice || (activePlan ? (isAnnual ? activePlan.annualPrice : activePlan.price) : "Free");
  const displayCadence = user.planCadence || (activePlan ? (isAnnual ? activePlan.annualCadence : activePlan.cadence) : "");
  const planTimeline = [
    { label: "Selected plan", value: user.plan },
    { label: "Billing cycle", value: user.billingCycle === "trial" ? "Trial" : isAnnual ? "Annual" : "Monthly" },
    { label: "Price", value: `${displayPrice}${displayCadence}` },
    { label: "Started on", value: formatPlanDate(user.planStartedAt) },
    { label: "Ends on", value: formatPlanDate(user.planEndsAt) },
    { label: "Status", value: getDaysLeft(user.planEndsAt) },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500 flex items-center justify-center text-white text-xl font-bold">
            {user.initials}
          </div>
          <div>
            <p className="text-sm text-slate-400 dark:text-slate-500 mb-0.5">Signed in as</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{user.name}</p>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-0.5">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-sm font-semibold px-4 py-1.5 rounded-full">
            {user.displayRole}
          </span>
          <span className="border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 text-sm font-medium px-4 py-1.5 rounded-full">
            {user.plan}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{user.accountType}</span>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Account overview</h2>
        <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">
          Your profile details are synced here and reflected across dashboard pages.
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Full name", value: user.name },
            { label: "Email", value: user.email },
            { label: "Account role", value: user.displayRole },
            { label: "Plan", value: user.plan },
            { label: "Account type", value: user.accountType },
          ].map((item) => (
            <div key={item.label} className="bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
              <p className="text-sm text-slate-400 dark:text-slate-400 mb-1">{item.label}</p>
              <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-indigo-100 dark:border-indigo-900/40 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Subscription details</h2>
              <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                Your plan purchase date, billing cycle, and expiry are shown here.
              </p>
            </div>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold px-4 py-2 rounded-full capitalize">
              {user.billingCycle === "trial" ? "Trial" : `${user.billingCycle} billing`}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {planTimeline.map((item) => (
              <div key={item.label} className="bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
                <p className="text-sm text-slate-400 dark:text-slate-400 mb-1">{item.label}</p>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-100">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

      {activePlan && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border-2 border-emerald-400 dark:border-emerald-600 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
            <div>
              <span className="inline-block bg-emerald-600 text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                {activePlan.badge}
              </span>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {activePlan.name}
              </h2>
              <p className="mt-2">
                <span className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">
                  {displayPrice}
                </span>
                <span className="text-slate-400 dark:text-slate-500">{displayCadence}</span>
              </p>
            </div>
            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold px-4 py-2 rounded-full">
              Active plan
            </span>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400 leading-6 mb-5">
            {activePlan.summary}
          </p>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300">
            {activePlan.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-700 rounded-xl px-4 py-3">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ThemeSection() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const applyTheme = (t) => {
    setTheme(t);
    localStorage.setItem("theme", t);
    if (t === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Theme</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Choose your dashboard appearance.</p>
      <div className="grid grid-cols-2 gap-3">
        {["light", "dark"].map((t) => (
          <button
            key={t}
            onClick={() => applyTheme(t)}
            className={`rounded-xl border-2 p-4 text-left transition-all ${
              theme === t
                ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                : "border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:border-slate-200 dark:hover:border-slate-600"
            }`}
          >
            <div className={`w-full h-16 rounded-lg mb-3 ${t === "light" ? "bg-white border border-slate-200" : "bg-slate-800 border border-slate-600"}`} />
            <p className={`text-sm font-semibold capitalize ${theme === t ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-300"}`}>
              {t} mode
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

function PreferencesSection() {
  const [prefs, setPrefs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dashboardPreferences")) || { compactMode: false, autoSave: true, sidebarCollapsed: false };
    } catch {
      return { compactMode: false, autoSave: true, sidebarCollapsed: false };
    }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("compact", Boolean(prefs.compactMode));
  }, [prefs.compactMode]);

  const togglePref = (key) => {
    setPrefs((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem("dashboardPreferences", JSON.stringify(next));
      document.documentElement.classList.toggle("compact", Boolean(next.compactMode));
      window.dispatchEvent(new Event("dashboardPreferencesChanged"));
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      return next;
    });
  };
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Preferences</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Workspace behavior and shortcuts.</p>
      <div className="flex flex-col gap-4">
        {[
          { key: "compactMode", label: "Compact mode", desc: "Reduce spacing across the dashboard" },
          { key: "autoSave", label: "Auto-save", desc: "Automatically save changes as you work" },
          { key: "sidebarCollapsed", label: "Collapsed sidebar by default", desc: "Start with the sidebar minimized" },
        ].map((p) => (
          <div key={p.key} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-700 last:border-0">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{p.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{p.desc}</p>
            </div>
            <button
              onClick={() => togglePref(p.key)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs[p.key] ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs[p.key] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
      {saved && <p className="text-sm text-emerald-500 font-medium mt-4">Preferences saved</p>}
    </div>
  );
}

function NotificationsSection() {
  const [notifs, setNotifs] = useState({ email: true, push: false, reminders: true, updates: true });
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Notifications</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Manage alerts, updates, and reminders.</p>
      <div className="flex flex-col gap-4">
        {[
          { key: "email", label: "Email notifications", desc: "Receive updates via email" },
          { key: "push", label: "Push notifications", desc: "Browser push alerts" },
          { key: "reminders", label: "Reminders", desc: "Due date and task reminders" },
          { key: "updates", label: "Product updates", desc: "New features and announcements" },
        ].map((n) => (
          <div key={n.key} className="flex items-center justify-between py-3 border-b border-slate-50 dark:border-slate-700 last:border-0">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{n.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{n.desc}</p>
            </div>
            <button
              onClick={() => setNotifs((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${notifs[n.key] ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${notifs[n.key] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PrivacySection() {
  const [privacy, setPrivacy] = useState({
    profileVisible: true, analytics: true, searchIndex: true, shareAnalytics: false, activityVisible: false,
  });

  const toggle = (key) => setPrivacy((prev) => ({ ...prev, [key]: !prev[key] }));

  const items = [
    { key: "profileVisible", label: "Profile visibility", desc: "Show your account name and avatar in dashboard top bars." },
    { key: "analytics", label: "Usage analytics", desc: "Allow local analytics preferences to stay enabled for insights." },
    { key: "searchIndex", label: "Search indexing in local settings", desc: "Keep your settings searchable inside this page for faster navigation." },
    { key: "shareAnalytics", label: "Share analytics with team", desc: "Help improve the product with anonymous usage data." },
    { key: "activityVisible", label: "Public activity status", desc: "Let others see your online activity status." },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Privacy settings</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Control account visibility and local dashboard behavior.</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${privacy[item.key] ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${privacy[item.key] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
  const token = localStorage.getItem("token");
  const storedUser = (() => {
    try { return JSON.parse(localStorage.getItem("currentUser")) || {}; } catch { return {}; }
  })();

  const [message, setMessage] = useState("");
  const [session, setSession] = useState(null);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [twoFactor, setTwoFactor] = useState(Boolean(storedUser.twoFactorEnabled));

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2500);
  };

  const updateCurrentUser = (user) => {
    const current = JSON.parse(localStorage.getItem("currentUser") || "{}");
    localStorage.setItem("currentUser", JSON.stringify({ ...current, ...user }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showMessage("New password and confirm password do not match");
      return;
    }

    const res = await fetch(`${API}/api/auth/password`, {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showMessage(data.message || "Password update failed");
      return;
    }

    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordOpen(false);
    showMessage("Password updated successfully");
  };

  const handleSessions = async () => {
    const res = await fetch(`${API}/api/auth/session`, { headers: { Authorization: token }, cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showMessage(data.message || "Unable to load session");
      return;
    }
    setSession(data.session);
    showMessage("Current session loaded");
  };

  const revokeCurrentSession = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/signup?tab=signin";
  };

  const handleTwoFactor = async () => {
    const next = !twoFactor;
    const res = await fetch(`${API}/api/auth/two-factor`, {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify({ enabled: next }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      showMessage(data.message || "Two-factor update failed");
      return;
    }
    setTwoFactor(Boolean(data.user?.twoFactorEnabled));
    updateCurrentUser(data.user || { twoFactorEnabled: next });
    showMessage(next ? "Two-factor preference enabled" : "Two-factor preference disabled");
  };

  const items = [
    { label: "Change password", desc: "Update your login password in database", btn: "Update", action: () => setPasswordOpen(true) },
    { label: "Active sessions", desc: session ? `${session.status} session for ${session.email}` : "View your current browser session", btn: "View", action: handleSessions },
    // { label: "Two-factor authentication", desc: twoFactor ? "Two-factor preference is enabled" : "Add an extra layer of security", btn: twoFactor ? "Disable" : "Enable", action: handleTwoFactor },
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Security</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Access, sessions, and password tools.</p>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <button onClick={item.action} className="text-sm text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-700 px-4 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              {item.btn}
            </button>
          </div>
        ))}
      </div>

      {session && (
        <div className="mt-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
          <p><strong>Current session:</strong> {session.email}</p>
          <p><strong>Status:</strong> {session.status}</p>
          <button onClick={revokeCurrentSession} className="mt-3 text-red-600 dark:text-red-400 font-semibold hover:underline">Log out current session</button>
        </div>
      )}

      {passwordOpen && (
        <form onSubmit={handlePasswordSubmit} className="mt-4 bg-slate-50 dark:bg-slate-700 rounded-xl p-4 grid gap-3">
          <input type="password" placeholder="Current password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100" />
          <input type="password" placeholder="New password" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100" />
          <input type="password" placeholder="Confirm new password" value={passwordForm.confirmPassword} onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })} className="rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-800 dark:text-slate-100" />
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setPasswordOpen(false)} className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-sm text-slate-600 dark:text-slate-300">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold">Save Password</button>
          </div>
        </form>
      )}

      {message && <p className="text-sm text-emerald-500 font-medium mt-4">{message}</p>}
    </div>
  );
}

function AccountSection({ onLogout, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Account</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Manage your account actions.</p>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Log out</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">Sign out of your current session</p>
          </div>
          <button onClick={onLogout} className="text-sm text-slate-600 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-600 px-4 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            Log out
          </button>
        </div>
        <div className="flex items-center justify-between bg-red-50 dark:bg-red-900/20 rounded-xl px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">Delete account</p>
            <p className="text-xs text-red-400 dark:text-red-500 mt-0.5">Permanently remove your account and all data</p>
          </div>
          <button onClick={onDelete} className="text-sm text-red-600 dark:text-red-400 font-medium border border-red-200 dark:border-red-800 px-4 py-1.5 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Settings() {
  const [active, setActive] = useState("profile");
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  // ✅ Har render pe fresh user data lo
  const user = getUser();

  const handleLogout = () => {
    setModal(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signup");
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:5000"}/api/auth/account`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.message || "Account delete failed");
        return;
      }

      setModal(null);
      localStorage.clear();
      sessionStorage.clear();
      navigate("/signup?tab=signin", { replace: true });
    } catch (error) {
      alert("Account delete failed. Please try again.");
    }
  };

  const filteredNav = NAV_ITEMS.filter(
    (item) =>
      item.label.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  const SECTION_MAP = {
    profile: <ProfileSection user={user} />,
    theme: <ThemeSection />,
    preferences: <PreferencesSection />,
    security: <SecuritySection />,
    account: <AccountSection onLogout={() => setModal("logout")} onDelete={() => setModal("delete")} />,
  };

  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 dark:text-indigo-400">Settings</h1>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
              Manage your account, appearance, preferences, and security in one clean workspace.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search profile, privacy, theme, logout..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>

        <div className="flex gap-5 items-start">
          <div className="w-64 bg-white dark:bg-slate-800 rounded-2xl p-3 flex flex-col gap-1 flex-shrink-0">
            {filteredNav.map((item) => (
              <button
                key={item.key}
                onClick={() => { setActive(item.key); setSearch(""); }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-colors ${
                  active === item.key ? "bg-slate-100 dark:bg-slate-700" : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                }`}
              >
                <p className={`text-sm font-semibold ${active === item.key ? "text-slate-800 dark:text-slate-100" : "text-slate-600 dark:text-slate-400"}`}>
                  {item.label}
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
              </button>
            ))}
          </div>

          <div className="flex-1">{SECTION_MAP[active]}</div>
        </div>
      </main>

      {/* Logout Modal */}
      {modal === "logout" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mb-2">Log out?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Aap apne current session se sign out ho jaoge. Dobara access ke liye login karna padega.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleLogout} className="text-sm font-medium px-4 py-2 rounded-lg bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-800 hover:bg-slate-700 transition-colors">
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {modal === "delete" && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 w-80 shadow-xl">
            <h3 className="text-base font-bold text-red-600 dark:text-red-400 mb-2">Delete account?</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              Ye action permanent hai. Aapka account aur saara data hamesha ke liye delete ho jaega. Ye undo nahi hoga.
            </p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setModal(null)} className="text-sm font-medium px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="text-sm font-medium px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}