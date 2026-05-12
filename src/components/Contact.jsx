import { useState } from "react";
import { motion } from "framer-motion";
import { HiMail, HiLocationMarker, HiArrowRight } from "react-icons/hi";
import { FaLinkedin, FaGithub, FaInstagram, FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const socials = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn", color: "#0077b5" },
  { icon: FaGithub, href: "#", label: "GitHub", color: "#1e293b" },
  { icon: FaInstagram, href: "#", label: "Instagram", color: "#e1306c" },
  { icon: FaXTwitter, href: "#", label: "X / Twitter", color: "#1a1a1a" },
  { icon: FaDiscord, href: "#", label: "Discord", color: "#5865f2" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) setSent(true);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-white to-sky-50/30"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ Contact</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Questions, collaborations, or just want to say hello — we'd love to
            hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {[
              {
                icon: HiMail,
                label: "Email Us",
                value: "echoengineers.support@gmail.com",
                color: "from-sky-400 to-cyan-400",
              },
              // {
              //   icon: HiLocationMarker,
              //   label: "Location",
              //   value: "School of Engineering & Technology\nMahamaya University of Information Technology\nNoida, Uttar Pradesh, India",
              //   color: "from-violet-400 to-purple-400",
              // },
            ].map((info, i) => (
              <div key={i} className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-white flex-shrink-0 bg-gradient-to-br ${info.color}`}
                >
                  <info.icon className="text-xl" />
                </div>
                <div>
                  <p className="font-bold text-slate-700 mb-0.5">
                    {info.label}
                  </p>
                  <p className="text-slate-500 text-sm whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
              </div>
            ))}

            {/* Socials */}
            <div>
              <p className="font-bold text-slate-700 mb-3">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.href}
                    whileHover={{ scale: 1.15, y: -3 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md transition-all"
                    style={{ background: s.color }}
                    title={s.label}
                  >
                    <s.icon className="text-lg" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-3xl p-8 shadow-xl">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div className="text-5xl mb-4">✉️</div>
                  <h3
                    className="text-xl font-bold text-slate-800 mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Message Sent!
                  </h3>
                  <p className="text-slate-500 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {[
                    {
                      field: "name",
                      label: "Your Name",
                      placeholder: "Full name",
                      type: "text",
                    },
                    {
                      field: "email",
                      label: "Email",
                      placeholder: "your@email.com",
                      type: "email",
                    },
                  ].map(({ field, label, placeholder, type }) => (
                    <div key={field}>
                      <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                        {label}
                      </label>
                      <input
                        type={type}
                        placeholder={placeholder}
                        value={form[field]}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm transition"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-1.5">
                      Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="What's on your mind?"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 text-sm transition resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    Send Message <HiArrowRight />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
