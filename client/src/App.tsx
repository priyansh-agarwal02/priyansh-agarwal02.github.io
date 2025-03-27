import { useEffect, useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
// Temporarily commenting out 3D components until we fix their issues
// import Stars from "./components/canvas/Stars";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for assets and animations
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-primary">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="text-white text-4xl font-bold"
        >
          <span className="text-[#915EFF]">P</span>riyansh
        </motion.div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <div className="h-screen flex items-center">
            <div className={`max-w-7xl mx-auto px-6 sm:px-16 flex flex-col`}>
              <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-black">
                Hi, I'm <span className="text-[#915EFF]">Priyansh</span>
              </h1>
              <p className="text-[#dfd9ff] mt-4 text-lg sm:text-2xl lg:text-3xl font-medium">
                AI/ML Engineer specializing in LLMs, <br className="sm:block hidden" />
                Agentic AI, and AI-powered automation
              </p>
            </div>
          </div>
        </div>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <div className="relative z-0">
          <Contact />
          {/* <Stars /> */}
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
