import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { RiCodeSSlashFill } from "react-icons/ri";
import logoecho from "../assets/logoecho.png";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Join Us", href: "#join" },
  { label: "Contact", href: "#contact" },
  { label: "Certificates", href: "/certificates" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "py-3 glass shadow-lg shadow-sky-100/50"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group"
          >
            <img
              src={logoecho}
              alt="Echo Engineers Logo"
              className="w-9 h-9 rounded-xl shadow-md"
            />
            <span
              className="font-bold text-xl"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="gradient-text">Echo</span>
              <span className="text-slate-700"> Engineers</span>
            </span>
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => handleNavClick(l.href)}
                className="px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-sky-600 rounded-lg hover:bg-sky-50 transition-all duration-200"
                style={{ fontFamily: "DM Sans, sans-serif" }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleNavClick("#join")}
              className="btn-primary text-sm px-5 py-2.5"
            >
              Join Community
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-sky-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <HiX className="text-xl" />
            ) : (
              <HiMenuAlt3 className="text-xl" />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 bottom-0 z-40 glass flex flex-col pt-24 pb-8 px-6"
          >
            <div className="flex flex-col gap-1">
              {links.map((l, i) => (
                <motion.button
                  key={l.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(l.href)}
                  className="text-left px-4 py-3 text-lg font-medium text-slate-700 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-all"
                >
                  {l.label}
                </motion.button>
              ))}
            </div>
            <div className="mt-6">
              <button
                onClick={() => handleNavClick("#join")}
                className="btn-primary w-full justify-center"
              >
                Join Community
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
