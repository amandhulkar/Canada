import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";

// ✅ localStorage se dynamic user data lo
const getUser = () => {
  const user = JSON.parse(localStorage.getItem("currentUser")) || {};
  const name = user.fullName || user.name || "Guest User";
  const email = user.email || "";
  const accountType = user.accountType || "Personal account";
  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  return { name, email, accountType, initials, plan: user.plan || "Individual - trial" };
};

const NAV_ITEMS = [
  { key: "profile", label: "Profile", desc: "User details and account summary" },
  { key: "theme", label: "Theme", desc: "Dark or bright dashboard mode" },
  { key: "preferences", label: "Preferences", desc: "Workspace behavior and shortcuts" },
  { key: "notifications", label: "Notifications", desc: "Alerts, updates, and reminders" },
  { key: "privacy", label: "Privacy", desc: "Visibility and analytics preferences" },
  { key: "security", label: "Security", desc: "Access, sessions, and password tools" },
  { key: "account", label: "Account", desc: "Logout and delete account" },
];

function ProfileSection({ user }) {
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
  const [prefs, setPrefs] = useState({ compactMode: false, autoSave: true, sidebarCollapsed: false });
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
              onClick={() => setPrefs((prev) => ({ ...prev, [p.key]: !prev[p.key] }))}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${prefs[p.key] ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-600"}`}
            >
              <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${prefs[p.key] ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        ))}
      </div>
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
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Security</h2>
      <p className="text-sm text-slate-400 dark:text-slate-500 mb-5">Access, sessions, and password tools.</p>
      <div className="flex flex-col gap-3">
        {[
          { label: "Change password", desc: "Update your login password", btn: "Update" },
          { label: "Active sessions", desc: "View and revoke active sessions", btn: "View" },
          { label: "Two-factor authentication", desc: "Add an extra layer of security", btn: "Enable" },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between bg-slate-50 dark:bg-slate-700 rounded-xl px-5 py-4">
            <div>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{item.label}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
            </div>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 font-medium border border-indigo-200 dark:border-indigo-700 px-4 py-1.5 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors">
              {item.btn}
            </button>
          </div>
        ))}
      </div>
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

  const handleDelete = () => {
    setModal(null);
    localStorage.clear();
    sessionStorage.clear();
    navigate("/signup");
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
    notifications: <NotificationsSection />,
    privacy: <PrivacySection />,
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
              Manage your account, appearance, notifications, privacy, and security in one clean workspace.
            </p>
          </div>
          <input
            type="text"
            placeholder="Search profile, privacy, theme, logout..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-400 placeholder:text-slate-400 dark:placeholder:text-slate-500"
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