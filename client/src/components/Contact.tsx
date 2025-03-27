import { useRef } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload } from "@react-three/drei";

import { styles } from "../styles";
import StarsBackground from "./canvas/StarsBackground";
import AIRobot from "./canvas/AIRobot";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);

  return (
    <section id="contact" className="relative w-full h-auto pb-8 items-center flex xl:flex-row flex-col overflow-hidden">
      <div className={`${styles.paddingX} max-w-7xl mx-auto flex md:flex-row flex-col-reverse items-center gap-8 inset-0`}>
        {/* Contact info section */}
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-1 bg-tertiary p-6 rounded-2xl shadow-xl"
        >
          <h3 className={`${styles.sectionHeadText} mb-8`}>Contact.</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Button-style contact links */}
            <a
              href="tel:+917619826222"
              className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-all shadow-md group"
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#915eff] group-hover:bg-[#7d4ee0] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">+91-7619826222</span>
                <span className="text-secondary text-xs">Call me</span>
              </div>
            </a>
            
            {/* Gmail Button */}
            <a
              href="mailto:priyansh.official4@gmail.com"
              className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-all shadow-md group"
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#915eff] group-hover:bg-[#7d4ee0] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">Gmail</span>
                <span className="text-secondary text-xs">Email me</span>
              </div>
            </a>
            
            {/* LinkedIn Button */}
            <a 
              href="https://linkedin.com/in/priyansh-agarwal02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-all shadow-md group"
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#915eff] group-hover:bg-[#7d4ee0] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">LinkedIn</span>
                <span className="text-secondary text-xs">Connect with me</span>
              </div>
            </a>
            
            {/* GitHub Button */}
            <a 
              href="https://github.com/priyansh-agarwal02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-all shadow-md group"
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#915eff] group-hover:bg-[#7d4ee0] transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  className="w-5 h-5 text-white"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" 
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-white text-sm font-medium">GitHub</span>
                <span className="text-secondary text-xs">See my projects</span>
              </div>
            </a>
          </div>
          
          {/* Social icons row */}
          <div className="mt-8 flex justify-center gap-4">
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/priyansh-agarwal02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            
            {/* GitHub */}
            <a 
              href="https://github.com/priyansh-agarwal02" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
            
            {/* Gmail */}
            <a 
              href="mailto:priyansh.official4@gmail.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
            </a>
            
            {/* Twitter/X */}
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black/30 flex items-center justify-center hover:bg-black/50 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
          
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-white text-xs">
              Made with ♥ by Priyansh
            </p>
            <p className="text-white text-xs">
              © 2024 All Rights Reserved.
            </p>
          </div>
        </motion.div>

        {/* AI Robot with Stars background */}
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[300px]"
        >
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 60 }}
            shadows
          >
            <ambientLight intensity={0.3} />
            <directionalLight 
              position={[5, 5, 5]} 
              intensity={1} 
              castShadow 
              shadow-mapSize={1024} 
            />
            <pointLight position={[0, 0, 3]} intensity={1} color="#0077ff" />
            
            {/* Stars background */}
            <StarsBackground count={1000} speed={0.4} />
            
            {/* AI Robot */}
            <AIRobot />
            
            {/* Controls */}
            <OrbitControls 
              enableZoom={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 2}
            />
            <Preload all />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;