// import Footer from "../sections/Footer";

// const sections = [
//   {
//     title: "1. Introduction",
//     content: `This Privacy Policy explains how FindTemplates DIGITAL LTD. trading as FindTemplates ("FindTemplates", "we", "our", or "us") collects, uses, stores, and protects personal information when you use our website and CRM services available at FindTemplates.com.

// By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.`,
//   },
//   {
//     title: "2. Information We Collect",
//     subsections: [
//       {
//         title: "2.1 Information You Provide",
//         items: [
//           "Name, email address, and company information",
//           "Account credentials and user preferences",
//           "Billing information (processed securely through Paddle)",
//           "Support communications and feedback",
//           "Customer or business data uploaded into the CRM platform",
//         ],
//       },
//       {
//         title: "2.2 Automatically Collected Data",
//         intro: "When you access our website or platform, certain information may be collected automatically through cookies, analytics tools, and server logs.",
//         items: [
//           "IP address and device information",
//           "Browser type and usage data",
//           "Approximate location (country or city level)",
//           "Cookies and tracking technologies",
//           "Application performance and diagnostic logs",
//         ],
//       },
//       {
//         title: "2.3 Third-Party Sources",
//         intro: "We may receive information about you from trusted third-party services that help us operate our business.",
//         items: [
//           "Paddle (payment processing and billing)",
//           "Analytics and hosting providers",
//           "Your organization or employer (if applicable)",
//           "Publicly available business directories",
//         ],
//       },
//     ],
//   },
//   {
//     title: "3. Legal Basis for Processing",
//     intro: "If you are located in the European Economic Area (EEA) or United Kingdom, we process personal data based on the following legal grounds:",
//     items: [
//       "Performance of a contract",
//       "Compliance with legal obligations",
//       "Legitimate business interests",
//       "Consent (where required by law)",
//     ],
//   },
//   {
//     title: "4. How We Use Your Information",
//     items: [
//       "Provide and operate CRM services",
//       "Manage subscriptions, billing, and payments",
//       "Send service-related notifications and updates",
//       "Provide customer support",
//       "Improve platform performance and analytics",
//       "Prevent fraud, abuse, or security threats",
//       "Send marketing communications (with consent)",
//     ],
//   },
//   {
//     title: "5. How We Share Your Information",
//     intro: "We do not sell personal data. However, we may share information with trusted service providers when necessary to operate our services.",
//     items: [
//       "Paddle (Merchant of Record for payment processing)",
//       "Cloud hosting and infrastructure providers",
//       "Analytics and monitoring services",
//       "Legal authorities when required by law",
//       "Professional advisers such as auditors or lawyers",
//     ],
//   },
//   {
//     title: "6. International Data Transfers",
//     content: "Your information may be transferred and processed in countries outside your jurisdiction. Where required, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or similar legal mechanisms to protect personal data.",
//   },
//   {
//     title: "7. Data Retention",
//     intro: "We retain personal data only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce agreements.",
//     items: [
//       "Account data retained during active subscription",
//       "Billing records retained for approximately 6–7 years",
//       "Support communications retained for 12–24 months",
//       "CRM data deleted after account termination unless legally required",
//     ],
//   },
//   {
//     title: "8. Cookies and Tracking",
//     content: "We use cookies and similar technologies to operate our website, remember user preferences, analyze traffic, and improve user experience. You may control cookie settings through your browser.",
//   },
//   {
//     title: "9. Security",
//     intro: "We implement industry-standard security measures to protect personal data, including:",
//     items: [
//       "TLS/SSL encryption for data transmission",
//       "Access controls and authentication safeguards",
//       "Security monitoring and intrusion detection",
//       "System logging and security auditing",
//     ],
//   },
//   {
//     title: "10. Your Rights",
//     intro: "Depending on your jurisdiction (including GDPR, UK GDPR, or CCPA), you may have the right to:",
//     items: [
//       "Access personal data we hold about you",
//       "Request correction of inaccurate information",
//       "Request deletion of personal data",
//       "Restrict or object to certain processing",
//       "Request data portability",
//     ],
//   },
//   {
//     title: "11. Children's Privacy",
//     content: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.",
//   },
//   {
//     title: "12. Third-Party Links",
//     content: "Our website may contain links to third-party services. Those services operate independently and have their own privacy policies.",
//   },
//   {
//     title: "13. Changes to This Policy",
//     content: `We may update this Privacy Policy periodically. Updates will be posted on this page with a revised "Last Updated" date.`,
//   },
//   {
//     title: "14. Contact Us",
//     content: null,
//     contact: true,
//   },
//   {
//     title: "15. Paddle Merchant of Record",
//     content: "Paddle acts as the Merchant of Record for certain transactions, handling payment processing, invoicing, and tax compliance.",
//     link: { label: "Visit Paddle's Privacy Policy", href: "https://www.paddle.com/legal/privacy" },
//   },
//   {
//     title: "16. Definitions",
//     content: "Terms such as Personal Data, Processing, Data Controller, Data Processor, GDPR, UK GDPR, and CCPA have the meanings defined under applicable data protection laws.",
//   },
// ];

// export default function PrivacyPolicy() {
//   return (
//     <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9f9fb", minHeight: "100vh" }}>

//       {/* Header */}
//       <div style={{ background: "#fff", borderBottom: "0.5px solid #e0e0e0", padding: "3rem 2rem 2.5rem", textAlign: "center" }}>
//         <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "#5346d4", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
//           Legal
//         </p>
//         <h1 style={{ fontSize: 36, fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>
//           Privacy Policy
//         </h1>
//         <p style={{ fontSize: 14, color: "#888" }}>Last Updated: January 2, 2026</p>
//       </div>

//       {/* Content */}
//       <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem" }}>
//         {sections.map((sec) => (
//           <div key={sec.title} style={{ marginBottom: "2.5rem" }}>
//             <h2 style={{ fontSize: 17, fontWeight: 600, color: "#111", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "0.5px solid #e0e0e0" }}>
//               {sec.title}
//             </h2>

//             {/* Contact section */}
//             {sec.contact && (
//               <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.25rem 1.5rem", fontSize: 14, color: "#444", lineHeight: 1.8 }}>
//                 <p style={{ marginBottom: 4 }}><strong style={{ color: "#111" }}>Email:</strong> <a href="mailto:admin@findtemplates.com" style={{ color: "#5346d4", textDecoration: "none" }}>admin@findtemplates.com</a></p>
//                 <p style={{ marginTop: "0.75rem", color: "#666" }}>
//                   FindTemplates DIGITAL LTD.<br />
//                   trading as FindTemplates<br />
//                   82A James Carter Road<br />
//                   Mildenhall<br />
//                   United Kingdom, IP28 7DA
//                 </p>
//               </div>
//             )}

//             {/* Intro text */}
//             {sec.intro && (
//               <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: "0.75rem" }}>{sec.intro}</p>
//             )}

//             {/* Plain content */}
//             {sec.content && (
//               <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{sec.content}</p>
//             )}

//             {/* Top-level items */}
//             {sec.items && (
//               <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
//                 {sec.items.map((item) => (
//                   <li key={item} style={{ fontSize: 14, color: "#555", lineHeight: 2 }}>{item}</li>
//                 ))}
//               </ul>
//             )}

//             {/* Subsections */}
//             {sec.subsections && sec.subsections.map((sub) => (
//               <div key={sub.title} style={{ marginBottom: "1.25rem" }}>
//                 <h3 style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: "0.4rem" }}>{sub.title}</h3>
//                 {sub.intro && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: "0.4rem" }}>{sub.intro}</p>}
//                 <ul style={{ paddingLeft: "1.25rem" }}>
//                   {sub.items.map((item) => (
//                     <li key={item} style={{ fontSize: 14, color: "#555", lineHeight: 2 }}>{item}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}

//             {/* External link */}
//             {sec.link && (
//               <a href={sec.link.href} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "0.5rem", fontSize: 14, color: "#5346d4", textDecoration: "none" }}>
//                 {sec.link.label} →
//               </a>
//             )}
//           </div>
//         ))}

//         {/* Back to home */}
//         <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "0.5px solid #e0e0e0" }}>
//           <a href="/" style={{ fontSize: 14, color: "#5346d4", textDecoration: "none", fontWeight: 500 }}>
//             ← Back to Home
//           </a>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }


import Footer from "../sections/Footer";

import { useState } from "react";

const CONTACT = "support@findtemplates.com";
const UPDATED = "June 18, 2026";

function PrivacyPolicyContent() {
  return (
    <div className="content">
      <p className="updated">Last updated: {UPDATED}</p>

      <p>This page explains what information FindTemplates collects, how we use it, and what rights you have over it.</p>

      <h2>What we collect</h2>
      <p>When you sign up or make a purchase, we collect your name, email address, and billing details. We also collect basic usage data — things like which pages you visit and what you download — to understand how people use the platform. Payment details are handled by our payment provider; we never store your card number.</p>

      <h2>Why we collect it</h2>
      <p>We use your information to run your account, process payments, send receipts, and occasionally let you know about updates or new templates (only if you've opted in). We don't sell your data to anyone.</p>

      <h2>Who we share it with</h2>
      <p>We share data only with the third-party services needed to run FindTemplates — things like payment processors and hosting providers. They are contractually required to keep your data secure and can't use it for their own purposes.</p>

      <h2>How long we keep it</h2>
      <p>We keep your account data for as long as your account is active. If you delete your account, we remove your data within 30 days. Some financial records may be kept longer if required by law.</p>

      <h2>Security</h2>
      <p>We use HTTPS encryption, access controls, and regular security reviews to protect your data. No system is completely foolproof, but we take reasonable steps to keep your information safe.</p>

      <h2>Cookies</h2>
      <p>We use cookies to keep you logged in and to understand basic usage patterns. You can turn cookies off in your browser, though some parts of the site may not work properly if you do.</p>

      <h2>Your rights</h2>
      <p>You can ask to see, correct, or delete the data we hold about you at any time. Email us at <a href={`mailto:${CONTACT}`}>{CONTACT}</a> and we'll respond within 30 days.</p>

      <h2>Changes</h2>
      <p>If we make significant changes to this policy, we'll let you know by email or by posting a notice on the site.</p>

      <h2>Questions</h2>
      <p>Reach us at <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
    </div>
  );
}

function TermsContent() {
  return (
    <div className="content">
      <p className="updated">Last updated: {UPDATED}</p>

      <p>By using FindTemplates, you agree to these terms. Please read them before using the platform.</p>

      <h2>What FindTemplates offers</h2>
      <p>We provide downloadable digital templates — documents, designs, spreadsheets, and presentations — for personal and professional use.</p>

      <h2>Your account</h2>
      <p>You're responsible for keeping your login credentials secure. Don't share your account with others. If you notice any unauthorised activity, contact us immediately.</p>

      <h2>Subscriptions & billing</h2>
      <p>Subscriptions renew automatically on a monthly or annual basis depending on what you chose at checkout. You can cancel anytime from your account settings — cancellation takes effect at the end of your current billing period. We'll give you at least 30 days notice before any price changes.</p>

      <h2>How you can use templates</h2>
      <p>When you download a template, you get a licence to use it for personal or internal business purposes. You can't resell templates, redistribute them, or use them to build a competing product. Ownership of the templates stays with FindTemplates.</p>

      <h2>What we don't allow</h2>
      <p>Don't use the platform for anything illegal or harmful. Don't try to break into parts of our system you're not supposed to access. Don't upload malware or anything malicious.</p>

      <h2>Liability</h2>
      <p>Templates are provided as-is. We're not responsible for indirect losses resulting from your use of the platform. If you have a legitimate claim against us, our liability is capped at what you paid us in the three months before the issue arose.</p>

      <h2>Termination</h2>
      <p>We can suspend or close accounts that violate these terms. If that happens, your licence to use downloaded templates ends immediately.</p>

      <h2>Governing law</h2>
      <p>These terms are governed by Indian law. Disputes fall under the jurisdiction of courts in Jaipur, Rajasthan.</p>

      <h2>Questions</h2>
      <p>Email us at <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
    </div>
  );
}

function RefundContent() {
  return (
    <div className="content">
      <p className="updated">Last updated: {UPDATED}</p>

      <p>Because our templates are digital downloads, we generally don't offer refunds once a file has been accessed. But there are exceptions.</p>

      <h2>When we will refund you</h2>
      <p><strong>Duplicate charge.</strong> If you were charged twice for the same thing, email us within 7 days with proof and we'll refund the extra amount immediately.</p>
      <p><strong>Template not accessible.</strong> If you can't download a template due to a problem on our end and we can't fix it within 48 hours, you're entitled to a full refund for that item.</p>
      <p><strong>New subscription, unused.</strong> If you subscribed but haven't downloaded or opened anything yet, you can request a full refund within 7 days of signing up.</p>
      <p><strong>Not as described.</strong> If a template is significantly different from what the listing showed, contact us within 14 days and we'll sort it out.</p>

      <h2>When we won't refund you</h2>
      <p>We don't issue refunds for change of mind after downloading, software incompatibility that wasn't listed in the template requirements, or missing a renewal date (we send a reminder email before every renewal).</p>

      <h2>How to request a refund</h2>
      <p>Email <a href={`mailto:${CONTACT}`}>{CONTACT}</a> with your order ID and a brief explanation. We'll get back to you within 3–5 business days. Approved refunds go back to your original payment method within 7–10 business days.</p>

      <h2>Questions</h2>
      <p>Email us at <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.</p>
    </div>
  );
}

const TABS = ["Privacy Policy", "Terms & Conditions", "Refund Policy"];

export default function PrivacyPolicy() {
  const [active, setActive] = useState(0);

  const renderContent = () => {
    if (active === 0) return <PrivacyPolicyContent />;
    if (active === 1) return <TermsContent />;
    return <RefundContent />;
  };

  return (
    <div className="page">
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .page {
          min-height: 100vh;
          background: #fafafa;
          font-family: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif;
          color: #111;
        }

        /* Header */
        .header {
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .header-inner {
          max-width: 720px;
          margin: 0 auto;
          padding: 28px 24px 0;
        }

        .page-title {
          font-size: 22px;
          font-weight: 600;
          color: #111;
          margin-bottom: 20px;
        }

        /* Tabs */
        .tabs {
          display: flex;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .tabs::-webkit-scrollbar { display: none; }

        .tab {
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          color: #888;
          cursor: pointer;
          white-space: nowrap;
          font-family: inherit;
          transition: color 0.15s, border-color 0.15s;
        }
        .tab:hover { color: #333; }
        .tab.active {
          color: #111;
          border-bottom-color: #111;
          font-weight: 600;
        }

        /* Main */
        .main {
          max-width: 720px;
          margin: 0 auto;
          padding: 48px 24px 100px;
        }

        /* Content */
        .content { }

        .updated {
          font-size: 13px;
          color: #aaa;
          margin-bottom: 28px;
        }

        .content > p {
          font-size: 15px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 16px;
        }

        .content h2 {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          margin-top: 36px;
          margin-bottom: 8px;
        }

        .content a {
          color: #111;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .content a:hover { color: #555; }

        @media (max-width: 600px) {
          .header-inner { padding: 20px 16px 0; }
          .page-title { font-size: 18px; }
          .main { padding: 32px 16px 80px; }
          .tab { padding: 8px 12px; font-size: 13px; }
        }
      `}</style>

      <header className="header">
        <div className="header-inner">
          <h1 className="page-title">{TABS[active]}</h1>
          <nav className="tabs">
            {TABS.map((t, i) => (
              <button
                key={t}
                className={`tab${active === i ? " active" : ""}`}
                onClick={() => setActive(i)}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="main">{renderContent()}</main>
       <Footer />
    </div>
  );
}

