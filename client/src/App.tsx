import { useEffect, useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";

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
          <section className="relative w-full h-screen mx-auto">
            <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 px-6 sm:px-16`}>
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                <div className="w-1 sm:h-80 h-40 violet-gradient" />
              </div>

              <div>
                <h1 className="text-white text-4xl sm:text-6xl lg:text-8xl font-black">
                  Hi, I'm <span className="text-[#915eff]">Priyansh</span>
                </h1>
                <p className="mt-2 text-white-100 text-lg sm:text-xl md:text-2xl">
                  AI/ML Engineer specializing in LLMs, <br className="sm:block hidden" />
                  Agentic AI, and AI-powered automation
                </p>
              </div>
            </div>

            <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
              <a href="#about">
                <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
                  <motion.div
                    animate={{
                      y: [0, 24, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                    className="w-3 h-3 rounded-full bg-secondary mb-1"
                  />
                </div>
              </a>
            </div>
          </section>
        </div>
        <About />
        <Experience />
        <Skills />
        <Projects />
        <div className="relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
