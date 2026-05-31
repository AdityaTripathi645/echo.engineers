import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CertificatePortal from "./pages/CertificatePortal";
import CertificateVerify from "./pages/CertificateVerify";
import { ScrollProgress, BackToTop, Loader } from "./components/Utilities";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <BrowserRouter>
      <ScrollProgress />
      <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
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
                  </>
                }
              />
              <Route path="/certificates" element={<CertificatePortal />} />
              <Route
                path="/certificate/:credentialId"
                element={<CertificateVerify />}
              />
            </Routes>
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </BrowserRouter>
  );
}
