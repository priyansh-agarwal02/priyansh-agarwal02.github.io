import { motion } from "framer-motion";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TechIcons from "./TechIcons";

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillsRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (skillsRef.current && iconsRef.current) {
      gsap.from(iconsRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section id="skills" className="relative py-20" ref={skillsRef}>
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={textVariant(0.1)}
        >
          <p className={styles.sectionSubText}>My technical expertise</p>
          <h2 className={styles.sectionHeadText}>Skills & Technologies.</h2>
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          With expertise in a wide range of AI and machine learning technologies, I specialize in developing cutting-edge solutions that leverage the power of modern AI frameworks and tools. Below are some of the key technologies I work with.
        </motion.p>

        <div 
          ref={iconsRef}
          className="mt-20 flex flex-col items-center"
        >
          <TechIcons />
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              category: "Machine Learning",
              skills: ["TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "XGBoost", "LightGBM"]
            },
            {
              category: "LLM & NLP",
              skills: ["LangChain", "CrewAI", "HuggingFace", "RAG", "LoRA", "PEFT", "QLoRA"]
            },
            {
              category: "Data Engineering",
              skills: ["SQL", "NoSQL", "Spark", "Airflow", "Kafka", "ETL Pipelines"]
            },
            {
              category: "DevOps & Cloud",
              skills: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD"]
            },
            {
              category: "Programming",
              skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "Go"]
            },
            {
              category: "Visualization",
              skills: ["Matplotlib", "Seaborn", "Plotly", "D3.js", "Tableau", "PowerBI"]
            },
          ].map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.2, 0.75)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="bg-tertiary rounded-2xl p-6"
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
