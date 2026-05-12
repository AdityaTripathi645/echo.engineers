import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HiUsers } from "react-icons/hi";
import {
  RiRocketLine,
  RiAwardLine,
  RiLiveLine,
  RiGroupLine,
} from "react-icons/ri";

const stats = [
  {
    icon: HiUsers,
    label: "Active Members",
    value: 10,
    suffix: "+",
    color: "from-sky-400 to-cyan-400",
  },
  {
    icon: RiRocketLine,
    label: "Projects Built",
    value: 5,
    suffix: "+",
    color: "from-violet-400 to-purple-400",
  },
  {
    icon: RiAwardLine,
    label: "Workshops Held",
    value: 2,
    suffix: "+",
    color: "from-teal-400 to-emerald-400",
  },
  {
    icon: RiLiveLine,
    label: "Hackathons",
    value: 2,
    suffix: "+",
    color: "from-rose-400 to-pink-400",
  },
  {
    icon: RiGroupLine,
    label: "Students Reached",
    value: 150,
    suffix: "+",
    color: "from-amber-400 to-orange-400",
  },
];

function Counter({ value, suffix, isVisible }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = Math.ceil(value / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-20 px-4 md:px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0c4a6e 0%, #1e1b4b 50%, #0c4a6e 100%)",
      }}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-72 h-72 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #06b6d4, transparent)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #8b5cf6, transparent)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "#7dd3fc",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            ✦ Community Stats
          </span>
          <h2 className="text-4xl md:text-5xl text-white">
            Growing{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#38bdf8,#06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Every Day
            </span>
          </h2>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto">
            Numbers that reflect our community's energy, dedication, and impact.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl p-6 text-center flex flex-col items-center gap-3"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl bg-gradient-to-br ${s.color} shadow-lg`}
              >
                <s.icon />
              </div>
              <p
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "Syne, sans-serif" }}
              >
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  isVisible={isInView}
                />
              </p>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
