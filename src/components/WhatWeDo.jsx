import { motion } from "framer-motion";
import {
  RiRocketLine, RiBrainLine, RiCodeSSlashFill, RiGitMergeLine,
  RiTrophyLine, RiMagicLine, RiLightbulbLine, RiGroupLine,
} from "react-icons/ri";

const activities = [
  { icon: RiTrophyLine, title: "Hackathons", desc: "Compete, build, and win at college and national-level hackathons with team support.", color: "from-amber-400 to-orange-400", bg: "bg-amber-50" },
  { icon: RiBrainLine, title: "AI Workshops", desc: "Deep dive into AI, ML, and generative models with hands-on sessions and real datasets.", color: "from-sky-400 to-cyan-400", bg: "bg-sky-50" },
  { icon: RiCodeSSlashFill, title: "Web Development", desc: "Full-stack sprints covering React, Node.js, databases, and deployment pipelines.", color: "from-purple-400 to-indigo-400", bg: "bg-purple-50" },
  { icon: RiGitMergeLine, title: "Open Source", desc: "Contribute to real-world OSS projects, build your GitHub profile, and join Hacktoberfest.", color: "from-teal-400 to-emerald-400", bg: "bg-teal-50" },
  { icon: RiRocketLine, title: "Competitive Programming", desc: "DSA sessions, Codeforces contests, LeetCode streaks, and placement prep tracks.", color: "from-rose-400 to-pink-400", bg: "bg-rose-50" },
  { icon: RiMagicLine, title: "Prompt Engineering", desc: "Master the art of prompting LLMs to build AI-powered products and tools.", color: "from-violet-400 to-purple-400", bg: "bg-violet-50" },
  { icon: RiLightbulbLine, title: "Startup Innovation", desc: "Ideate, validate, and pitch startup ideas in structured innovation bootcamps.", color: "from-yellow-400 to-amber-400", bg: "bg-yellow-50" },
  { icon: RiGroupLine, title: "Networking Sessions", desc: "Connect with seniors, alumni, and industry mentors who've been in your shoes.", color: "from-blue-400 to-sky-400", bg: "bg-blue-50" },
];

export default function WhatWeDo() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-sky-50/40">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ What We Do</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            Everything You Need to <span className="gradient-text">Level Up</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            From AI to open source — we cover the full spectrum of modern tech skills.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {activities.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${a.color} shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <a.icon className="text-xl" />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">{a.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
