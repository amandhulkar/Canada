// import { useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { motion } from "framer-motion";

// const API = import.meta.env.VITE_API_URL  || "http://localhost:5000";

// const sidebarItems = [
//   "Dashboard",
//   "Clients",
//   "Team",
//   "Projects",
//   "Invoices",
//   "Services",
//   "Access / Roles",
//   "Settings",
//   "Support Info",
// ];
// const stats = [
//   { label: "Monthly Revenue", value: "£0", sub: "Up 12% vs last month" },
//   { label: "Active Projects", value: "1", sub: "Across all clients" },
//   { label: "Complete project", value: "0", sub: "Need attention" },
//   { label: "Pending Payments", value: "£0", sub: "Outstanding balance" },
// ];
// const quickLinks = [
//   "Clients",
//   "Projects",
//   "Invoices",
//   "Team",
//   "Services",
//   "Roles",
// ];

// function SignupPage() {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const [tab, setTab] = useState(
//     searchParams.get("tab") === "signin" ? "signin" : "create",
//   );
//   const [showPass, setShowPass] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [accountType, setAccountType] = useState("Freelancer / Individual");
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirm: "",
//   });

//   // ✅ Preview mein dynamic name dikhane ke liye
//   const previewName = form.name.trim() || "Your Name";
//   const previewInitials = previewName
//     .split(" ")
//     .map((w) => w[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2);

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   //   const handleSubmit = (e) => {
//   //   e.preventDefault();

//   //   if (tab === "create") {
//   //     if (form.password !== form.confirm) {
//   //       alert("Passwords do not match");
//   //       return;
//   //     }

//   //     const users = JSON.parse(localStorage.getItem("users")) || [];
//   //     const existingUser = users.find((user) => user.email === form.email);

//   //     if (existingUser) {
//   //       alert("Email already registered");
//   //       return;
//   //     }

//   //     const newUser = {
//   //       name: form.name,
//   //       email: form.email,
//   //       password: form.password,
//   //       accountType,
//   //     };

//   //     users.push(newUser);
//   //     localStorage.setItem("users", JSON.stringify(users));
//   //     localStorage.setItem("currentUser", JSON.stringify(newUser));

//   //     alert("Account Created Successfully");
//   //     navigate("/dashboard");
//   //   }

//   //   if (tab === "signin") {
//   //     const users = JSON.parse(localStorage.getItem("users")) || [];
//   //     const user = users.find(
//   //       (u) => u.email === form.email && u.password === form.password,
//   //     );

//   //     if (!user) {
//   //       alert("Invalid Email or Password");
//   //       return;
//   //     }

//   //     localStorage.setItem("currentUser", JSON.stringify(user));
//   //     alert("Login Successful");
//   //     navigate("/dashboard");
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//   e.preventDefault();

//   // SIGNUP
//   if (tab === "create") {
//     if (form.password !== form.confirm) {
//       alert("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await fetch(
//         // "http://localhost:5000/api/auth/signup",
//         `${API}/api/auth/signup`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             fullName: form.name,
//             email: form.email,
//             password: form.password,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert("Account Created Successfully");

//       setForm({
//         name: "",
//         email: "",
//         password: "",
//         confirm: "",
//       });

//       setTab("signin");
//     } catch (error) {
//       console.log(error);
//       alert("Server Error");
//     }
//   }

//   // SIGNIN
//   if (tab === "signin") {
//     try {
//       const res = await fetch(
//         // "http://localhost:5000/api/auth/signin",
//         `${API}/api/auth/signin`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: form.email,
//             password: form.password,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       localStorage.setItem("token", data.token);

//       localStorage.setItem(
//         "currentUser",
//         JSON.stringify(data.user)
//       );

//       alert("Login Successful");

//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//       alert("Server Error");
//     }
//   }
// };

//   const handleLogout = () => {
//     localStorage.removeItem("currentUser");
//     navigate("/");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         fontFamily: "Inter, sans-serif",
//       }}
//     >
//       {/* ── LEFT: Form Panel ── */}
//       <div
//         style={{
//           width: 480,
//           flexShrink: 0,
//           background: "#fff",
//           padding: "40px 48px",
//           display: "flex",
//           flexDirection: "column",
//           overflowY: "auto",
//         }}
//       >
//         {/* Logo */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: 8,
//             marginBottom: 10,
//           }}
//         >
//           <span style={{ color: "#6c5ce7", fontSize: 20 }}>◆</span>
//           <span style={{ fontSize: 16, fontWeight: 800, color: "#6c5ce7" }}>
//             FindTemplates
//           </span>
//         </div>
//         <p style={{ fontSize: 13.5, color: "#888", marginBottom: 36 }}>
//           Build beautiful websites &amp; dashboards - sign in to continue.
//         </p>

//         {/* Tabs */}
//         <div
//           style={{
//             display: "flex",
//             borderBottom: "1.5px solid #eee",
//             marginBottom: 28,
//           }}
//         >
//           {["signin", "create"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               style={{
//                 flex: 1,
//                 padding: "10px 0",
//                 background: "none",
//                 border: "none",
//                 cursor: "pointer",
//                 fontSize: 14,
//                 fontWeight: tab === t ? 700 : 400,
//                 color: tab === t ? "#6c5ce7" : "#999",
//                 borderBottom:
//                   tab === t ? "2.5px solid #6c5ce7" : "2.5px solid transparent",
//                 marginBottom: -2,
//                 transition: "all 0.2s",
//               }}
//             >
//               {t === "signin" ? "Sign In" : "Create Account"}
//             </button>
//           ))}
//         </div>

//         {tab === "create" ? (
//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: 20 }}
//           >
//             {/* Account Type */}
//             <div>
//               <label style={labelStyle}>Account Type</label>
//               <select
//                 value={accountType}
//                 onChange={(e) => setAccountType(e.target.value)}
//                 style={inputStyle}
//               >
//                 <option>Freelancer / Individual</option>
//                 <option>Agency / Team</option>
//                 <option>Enterprise</option>
//               </select>
//             </div>

//             {/* Full Name */}
//             <div>
//               <label style={labelStyle}>Full Name</label>
//               <input
//                 name="name"
//                 type="text"
//                 placeholder="Rahul Sharma"
//                 value={form.name}
//                 onChange={handleChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label style={labelStyle}>Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="you@company.com"
//                 value={form.email}
//                 onChange={handleChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label style={labelStyle}>Password</label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   name="password"
//                   type={showPass ? "text" : "password"}
//                   placeholder="Min 8 characters"
//                   value={form.password}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, paddingRight: 80 }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   style={showBtnStyle}
//                 >
//                   {showPass ? "Hide" : "Show"}
//                 </button>
//               </div>
//               <p style={{ fontSize: 11.5, color: "#aaa", marginTop: 6 }}>
//                 Must contain: uppercase · lowercase · number · special character
//               </p>
//             </div>

//             {/* Confirm Password */}
//             <div>
//               <label style={labelStyle}>Confirm Password</label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   name="confirm"
//                   type={showConfirm ? "text" : "password"}
//                   placeholder="Re-enter password"
//                   value={form.confirm}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, paddingRight: 80 }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirm)}
//                   style={showBtnStyle}
//                 >
//                   {showConfirm ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               style={{
//                 marginTop: 4,
//                 width: "100%",
//                 padding: "15px",
//                 background: "#6c5ce7",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 12,
//                 fontSize: 15,
//                 fontWeight: 700,
//                 cursor: "pointer",
//                 transition: "background 0.2s",
//               }}
//               onMouseEnter={(e) => (e.target.style.background = "#5a4bd1")}
//               onMouseLeave={(e) => (e.target.style.background = "#6c5ce7")}
//             >
//               Create Account
//             </button>

//             <p style={{ textAlign: "center", fontSize: 12.5, color: "#aaa" }}>
//               Already have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setTab("signin")}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#6c5ce7",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   fontSize: 12.5,
//                 }}
//               >
//                 Sign In
//               </button>
//             </p>
//           </form>
//         ) : (
//           <form
//             onSubmit={handleSubmit}
//             style={{ display: "flex", flexDirection: "column", gap: 20 }}
//           >
//             <div>
//               <label style={labelStyle}>Email</label>
//               <input
//                 name="email"
//                 type="email"
//                 placeholder="you@company.com"
//                 value={form.email}
//                 onChange={handleChange}
//                 style={inputStyle}
//                 required
//               />
//             </div>
//             <div>
//               <label style={labelStyle}>Password</label>
//               <div style={{ position: "relative" }}>
//                 <input
//                   name="password"
//                   type={showPass ? "text" : "password"}
//                   placeholder="Your password"
//                   value={form.password}
//                   onChange={handleChange}
//                   style={{ ...inputStyle, paddingRight: 80 }}
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPass(!showPass)}
//                   style={showBtnStyle}
//                 >
//                   {showPass ? "Hide" : "Show"}
//                 </button>
//               </div>
//             </div>
//             <button
//               type="submit"
//               style={{
//                 marginTop: 4,
//                 width: "100%",
//                 padding: "15px",
//                 background: "#6c5ce7",
//                 color: "#fff",
//                 border: "none",
//                 borderRadius: 12,
//                 fontSize: 15,
//                 fontWeight: 700,
//                 cursor: "pointer",
//               }}
//             >
//               Sign In
//             </button>
//             <p style={{ textAlign: "center", fontSize: 12.5, color: "#aaa" }}>
//               Don't have an account?{" "}
//               <button
//                 type="button"
//                 onClick={() => setTab("create")}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#6c5ce7",
//                   fontWeight: 600,
//                   cursor: "pointer",
//                   fontSize: 12.5,
//                 }}
//               >
//                 Create Account
//               </button>
//             </p>
//           </form>
//         )}
//       </div>

//       {/* ── RIGHT: Dashboard Preview ── */}
//       <div
//         style={{
//           flex: 1,
//           background:
//             "linear-gradient(135deg, #ddd8ff 0%, #e8e4ff 40%, #d8d0ff 100%)",
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           padding: "40px 32px",
//           overflow: "hidden",
//         }}
//       >
//         {/* Background orbs */}
//         <div
//           style={{
//             position: "absolute",
//             width: 320,
//             height: 320,
//             borderRadius: "50%",
//             background: "rgba(255,255,255,0.18)",
//             bottom: -80,
//             left: -80,
//           }}
//         />
//         <div
//           style={{
//             position: "absolute",
//             width: 200,
//             height: 200,
//             borderRadius: "50%",
//             background: "rgba(255,255,255,0.12)",
//             top: 40,
//             right: 40,
//           }}
//         />

//         {/* Dashboard mockup */}
//         <motion.div
//           initial={{ opacity: 0, y: 30, scale: 0.97 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           transition={{ duration: 0.8, ease: "easeOut" }}
//           style={{
//             background: "#fff",
//             borderRadius: 20,
//             boxShadow: "0 24px 64px rgba(80,60,200,0.18)",
//             overflow: "hidden",
//             width: "100%",
//             maxWidth: 620,
//           }}
//         >
//           {/* Top bar */}
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               padding: "12px 20px",
//               borderBottom: "1px solid #f0f0f0",
//             }}
//           >
//             <span style={{ fontSize: 11, fontWeight: 800, color: "#14132a" }}>
//               FindTemplates
//             </span>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <button
//                 style={{
//                   fontSize: 11,
//                   border: "1px solid #ddd",
//                   borderRadius: 8,
//                   padding: "4px 12px",
//                   background: "#fff",
//                   color: "#555",
//                   cursor: "pointer",
//                 }}
//               >
//                 + Invoice
//               </button>
//               <button
//                 style={{
//                   fontSize: 11,
//                   border: "none",
//                   borderRadius: 8,
//                   padding: "4px 12px",
//                   background: "#6c5ce7",
//                   color: "#fff",
//                   cursor: "pointer",
//                   fontWeight: 600,
//                 }}
//               >
//                 + Add Client
//               </button>
//               {/* ✅ Dynamic initials aur naam */}
//               <div
//                 style={{
//                   width: 28,
//                   height: 28,
//                   borderRadius: "50%",
//                   background: "#6c5ce7",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: 10,
//                   fontWeight: 700,
//                   color: "#fff",
//                 }}
//               >
//                 {previewInitials}
//               </div>
//               <span style={{ fontSize: 11, color: "#888" }}>{previewName}</span>
//             </div>
//           </div>

//           <div style={{ display: "flex" }}>
//             {/* Sidebar */}
//             <div
//               style={{
//                 width: 130,
//                 flexShrink: 0,
//                 borderRight: "1px solid #f0f0f0",
//                 padding: "14px 10px",
//                 background: "#fafafa",
//               }}
//             >
//               {sidebarItems.map((item) => (
//                 <div
//                   key={item}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: 7,
//                     padding: "6px 8px",
//                     borderRadius: 8,
//                     fontSize: 11,
//                     marginBottom: 2,
//                     fontWeight: item === "Dashboard" ? 600 : 400,
//                     color: item === "Dashboard" ? "#6c5ce7" : "#777",
//                     background:
//                       item === "Dashboard" ? "#f0eeff" : "transparent",
//                     cursor: "pointer",
//                   }}
//                 >
//                   <span
//                     style={{
//                       width: 6,
//                       height: 6,
//                       borderRadius: "50%",
//                       background: item === "Dashboard" ? "#6c5ce7" : "#ccc",
//                       flexShrink: 0,
//                     }}
//                   />
//                   {item}
//                 </div>
//               ))}
//               <div
//                 onClick={handleLogout}
//                 style={{
//                   fontSize: "10.5px",
//                   color: "#bbb",
//                   padding: "10px 8px",
//                   marginTop: 8,
//                   cursor: "pointer",
//                 }}
//               >
//                 Sign out
//               </div>
//             </div>

//             {/* Main */}
//             <div style={{ flex: 1, padding: "16px 18px" }}>
//               <div style={{ marginBottom: 12 }}>
//                 <h3
//                   style={{
//                     fontSize: 17,
//                     fontWeight: 800,
//                     color: "#14132a",
//                     margin: 0,
//                   }}
//                 >
//                   Dashboard
//                 </h3>
//                 <p style={{ fontSize: 10.5, color: "#bbb", margin: "2px 0 0" }}>
//                   Good afternoon · Wednesday, April 1, 2026
//                 </p>
//               </div>

//               {/* Green banner */}
//               <div
//                 style={{
//                   background: "#22c97c",
//                   borderRadius: 14,
//                   padding: "10px 16px",
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   marginBottom: 12,
//                 }}
//               >
//                 <div>
//                   <p
//                     style={{
//                       fontSize: 11,
//                       fontWeight: 700,
//                       color: "#fff",
//                       margin: 0,
//                     }}
//                   >
//                     Business plan is active
//                   </p>
//                   <p
//                     style={{
//                       fontSize: 9.5,
//                       color: "rgba(255,255,255,0.82)",
//                       margin: "2px 0 0",
//                     }}
//                   >
//                     You can access the complete dashboard, including Clients and
//                     Reports, plus all 8 templates.
//                   </p>
//                 </div>
//                 <span
//                   style={{
//                     background: "rgba(255,255,255,0.2)",
//                     color: "#fff",
//                     borderRadius: 8,
//                     fontSize: 10,
//                     padding: "4px 10px",
//                     fontWeight: 600,
//                     flexShrink: 0,
//                   }}
//                 >
//                   Business
//                 </span>
//               </div>

//               {/* Stats */}
//               <div
//                 style={{
//                   display: "grid",
//                   gridTemplateColumns: "repeat(4,1fr)",
//                   gap: 8,
//                   marginBottom: 12,
//                 }}
//               >
//                 {stats.map((s) => (
//                   <div
//                     key={s.label}
//                     style={{
//                       background: "#fafafa",
//                       border: "1px solid #f0f0f0",
//                       borderRadius: 12,
//                       padding: "8px 10px",
//                     }}
//                   >
//                     <p style={{ fontSize: 9, color: "#aaa", margin: 0 }}>
//                       {s.label}
//                     </p>
//                     <p
//                       style={{
//                         fontSize: 18,
//                         fontWeight: 800,
//                         color: "#14132a",
//                         margin: "3px 0 1px",
//                       }}
//                     >
//                       {s.value}
//                     </p>
//                     <p style={{ fontSize: 8.5, color: "#bbb", margin: 0 }}>
//                       {s.sub}
//                     </p>
//                   </div>
//                 ))}
//               </div>

//               {/* Quick links */}
//               <div
//                 style={{
//                   display: "flex",
//                   gap: 12,
//                   flexWrap: "wrap",
//                   marginBottom: 10,
//                 }}
//               >
//                 {quickLinks.map((link) => (
//                   <div
//                     key={link}
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       gap: 3,
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: 46,
//                         height: 36,
//                         borderRadius: 10,
//                         background: "#f5f4ff",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         fontSize: 10,
//                         fontWeight: 700,
//                         color: "#6c5ce7",
//                       }}
//                     >
//                       {link}
//                     </div>
//                     <span style={{ fontSize: 8.5, color: "#aaa" }}>{link}</span>
//                   </div>
//                 ))}
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "center",
//                     gap: 3,
//                   }}
//                 >
//                   <div
//                     style={{
//                       padding: "0 10px",
//                       height: 36,
//                       borderRadius: 10,
//                       background: "#6c5ce7",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: "#fff",
//                     }}
//                   >
//                     New
//                   </div>
//                   <span style={{ fontSize: 8.5, color: "#aaa" }}>
//                     New Invoice
//                   </span>
//                 </div>
//               </div>

//               {/* Owner row */}
//               <div style={{ display: "flex", gap: 8 }}>
//                 <div
//                   style={{
//                     flex: 1,
//                     background: "#fafafa",
//                     border: "1px solid #f0f0f0",
//                     borderRadius: 10,
//                     padding: "8px 12px",
//                   }}
//                 >
//                   <p style={{ fontSize: 9, color: "#aaa", margin: 0 }}>Owner</p>
//                   <p
//                     style={{
//                       fontSize: 10.5,
//                       fontWeight: 600,
//                       color: "#14132a",
//                       margin: "2px 0 0",
//                     }}
//                   >
//                     Owner Panel
//                   </p>
//                 </div>
//                 <div
//                   style={{
//                     flex: 1,
//                     background: "#6c5ce7",
//                     borderRadius: 10,
//                     padding: "8px 12px",
//                     display: "flex",
//                     flexDirection: "column",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <p
//                     style={{
//                       fontSize: 10,
//                       fontWeight: 700,
//                       color: "#fff",
//                       margin: 0,
//                     }}
//                   >
//                     New
//                   </p>
//                   <p
//                     style={{
//                       fontSize: 9,
//                       color: "rgba(255,255,255,0.75)",
//                       margin: "2px 0 0",
//                     }}
//                   >
//                     New Invoice
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Caption */}
//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 0.6 }}
//           style={{
//             marginTop: 28,
//             fontSize: 15,
//             fontWeight: 600,
//             color: "#6c5ce7",
//             textAlign: "center",
//             maxWidth: 420,
//           }}
//         >
//           Live analytics, quick insights, and powerful control — all in one
//           place.
//         </motion.p>
//       </div>
//     </div>
//   );
// }

// const labelStyle = {
//   display: "block",
//   fontSize: 13,
//   fontWeight: 600,
//   color: "#333",
//   marginBottom: 7,
// };

// const inputStyle = {
//   width: "100%",
//   padding: "13px 16px",
//   fontSize: 14,
//   border: "1.5px solid #e8e8e8",
//   borderRadius: 10,
//   outline: "none",
//   color: "#333",
//   background: "#fff",
//   boxSizing: "border-box",
//   transition: "border-color 0.2s",
// };

// const showBtnStyle = {
//   position: "absolute",
//   right: 12,
//   top: "50%",
//   transform: "translateY(-50%)",
//   background: "#f5f4ff",
//   border: "none",
//   borderRadius: 8,
//   padding: "5px 12px",
//   fontSize: 12,
//   fontWeight: 600,
//   color: "#6c5ce7",
//   cursor: "pointer",
// };

// export default SignupPage;



import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL  || "http://localhost:5000";

const sidebarItems = [
  "Dashboard",
  "Clients",
  "Team",
  "Projects",
  "Invoices",
  "Services",
  "Access / Roles",
  "Settings",
  "Support Info",
];
const stats = [
  { label: "Monthly Revenue", value: "£0", sub: "Up 12% vs last month" },
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

function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(
    searchParams.get("tab") === "signin" ? "signin" : "create",
  );
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [accountType, setAccountType] = useState("Freelancer / Individual");

  // 👇 NEW: role state (User / Admin select karne ke liye)
  const [role, setRole] = useState("user");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  // ✅ Preview mein dynamic name dikhane ke liye
  const previewName = form.name.trim() || "Your Name";
  const previewInitials = previewName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // SIGNUP
    if (tab === "create") {
      if (form.password !== form.confirm) {
        alert("Passwords do not match");
        return;
      }

      try {
        const res = await fetch(`${API}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: form.name,
            email: form.email,
            password: form.password,
            role: role, // 👈 NEW: role bhi backend ko bhej rahe hain
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        alert("Account Created Successfully");

        setForm({
          name: "",
          email: "",
          password: "",
          confirm: "",
        });

        setTab("signin");
      } catch (error) {
        console.log(error);
        alert("Server Error");
      }
    }

    // SIGNIN
    if (tab === "signin") {
      try {
        const res = await fetch(`${API}/api/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          alert(data.message);
          return;
        }

        localStorage.setItem("token", data.token);

        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );

        alert("Login Successful");

        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        alert("Server Error");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* ── LEFT: Form Panel ── */}
      <div
        style={{
          width: 480,
          flexShrink: 0,
          background: "#fff",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 10,
          }}
        >
          <span style={{ color: "#6c5ce7", fontSize: 20 }}>◆</span>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#6c5ce7" }}>
            FindTemplates
          </span>
        </div>
        <p style={{ fontSize: 13.5, color: "#888", marginBottom: 36 }}>
          Build beautiful websites &amp; dashboards - sign in to continue.
        </p>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            borderBottom: "1.5px solid #eee",
            marginBottom: 28,
          }}
        >
          {["signin", "create"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: tab === t ? 700 : 400,
                color: tab === t ? "#6c5ce7" : "#999",
                borderBottom:
                  tab === t ? "2.5px solid #6c5ce7" : "2.5px solid transparent",
                marginBottom: -2,
                transition: "all 0.2s",
              }}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        {tab === "create" ? (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            {/* Account Type */}
            <div>
              <label style={labelStyle}>Account Type</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                style={inputStyle}
              >
                <option>Freelancer / Individual</option>
                <option>Agency / Team</option>
                <option>Enterprise</option>
              </select>
            </div>

            {/* 👇 NEW: Role dropdown (User / Admin) */}
            <div>
              <label style={labelStyle}>Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full Name</label>
              <input
                name="name"
                type="text"
                placeholder="Rahul Sharma"
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Min 8 characters"
                  value={form.password}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: 80 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={showBtnStyle}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              <p style={{ fontSize: 11.5, color: "#aaa", marginTop: 6 }}>
                Must contain: uppercase · lowercase · number · special character
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={form.confirm}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: 80 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={showBtnStyle}
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                marginTop: 4,
                width: "100%",
                padding: "15px",
                background: "#6c5ce7",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.background = "#5a4bd1")}
              onMouseLeave={(e) => (e.target.style.background = "#6c5ce7")}
            >
              Create Account
            </button>

            <p style={{ textAlign: "center", fontSize: 12.5, color: "#aaa" }}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("signin")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6c5ce7",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 12.5,
                }}
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <div>
              <label style={labelStyle}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
                required
              />
            </div>
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: 80 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={showBtnStyle}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <button
              type="submit"
              style={{
                marginTop: 4,
                width: "100%",
                padding: "15px",
                background: "#6c5ce7",
                color: "#fff",
                border: "none",
                borderRadius: 12,
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
            <p style={{ textAlign: "center", fontSize: 12.5, color: "#aaa" }}>
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setTab("create")}
                style={{
                  background: "none",
                  border: "none",
                  color: "#6c5ce7",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: 12.5,
                }}
              >
                Create Account
              </button>
            </p>
          </form>
        )}
      </div>

      {/* ── RIGHT: Dashboard Preview ── */}
      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg, #ddd8ff 0%, #e8e4ff 40%, #d8d0ff 100%)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 32px",
          overflow: "hidden",
        }}
      >
        {/* Background orbs */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            bottom: -80,
            left: -80,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.12)",
            top: 40,
            right: 40,
          }}
        />

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(80,60,200,0.18)",
            overflow: "hidden",
            width: "100%",
            maxWidth: 620,
          }}
        >
          {/* Top bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 20px",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 800, color: "#14132a" }}>
              FindTemplates
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                style={{
                  fontSize: 11,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  padding: "4px 12px",
                  background: "#fff",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                + Invoice
              </button>
              <button
                style={{
                  fontSize: 11,
                  border: "none",
                  borderRadius: 8,
                  padding: "4px 12px",
                  background: "#6c5ce7",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                + Add Client
              </button>
              {/* ✅ Dynamic initials aur naam */}
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: "#6c5ce7",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {previewInitials}
              </div>
              <span style={{ fontSize: 11, color: "#888" }}>{previewName}</span>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            {/* Sidebar */}
            <div
              style={{
                width: 130,
                flexShrink: 0,
                borderRight: "1px solid #f0f0f0",
                padding: "14px 10px",
                background: "#fafafa",
              }}
            >
              {sidebarItems.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 8px",
                    borderRadius: 8,
                    fontSize: 11,
                    marginBottom: 2,
                    fontWeight: item === "Dashboard" ? 600 : 400,
                    color: item === "Dashboard" ? "#6c5ce7" : "#777",
                    background:
                      item === "Dashboard" ? "#f0eeff" : "transparent",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: item === "Dashboard" ? "#6c5ce7" : "#ccc",
                      flexShrink: 0,
                    }}
                  />
                  {item}
                </div>
              ))}
              <div
                onClick={handleLogout}
                style={{
                  fontSize: "10.5px",
                  color: "#bbb",
                  padding: "10px 8px",
                  marginTop: 8,
                  cursor: "pointer",
                }}
              >
                Sign out
              </div>
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: "16px 18px" }}>
              <div style={{ marginBottom: 12 }}>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 800,
                    color: "#14132a",
                    margin: 0,
                  }}
                >
                  Dashboard
                </h3>
                <p style={{ fontSize: 10.5, color: "#bbb", margin: "2px 0 0" }}>
                  Good afternoon · Wednesday, April 1, 2026
                </p>
              </div>

              {/* Green banner */}
              <div
                style={{
                  background: "#22c97c",
                  borderRadius: 14,
                  padding: "10px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    Business plan is active
                  </p>
                  <p
                    style={{
                      fontSize: 9.5,
                      color: "rgba(255,255,255,0.82)",
                      margin: "2px 0 0",
                    }}
                  >
                    You can access the complete dashboard, including Clients and
                    Reports, plus all 8 templates.
                  </p>
                </div>
                <span
                  style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "#fff",
                    borderRadius: 8,
                    fontSize: 10,
                    padding: "4px 10px",
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  Business
                </span>
              </div>

              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4,1fr)",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                {stats.map((s) => (
                  <div
                    key={s.label}
                    style={{
                      background: "#fafafa",
                      border: "1px solid #f0f0f0",
                      borderRadius: 12,
                      padding: "8px 10px",
                    }}
                  >
                    <p style={{ fontSize: 9, color: "#aaa", margin: 0 }}>
                      {s.label}
                    </p>
                    <p
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: "#14132a",
                        margin: "3px 0 1px",
                      }}
                    >
                      {s.value}
                    </p>
                    <p style={{ fontSize: 8.5, color: "#bbb", margin: 0 }}>
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>

              {/* Quick links */}
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                {quickLinks.map((link) => (
                  <div
                    key={link}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <div
                      style={{
                        width: 46,
                        height: 36,
                        borderRadius: 10,
                        background: "#f5f4ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#6c5ce7",
                      }}
                    >
                      {link}
                    </div>
                    <span style={{ fontSize: 8.5, color: "#aaa" }}>{link}</span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  <div
                    style={{
                      padding: "0 10px",
                      height: 36,
                      borderRadius: 10,
                      background: "#6c5ce7",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    New
                  </div>
                  <span style={{ fontSize: 8.5, color: "#aaa" }}>
                    New Invoice
                  </span>
                </div>
              </div>

              {/* Owner row */}
              <div style={{ display: "flex", gap: 8 }}>
                <div
                  style={{
                    flex: 1,
                    background: "#fafafa",
                    border: "1px solid #f0f0f0",
                    borderRadius: 10,
                    padding: "8px 12px",
                  }}
                >
                  <p style={{ fontSize: 9, color: "#aaa", margin: 0 }}>Owner</p>
                  <p
                    style={{
                      fontSize: 10.5,
                      fontWeight: 600,
                      color: "#14132a",
                      margin: "2px 0 0",
                    }}
                  >
                    Owner Panel
                  </p>
                </div>
                <div
                  style={{
                    flex: 1,
                    background: "#6c5ce7",
                    borderRadius: 10,
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#fff",
                      margin: 0,
                    }}
                  >
                    New
                  </p>
                  <p
                    style={{
                      fontSize: 9,
                      color: "rgba(255,255,255,0.75)",
                      margin: "2px 0 0",
                    }}
                  >
                    New Invoice
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            marginTop: 28,
            fontSize: 15,
            fontWeight: 600,
            color: "#6c5ce7",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          Live analytics, quick insights, and powerful control — all in one
          place.
        </motion.p>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "#333",
  marginBottom: 7,
};

const inputStyle = {
  width: "100%",
  padding: "13px 16px",
  fontSize: 14,
  border: "1.5px solid #e8e8e8",
  borderRadius: 10,
  outline: "none",
  color: "#333",
  background: "#fff",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const showBtnStyle = {
  position: "absolute",
  right: 12,
  top: "50%",
  transform: "translateY(-50%)",
  background: "#f5f4ff",
  border: "none",
  borderRadius: 8,
  padding: "5px 12px",
  fontSize: 12,
  fontWeight: 600,
  color: "#6c5ce7",
  cursor: "pointer",
};

export default SignupPage;