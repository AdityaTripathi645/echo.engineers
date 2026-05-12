import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import {
  RiHeartPulseLine, RiRobotLine, RiEyeLine, RiCalendarEventLine,
} from "react-icons/ri";

const projects = [
  {
    icon: RiHeartPulseLine,
    title: "Blood Donation Finder",
    desc: "A real-time platform connecting blood donors with recipients across Noida and NCR region using location-based matching.",
    stack: ["React", "Node.js", "MongoDB", "Maps API"],
    color: "from-rose-400 to-pink-500",
    bg: "from-rose-50 to-pink-50",
    github: "#",
    demo: "#",
  },
  {
    icon: RiRobotLine,
    title: "AI Legal Assistant",
    desc: "An LLM-powered chatbot that helps students and citizens understand legal documents, rights, and procedures in plain language.",
    stack: ["Next.js", "Claude API", "Python", "Pinecone"],
    color: "from-violet-400 to-purple-500",
    bg: "from-violet-50 to-purple-50",
    github: "#",
    demo: "#",
  },
  {
    icon: RiEyeLine,
    title: "Object Recognition Device",
    desc: "An IoT device with computer vision that identifies objects in real-time, designed to assist visually impaired users.",
    stack: ["Python", "OpenCV", "TensorFlow", "Raspberry Pi"],
    color: "from-teal-400 to-cyan-500",
    bg: "from-teal-50 to-cyan-50",
    github: "#",
    demo: "#",
  },
  {
    icon: RiCalendarEventLine,
    title: "Smart Event Platform",
    desc: "A college event management platform with smart scheduling, QR check-ins, live feedback, and automated certificate generation.",
    stack: ["React", "Firebase", "Node.js", "Tailwind"],
    color: "from-sky-400 to-blue-500",
    bg: "from-sky-50 to-blue-50",
    github: "#",
    demo: "#",
  },
];

const stackColors = {
  React: "bg-sky-100 text-sky-700",
  "Node.js": "bg-green-100 text-green-700",
  MongoDB: "bg-emerald-100 text-emerald-700",
  "Maps API": "bg-yellow-100 text-yellow-700",
  "Next.js": "bg-slate-100 text-slate-700",
  "Claude API": "bg-violet-100 text-violet-700",
  Python: "bg-blue-100 text-blue-700",
  Pinecone: "bg-teal-100 text-teal-700",
  OpenCV: "bg-orange-100 text-orange-700",
  TensorFlow: "bg-amber-100 text-amber-700",
  "Raspberry Pi": "bg-red-100 text-red-700",
  Firebase: "bg-yellow-100 text-yellow-700",
  Tailwind: "bg-cyan-100 text-cyan-700",
};

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-sky-50/40 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ Projects</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            Built by <span className="gradient-text">Our Engineers</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Real products solving real problems — built by students at Echo Engineers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
            >
              {/* Header */}
              <div className={`bg-gradient-to-br ${p.bg} p-6 flex items-center justify-center`}>
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl bg-gradient-to-br ${p.color} shadow-lg`}
                >
                  <p.icon />
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-slate-800 mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>

                {/* Stack badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className={`text-xs font-medium px-2 py-0.5 rounded-full ${stackColors[s] || "bg-slate-100 text-slate-600"}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <a
                    href={p.github}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href={p.demo}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0ea5e9, #06b6d4)" }}
                  >
                    <FiExternalLink /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
