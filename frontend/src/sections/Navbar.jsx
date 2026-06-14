import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Container from "../components/Container";
import PrimaryButton from "../components/PrimaryButton";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Help Center", href: "/help-center" },
];

const templates = [
  {
    name: "Portfolio",
    preview: (
      <div className="grid h-full w-full grid-cols-2 gap-1 rounded-xl border border-line bg-neutral-50 p-2">
        <div className="row-span-2 rounded-md bg-ink"></div>
        <div className="rounded-md bg-neutral-200"></div>
        <div className="rounded-md bg-neutral-200"></div>
      </div>
    ),
  },
  {
    name: "Business",
    preview: (
      <div className="relative h-full w-full overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#4338ca,#0b0b1a_70%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_65%,rgba(91,75,245,0.55),transparent_60%)]"></div>
      </div>
    ),
  },
  {
    name: "Blog",
    preview: (
      <div className="h-full w-full rounded-xl bg-[linear-gradient(160deg,#cfd6da,#8a96a3_60%,#e8ecef)]"></div>
    ),
  },
  {
    name: "Store",
    preview: (
      <div className="relative flex h-full w-full items-end justify-center rounded-xl bg-[linear-gradient(180deg,#fdeceb,#fdeceb_55%,#cfe8d8_55%)] pb-2">
        <span className="absolute left-1/2 top-[14%] -translate-x-1/2 rounded bg-[#e8534e] px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-white">
          STORE
        </span>
        <div className="flex gap-1.5">
          <div className="h-8 w-3.5 rounded-md bg-neutral-800"></div>
          <div className="h-8 w-3.5 rounded-md bg-[#e8534e]"></div>
          <div className="h-8 w-3.5 rounded-md bg-[#f0c14b]"></div>
        </div>
      </div>
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
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex h-3.5 w-3.5 rotate-45 rounded-sm bg-[#5b4bf5]"
          ></motion.span>
          <div className="text-lg font-extrabold tracking-[-0.03em] text-ink">
            {/* 17219296 Canada Inc. */}
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
                        to="/templates"
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
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-[#5b4bf5]"
            >
              {link.label}
            </a>
          ))}
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
