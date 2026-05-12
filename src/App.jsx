import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WhatWeDo from "./components/WhatWeDo";
import Events from "./components/Events";
import Projects from "./components/Projects";
import Team from "./components/Team";
import Stats from "./components/Stats";
import Gallery from "./components/Gallery";
import Testimonials from "./components/Testimonials";
import JoinCommunity from "./components/JoinCommunity";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { ScrollProgress, BackToTop, Loader } from "./components/Utilities";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <ScrollProgress />
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>
      {!loading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Navbar />
          <main>
            <Hero />
            <About />
            <WhatWeDo />
            <Events />
            <Projects />
            <Stats />
            <Team />
            <Gallery />
            <Testimonials />
            <JoinCommunity />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </>
  );
}
