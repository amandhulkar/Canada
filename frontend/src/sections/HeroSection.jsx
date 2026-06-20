import { useState } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiX, FiTrendingUp, FiShoppingCart, FiGrid, FiUsers, FiFileText, FiSettings, FiBarChart2, FiHelpCircle } from "react-icons/fi";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import Reveal from "../components/Reveal";
import { Link } from "react-router-dom";

function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  const stats = [
    { label: "Monthly Revenue", value: "$0", change: "+1.1%", sub: "vs last month" },
    { label: "Active Projects", value: "1", change: "+2.8%", sub: "this week" },
    { label: "Complete", value: "0", change: "3.2%", sub: "completion rate" },
    { label: "Pending", value: "$0", change: "+0.8%", sub: "outstanding" },
  ];

  const sidebarIcons = [
    { icon: FiGrid, active: true },
    { icon: FiUsers },
    { icon: FiFileText },
    { icon: FiBarChart2 },
    { icon: FiHelpCircle },
    { icon: FiSettings },
  ];

  const timelineBars = [
    { label: "Website", width: "60%", color: "#7c6dfa", left: "5%" },
    { label: "Store", width: "40%", color: "#a99eff", left: "25%" },
    { label: "Portfolio", width: "50%", color: "#7c6dfa", left: "15%" },
    { label: "Blog", width: "35%", color: "#6c5ce7", left: "40%" },
  ];

  const pills = [
    { label: "Clients", color: "#7c6dfa" },
    { label: "Projects", color: "#a99eff" },
    { label: "Invoices", color: "#6c5ce7" },
    { label: "Team", color: "#7c6dfa" },
    { label: "Services", color: "#a99eff" },
    { label: "New", color: "#7c6dfa", isNew: true },
  ];

  return (
    <section
      id="home"
      className="relative overflow-visible pt-14 sm:pt-16 lg:pt-20"
      style={{
        // background: "linear-gradient(135deg, #eceeff 0%, #ede8ff 40%, #e4edff 100%)",
        background: "white",
        minHeight: "100vh",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 340, height: 340, top: 40, left: "6%", background: "rgba(139,120,255,0.10)", filter: "blur(60px)" }} />
        <div className="absolute rounded-full" style={{ width: 400, height: 400, top: 60, right: "4%", background: "rgba(100,160,255,0.10)", filter: "blur(80px)" }} />
      </div>

      <Container className="relative flex items-center" style={{ minHeight: "100vh", paddingTop: 40, paddingBottom: 80 }}>
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.08fr]">

          {/* Left — same */}
          <Reveal className="flex flex-col gap-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{ background: "rgba(255,255,255,0.75)", borderColor: "#d6d3f0", color: "#555", backdropFilter: "blur(8px)" }}>
              <span className="inline-flex h-2 w-2 rounded-full" style={{ background: "#22c97c" }} />
              New: AI-Powered Design Assistant
            </div>

            <div className="space-y-1">
              <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[4rem]" style={{ color: "#14132a" }}>
                Build your brand.
              </h1>
              <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[4rem]" style={{ color: "#6c5ce7" }}>
                Build your future.
              </h1>
            </div>

            <p className="max-w-lg text-lg leading-7" style={{ color: "#666" }}>
              Create a professional website, online store, or portfolio. No coding required. Customize, publish, and grow your brand online.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link to="/signup">
                <PrimaryButton>Start Free Trial</PrimaryButton>
              </Link>
              <button type="button" onClick={() => setIsDemoOpen(true)} className="inline-flex items-center gap-2.5 text-sm font-semibold transition" style={{ color: "#14132a" }}>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border" style={{ background: "#fff", borderColor: "#ddd" }}>
                  <FiPlay size={14} style={{ marginLeft: 2 }} />
                </span>
                Watch Demo
              </button>
            </div>

            <p className="text-sm" style={{ color: "#999" }}>
              No credit card required&nbsp;<span style={{ margin: "0 6px" }}>•</span>3-day dashboard trial
            </p>
          </Reveal>

          {/* Right — NEW dashboard mockup */}
          <Reveal delay={0.08} className="relative overflow-visible" style={{ paddingTop: 24, paddingBottom: 24 }}>

            {/* Traffic chip */}
            {/* <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="absolute top-16 -right-8 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{ background: "#111118", border: "0.5px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", fontWeight: 700, fontSize: 15, color: "#fff" }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(124,109,250,0.15)" }}>
                  <FiTrendingUp size={18} style={{ color: "#7c6dfa" }} />
                </span>
                Traffic +47%
              </motion.div>
            </motion.div> */}

            {/* Main dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              // whileHover={{ rotate: 1.5, scale: 1.02, y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                default: { duration: 0.75, ease: "easeOut" },
                rotate: { type: "spring", stiffness: 120, damping: 16 },
                scale: { type: "spring", stiffness: 120, damping: 16 },
                y: { type: "spring", stiffness: 120, damping: 16 },
              }}
              className="relative overflow-hidden rounded-[1.8rem]"
              style={{ background: "#111118", border: "0.5px solid rgba(255,255,255,0.08)", boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)", cursor: "pointer" }}
            >
              {/* Top navbar */}
              <div className="flex items-center gap-2 border-b px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d14" }}>
                {/* Logo */}
                <div className="flex h-6 w-6 items-center justify-center rounded-md mr-2" style={{ background: "#7c6dfa" }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700 }}>F</span>
                </div>
                {/* Nav tabs */}
                {["Dashboard", "Monitoring", "Support"].map((tab) => (
                  <div key={tab} className="rounded-lg px-3 py-1 text-[10px] font-medium"
                    style={tab === "Dashboard" ? { background: "rgba(124,109,250,0.15)", color: "#7c6dfa" } : { color: "#555" }}>
                    {tab}
                  </div>
                ))}
                {/* Search */}
                <div className="ml-auto flex items-center gap-1.5 rounded-lg px-2 py-1" style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ color: "#444", fontSize: 9 }}>🔍</span>
                  <span style={{ color: "#444", fontSize: 9 }}>Search...</span>
                </div>
                {/* Avatar */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full text-[8px] font-bold ml-2" style={{ background: "#7c6dfa", color: "#fff" }}>HM</div>
              </div>

              <div className="flex">
                {/* Icon sidebar */}
                <div className="flex w-10 flex-shrink-0 flex-col items-center gap-3 border-r py-4" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0d0d14" }}>
                  {sidebarIcons.map(({ icon: Icon, active }, i) => (
                    <div key={i} className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={active ? { background: "rgba(124,109,250,0.2)" } : {}}>
                      <Icon size={13} style={{ color: active ? "#7c6dfa" : "#444" }} />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="flex-1 p-4">
                  {/* Title */}
                  <div className="mb-3">
                    <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: "#555" }}>Overview</p>
                    <h3 className="text-sm font-bold" style={{ color: "#fff" }}>FindTemplates</h3>
                  </div>

                  {/* Stats row */}
                  <div className="mb-3 grid grid-cols-4 gap-2">
                    {stats.map((s, i) => (
                      <div key={i} className="rounded-xl p-2.5" style={{ background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)" }}>
                        <p className="text-[8px]" style={{ color: "#555" }}>{s.label}</p>
                        <p className="mt-1 text-base font-bold" style={{ color: "#fff" }}>{s.value}</p>
                        <p className="text-[8px] font-semibold" style={{ color: "#7c6dfa" }}>{s.change}</p>
                        <p className="text-[7px]" style={{ color: "#333" }}>{s.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Pills row */}
                  <div className="mb-3 rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <p className="mb-2 text-[8px] font-semibold uppercase tracking-widest" style={{ color: "#444" }}>Quick Access</p>
                    <div className="flex flex-wrap gap-2">
                      {pills.map((pill, i) => (
                        <div key={i} className="flex items-center gap-1.5 rounded-full px-3 py-1.5"
                          style={{ background: pill.isNew ? pill.color : `${pill.color}22`, border: `0.5px solid ${pill.color}44` }}>
                          <span className="h-2 w-2 rounded-full" style={{ background: pill.color }} />
                          <span className="text-[9px] font-medium" style={{ color: pill.isNew ? "#fff" : pill.color }}>{pill.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline / gantt */}
                  <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,0.02)", border: "0.5px solid rgba(255,255,255,0.05)" }}>
                    <p className="mb-2 text-[8px] font-semibold uppercase tracking-widest" style={{ color: "#444" }}>Projects Timeline</p>
                    <div className="space-y-2">
                      {timelineBars.map((bar, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="w-12 text-[8px]" style={{ color: "#555" }}>{bar.label}</span>
                          <div className="relative flex-1 rounded-full" style={{ height: 8, background: "rgba(255,255,255,0.04)" }}>
                            <div className="absolute rounded-full" style={{ height: 8, width: bar.width, left: bar.left, background: bar.color, opacity: 0.85 }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* New Order chip */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-24 -left-6 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                className="flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{ background: "#111118", border: "0.5px solid rgba(255,255,255,0.08)", boxShadow: "0 8px 28px rgba(0,0,0,0.3)", fontWeight: 700, fontSize: 14, color: "#fff" }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "rgba(124,109,250,0.1)" }}>
                  <FiShoppingCart size={18} style={{ color: "#7c6dfa" }} />
                </span>
                New Order!
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </Container>

      {isDemoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
          onClick={() => setIsDemoOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsDemoOpen(false)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg transition hover:scale-105"
              aria-label="Close demo video"
            >
              <FiX size={20} />
            </button>
            <video className="w-full" controls autoPlay playsInline>
              <source src="/videos/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}

      {/* Scroll indicator */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ zIndex: 10, bottom: "15%" }}>
        <div className="flex justify-center rounded-full border-2 pt-1.5" style={{ width: 24, height: 40, borderColor: "#aaa" }}>
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            className="rounded-full"
            style={{ width: 4, height: 8, background: "#aaa" }}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;