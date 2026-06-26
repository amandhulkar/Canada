import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";

// import { FiLayout } from "react-icons/fi";

import { FiMenu, FiX, FiLayout } from "react-icons/fi";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  // { label: "Help Center", href: "/help-center" },
];

const templates = [
  {
    name: "Portfolio",
    category: "Creative",
    preview: (
      <img
        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"
        alt="Portfolio template"
        className="h-full w-full rounded-xl object-cover"
      />
    ),
  },
  {
    name: "Business",
    category: "Business",
    preview: (
      <img
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80"
        alt="Business template"
        className="h-full w-full rounded-xl object-cover"
      />
    ),
  },
  {
    name: "Blog",
    category: "Blog",
    preview: (
      <img
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&q=80"
        alt="Blog template"
        className="h-full w-full rounded-xl object-cover"
      />
    ),
  },
  {
    name: "Store",
    category: "E-commerce",
    preview: (
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
        alt="Store template"
        className="h-full w-full rounded-xl object-cover"
      />
    ),
  },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between gap-6">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 text-ink">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-[34px] w-[34px] items-center justify-center rounded-lg"
            style={{ background: "#7c6dfa" }}
          >
            <span style={{ fontSize: 15, fontWeight: 800 }}>
              <span style={{ color: "#fff" }}>F</span>
              <span style={{ color: "#a99eff" }}>T</span>
            </span>
          </motion.div>
          <div className="text-lg font-extrabold tracking-[-0.03em] text-ink">
            FindTemplates
          </div>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ink lg:flex">
          {/* Templates dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              className={`flex items-center gap-1.5 transition ${
                open ? "text-[#5b4bf5]" : "text-[#5b4bf5] hover:opacity-80"
              }`}
            >
              Templates
              <span
                className={`block h-2 w-2 border-b-2 border-r-2 border-current transition-transform ${
                  open
                    ? "-translate-y-0.5 rotate-[-135deg]"
                    : "-translate-y-0.5 rotate-45"
                }`}
              ></span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-1/2 top-12 w-[480px] -translate-x-1/2 rounded-2xl border border-line bg-white p-7 shadow-soft"
                >
                  <div className="grid grid-cols-3 gap-6">
                    {templates.map((t) => (
                      <Link
                        key={t.name}
                        to={`/templates?category=${encodeURIComponent(t.category || t.name)}`}
                        className="group block text-left"
                      >
                        <div className="mb-3 aspect-[1/0.78] w-full overflow-hidden rounded-xl border border-line transition-transform group-hover:-translate-y-1 group-hover:shadow-soft">
                          {t.preview}
                        </div>
                        <div className="text-sm font-semibold text-ink">
                          {t.name}
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 border-t border-line pt-4 text-center">
                    <Link
                      to="/templates"
                      className="text-sm font-semibold text-[#5b4bf5] transition hover:opacity-70"
                    >
                      View All Templates →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Other nav links */}
          {/* {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-[#5b4bf5]"
            >
              {link.label}
            </a>
          ))} */}

          {navLinks.map((link) =>
            link.label === "Help Center" ? (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (window.location.pathname === "/help-center") {
                    e.preventDefault();

                    console.log("SCROLLING");

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }
                }}
                className="transition hover:text-[#5b4bf5]"
              >
                {link.label}
              </a>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-[#5b4bf5]"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Right side */}

        <div className="hidden items-center gap-6 lg:flex">
          <button
            onClick={() => navigate("/signup?tab=signin")}
            className="text-sm font-medium text-muted transition hover:text-ink cursor-pointer"
          >
            Log In
          </button>

          <PrimaryButton onClick={() => navigate("/signup")}>
            Get Started
          </PrimaryButton>
        </div>

        {/* Mobile */}
        <button
          onClick={() => navigate("/signup")}
          className="inline-flex rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-ink shadow-soft lg:hidden"
        >
          Start
        </button>
      </Container>
    </header>
  );
}

export default Navbar;
