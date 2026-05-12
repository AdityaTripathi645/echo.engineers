import { motion } from "framer-motion";

import logoecho from "../assets/logoecho.png";
const galleryItems = [
  {
    label: "AI Vibeathon 2026",
    theme: "hackathon",
    colors: ["#0ea5e9", "#06b6d4"],
  },
  {
    label: "Prompt Workshop",
    theme: "workshop",
    colors: ["#8b5cf6", "#6366f1"],
  },
  {
    label: "Team Collaboration",
    theme: "team",
    colors: ["#10b981", "#06b6d4"],
  },
  { label: "Web Dev Sprint", theme: "coding", colors: ["#0ea5e9", "#6366f1"] },
  {
    label: "Open Source Night",
    theme: "github",
    colors: ["#1e293b", "#475569"],
  },
  {
    label: "Networking Session",
    theme: "networking",
    colors: ["#f59e0b", "#ef4444"],
  },
  { label: "Award Ceremony", theme: "award", colors: ["#f59e0b", "#fbbf24"] },
  {
    label: "Brainstorm Session",
    theme: "idea",
    colors: ["#06b6d4", "#8b5cf6"],
  },
  { label: "Coding Marathon", theme: "code", colors: ["#10b981", "#0ea5e9"] },
];

function PlaceholderImage({ item, index }) {
  const [c1, c2] = item.colors;
  const isLarge = index === 0 || index === 4;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ${isLarge ? "row-span-2" : ""}`}
      style={{ minHeight: isLarge ? "280px" : "130px" }}
    >
      {/* SVG Illustration */}
      <div
        className="w-full h-full min-h-[130px] flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${c1}22, ${c2}22)`,
          border: `1px solid ${c1}30`,
        }}
      >
        <svg
          viewBox="0 0 300 200"
          className="w-full h-full absolute inset-0"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Background shapes */}
          <circle cx="250" cy="30" r="80" fill={c1} opacity="0.08" />
          <circle cx="50" cy="170" r="60" fill={c2} opacity="0.08" />
          <rect
            x="100"
            y="60"
            width="100"
            height="80"
            rx="16"
            fill={c1}
            opacity="0.06"
          />

          {/* Theme specific icons */}
          {item.theme === "hackathon" && (
            <>
              <text
                x="110"
                y="115"
                fontSize="40"
                fill={c1}
                opacity="0.5"
                fontFamily="monospace"
              >
                ⚡
              </text>
              <circle cx="60" cy="60" r="8" fill={c2} opacity="0.4" />
              <circle cx="240" cy="140" r="6" fill={c1} opacity="0.4" />
            </>
          )}
          {item.theme === "workshop" && (
            <text
              x="108"
              y="118"
              fontSize="40"
              fill={c1}
              opacity="0.5"
              fontFamily="monospace"
            >
              🎓
            </text>
          )}
          {item.theme === "team" && (
            <>
              {[80, 150, 220].map((x, i) => (
                <g key={i} transform={`translate(${x}, 80)`}>
                  <circle
                    cx="0"
                    cy="-10"
                    r="12"
                    fill={i === 1 ? c1 : c2}
                    opacity="0.5"
                  />
                  <rect
                    x="-14"
                    y="6"
                    width="28"
                    height="22"
                    rx="8"
                    fill={i === 1 ? c1 : c2}
                    opacity="0.35"
                  />
                </g>
              ))}
            </>
          )}
          {item.theme === "coding" && (
            <image
              href={logoecho}
              x="80"
              y="118"
              width="32"
              height="32"
              opacity="0.5"
            />
          )}
          {item.theme === "github" && (
            <text
              x="110"
              y="118"
              fontSize="38"
              fill={c1}
              opacity="0.4"
              fontFamily="monospace"
            >
              ⑂
            </text>
          )}
          {item.theme === "networking" && (
            <>
              {[
                [70, 80],
                [150, 120],
                [230, 70],
                [120, 160],
                [190, 150],
              ].map(([cx, cy], i) => (
                <circle
                  key={i}
                  cx={cx}
                  cy={cy}
                  r="10"
                  fill={i % 2 === 0 ? c1 : c2}
                  opacity="0.4"
                />
              ))}
              <line
                x1="70"
                y1="80"
                x2="150"
                y2="120"
                stroke={c1}
                strokeWidth="1.5"
                opacity="0.25"
              />
              <line
                x1="150"
                y1="120"
                x2="230"
                y2="70"
                stroke={c2}
                strokeWidth="1.5"
                opacity="0.25"
              />
              <line
                x1="150"
                y1="120"
                x2="120"
                y2="160"
                stroke={c1}
                strokeWidth="1.5"
                opacity="0.25"
              />
            </>
          )}
          {item.theme === "award" && (
            <text x="115" y="118" fontSize="40" fill={c1} opacity="0.5">
              🏆
            </text>
          )}
          {item.theme === "idea" && (
            <text x="112" y="118" fontSize="40" fill={c1} opacity="0.5">
              💡
            </text>
          )}
          {item.theme === "code" && (
            <>
              <rect
                x="70"
                y="70"
                width="160"
                height="12"
                rx="6"
                fill={c1}
                opacity="0.2"
              />
              <rect
                x="70"
                y="90"
                width="120"
                height="12"
                rx="6"
                fill={c2}
                opacity="0.2"
              />
              <rect
                x="70"
                y="110"
                width="140"
                height="12"
                rx="6"
                fill={c1}
                opacity="0.2"
              />
              <rect
                x="70"
                y="130"
                width="90"
                height="12"
                rx="6"
                fill={c2}
                opacity="0.15"
              />
            </>
          )}
        </svg>

        {/* Label overlay */}
        <div className="absolute inset-0 flex items-end p-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="w-full glass rounded-xl px-3 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <p className="text-xs font-semibold text-slate-700">{item.label}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="section-badge">✦ Gallery</span>
          <h2 className="text-4xl md:text-5xl text-slate-800">
            Moments That <span className="gradient-text">Define Us</span>
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            Snapshots from hackathons, workshops, and community sessions.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[140px]">
          {galleryItems.map((item, i) => (
            <PlaceholderImage key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
