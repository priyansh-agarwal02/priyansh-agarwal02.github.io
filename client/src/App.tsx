import { useEffect, useState, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";

import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Skills from "./components/Skills";
import StarsBackground from "./components/canvas/StarsBackground";
import Computers from "./components/canvas/Computers";

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
        {/* Futuristic background elements */}
        <div className="fixed inset-0 z-[-2] bg-[#030014]">
          {/* Grid lines */}
          <div className="fixed inset-0 z-[-1] opacity-20 bg-[url('/textures/grid.svg')] bg-repeat"></div>
          
          {/* Glowing circle in top-right */}
          <div className="fixed top-[-30vh] right-[-20vw] w-[80vw] h-[80vh] rounded-full bg-[#4315e1] opacity-30 blur-[120px] z-[-1]"></div>
          
          {/* Glowing circle in bottom-left */}
          <div className="fixed bottom-[-10vh] left-[-10vw] w-[50vw] h-[50vh] rounded-full bg-[#4a00e0] opacity-20 blur-[100px] z-[-1]"></div>
          
          {/* Digital circuit pattern */}
          <div className="fixed inset-0 z-[-1] opacity-5 bg-[url('/textures/circuit.svg')] bg-repeat bg-center"></div>
        </div>
        
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <section className="relative w-full h-screen mx-auto">
            {/* 3D background stars */}
            <div className="absolute inset-0 z-[-1]">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Suspense fallback={null}>
                  <StarsBackground count={2000} speed={0.3} />
                  <ambientLight intensity={0.2} />
                </Suspense>
              </Canvas>
            </div>

            <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 px-6 sm:px-16`}>
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="w-5 h-5 rounded-full bg-[#915eff]" />
                <div className="w-1 sm:h-80 h-40 violet-gradient" />
              </div>

              <div className="z-10 w-full">
                <h1 className="text-white text-4xl font-black sm:text-6xl lg:text-8xl leading-tight">
                  Hi, I'm <span className="text-[#915eff]">Priyansh</span>
                </h1>
                <p className="mt-4 text-[#dfd9ff] text-lg sm:text-xl md:text-2xl max-w-3xl font-medium">
                  AI/ML Engineer specializing in LLMs, <br className="sm:block hidden" />
                  Agentic AI, and AI-powered automation
                </p>
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="bg-[#915eff] hover:bg-[#7d4ee0] text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                  >
                    Get in touch
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* 3D Computer */}
            <div className="absolute right-0 bottom-0 h-screen w-full md:w-1/2 lg:w-1/3 z-[5]">
              <Computers />
            </div>

            <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
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
        
        {/* Reduce spacing between sections */}
        <div className="mt-[-100px] relative z-0">
          <About />
        </div>
        
        <div className="mt-[-100px] relative z-0">
          <Experience />
        </div>
        
        <div className="mt-[-100px] relative z-0">
          <Skills />
        </div>
        
        <div className="mt-[-100px] relative z-0">
          <Projects />
        </div>
        
        <div className="mt-[-100px] relative z-0">
          <Contact />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
