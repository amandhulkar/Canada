import { useState } from "react";
// import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";

const categories = [
  { icon: "🚀", label: "Getting started", desc: "Set up your account, domain, and first project", count: 42, bg: "#eeedfe", color: "#5346d4" },
  { icon: "💳", label: "Billing & plans", desc: "Manage subscriptions, invoices, and upgrades", count: 28, bg: "#e1f5ee", color: "#0f6e56" },
  { icon: "🌐", label: "Domains & SSL", desc: "Connect custom domains and fix SSL issues", count: 35, bg: "#faece7", color: "#993c1d" },
  { icon: "🔌", label: "Integrations", desc: "Connect Stripe, Zapier, and third-party tools", count: 51, bg: "#e6f1fb", color: "#185fa5" },
  { icon: "🎨", label: "Templates & design", desc: "Customize layouts, fonts, and branding", count: 67, bg: "#faeeda", color: "#854f0b" },
  { icon: "🔒", label: "Account & security", desc: "Password, two-factor auth, and team access", count: 39, bg: "#fbeaf0", color: "#993556" },
];

const articles = [
  { title: "How to connect a custom domain", badge: "popular" },
  { title: "Cancelling or pausing your plan", badge: "popular" },
  { title: "Connecting Stripe payments", badge: "new" },
  { title: "Fixing SSL certificate errors", badge: "popular" },
  { title: "Inviting team members to your workspace", badge: "new" },
];

const popularTags = ["Custom domain", "Cancel plan", "Connect Stripe", "SSL error"];

const stats = [
  { value: "0+", label: "Help Articles" },
  { value: "0%", label: "Issues Resolved" },
  { value: "0 min", label: "Avg. Response Time" },
  { value: "24/7", label: "Live Chat Support" },
];

export default function HelpCenter() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) alert(`Searching: ${query}`);
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f5f5f7", minHeight: "100vh" }}>
      {/* <Navbar /> */}

      {/* Hero */}
      <div style={{
        background: "linear-gradient(135deg, #2a1d6e 0%, #4f3bbf 50%, #6a52d4 100%)",
        padding: "3.5rem 2rem 3rem",
        textAlign: "center",
      }}>
        <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: "1rem" }}>
          Help Center
        </p>
        <h1 style={{ fontSize: 40, fontWeight: 500, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.2 }}>
          How can we help you?
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", marginBottom: "1.75rem" }}>
          Search 500+ articles, guides, and tutorials to find your answer.
        </p>

        {/* Search bar */}
        <div style={{
          display: "flex", alignItems: "center", background: "#fff",
          borderRadius: 999, maxWidth: 520, margin: "0 auto 1rem",
          padding: "6px 6px 6px 18px", gap: 10,
        }}>
          <span style={{ color: "#5346d4", fontSize: 18, flexShrink: 0 }}>🔍</span>
          <input
            type="text"
            placeholder="Search for answers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            style={{ flex: 1, border: "none", outline: "none", fontSize: 14, color: "#444", background: "transparent" }}
          />
          <button
            onClick={handleSearch}
            style={{
              background: "#5346d4", color: "#fff", border: "none",
              borderRadius: 999, padding: "8px 22px", fontSize: 14, cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>

        {/* Popular tags */}
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>
          Popular:
          {popularTags.map((tag) => (
            <span
              key={tag}
              onClick={() => setQuery(tag)}
              style={{ color: "rgba(255,255,255,0.9)", fontWeight: 500, cursor: "pointer", marginLeft: 8 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        padding: "2rem", gap: "1rem",
        borderBottom: "0.5px solid #e0e0e0", background: "#fff",
      }}>
        {stats.map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 500, color: "#5346d4" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Categories */}
      <div style={{ padding: "2.5rem 2rem", background: "#f5f5f7" }}>
        <p style={{ fontSize: 18, fontWeight: 500, color: "#111", marginBottom: "0.25rem" }}>Browse by category</p>
        <p style={{ fontSize: 14, color: "#888", marginBottom: "1.5rem" }}>Find articles organized by topic</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {categories.map((cat) => (
            <div
              key={cat.label}
              style={{
                background: "#fff", border: "0.5px solid #e0e0e0",
                borderRadius: 12, padding: "1.25rem", cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#bbb")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e0e0e0")}
            >
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: cat.bg, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 18, marginBottom: 10,
              }}>
                {cat.icon}
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 500, color: "#111", marginBottom: 4 }}>{cat.label}</h3>
              <p style={{ fontSize: 12, color: "#888", lineHeight: 1.5 }}>{cat.desc}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                <span style={{ fontSize: 11, color: "#aaa" }}>{cat.count} articles</span>
                <span style={{ fontSize: 14, color: "#aaa" }}>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular articles */}
      <div style={{ padding: "0 2rem 2.5rem", background: "#f5f5f7" }}>
        <p style={{ fontSize: 18, fontWeight: 500, color: "#111", marginBottom: "1rem" }}>Popular articles</p>
        <div style={{
          display: "flex", flexDirection: "column",
          background: "#fff", border: "0.5px solid #e0e0e0",
          borderRadius: 12, overflow: "hidden",
        }}>
          {articles.map((art, i) => (
            <div
              key={art.title}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                borderBottom: i < articles.length - 1 ? "0.5px solid #e0e0e0" : "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f9f9f9")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <span style={{ fontSize: 14, color: "#111" }}>{art.title}</span>
              <span style={{
                fontSize: 11, padding: "2px 8px", borderRadius: 999,
                background: art.badge === "new" ? "#eeedfe" : "#e1f5ee",
                color: art.badge === "new" ? "#5346d4" : "#0f6e56",
              }}>
                {art.badge === "popular" ? "🔥 Popular" : "New"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.25rem 2rem",
        borderTop: "0.5px solid #e0e0e0", background: "#fff",
      }}>
        <div style={{ fontSize: 14, color: "#888" }}>
          <strong style={{ color: "#111", display: "block", fontWeight: 500, marginBottom: 2 }}>Still need help?</strong>
          Our support team is available 24/7
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["💬 Live chat", "✉️ Email support"].map((btn) => (
            <button
              key={btn}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                border: "0.5px solid #ccc", borderRadius: 8,
                padding: "7px 14px", fontSize: 13, color: "#111",
                cursor: "pointer", background: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}