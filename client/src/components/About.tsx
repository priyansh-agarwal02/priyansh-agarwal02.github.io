import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (aboutRef.current && textRef.current) {
      gsap.from(textRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section id="about" className="relative py-20" ref={aboutRef}>
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={textVariant(0.1)}
        >
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={`${styles.sectionHeadText} mt-6`}>Overview.</h2>
        </motion.div>

        <motion.div
          ref={textRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-6 bg-tertiary p-6 rounded-lg shadow-xl"
        >
          <p className="text-white text-[17px] max-w-3xl leading-[30px]">
            I'm an AI/ML Engineer specializing in LLMs, Agentic AI, and AI-powered automation to build scalable, deployable solutions that enhance efficiency and performance. With expertise in CrewAI, LangChain, RAG, and fine-tuning LLMs (LoRA, PEFT, QLoRA), I develop intelligent chatbots, optimize AI workflows, and streamline decision-making. 
          </p>
          <p className="text-white text-[17px] max-w-3xl leading-[30px] mt-4">
            My focus is on automating complex tasks, building AI pipelines, and leveraging Explainable AI (Grad-CAM, SHAP, LIME) to create impactful, data-driven solutions.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "LLM Specialist",
              description: "Expert in fine-tuning and optimizing large language models for real-world applications."
            },
            {
              title: "AI Pipeline Builder",
              description: "Designing and implementing end-to-end AI pipelines that transform raw data into actionable insights."
            },
            {
              title: "Automation Engineer",
              description: "Creating AI-powered automation solutions that reduce manual work and increase operational efficiency."
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", 0.1 * index, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="green-pink-gradient p-[1px] rounded-[20px] shadow-card"
            >
              <div className="bg-tertiary rounded-[20px] py-5 px-8 min-h-[220px] flex justify-evenly items-center flex-col h-full">
                <h3 className="text-white text-[20px] font-bold text-center">
                  {service.title}
                </h3>
                <p className="text-secondary text-[14px] text-center">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
