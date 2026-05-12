import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "B.Tech CSE, 3rd Year",
    quote: "Echo Engineers changed how I approach problem-solving. The AI Vibeathon pushed me to build something I never thought possible in just 24 hours. The mentorship was incredible.",
    initials: "PS",
    gradient: "from-sky-400 to-cyan-400",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    role: "B.Tech IT, 2nd Year",
    quote: "Joining this community was the best decision of my college life. I landed my first internship through the network I built here. The Prompt Engineering bootcamp was a game-changer.",
    initials: "RV",
    gradient: "from-violet-400 to-purple-400",
    stars: 5,
  },
  {
    name: "Sneha Gupta",
    role: "B.Tech ECE, 3rd Year",
    quote: "As someone from a non-CS branch, I was nervous. But Echo Engineers welcomed me, taught me web dev from scratch, and now I have 3 projects on my resume. Truly inclusive!",
    initials: "SG",
    gradient: "from-teal-400 to-emerald-400",
    stars: 5,
  },
  {
    name: "Arjun Singh",
    role: "B.Tech CSE, 4th Year",
    quote: "The Open Source Hack Night got me my first merged PR into a real-world project. The community's energy is infectious — everyone is here to grow together, not compete.",
    initials: "AS",
    gradient: "from-rose-400 to-pink-400",
    stars: 5,
  },
  {
    name: "Kavya Mishra",
    role: "B.Tech AI&ML, 2nd Year",
    quote: "The workshops are practical, not just theory. I built an actual ML model during the AI workshop. The instructors are real students which makes it even more relatable.",
    initials: "KM",
    gradient: "from-amber-400 to-orange-400",
    stars: 5,
  },
  {
    name: "Dev Rastogi",
    role: "B.Tech CSE, 3rd Year",
    quote: "Echo Engineers isn't just a club — it's a launchpad. The startup innovation session gave me the framework to turn my idea into a pitch-ready product. Highly recommend.",
    initials: "DR",
    gradient: "from-indigo-400 to-blue-400",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding bg-gradient-to-b from-sky-50/30 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ Testimonials</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Real stories from students whose journeys were shaped by Echo Engineers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-100"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array(t.stars).fill(0).map((_, si) => (
                  <HiStar key={si} className="text-amber-400 text-sm" />
                ))}
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-5 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold bg-gradient-to-br ${t.gradient}`}
                  style={{ fontFamily: "Syne, sans-serif" }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-800">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
