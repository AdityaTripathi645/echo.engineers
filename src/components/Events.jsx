import { motion } from "framer-motion";
import { HiCalendar, HiArrowRight } from "react-icons/hi";
import { RiBrainLine, RiMagicLine, RiCodeSSlashFill, RiGitMergeLine } from "react-icons/ri";

const events = [
  {
    icon: RiBrainLine,
    title: "AI Vibeathon 2026",
    date: "March 15–16, 2026",
    category: "Hackathon",
    desc: "A 24-hour AI hackathon where teams build real AI products using LLMs, computer vision, and generative tools. Open to all students.",
    color: "from-sky-400 to-cyan-400",
    bg: "from-sky-50 to-cyan-50",
    tag: "Upcoming",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    icon: RiMagicLine,
    title: "Prompt Engineering Bootcamp",
    date: "April 5, 2026",
    category: "Workshop",
    desc: "Master advanced prompting techniques for GPT-4, Claude, and Gemini. Build AI-powered apps with zero ML background.",
    color: "from-violet-400 to-purple-500",
    bg: "from-violet-50 to-purple-50",
    tag: "Upcoming",
    tagColor: "bg-green-100 text-green-700",
  },
  {
    icon: RiCodeSSlashFill,
    title: "Web Dev Sprint",
    date: "February 20, 2026",
    category: "Sprint",
    desc: "A fast-paced full-stack sprint — React, Node.js, MongoDB. Build and ship a production-ready project in one weekend.",
    color: "from-indigo-400 to-blue-500",
    bg: "from-indigo-50 to-blue-50",
    tag: "Completed",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    icon: RiGitMergeLine,
    title: "Open Source Hack Night",
    date: "January 30, 2026",
    category: "Hack Night",
    desc: "A late-night coding session dedicated to open source contributions. First PRs, bug fixes, and documentation — all welcome.",
    color: "from-teal-400 to-emerald-500",
    bg: "from-teal-50 to-emerald-50",
    tag: "Completed",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

export default function Events() {
  return (
    <section id="events" className="section-padding mesh-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ Events</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            Where the <span className="gradient-text">Action Happens</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Hackathons, workshops, bootcamps — events designed to challenge, teach, and inspire.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              {/* Top banner */}
              <div className={`bg-gradient-to-br ${ev.bg} p-6 flex items-center justify-center`}>
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-br ${ev.color} shadow-lg`}
                >
                  <ev.icon />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">
                    {ev.category}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${ev.tagColor}`}>
                    {ev.tag}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 mb-2 text-base">{ev.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                  <HiCalendar />
                  <span>{ev.date}</span>
                </div>

                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{ev.desc}</p>

                <button
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
                  style={{ background: `linear-gradient(135deg, #0ea5e9, #06b6d4)` }}
                >
                  {ev.tag === "Upcoming" ? "Register Now" : "View Details"}
                  <HiArrowRight className="text-sm" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
