import { useState } from "react";
import { motion } from "framer-motion";
import { FaDiscord, FaWhatsapp } from "react-icons/fa";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";

const interests = [
  "AI & ML",
  "Web Dev",
  "Open Source",
  "Hackathons",
  "Competitive Programming",
  "Prompt Engineering",
  "Startup",
  "Networking",
];

export default function JoinCommunity() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    college: "",
    skills: "",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email) setSubmitted(true);
  };

  return (
    <section id="join" className="section-padding mesh-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-badge">✦ Join Us</span>
            <h2 className="text-4xl md:text-5xl text-slate-800 mb-6">
              Be Part of the <span className="gradient-text">Movement</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Echo Engineers is open to all students at Noida — regardless of
              branch or year. If you're curious, passionate, and ready to build
              — this is your community.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "Access to all workshops & events",
                "Real project experience",
                "Mentorship from seniors & faculty",
                "Hackathon teams & preparation",
                "Career & internship guidance",
              ].map((perk, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-3"
                >
                  <HiCheckCircle className="text-cyan-500 text-xl flex-shrink-0" />
                  <span className="text-slate-600">{perk}</span>
                </motion.div>
              ))}
            </div>

            {/* Discord & WhatsApp */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.04 }}
                href="#"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #5865f2, #7289da)",
                }}
              >
                <FaDiscord className="text-xl" /> Join Discord
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                href="#"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #25d366, #128c7e)",
                }}
              >
                <FaWhatsapp className="text-xl" /> Join WhatsApp
              </motion.a>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="glass rounded-3xl p-8 shadow-xl">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-4"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                    }}
                  >
                    🎉
                  </div>
                  <h3
                    className="text-2xl font-bold text-slate-800 mb-2"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Welcome Aboard!
                  </h3>
                  <p className="text-slate-500">
                    You've joined Echo Engineers. We'll reach out soon with next
                    steps!
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3
                    className="text-xl font-bold text-slate-800"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Join Echo Engineers
                  </h3>

                  {[
                    {
                      field: "name",
                      label: "Full Name",
                      placeholder: "Your name",
                      type: "text",
                    },
                    {
                      field: "email",
                      label: "Email Address",
                      placeholder: "your@email.com",
                      type: "email",
                    },
                    {
                      field: "college",
                      label: "College / Branch / Year",
                      placeholder: "e.g. IIT Delhi, CSE, 2nd Year",
                      type: "text",
                    },
                    {
                      field: "skills",
                      label: "Your Skills",
                      placeholder: "e.g. Python, React, Design...",
                      type: "text",
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/70 text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition text-sm"
                      />
                    </div>
                  ))}

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-600 mb-2">
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interests.map((int) => (
                        <button
                          key={int}
                          type="button"
                          onClick={() => toggleInterest(int)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            form.interests.includes(int)
                              ? "text-white shadow-md"
                              : "bg-slate-100 text-slate-600 hover:bg-sky-50 hover:text-sky-600"
                          }`}
                          style={
                            form.interests.includes(int)
                              ? {
                                  background:
                                    "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                                }
                              : {}
                          }
                        >
                          {int}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary w-full justify-center"
                  >
                    Join Community <HiArrowRight />
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
