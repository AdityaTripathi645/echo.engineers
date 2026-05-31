import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import teamImg from "../assets/teamimg.jpeg";
import {
  RiLightbulbLine,
  RiTeamLine,
  RiBookOpenLine,
  RiLeafLine,
} from "react-icons/ri";
import heroImg from "../assets/hero.png";

const cards = [
  {
    icon: RiLightbulbLine,
    title: "Innovation",
    desc: "Pushing boundaries with creative solutions and cutting-edge ideas that shape tomorrow.",
    color: "from-sky-400 to-cyan-400",
  },
  {
    icon: RiBookOpenLine,
    title: "Learning",
    desc: "Continuous skill development through workshops, bootcamps, and hands-on projects.",
    color: "from-purple-400 to-indigo-400",
  },
  {
    icon: RiTeamLine,
    title: "Collaboration",
    desc: "Building together — diverse minds creating extraordinary results through teamwork.",
    color: "from-cyan-400 to-teal-400",
  },
  {
    icon: RiLeafLine,
    title: "Leadership",
    desc: "Growing the next generation of tech leaders who inspire and drive change.",
    color: "from-blue-400 to-sky-500",
  },
];

function Card({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className="glass rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 bg-gradient-to-br ${card.color}`}
      >
        <card.icon className="text-xl" />
      </div>
      <h3 className="font-bold text-lg text-slate-800 mb-2">{card.title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{card.desc}</p>
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-padding mesh-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="section-badge">✦ About Us</span>
            <h2 className="text-4xl md:text-5xl mb-6 text-slate-800">
              Who Are <span className="gradient-text">Echo Engineers?</span>
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">
              Echo Engineers is a student-driven technical community — a space
              where passionate developers, designers, and innovators converge to
              build, learn, and lead.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              We believe that the best engineers aren't just coders — they're
              problem-solvers, collaborators, and dreamers. Our community
              bridges the gap between academics and industry, giving students
              real-world exposure through hackathons, workshops, and live
              projects.
            </p>

            <div className="flex flex-wrap gap-3">
              {["Est. 2026", "Open to All Years"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-sky-700 bg-sky-50 border border-sky-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <div>
            {/* Illustration / image placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative mb-10"
            >
              <div
                className="rounded-3xl overflow-hidden h-56 flex items-center justify-center shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #e0f2fe, #f0e7ff)",
                }}
              >
                {/* SVG Illustration */}
                <img
                  src={teamImg}
                  alt="Echo Engineers Team"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating tag */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-2 shadow-lg"
              >
                <p className="text-xs text-slate-500">Student Community</p>
                {/* <p className="font-bold text-sm gradient-text">SOET, MUIT Noida</p> */}
              </motion.div>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4">
              {cards.map((card, i) => (
                <Card key={i} card={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
