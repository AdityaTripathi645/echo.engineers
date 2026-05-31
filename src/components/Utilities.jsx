import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowUp } from "react-icons/hi";
import logoEcho from "../assets/logoecho.png";

export function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (bar) bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div id="scroll-progress" style={{ width: "0%" }} />;
}

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
          style={{ background: "linear-gradient(135deg, #0ea5e9, #8b5cf6)" }}
        >
          <HiArrowUp className="text-xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white pointer-events-none"
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6"
      >
        <motion.div
          initial={{ rotate: -180, x: 20, opacity: 0 }}
          animate={{ rotate: 0, x: -16, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-24 h-24 rounded-3xl overflow-hidden shadow-2xl"
        >
          <img
            src={logoEcho}
            alt="Echo Engineers Logo"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="flex flex-col justify-center h-24 gap-1">
          <motion.p
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            className="font-black text-2xl uppercase tracking-[0.3em] gradient-text"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Echo
          </motion.p>
          <motion.p
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="font-black text-2xl uppercase tracking-[0.3em] gradient-text"
            style={{ fontFamily: "Syne, sans-serif" }}
          >
            Engineers
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
}
