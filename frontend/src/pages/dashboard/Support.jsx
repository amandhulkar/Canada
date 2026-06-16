import Sidebar from "../../components/Sidebar";

const STATS = [
  { label: "Projects Delivered", value: "50+" },
  { label: "Happy Clients", value: "30+" },
  { label: "Years Experience", value: "3+" },
  { label: "Client Satisfaction", value: "100%" },
];

const TECH_STACK = {
  FRONTEND: ["HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Next.js", "Tailwind CSS", "Bootstrap"],
  "BACKEND & DATABASE": ["Node.js", "Supabase", "PostgreSQL", "Firebase", "REST APIs"],
  "TOOLS & PLATFORMS": ["Git & GitHub", "VS Code", "Figma", "Vercel", "Netlify", "Cloudflare"],
};

const SERVICES = [
  "Custom Website Development",
  "Agency Management Platforms",
  "E-commerce Stores",
  "Landing Page Design",
  "Dashboard & CRM Systems",
  "SEO Optimization",
  "API Integration",
  "Website Maintenance & Support",
];

const AVAILABILITY = [
  { day: "Mon – Fri", status: "Available", color: "text-green-500" },
  { day: "Saturday", status: "Limited", color: "text-orange-400" },
  { day: "Sunday", status: "Off", color: "text-gray-400 dark:text-slate-500" },
];

const tagColors = {
  FRONTEND: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800",
  "BACKEND & DATABASE": "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800",
  "TOOLS & PLATFORMS": "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-800",
};

function Profile() {
  return (
    <div className="flex min-h-screen bg-slate-100 dark:bg-slate-900">
      <Sidebar />

      <main className="flex-1 p-8 space-y-6">
        {/* Hero Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 p-8 flex items-center gap-6 shadow-md">
          <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-5xl shrink-0 border-4 border-white/30">
            🧑‍💻
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">FindTemplates</h1>
            <p className="text-indigo-100 mt-1 text-base">Full-Stack Web Developer & Digital Agency</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {["Available for Projects", "India", "Remote"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold border border-white/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="bg-white dark:bg-slate-800 rounded-xl p-5 shadow-sm text-center"
            >
              <p className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{s.value}</p>
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* About + Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* About */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>🧍</span> About
            </h2>
            <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">
              FindTemplates is a professional full-stack web development agency specialising in building modern,
              high-performance websites, web apps, and digital platforms.
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mt-3">
              From crafting stunning landing pages to building complete agency management systems like this one, every
              product is designed with performance, scalability, and a great user experience in mind.
            </p>
            <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mt-3">
              Passionate about clean code, thoughtful UI/UX, and delivering real business value through technology.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>💬</span> Contact Details
            </h2>
            <div className="space-y-4">
              {[
                { icon: "🌐", label: "EMAIL", value: "admin@findtemplates.com" },
                { icon: "🔗", label: "LINKEDIN", value: "FindTemplates" },
                { icon: "🌍", label: "WEBSITE", value: "FindTemplates.com" },
                { icon: "📍", label: "LOCATION", value: "India · Available Remotely", bold: true },
                { icon: "⏰", label: "RESPONSE TIME", value: "Usually within 24 hours", bold: true },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/40 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 dark:text-slate-500 tracking-widest uppercase">
                      {item.label}
                    </p>
                    <p
                      className={`text-sm mt-0.5 ${item.bold ? "font-semibold text-gray-700 dark:text-slate-200" : "text-indigo-600 dark:text-indigo-400"}`}
                    >
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-5">
            <span>🔧</span> Tech Stack & Skills
          </h2>
          <div className="space-y-5">
            {Object.entries(TECH_STACK).map(([category, skills]) => (
              <div key={category}>
                <p className="text-xs font-bold text-gray-400 dark:text-slate-500 tracking-widest uppercase mb-2">
                  {category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColors[category]}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services + Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Services */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <span>💼</span> Services Offered
            </h2>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300">
                  <span className="text-indigo-500 font-bold">✓</span> {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links + Availability */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <span>🔗</span> Quick Links
              </h2>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: "🔗", label: "LinkedIn" },
                  { icon: "📧", label: "Email" },
                  { icon: "🌐", label: "Website" },
                ].map((link) => (
                  <button
                    key={link.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 text-sm font-semibold border border-indigo-100 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition"
                  >
                    <span>{link.icon}</span> {link.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-4">
                <span>⏰</span> Availability
              </h2>
              <div className="space-y-3">
                {AVAILABILITY.map((a) => (
                  <div key={a.day} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-slate-300">{a.day}</span>
                    <span className={`text-sm font-semibold ${a.color}`}>{a.status}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 text-xs text-indigo-600 dark:text-indigo-300 font-medium flex items-center gap-2">
                <span>⏰</span> IST (UTC +5:30) · Response within 24 hrs
              </div>
            </div>
          </div>
        </div>

        {/* Send a Message */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest flex items-center gap-2 mb-6">
            <span>💬</span> Send a Message
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Your Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Subject</label>
            <input
              type="text"
              placeholder="e.g. New Website Project"
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Project Type</label>
            <select className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-400 dark:text-slate-500 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">— Select a service —</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 dark:text-slate-300 mb-1">Message</label>
            <textarea
              rows={5}
              placeholder="Describe your project, requirements, timeline, or any questions..."
              className="w-full rounded-lg border border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
            />
          </div>

          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl shadow-sm transition">
            <span>💬</span> Send Message
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;