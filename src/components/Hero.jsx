import { motion } from "framer-motion";
import { HiArrowRight, HiUsers } from "react-icons/hi";
import { RiRocketLine, RiCodeSSlashFill, RiBrainLine } from "react-icons/ri";
import { MdEvent } from "react-icons/md";

const stats = [
  { icon: HiUsers, label: "Active Members", value: "100+" },
  { icon: RiRocketLine, label: "Projects Built", value: "20+" },
  { icon: MdEvent, label: "Events Held", value: "10+" },
];

const floatingChips = [
  { text: "AI & ML", color: "from-sky-400 to-cyan-400", delay: 0 },
  { text: "Web Dev", color: "from-purple-400 to-indigo-400", delay: 0.3 },
  { text: "Open Source", color: "from-cyan-400 to-teal-400", delay: 0.6 },
  { text: "Hackathons", color: "from-blue-400 to-sky-400", delay: 0.9 },
];

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg grid-texture"
    >
      {/* Floating blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #06b6d4, #8b5cf6)" }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], rotate: [0, -8, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-32 w-[450px] h-[450px] rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #0ea5e9, #06b6d4)" }}
        />
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #8b5cf6, #6366f1)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 pt-28 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="section-badge"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
              Noida • Est. 2026
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl xl:text-7xl leading-tight mb-6"
              style={{ fontFamily: "Syne, sans-serif" }}
            >
              <span className="text-slate-800">Echo</span>
              <br />
              <span className="gradient-text">Engineers</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-500 mb-8 max-w-lg leading-relaxed"
            >
              Building Future Innovators Through Technology — a student-led tech
              community where ideas turn into impact.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <button
                className="btn-primary"
                onClick={() => scrollTo("#events")}
              >
                Explore Events <HiArrowRight />
              </button>
              <button className="btn-outline" onClick={() => scrollTo("#join")}>
                Join Now
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                    style={{
                      background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                    }}
                  >
                    <s.icon className="text-lg" />
                  </div>
                  <div>
                    <p
                      className="font-bold text-xl text-slate-800"
                      style={{ fontFamily: "Syne, sans-serif" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-slate-500">{s.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {/* Central card */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <div
                className="w-72 h-72 md:w-80 md:h-80 rounded-3xl glass shadow-2xl flex flex-col items-center justify-center gap-4 p-8"
                style={{
                  boxShadow:
                    "0 20px 60px rgba(14,165,233,0.15), 0 0 0 1px rgba(255,255,255,0.8)",
                }}
              >
                {/* Logo large */}
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)",
                  }}
                >
                  <RiCodeSSlashFill className="text-white text-4xl" />
                </div>
                <div className="text-center">
                  <p
                    className="font-bold text-2xl text-slate-800"
                    style={{ fontFamily: "Syne, sans-serif" }}
                  >
                    Echo Engineers
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Tech Community @NOIDA
                  </p>
                </div>
                <div className="flex gap-2 flex-wrap justify-center">
                  {["AI", "Web", "Hack"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{
                        background: "linear-gradient(135deg, #0ea5e9, #06b6d4)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating chips */}
            {floatingChips.map((chip, i) => {
              const positions = [
                "top-4 -left-8",
                "top-4 -right-8",
                "bottom-12 -left-12",
                "bottom-4 -right-10",
              ];
              return (
                <motion.div
                  key={i}
                  animate={{ y: [-6, 6, -6] }}
                  transition={{
                    duration: 5 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: chip.delay,
                  }}
                  className={`absolute ${positions[i]} glass rounded-xl px-4 py-2 shadow-md`}
                >
                  <span
                    className={`text-sm font-semibold bg-gradient-to-r ${chip.color} bg-clip-text text-transparent`}
                  >
                    {chip.text}
                  </span>
                </motion.div>
              );
            })}

            {/* Orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-96 h-96 rounded-full border border-dashed border-sky-200/50"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] rounded-full border border-dashed border-purple-100/50"
            />

            {/* Brain icon floating */}
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [-5, 5, -5] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
              }}
            >
              <RiBrainLine className="text-xl" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
