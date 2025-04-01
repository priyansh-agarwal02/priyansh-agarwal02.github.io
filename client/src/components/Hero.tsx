import { motion } from "framer-motion";
import { useEffect, useRef, Suspense, useState } from "react";
import { styles } from "../styles";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import SimpleLaptop from "./canvas/SimpleLaptop";
import ParticleBackground from './canvas/ParticleBackground';

const Hero = () => {
  const [useNewBackground, setUseNewBackground] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const computerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    
    console.log("Hero section mounted");
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden" ref={heroRef}>
      {/* Toggle button for background */}
      <button
        onClick={() => setUseNewBackground(!useNewBackground)}
        className="absolute top-24 right-4 z-50 bg-white/10 px-4 py-2 rounded-full text-white text-sm backdrop-blur-sm"
      >
        Toggle Background
      </button>

      {useNewBackground && <ParticleBackground />}
      
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}>
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915eff]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 
            ref={headingRef}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I'm <span className={useNewBackground ? "bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-white to-purple-500" : "text-[#915eff]"}>Priyansh</span>
          </h1>
          <p 
            ref={subHeadingRef}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            AI/ML Engineer specializing in LLMs,<br className="sm:block hidden" />
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

      {/* Computer model container */}
      <div 
        ref={computerContainerRef}
        className="absolute right-0 bottom-0 w-full md:w-1/2 h-full z-[15]"
      >
        <Canvas
          frameloop="always"
          shadows
          camera={{ position: [0, 0, 5], fov: 30 }}
          gl={{ preserveDrawingBuffer: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
            <pointLight position={[0, 0, 3]} intensity={1} color="#915eff" />
            <SimpleLaptop />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>

      {/* Scroll indicator */}
      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-white flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-white mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
