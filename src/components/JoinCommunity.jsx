import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiArrowRight, HiCheckCircle } from "react-icons/hi";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID =
  import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY =
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";
const EMAIL_TO = "echoengineers.support@gmail.com";
const JOIN_SHEET_URL =
  import.meta.env.VITE_JOIN_SHEET_URL ||
  "https://script.google.com/macros/s/AKfycbzU1b_Wdg4CdXs_1j-2ws1hw8YVV-Pr2-pXvLQr7nz04JMV5wzsajdUTq6NhJCjQhJ5/exec";

async function postToSheet(url, payload) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Sheet request failed: ${res.status}`);
  }
  return res.json().catch(() => ({ success: true }));
}

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleInterest = (interest) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email) {
      setError("Please enter your name and email.");
      return;
    }

    const subject = "New Join Request - Echo Engineers";
    const body = `Name: ${form.name}\nEmail: ${form.email}\nCollege / Branch / Year: ${form.college}\nSkills: ${form.skills}\nInterests: ${form.interests.join(", ") || "None"}`;
    const templateParams = {
      to_email: EMAIL_TO,
      from_name: form.name,
      from_email: form.email,
      college: form.college,
      skills: form.skills,
      interests: form.interests.join(", "),
      message: body,
      subject,
    };

    setLoading(true);
    try {
      let sheetSaved = false;
      let emailSent = false;

      if (JOIN_SHEET_URL) {
        await postToSheet(JOIN_SHEET_URL, {
          type: "join",
          timestamp: new Date().toISOString(),
          name: form.name,
          email: form.email,
          college: form.college,
          skills: form.skills,
          interests: form.interests,
        });
        sheetSaved = true;
      }

      if (
        EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" &&
        EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID" &&
        EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY"
      ) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          templateParams,
          EMAILJS_PUBLIC_KEY,
        );
        emailSent = true;
      }

      if (!sheetSaved && !emailSent) {
        window.location.href = `mailto:${EMAIL_TO}?subject=${encodeURIComponent(
          subject,
        )}&body=${encodeURIComponent(body)}`;
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to send your request. Please try again or email us directly.",
      );
    } finally {
      setLoading(false);
    }
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

            {/*  & WhatsApp */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                whileHover={{ scale: 1.04 }}
                href=" https://linkedin.com/company/echo-engineer-s"
                className="flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #5865f2, #7289da)",
                }}
              >
                <FaLinkedin className="text-xl" /> Join LinkedIn
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.04 }}
                href="https://chat.whatsapp.com/LlwGAtyg1lL3dHhG551iS8"
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
                    disabled={loading}
                    className="btn-primary w-full justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? "Sending…" : "Join Community"} <HiArrowRight />
                  </button>
                  {error && (
                    <p className="text-sm text-red-600 mt-2">{error}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
