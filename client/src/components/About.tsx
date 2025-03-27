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
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>

        <motion.p
          ref={textRef}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          I'm an AI/ML Engineer specializing in LLMs, Agentic AI, and AI-powered automation to build scalable, deployable solutions that enhance efficiency and performance. With expertise in CrewAI, LangChain, RAG, and fine-tuning LLMs (LoRA, PEFT, QLoRA), I develop intelligent chatbots, optimize AI workflows, and streamline decision-making. My focus is on automating complex tasks, building AI pipelines, and leveraging Explainable AI (Grad-CAM, SHAP, LIME) to create impactful, data-driven solutions.
        </motion.p>

        <div className="mt-20 flex flex-wrap gap-10">
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
              variants={fadeIn("right", "spring", 0.1 * index, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="w-full sm:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)] green-pink-gradient p-[1px] rounded-[20px] shadow-card"
            >
              <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
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
