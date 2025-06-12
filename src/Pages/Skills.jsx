import React, { useEffect, useState } from "react";
import "../Styles/skills.css"; // Import CSS
import { FaJava, FaJs, FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiMongodb } from "react-icons/si";

const skillsData = [
  { id: 1, name: "Java", icon: <FaJava color="#007396" />, level: "(Java) Expert" },
  { id: 2, name: "JavaScript", icon: <FaJs color="#F7DF1E" />, level: "(JavaScript) Expert" },
  { id: 3, name: "React JS", icon: <FaReact color="#61DAFB" />, level: "React JS (Advanced)" },
  { id: 4, name: "TypeScript", icon: <SiTypescript color="#3178C6" />, level: "TypeScript (Advanced)" },
  { id: 5, name: "MongoDB", icon: <SiMongodb color="#47A248" />, level: "MongoDB (Beginner)" },
  { id: 6, name: "Node JS", icon: <FaNodeJs color="#339933" />, level: "Node JS (Advanced)" },
];

function Skills() {
  const [visibleSkills, setVisibleSkills] = useState([]);

  useEffect(() => {
    skillsData.forEach((skill, index) => {
      setTimeout(() => {
        setVisibleSkills((prev) => {
          if (!prev.some(s => s.id === skill.id)) {
            return [...prev, skill];
          }
          return prev;
        });
      }, index * 300); // Delay for animation effect
    });
  }, []);

  return (
    <section className="skills-container">
      <h2 className="skills-title">My Skills</h2>
      <div className="skills-grid">
        {visibleSkills.map((skill) => (
          <div key={skill.id} className="skill-item zigzag">
            <div className="skill-icon">{skill.icon}</div>
            <div className="skill-info">
              <p className="skill-level">{skill.level}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
