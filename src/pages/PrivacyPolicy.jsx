import Footer from "../sections/Footer";

const sections = [
  {
    title: "1. Introduction",
    content: `This Privacy Policy explains how NEXLANCE DIGITAL LTD. trading as Nexlance ("Nexlance", "we", "our", or "us") collects, uses, stores, and protects personal information when you use our website and CRM services available at Nexlance.com.

By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy.`,
  },
  {
    title: "2. Information We Collect",
    subsections: [
      {
        title: "2.1 Information You Provide",
        items: [
          "Name, email address, and company information",
          "Account credentials and user preferences",
          "Billing information (processed securely through Paddle)",
          "Support communications and feedback",
          "Customer or business data uploaded into the CRM platform",
        ],
      },
      {
        title: "2.2 Automatically Collected Data",
        intro: "When you access our website or platform, certain information may be collected automatically through cookies, analytics tools, and server logs.",
        items: [
          "IP address and device information",
          "Browser type and usage data",
          "Approximate location (country or city level)",
          "Cookies and tracking technologies",
          "Application performance and diagnostic logs",
        ],
      },
      {
        title: "2.3 Third-Party Sources",
        intro: "We may receive information about you from trusted third-party services that help us operate our business.",
        items: [
          "Paddle (payment processing and billing)",
          "Analytics and hosting providers",
          "Your organization or employer (if applicable)",
          "Publicly available business directories",
        ],
      },
    ],
  },
  {
    title: "3. Legal Basis for Processing",
    intro: "If you are located in the European Economic Area (EEA) or United Kingdom, we process personal data based on the following legal grounds:",
    items: [
      "Performance of a contract",
      "Compliance with legal obligations",
      "Legitimate business interests",
      "Consent (where required by law)",
    ],
  },
  {
    title: "4. How We Use Your Information",
    items: [
      "Provide and operate CRM services",
      "Manage subscriptions, billing, and payments",
      "Send service-related notifications and updates",
      "Provide customer support",
      "Improve platform performance and analytics",
      "Prevent fraud, abuse, or security threats",
      "Send marketing communications (with consent)",
    ],
  },
  {
    title: "5. How We Share Your Information",
    intro: "We do not sell personal data. However, we may share information with trusted service providers when necessary to operate our services.",
    items: [
      "Paddle (Merchant of Record for payment processing)",
      "Cloud hosting and infrastructure providers",
      "Analytics and monitoring services",
      "Legal authorities when required by law",
      "Professional advisers such as auditors or lawyers",
    ],
  },
  {
    title: "6. International Data Transfers",
    content: "Your information may be transferred and processed in countries outside your jurisdiction. Where required, we rely on appropriate safeguards such as Standard Contractual Clauses (SCCs) or similar legal mechanisms to protect personal data.",
  },
  {
    title: "7. Data Retention",
    intro: "We retain personal data only as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce agreements.",
    items: [
      "Account data retained during active subscription",
      "Billing records retained for approximately 6–7 years",
      "Support communications retained for 12–24 months",
      "CRM data deleted after account termination unless legally required",
    ],
  },
  {
    title: "8. Cookies and Tracking",
    content: "We use cookies and similar technologies to operate our website, remember user preferences, analyze traffic, and improve user experience. You may control cookie settings through your browser.",
  },
  {
    title: "9. Security",
    intro: "We implement industry-standard security measures to protect personal data, including:",
    items: [
      "TLS/SSL encryption for data transmission",
      "Access controls and authentication safeguards",
      "Security monitoring and intrusion detection",
      "System logging and security auditing",
    ],
  },
  {
    title: "10. Your Rights",
    intro: "Depending on your jurisdiction (including GDPR, UK GDPR, or CCPA), you may have the right to:",
    items: [
      "Access personal data we hold about you",
      "Request correction of inaccurate information",
      "Request deletion of personal data",
      "Restrict or object to certain processing",
      "Request data portability",
    ],
  },
  {
    title: "11. Children's Privacy",
    content: "Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children.",
  },
  {
    title: "12. Third-Party Links",
    content: "Our website may contain links to third-party services. Those services operate independently and have their own privacy policies.",
  },
  {
    title: "13. Changes to This Policy",
    content: `We may update this Privacy Policy periodically. Updates will be posted on this page with a revised "Last Updated" date.`,
  },
  {
    title: "14. Contact Us",
    content: null,
    contact: true,
  },
  {
    title: "15. Paddle Merchant of Record",
    content: "Paddle acts as the Merchant of Record for certain transactions, handling payment processing, invoicing, and tax compliance.",
    link: { label: "Visit Paddle's Privacy Policy", href: "https://www.paddle.com/legal/privacy" },
  },
  {
    title: "16. Definitions",
    content: "Terms such as Personal Data, Processing, Data Controller, Data Processor, GDPR, UK GDPR, and CCPA have the meanings defined under applicable data protection laws.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "#f9f9fb", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{ background: "#fff", borderBottom: "0.5px solid #e0e0e0", padding: "3rem 2rem 2.5rem", textAlign: "center" }}>
        <p style={{ fontSize: 12, letterSpacing: "0.12em", color: "#5346d4", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
          Legal
        </p>
        <h1 style={{ fontSize: 36, fontWeight: 600, color: "#111", marginBottom: "0.5rem" }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "#888" }}>Last Updated: January 2, 2026</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem" }}>
        {sections.map((sec) => (
          <div key={sec.title} style={{ marginBottom: "2.5rem" }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "#111", marginBottom: "0.75rem", paddingBottom: "0.5rem", borderBottom: "0.5px solid #e0e0e0" }}>
              {sec.title}
            </h2>

            {/* Contact section */}
            {sec.contact && (
              <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 12, padding: "1.25rem 1.5rem", fontSize: 14, color: "#444", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 4 }}><strong style={{ color: "#111" }}>Email:</strong> <a href="mailto:vijaypratap@nexlancedigital.com" style={{ color: "#5346d4", textDecoration: "none" }}>vijaypratap@nexlancedigital.com</a></p>
                <p style={{ marginTop: "0.75rem", color: "#666" }}>
                  NEXLANCE DIGITAL LTD.<br />
                  trading as Nexlance<br />
                  82A James Carter Road<br />
                  Mildenhall<br />
                  United Kingdom, IP28 7DA
                </p>
              </div>
            )}

            {/* Intro text */}
            {sec.intro && (
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: "0.75rem" }}>{sec.intro}</p>
            )}

            {/* Plain content */}
            {sec.content && (
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>{sec.content}</p>
            )}

            {/* Top-level items */}
            {sec.items && (
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.5rem" }}>
                {sec.items.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: "#555", lineHeight: 2 }}>{item}</li>
                ))}
              </ul>
            )}

            {/* Subsections */}
            {sec.subsections && sec.subsections.map((sub) => (
              <div key={sub.title} style={{ marginBottom: "1.25rem" }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#333", marginBottom: "0.4rem" }}>{sub.title}</h3>
                {sub.intro && <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: "0.4rem" }}>{sub.intro}</p>}
                <ul style={{ paddingLeft: "1.25rem" }}>
                  {sub.items.map((item) => (
                    <li key={item} style={{ fontSize: 14, color: "#555", lineHeight: 2 }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {/* External link */}
            {sec.link && (
              <a href={sec.link.href} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: "0.5rem", fontSize: 14, color: "#5346d4", textDecoration: "none" }}>
                {sec.link.label} →
              </a>
            )}
          </div>
        ))}

        {/* Back to home */}
        <div style={{ marginTop: "3rem", paddingTop: "2rem", borderTop: "0.5px solid #e0e0e0" }}>
          <a href="/" style={{ fontSize: 14, color: "#5346d4", textDecoration: "none", fontWeight: 500 }}>
            ← Back to Home
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}