import { motion } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectCardProps {
  index: number;
  name: string;
  description: string;
  tags: { name: string; color: string }[];
  image: string;
  source_code_link: string;
}

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardRef.current) {
      gsap.from(cardRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.2,
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 90%",
        },
      });
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full card-hover"
    >
      <div className="relative w-full h-[230px]">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
          <div
            onClick={() => window.open(source_code_link, "_blank")}
            className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
          >
            <img
              src={github}
              alt="github"
              className="w-1/2 h-1/2 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="mt-2 text-secondary text-[14px]">{description}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p key={tag.name} className={`text-[14px] ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </div>
  );
};

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (projectsRef.current) {
      gsap.from(".projects-heading", {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: projectsRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section id="work" className="relative py-20" ref={projectsRef}>
      <div className={`${styles.padding} max-w-7xl mx-auto`}>
        <div className="projects-heading">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            variants={textVariant(0.1)}
          >
            <p className={styles.sectionSubText}>My work</p>
            <h2 className={`${styles.sectionHeadText} mt-6`}>Projects.</h2>
          </motion.div>

          <div className="w-full flex">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              variants={fadeIn("", "", 0.1, 1)}
              className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
            >
              Following projects showcase my skills and experience through real-world
              examples of my work. Each project is briefly described with links to
              code repositories. It reflects my ability to solve complex problems,
              work with different technologies, and manage projects effectively.
            </motion.p>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap gap-7">
          {projects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
