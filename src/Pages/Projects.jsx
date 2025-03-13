import React, { useEffect, useState } from "react";
import "../Styles/projects.css"; // Import CSS
import project1 from "../assets/library.jpeg";
import project2 from "../assets/Spelling.png";
import project3 from "../assets/Todo.jpeg";
import project4 from "../assets/Paytm.jpeg";

const projectsData = [
  {
    id: 1,
    title: "📂 Library System Management",
    description: "A full-stack library management system with book tracking.",
    image: project1,
    github: "https://github.com/dashboard",
    liveDemo: "https://yourprojectdemo.com/library",
  },
  {
    id: 2,
    title: "📂 Spelling Tool",
    description: "A spelling learning tool with interactive exercises and quizzes.",
    image: project2,
    github: "https://github.com/dashboard",
    liveDemo: "https://yourprojectdemo.com/spelling",
  },
  {
    id: 3,
    title: "📂 Todo List",
    description: "A task management app with CRUD operations and local storage.",
    image: project3,
    github: "https://github.com/dashboard",
    liveDemo: "https://yourprojectdemo.com/todo",
  },
  {
    id: 4,
    title: "📂 Paytm Webpage",
    description: "A modern UI clone of Paytm with responsive payment features.",
    image: project4,
    github: "https://github.com/dashboard",
    liveDemo: "https://yourprojectdemo.com/paytm",
  },
];

function Projects() {
  const [visibleProjects, setVisibleProjects] = useState([]);

  useEffect(() => {
    const uniqueProjects = [];
    projectsData.forEach((project, index) => {
      setTimeout(() => {
        if (!uniqueProjects.some(p => p.id === project.id)) {
          uniqueProjects.push(project);
          setVisibleProjects([...uniqueProjects]);
        }
      }, index * 500); // Delay for animation effect
    });
  }, []);

  return (
    <section className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-grid">
        {visibleProjects.map((project) => (
          <div key={project.id} className="project-card zoom-rotate">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <div className="project-links">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="github-link">
                  🔗 GitHub
                </a>
                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="live-link">
                  🚀 Live Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;