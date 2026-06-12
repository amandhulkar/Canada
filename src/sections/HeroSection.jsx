// import { motion } from 'framer-motion'
// import { FiArrowRight, FiCheckCircle, FiPlay } from 'react-icons/fi'
// import Container from '../components/Container'
// import PrimaryButton from '../components/PrimaryButton'
// import Reveal from '../components/Reveal'
// import { heroMetrics } from '../assets/siteData'

// function HeroSection() {
//   return (
//     <section id="home" className="section-shell overflow-hidden pb-10 pt-10 sm:pt-14 lg:pt-16">
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="hero-orb left-[8%] top-10 h-48 w-48 bg-accent-purple/10 animate-glow" />
//         <div className="hero-orb right-[8%] top-14 h-56 w-56 bg-accent-blue/10 animate-float-slow" />
//       </div>

//       <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
//         <div>
//           <Reveal className="space-y-8">
//             <div className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-muted shadow-soft">
//               <span className="inline-flex h-2.5 w-2.5 rounded-full bg-accent-blue" />
//               AI design assistant now available for fast-moving teams
//             </div>

//             <div className="space-y-6">
//               <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[4.6rem]">
//                 Create your next high-converting digital presence <span className="text-gradient">without the usual friction</span>.
//               </h1>
//               <p className="max-w-2xl text-lg leading-8 text-muted sm:text-xl">
//                 Velora helps teams build pages, launch campaigns, and manage growth workflows inside one clean, conversion-focused system.
//               </p>
//             </div>

//             <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
//               <PrimaryButton href="#pricing" className="gap-2 px-7">
//                 Start Free Trial <FiArrowRight />
//               </PrimaryButton>
//               <a
//                 href="#portfolio"
//                 className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition hover:text-accent-blue"
//               >
//                 <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white shadow-soft">
//                   <FiPlay className="ml-0.5" />
//                 </span>
//                 Watch Demo
//               </a>
//             </div>

//             <div className="flex flex-col gap-4 text-sm text-muted sm:flex-row sm:flex-wrap sm:items-center">
//               <span>No credit card required</span>
//               <span className="hidden h-1.5 w-1.5 rounded-full bg-slate-300 sm:inline-flex" />
//               <span>Launch faster with ready-made workflows</span>
//             </div>

//             <div className="grid gap-4 sm:grid-cols-3">
//               {heroMetrics.map((metric) => (
//                 <div key={metric.label} className="rounded-[1.4rem] border border-line bg-white p-5 shadow-soft">
//                   <div className="text-2xl font-semibold tracking-[-0.04em] text-ink">{metric.value}</div>
//                   <p className="mt-2 text-sm text-muted">{metric.label}</p>
//                 </div>
//               ))}
//             </div>
//           </Reveal>
//         </div>

//         <Reveal delay={0.08} className="relative">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.98, y: 24 }}
//             whileInView={{ opacity: 1, scale: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.3 }}
//             transition={{ duration: 0.8, ease: 'easeOut' }}
//             className="relative rounded-[2rem] border border-line bg-white p-4 shadow-float sm:p-6"
//           >
//             <div className="absolute inset-0 rounded-[2rem] bg-hero-grid bg-[size:32px_32px] opacity-30" />
//             <div className="relative rounded-[1.6rem] border border-line bg-white p-5 shadow-soft">
//               <div className="mb-5 flex items-center justify-between gap-4">
//                 <div>
//                   <p className="text-sm uppercase tracking-[0.18em] text-muted">Workspace preview</p>
//                   <h3 className="mt-1 text-2xl font-semibold tracking-[-0.04em] text-ink">Website Growth Dashboard</h3>
//                 </div>
//                 <span className="rounded-full bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-600">
//                   Live now
//                 </span>
//               </div>

//               <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
//                 <div className="rounded-[1.4rem] border border-line bg-canvas-soft p-5">
//                   <div className="mb-5 flex items-center justify-between gap-4">
//                     <div>
//                       <p className="text-sm text-muted">Campaign performance</p>
//                       <div className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-ink">+28.4%</div>
//                     </div>
//                     <div className="rounded-2xl border border-line bg-white px-3 py-2 text-right shadow-soft">
//                       <p className="text-xs uppercase tracking-[0.16em] text-muted">Tasks</p>
//                       <div className="mt-1 text-base font-semibold text-ink">14 active</div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     {[76, 88, 71, 94, 83].map((height, index) => (
//                       <div key={index} className="space-y-2">
//                         <div className="flex items-center justify-between text-xs font-medium text-muted">
//                           <span>Week 0{index + 1}</span>
//                           <span>{height}%</span>
//                         </div>
//                         <div className="h-2.5 rounded-full bg-white">
//                           <motion.div
//                             initial={{ width: 0 }}
//                             whileInView={{ width: `${height}%` }}
//                             viewport={{ once: true }}
//                             transition={{ duration: 0.8, delay: index * 0.08, ease: 'easeOut' }}
//                             className="h-full rounded-full bg-gradient-to-r from-accent-blue via-accent-purple to-accent-cyan"
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="rounded-[1.4rem] border border-line bg-white p-5 shadow-soft">
//                     <p className="text-sm uppercase tracking-[0.18em] text-muted">What you can launch</p>
//                     <div className="mt-4 space-y-3 text-sm text-ink">
//                       {['Marketing websites', 'Landing pages', 'Campaign dashboards'].map((item) => (
//                         <div key={item} className="flex items-start gap-3">
//                           <FiCheckCircle className="mt-0.5 h-4 w-4 text-accent-blue" />
//                           <span>{item}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="rounded-[1.4rem] border border-line bg-canvas-soft p-5">
//                     <p className="text-sm uppercase tracking-[0.18em] text-muted">Built for teams</p>
//                     <div className="mt-3 space-y-3">
//                       <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink shadow-soft">
//                         Share layouts with marketing and design
//                       </div>
//                       <div className="rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink shadow-soft">
//                         Track experiments and page performance
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         </Reveal>
//       </Container>
//     </section>
//   )
// }

// export default HeroSection

import { motion } from "framer-motion";
import { FiPlay, FiTrendingUp, FiShoppingCart } from "react-icons/fi";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";
import Reveal from "../components/Reveal";

function HeroSection() {
  const sidebarItems = [
    "Dashboard",
    "Clients",
    "Team",
    "Projects",
    "Invoices",
    "Services",
    "Access / Roles",
  ];

  const stats = [
    { label: "Monthly Revenue", value: "£0", sub: "Up 1.1% vs last month" },
    { label: "Active Projects", value: "1", sub: "Across all clients" },
    { label: "Complete project", value: "0", sub: "Need attention" },
    { label: "Pending Payments", value: "£0", sub: "Outstanding balance" },
  ];

  const quickLinks = [
    "Clients",
    "Projects",
    "Invoices",
    "Team",
    "Services",
    "Roles",
  ];

  return (
    <section
      id="home"
      className="relative overflow-visible pt-14 sm:pt-16 lg:pt-20"
      style={{
        background:
          "linear-gradient(135deg, #eceeff 0%, #ede8ff 40%, #e4edff 100%)",
        minHeight: "100vh",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 340,
            height: 340,
            top: 40,
            left: "6%",
            background: "rgba(139,120,255,0.10)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400,
            height: 400,
            top: 60,
            right: "4%",
            background: "rgba(100,160,255,0.10)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <Container
        className="relative flex items-center"
        style={{ minHeight: "100vh", paddingTop: 40, paddingBottom: 80 }}
      >
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1fr_1.08fr]">
          <Reveal className="flex flex-col gap-7">
            <div
              className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
              style={{
                background: "rgba(255,255,255,0.75)",
                borderColor: "#d6d3f0",
                color: "#555",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="inline-flex h-2 w-2 rounded-full"
                style={{ background: "#22c97c" }}
              />
              New: AI-Powered Design Assistant
            </div>

            <div className="space-y-1">
              <h1
                className="text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[4rem]"
                style={{ color: "#14132a" }}
              >
                Build your brand.
              </h1>
              <h1
                className="text-5xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-6xl lg:text-[4rem]"
                style={{ color: "#6c5ce7" }}
              >
                Build your future.
              </h1>
            </div>

            <p className="max-w-lg text-lg leading-7" style={{ color: "#666" }}>
              Create a professional website, online store, or portfolio. No
              coding required. Customize, publish, and grow your brand online.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <PrimaryButton href="#pricing">Start Free Trial</PrimaryButton>

              <a
                href="#demo"
                className="inline-flex items-center gap-2.5 text-sm font-semibold transition"
                style={{ color: "#14132a" }}
              >
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border"
                  style={{ background: "#fff", borderColor: "#ddd" }}
                >
                  <FiPlay size={14} style={{ marginLeft: 2 }} />
                </span>
                Watch Demo
              </a>
            </div>

            <p className="text-sm" style={{ color: "#999" }}>
              No credit card required&nbsp;
              <span style={{ margin: "0 6px" }}>•</span>3-day dashboard trial
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="relative overflow-visible"
            style={{ paddingTop: 24, paddingBottom: 24 }}
          >
            {/* Traffic chip */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.5 }}
              // className="absolute -top-6 -right-10 z-20"
              className="absolute top-20 -right-8 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 32px rgba(80,70,200,0.14)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#14132a",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "#f0eeff" }}
                >
                  <FiTrendingUp size={18} style={{ color: "#6c5ce7" }} />
                </span>
                Traffic +47%
              </motion.div>
            </motion.div>

            {/* Main dashboard card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              whileHover={{ rotate: 1.5, scale: 1.02, y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                default: { duration: 0.75, ease: "easeOut" },
                rotate: { type: "spring", stiffness: 120, damping: 16 },
                scale: { type: "spring", stiffness: 120, damping: 16 },
                y: { type: "spring", stiffness: 120, damping: 16 },
              }}
              className="relative overflow-hidden rounded-[1.8rem]"
              style={{
                background: "#fff",
                boxShadow:
                  "0 24px 64px rgba(80,70,200,0.13), 0 4px 16px rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
            >
              <div className="flex gap-1.5 px-5 pt-4">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: "#28c840" }}
                />
              </div>

              <div className="flex">
                <div
                  className="flex w-36 flex-shrink-0 flex-col border-r px-3 py-4"
                  style={{ borderColor: "#f0f0f0", background: "#fafafa" }}
                >
                  <p
                    className="mb-4 px-2 text-xs font-bold"
                    style={{ color: "#14132a" }}
                  >
                    17219296 Canada Inc.
                  </p>
                  {sidebarItems.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium"
                      style={
                        item === "Dashboard"
                          ? { background: "#ede9ff", color: "#6c5ce7" }
                          : { color: "#777" }
                      }
                    >
                      <span
                        className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{
                          background: item === "Dashboard" ? "#6c5ce7" : "#ccc",
                        }}
                      />
                      {item}
                    </div>
                  ))}
                  <div
                    className="mt-auto pt-4 px-2 text-xs"
                    style={{ color: "#aaa", cursor: "pointer" }}
                  >
                    Sign out
                  </div>
                </div>

                <div className="flex-1 p-5">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <h3
                        className="text-lg font-bold"
                        style={{ color: "#14132a" }}
                      >
                        Dashboard
                      </h3>
                      <p className="text-xs" style={{ color: "#bbb" }}>
                        Good afternoon · Wednesday, April 1, 2025
                      </p>
                    </div>
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ background: "#6c5ce7" }}
                    >
                      HM
                    </div>
                  </div>

                  <div
                    className="mb-4 flex items-center justify-between rounded-2xl px-4 py-3"
                    style={{ background: "#22c97c" }}
                  >
                    <div>
                      <p className="text-xs font-bold text-white">
                        Business plan is active
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "rgba(255,255,255,0.8)" }}
                      >
                        You can access the complete dashboard, including Clients
                        and Reports, plus all 8 templates.
                      </p>
                    </div>
                    <span
                      className="flex-shrink-0 rounded-xl px-3 py-1.5 text-xs font-bold"
                      style={{
                        background: "rgba(255,255,255,0.22)",
                        color: "#fff",
                      }}
                    >
                      Business
                    </span>
                  </div>

                  <div className="mb-4 grid grid-cols-4 gap-2">
                    {stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border p-3"
                        style={{
                          borderColor: "#f0f0f0",
                          background: "#fafafa",
                        }}
                      >
                        <p className="text-[10px]" style={{ color: "#aaa" }}>
                          {s.label}
                        </p>
                        <p
                          className="mt-1 text-xl font-bold"
                          style={{ color: "#14132a" }}
                        >
                          {s.value}
                        </p>
                        <p className="text-[9px]" style={{ color: "#bbb" }}>
                          {s.sub}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {quickLinks.map((link) => (
                      <div
                        key={link}
                        className="flex flex-col items-center gap-1"
                      >
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold"
                          style={{ background: "#f5f4ff", color: "#6c5ce7" }}
                        >
                          {link[0]}
                        </div>
                        <span className="text-[9px]" style={{ color: "#888" }}>
                          {link}
                        </span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className="flex h-9 w-14 items-center justify-center rounded-xl text-[9px] font-bold"
                        style={{ background: "#6c5ce7", color: "#fff" }}
                      >
                        New
                      </div>
                      <span className="text-[9px]" style={{ color: "#888" }}>
                        New Invoice
                      </span>
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
              // className="absolute -bottom-6 -left-10 z-20"
              // className="absolute bottom-20 left-1 z-20"
              className="absolute bottom-24 -left-6 z-20"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
                className="flex items-center gap-2 rounded-2xl px-4 py-3"
                style={{
                  background: "#fff",
                  boxShadow: "0 8px 28px rgba(0,0,0,0.10)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#14132a",
                }}
              >
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "#f0f0f0" }}
                >
                  <FiShoppingCart size={18} style={{ color: "#555" }} />
                </span>
                New Order!
              </motion.div>
            </motion.div>
          </Reveal>
        </div>
      </Container>

      {/* Scroll indicator */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ zIndex: 10, bottom: "15%" }}
      >
        <div
          className="flex justify-center rounded-full border-2 pt-1.5"
          style={{ width: 24, height: 40, borderColor: "#aaa" }}
        >
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
