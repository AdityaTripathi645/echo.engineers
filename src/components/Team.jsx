import { motion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import { RiCodeSSlashFill } from "react-icons/ri";

const teamMembers = [
  {
    name: "Aditya Tripathi",
    role: "Founder & Community Lead",
    bio: "Visionary engineer and community builder passionate about AI and empowering student developers.",
    linkedin: "https://www.linkedin.com/in/adityatripathi007/",
    img: "https://media.licdn.com/dms/image/v2/D5603AQHtE-rEECgIjA/profile-displayphoto-crop_800_800/B56Z4LGhEeJ0AI-/0/1778302725025?e=1779926400&v=beta&t=IyuW_6H7y26P6rOkdzP93ktOto0KCWCyaVSPX-uo5vE",
    gradient: "from-sky-400 to-cyan-500",
  },
  {
    name: "Aman Chaudhary",
    role: "Core Team Member",
    bio: "Full-stack developer and hackathon enthusiast who loves building products that make a real difference in people's lives.",
    linkedin: "https://www.linkedin.com/in/aman-chaudhary-888237325/",
    img: "https://media.licdn.com/dms/image/v2/D4D03AQFrb-H89_hqmQ/profile-displayphoto-shrink_800_800/B4DZUfPFbYHAAc-/0/1739985803603?e=1779926400&v=beta&t=IJz6CP9em2_tnVrtLmfENO-RSdEIaLInY7w_jchILC4",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    name: "Aryan Gupta",
    role: "Core Team Member",
    bio: "Open source contributor and competitive programmer driving technical excellence and knowledge sharing within the community.",
    linkedin: "https://www.linkedin.com/in/aryan-gupta-7816942ba/",
    img: "https://media.licdn.com/dms/image/v2/D5635AQEVPcSH7f5fuw/profile-framedphoto-shrink_800_800/B56ZUfJdSVHQAg-/0/1739984328168?e=1779123600&v=beta&t=qjdz3zMDsB1BnfjSfwxTm3-jMGrce1l58m7CuvtNZ6k",
    gradient: "from-teal-400 to-cyan-500",
  },
];

const mentors = [
  {
    name: "Dr. Deena Nath Gupta",
    role: "Faculty Mentor",
    bio: "Experienced academic and researcher guiding Echo Engineers with deep expertise in computer science and engineering education.",
    linkedin: "https://www.linkedin.com/in/dr-deena-nath-gupta-175712178/",
    img: "https://media.licdn.com/dms/image/v2/D5603AQF843Ib9cc1fA/profile-displayphoto-crop_800_800/B56ZxL7l6.HEAI-/0/1770800452424?e=1779926400&v=beta&t=tELAVl_LpM2KpkHPWWmPPtQP1tWbnLrgJNbx3nj0kZo",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    name: "Mr. Durgesh Tiwari",
    role: "Technical Mentor",
    bio: "Industry professional and technology leader mentoring students on real-world development, career growth, and startup thinking.",
    linkedin: "https://www.linkedin.com/in/iamdurgesh/",
    img: "https://media.licdn.com/dms/image/v2/D5603AQGl04IxEQX9Iw/profile-displayphoto-crop_800_800/B56Z1CkjSYKsAI-/0/1774938373665?e=1779926400&v=beta&t=C6tVTj9lBWJH_dfbUNQDYt6vQsug17kwlu16_Vpjn5Y",
    gradient: "from-indigo-400 to-violet-500",
  },
];

function MemberCard({ member, index, isMentor = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className={`relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 text-center ${isMentor ? "glass" : ""}`}
    >
      {isMentor && (
        <div className="absolute top-4 right-4">
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-50 text-indigo-600">
            Mentor
          </span>
        </div>
      )}

      {/* Avatar */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: 2 }}
        className="w-20 h-20 rounded-2xl mx-auto mb-4 shadow-lg overflow-hidden"
      >
        <img
          src={member.img}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <h3 className="font-bold text-slate-800 text-lg mb-0.5">{member.name}</h3>
      <p
        className="text-sm font-semibold mb-3 bg-clip-text text-transparent"
        style={{ backgroundImage: "linear-gradient(135deg, #0ea5e9, #8b5cf6)" }}
      >
        {member.role}
      </p>
      <p className="text-slate-500 text-sm leading-relaxed mb-5">
        {member.bio}
      </p>

      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white transition-all hover:opacity-90 hover:scale-105"
        style={{ background: "linear-gradient(135deg, #0077b5, #0ea5e9)" }}
      >
        <FiLinkedin /> LinkedIn
      </a>
    </motion.div>
  );
}

export default function Team() {
  return (
    <>
      {/* Team */}
      <section id="team" className="section-padding mesh-bg">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-badge">✦ Core Team</span>
            <h2 className="text-4xl md:text-5xl text-slate-800">
              The Builders <span className="gradient-text">Behind It All</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Passionate students driving the Echo Engineers mission every
              single day.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((m, i) => (
              <MemberCard key={i} member={m} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="section-padding bg-gradient-to-br from-indigo-50/40 to-purple-50/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="section-badge">✦ Mentors</span>
            <h2 className="text-4xl md:text-5xl text-slate-800">
              Guided by the <span className="gradient-text">Best Minds</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Industry and academic mentors who shape our journey with wisdom
              and experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {mentors.map((m, i) => (
              <MemberCard key={i} member={m} index={i} isMentor />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
