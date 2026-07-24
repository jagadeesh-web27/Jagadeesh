import React, { useEffect, useRef, useState } from "react";
import "../Styles/skills.css";
import { FaJava, FaJs, FaReact, FaNodeJs, FaGitAlt, FaHtml5, FaCss3Alt, FaUniversalAccess, FaFigma } from "react-icons/fa";
import { SiTypescript, SiMongodb, SiExpress, SiPostman, SiMysql, SiSelenium } from "react-icons/si";

const skillsData = [
  { id: 1,  name: "Java",        icon: <FaJava />,       color: "#3b82f6", level: 90, category: "Backend"  },
  { id: 2,  name: "JavaScript",  icon: <FaJs />,         color: "#eab308", level: 92, category: "Frontend" },
  { id: 3,  name: "React JS",    icon: <FaReact />,      color: "#06b6d4", level: 88, category: "Frontend" },
  { id: 4,  name: "TypeScript",  icon: <SiTypescript />, color: "#3b82f6", level: 75, category: "Frontend" },
  { id: 5,  name: "Node JS",     icon: <FaNodeJs />,     color: "#22c55e", level: 80, category: "Backend"  },
  { id: 6,  name: "Express JS",  icon: <SiExpress />,    color: "#a8a8a8", level: 78, category: "Backend"  },
  { id: 7,  name: "MongoDB",     icon: <SiMongodb />,    color: "#22c55e", level: 65, category: "Database" },
  { id: 13, name: "MySQL",       icon: <SiMysql />,      color: "#0284c7", level: 70, category: "Database" },
  { id: 8,  name: "HTML5",       icon: <FaHtml5 />,      color: "#f97316", level: 95, category: "Frontend" },
  { id: 9,  name: "CSS3",        icon: <FaCss3Alt />,    color: "#3b82f6", level: 88, category: "Frontend" },
  { id: 10, name: "Git",         icon: <FaGitAlt />,     color: "#ef4444", level: 80, category: "Tools"    },
  { id: 11, name: "Postman",     icon: <SiPostman />,    color: "#f97316", level: 82, category: "Tools"    },
  { id: 14, name: "Figma",       icon: <FaFigma />,      color: "#ec4899", level: 60, category: "Tools"    },
  { id: 12, name: "WCAG 2.2",    icon: <FaUniversalAccess />, color: "#10b981", level: 85, category: "Frontend" },
  { id: 15, name: "Selenium",    icon: <SiSelenium />,   color: "#4ade80", level: 75, category: "Tools"    },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools"];

function CircularProgress({ percentage, color, icon }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="skill-circle-wrap">
      <svg width="90" height="90" className="skill-svg">
        <circle
          cx="45" cy="45" r={radius}
          className="skill-circle-bg"
        />
        <circle
          cx="45" cy="45" r={radius}
          className="skill-circle-progress"
          style={{
            stroke: color,
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset
          }}
        />
      </svg>
      <div className="skill-circle-icon" style={{ color: color }}>
        {icon}
      </div>
    </div>
  );
}

function SkillCard({ skill, index }) {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
          setTimeout(() => setPercent(skill.level), index * 80 + 300);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [index, skill.level]);

  const levelLabel =
    skill.level >= 90 ? "Expert" : skill.level >= 75 ? "Advanced" : "Intermediate";

  return (
    <div
      ref={ref}
      className={`skill-card ${visible ? "skill-card--visible" : ""}`}
      style={{ "--skill-color": skill.color, "--delay": `${index * 0.07}s` }}
      id={`skill-${skill.id}`}
    >
      <div className="skill-card-inner">
        <CircularProgress percentage={percent} color={skill.color} icon={skill.icon} />
        <div className="skill-meta">
          <h3 className="skill-name">{skill.name}</h3>
          <span className="skill-level-badge" style={{ "--skill-color": skill.color }}>
            {levelLabel}
          </span>
        </div>
        <span className="skill-percent-text" style={{ color: skill.color }}>
          {percent}%
        </span>
      </div>
    </div>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === activeCategory);

  const getCount = (cat) => {
    if (cat === "All") return skillsData.length;
    return skillsData.filter((s) => s.category === cat).length;
  };

  return (
    <section className="skills-page" id="skills">
      <div className="skills-container">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">Technologies &amp; tools I work with</p>
        
        <div className="skills-filter" role="tablist">
          {categories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              className={`filter-btn ${activeCategory === cat ? "filter-btn--active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              id={`filter-${cat.toLowerCase()}`}
            >
              {cat} <span className="filter-count">{getCount(cat)}</span>
            </button>
          ))}
        </div>
        
        <div className="skills-grid">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;