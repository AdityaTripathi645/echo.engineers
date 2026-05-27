import { motion } from "framer-motion";
import { RiCodeSSlashFill } from "react-icons/ri";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiHeart } from "react-icons/hi";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Projects", href: "#projects" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Join Us", href: "#join" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: FaLinkedin,
    href: " https://linkedin.com/company/echo-engineer-s",
    color: "#0077b5",
  },
  // { icon: FaGithub, href: "#", color: "#334155" },
  // { icon: FaInstagram, href: "#", color: "#e1306c" },
  // { icon: FaXTwitter, href: "#", color: "#1a1a1a" },
  // { icon: FaDiscord, href: "#", color: "#5865f2" },
];

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0c1a2e 0%, #1e1b4b 100%)",
      }}
    >
      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #0ea5e9, #8b5cf6, transparent)",
        }}
      />

      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-10 right-1/4 w-60 h-60 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
        <div
          className="absolute bottom-10 left-1/4 w-48 h-48 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-16 pb-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                style={{
                  background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                }}
              >
                <RiCodeSSlashFill className="text-white text-lg" />
              </div>
              <span
                className="font-bold text-xl text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                Echo Engineers
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Building Future Innovators Through Technology. A student-led tech
              community.
            </p>
            <div className="flex gap-2.5">
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.15, y: -3 }}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all"
                  style={{
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <s.icon className="text-sm" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-white font-bold mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-1.5">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-slate-400 text-sm hover:text-sky-400 transition-colors py-0.5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <h4
              className="text-white font-bold mb-4"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              Community
            </h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>📍 Noida</p>
              <p>📧 echoengineers.support@gmail.com</p>
              <p className="mt-4 text-xs text-slate-500">
                Open to all students — regardless of branch or year.
              </p>
            </div>
            <button
              onClick={() => scrollTo("#join")}
              className="mt-5 btn-primary text-sm px-5 py-2.5"
            >
              Join Community →
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Echo Engineers · All rights reserved.
          </p>
          <p className="text-slate-500 text-sm flex items-center gap-1.5">
            Made with <HiHeart className="text-rose-400" /> by Echo Engineers
          </p>
        </div>
      </div>
    </footer>
  );
}
