import React, { useEffect, useRef, useState } from "react";
import "../Styles/projects.css";
import project1 from "../assets/library.jpeg";
import project2 from "../assets/Spelling.png";
import project3 from "../assets/Todo.jpeg";
import project4 from "../assets/Paytm.jpeg";
import project5 from "../assets/gsc_dashboard.png";
import project6 from "../assets/blimey_platform.png";
import { FaGithub, FaStar } from "react-icons/fa";

const projectsData = [
  {
    id: 5,
    title: "GSC-DM: Workflow Management",
    description:
      "A role-based data management dashboard for Government Services Center records. Features validation (Aadhaar, UDID, PAN), multi-tier status approval flow (Operator, State Head, Admin), location filters, and multi-channel notifications (HTML Email, SMS, In-App).",
    image: project5,
    github: "https://github.com/dashboard",
    tags: ["React", "Express.js", "MongoDB", "TailwindCSS"],
    color: "#0ea5e9",
    featured: true,
    role: "Full Stack Developer",
  },
  {
    id: 6,
    title: "Blimey: Educational Content Delivery",
    description:
      "A multi-platform educational platform supporting web (React/Vite) and desktop (Tauri/Rust). Integrates NestJS, TypeORM, PostgreSQL database, multi-strategy auth, granular user progress tracking, and NATS event publishing.",
    image: project6,
    github: "https://github.com/dashboard",
    tags: ["React", "NestJS", "Tauri", "Rust", "PostgreSQL", "NATS"],
    color: "#a78bfa",
    featured: true,
    role: "Frontend Engineer",
  },
  {
    id: 1,
    title: "Library System Management",
    description:
      "A full-stack library management system with book tracking, member management, and borrowing records built with React and Node.js.",
    image: project1,
    github: "https://github.com/dashboard",
    tags: ["React", "Node.js", "MongoDB"],
    color: "#8b5cf6",
    role: "Solo Project",
  },
  {
    id: 2,
    title: "Spelling Learning Tool",
    description:
      "An interactive spelling learning application with exercises, quizzes, and progress tracking designed for students.",
    image: project2,
    github: "https://github.com/dashboard",
    tags: ["React", "JavaScript", "CSS"],
    color: "#06b6d4",
    role: "Solo Project",
  },
  {
    id: 3,
    title: "Todo List App",
    description:
      "A smart task management app featuring CRUD operations, local storage persistence, priority tags, and a clean modern UI.",
    image: project3,
    github: "https://github.com/dashboard",
    tags: ["React", "LocalStorage", "CSS"],
    color: "#ec4899",
    role: "Solo Project",
  },
  {
    id: 4,
    title: "Paytm UI Clone",
    description:
      "A pixel-perfect responsive UI clone of Paytm's payment platform with modern design and interactive payment features.",
    image: project4,
    github: "https://github.com/dashboard",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#10b981",
    role: "Solo Project",
  },
];

function ProjectCard({ project, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`project-card ${visible ? "project-card--visible" : ""} ${project.featured ? "project-card--featured" : ""}`}
      style={{ "--delay": `${index * 0.1}s`, "--project-color": project.color }}
      id={`project-${project.id}`}
    >
      <div className="project-image-wrap">
        {project.featured && (
          <div className="featured-badge">
            <FaStar /> Featured
          </div>
        )}
        <img src={project.image} alt={project.title} className="project-image" />
        <div className="project-overlay">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="overlay-btn overlay-btn--primary"
            aria-label={`View ${project.title} on GitHub`}
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
      <div className="project-body">
        {project.role && <div className="project-role">{project.role}</div>}
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="project-tag"
              style={{ "--tag-color": project.color }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="project-glow" style={{background: project.color}}></div>
    </article>
  );
}

function Projects() {
  return (
    <section className="projects-page" id="projects">
      <div className="projects-container">
        <div className="projects-header-flex">
          <div>
            <h2 className="section-title">My Projects</h2>
            <p className="section-subtitle">Things I've built with passion and purpose</p>
          </div>
          <div className="projects-stats-strip">
            <span>6 Projects Built</span>
            <span className="dot">•</span>
            <span>4 Tech Stacks</span>
          </div>
        </div>
        
        <div className="projects-grid">
          {projectsData.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;