import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current && skillCardsRef.current) {
      gsap.from(skillCardsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          scrub: false
        },
      });
    }
  }, []);

  return (
    <section id="skills" className="relative py-10" ref={skillsRef}>
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={textVariant(0.1)}
          className="mb-8"
        >
          <p className={`${styles.sectionSubText} uppercase tracking-wider`}>My technical expertise</p>
          <h2 className={`${styles.sectionHeadText} mt-6 text-[70px]`}>Skills & Technologies.</h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          With expertise in a wide range of AI and machine learning technologies, I specialize in developing cutting-edge solutions that leverage the power of modern AI frameworks and tools. Below are some of the key technologies I work with.
        </motion.p>

        <div 
          ref={skillCardsRef}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[
            {
              category: "Machine Learning",
              skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "Trasnformers", ""]
            },
            {
              category: "Artificial Intelligence",
              skills: ["LangChain", "RAG", "LoRA", "PEFT", "QLoRA", "LlamaIndex", "LangGraph"]
            },
            {
              category: "Programming Languages",
              skills: ["SQL", "C", "C++", "Python", "HTML/CSS"]
            },
            {
              category: "Developer Tools",
              skills: ["AWS", "GCP", "Vercel", "Ollama", "FastAPI", "Flask"]
            },
            {
              category: "AI Tools",
              skills: ["Replit", "Cursor", "Bolt", "Lovable", "Dora", "Claude", "Groq", "OpenAI", ]
            },
            {
              category: "Visualization",
              skills: ["Matplotlib", "Seaborn", "Plotly", "Tableau", "PowerBI"]
            },
          ].map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.1 }}
              className="bg-tertiary rounded-2xl p-6 shadow-xl"
            >
              <h3 className="text-white text-[20px] font-bold mb-4">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex}
                    className="px-3 py-1 bg-primary rounded-full text-[14px] text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
