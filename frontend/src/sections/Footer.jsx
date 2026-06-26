import { Link } from "react-router-dom";
import Container from "../components/Container";
import { footerLinks, navLinks, footerNavLinks } from "../assets/siteData";

import { FiMenu, FiX, FiLayout } from "react-icons/fi";

function Footer() {
  return (
    <footer
      className="border-t border-[#1e2a3a] py-14"
      style={{ background: "#0f1c2e" }}
    >
      <Container className="space-y-10">
       <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_1fr] lg:items-start">
  <div className="max-w-sm">
    <div className="flex items-center gap-2.5">
      <div
        className="flex h-[34px] w-[34px] items-center justify-center rounded-lg"
        style={{ background: "#7c6dfa" }}
      >
        <span style={{ fontSize: 15, fontWeight: 800 }}>
          <span style={{ color: "#fff" }}>F</span>
          <span style={{ color: "#a99eff" }}>T</span>
        </span>
      </div>
      <div className="text-2xl font-semibold tracking-[-0.04em] text-white">
        FindTemplates
      </div>
    </div>
            <p className="mt-4 text-sm leading-7" style={{ color: "#8aa0b8" }}>
              A modern operating layer for fast-moving growth teams building
              better pages, campaigns, and customer journeys.
            </p>
            <div
              className="mt-5 space-y-1 text-sm"
              style={{ color: "#8aa0b8" }}
            >
              <p>© 2025 17219296 Canada Inc. All rights reserved.</p>
              <p>195 Huntingford Trail,</p>
              <p>Woodstock, ON N4T 0M4,</p>
              <p>Canada</p>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Product
            </div>
            <div
              className="mt-4 flex flex-col gap-3 text-sm"
              style={{ color: "#8aa0b8" }}
            >
              {/* {navLinks.slice(0, 3).map((link) => */}
              {/* {navLinks.map((link) =>
                link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ),
              )} */}

              {footerNavLinks.map((link) =>
                link.href.startsWith("/") && !link.href.startsWith("/#") ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="transition hover:text-white"
                  >
                    {link.label}
                  </a>
                ),
              )}
            </div>
          </div>


          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
              Legal
            </div>
            <div
              className="mt-4 flex flex-col gap-3 text-sm"
              style={{ color: "#8aa0b8" }}
            >
              <a href="/privacy-policy?tab=0" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="/privacy-policy?tab=1" className="transition hover:text-white">
                Terms &amp; Conditions
              </a>
              <a href="/privacy-policy?tab=2" className="transition hover:text-white">
                Refund Policy
              </a>

              <p
                className="pt-3 text-sm leading-7"
                style={{ color: "#8aa0b8" }}
              >
                Incorporated under the Canada Business Corporations Act (CBCA),
                Ontario, Canada.
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-4 border-t pt-6 text-sm md:flex-row md:items-center md:justify-between"
          style={{ borderColor: "#1e2a3a", color: "#8aa0b8" }}
        >
          {/* <p>Corporation Number: 1721929-6</p> */}
          <p></p>
          <a href="#home" className="transition hover:text-white">
            Back to top ↑
          </a>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
