import { memo, useMemo } from "react";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useSkillSlider from "../hooks/useSkillSlider.js";

const SKILLS = [
  { key: "c", title: "C Programming", blurb: "Strong logic and system-level programming with pointers, memory, and algorithms.", items: ["Control structures & loops", "Functions & pointers", "Memory management", "File handling"] },
  { key: "ds", title: "Data Structures", blurb: "Efficient coding with arrays, lists, stacks, queues, trees and graphs to solve problems.", items: ["Arrays & linked lists", "Stacks & queues", "Trees & graphs", "Sorting & searching"] },
  { key: "dbms", title: "DBMS", blurb: "Database design and SQL expertise for reliable storage, queries, and transactions.", items: ["SQL optimization", "Schema design", "Normalization", "Transactions"] },
  { key: "web", title: "Web Development", blurb: "Modern front-end development with responsive layouts, interactions, and polished UI.", items: ["HTML/CSS structure", "JavaScript interactions", "Responsive design", "Accessibility focus"] },
  { key: "video", title: "Video Editing", blurb: "Creative editing for reels, ads and storytelling with smooth motion and polish.", items: ["Motion graphics", "Color grading", "Audio sync", "Visual effects"] },
  { key: "java", title: "Java", blurb: "Object-oriented programming with strong enterprise application development capabilities.", items: ["OOP principles", "Collections framework", "Exception handling", "Multithreading"] },
  { key: "os", title: "OS", blurb: "Deep understanding of system-level concepts and OS architecture.", items: ["Process management", "Memory management", "File systems", "Scheduling algorithms"] },
  { key: "python", title: "Python", blurb: "Versatile programming for automation, data analysis, and web development.", items: ["Data structures", "Web frameworks", "Data analysis libraries", "Automation scripts"] },
  { key: "cybersecurity", title: "Cyber Security", blurb: "Protecting systems and networks from digital attacks and vulnerabilities.", items: ["Network security", "Encryption & cryptography", "Vulnerability assessment", "Threat analysis"] },
  { key: "ml", title: "Machine Learning", blurb: "Building intelligent systems that learn from data and make predictions.", items: ["Supervised learning", "Neural networks", "Data preprocessing", "Model evaluation"] },
  { key: "networks", title: "CN", blurb: "Designing and managing robust network systems and protocols.", items: ["TCP/IP protocols", "Network architecture", "Routing & switching", "Security protocols"] },
];

const SkillCard = memo(function SkillCard({ skill }) {
  return (
    <div className="skill-card-hover" data-skill={skill.key}>
      <h3>{skill.title}</h3>
      <div className="skill-info">
        <p>{skill.blurb}</p>
        <ul>
          {skill.items.map((it) => <li key={it}>{it}</li>)}
        </ul>
      </div>
    </div>
  );
});

function Skills() {
  const sectionRef = useScrollReveal();
  const { gridRef } = useSkillSlider();
  const looped = useMemo(() => [...SKILLS, ...SKILLS, ...SKILLS], []);

  return (
    <section id="skills" ref={sectionRef}>
      <h2><b>Skills</b></h2>
      <div className="skills-container">
        <div className="skill-grid" ref={gridRef}>
          <div
            className="skill-track"
            style={{ display: "flex", gap: "20px", alignItems: "center", willChange: "transform" }}
          >
            {looped.map((s, i) => (
              <SkillCard key={`${s.key}-${i}`} skill={s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
