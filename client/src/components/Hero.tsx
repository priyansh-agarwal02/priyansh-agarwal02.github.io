import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { styles } from "../styles";
import { gsap } from "gsap";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import Computers from "./canvas/Computers";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

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
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto" ref={heroRef}>
      <div
        className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5`}
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

      <div className="absolute inset-0 w-full h-full z-[-1]">
        <Canvas
          frameloop="demand"
          shadows
          camera={{ position: [20, 3, 5], fov: 25 }}
          gl={{ preserveDrawingBuffer: true }}
        >
          <Suspense fallback={null}>
            <OrbitControls
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Computers />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
