import { motion } from "framer-motion";
import { useEffect, useRef, Suspense } from "react";
import { styles } from "../styles";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Computers from "./canvas/Computers";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const computerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for hero section
    if (heroRef.current && headingRef.current && subHeadingRef.current) {
      const tl = gsap.timeline();
      
      tl.from(headingRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      })
      .from(subHeadingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      }, "-=0.6");
    }
    
    // Log when hero section mounts
    console.log("Hero section mounted");
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden" ref={heroRef}>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 
            ref={headingRef} 
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I'm <span className="text-[#915eff]">Priyansh</span>
          </h1>
          <p 
            ref={subHeadingRef}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
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

      {/* Computer model container with explicit positioning */}
      <div 
        ref={computerContainerRef}
        className="absolute right-0 bottom-0 w-full md:w-1/2 h-full z-[1]"
      >
        <Computers />
      </div>
    </section>
  );
};

export default Hero;
