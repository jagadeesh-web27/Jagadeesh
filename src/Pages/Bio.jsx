import React from "react";
import "../Styles/bio.css"; // Importing the CSS file
import profileImage from "../assets/profile.jpg"; // Replace with your actual image

const educationData = [
  {
    year: "2020 - 2023",
    degree: "Bachelor’s in Computer Science",
    institution: "SSBN Degree College, Anantaput",
    score: "89%",
    icon: "🎓",
  },
  {
    year: "2018 - 2020",
    degree: "Intermediate Education(MPC)",
    institution: "SSBN Junior College, Anantapur",
    score:"85%",
    icon: "📘",
  },
  {
    year: "2018",
    degree: "Secondary School of Education",
    institution: "ZP High School, MPR Dam",
    score:"90%",
    icon: "🏫",
  },
];
const experienceData =[
  {
    year: "2023 Apr-Dec",
    Role: "Internship(Developer)",
    From: "Mitraz Skill Development Center",
    icon: "💼",
  },
  {
    year: "2024 Dec-Sep",
    Role: "Full Stack Development Training",
    From: "Jspiders",
    icon: "👨‍💻",
  },
  {
    year: "2024 Nov-Present",
    Role: "Full Stack Developer",
    From: "Enable India Solutions",
    icon: "🚀",
  },


]

function Bio() {
  return (
    <section className="bio-container">
      {/* Profile & Bio Side by Side */}
      <div className="bio-wrapper">
        {/* Left - Profile Image */}
        <div className="bio-image-container">
          <img src={profileImage} alt="Profile" className="bio-image" />
        </div>

        {/* Right - About Me */}
        <div className="bio-content">
          <h2 className="bio-title">About Me</h2>
          <p className="bio-text">
          Hi, I'm <strong>Jagadeesh</strong>, a passionate <strong>Full-Stack Developer</strong> with expertise in React, Node.js, and MongoDB. With a strong foundation in <strong>JavaScript, TypeScript,</strong> and modern web frameworks, I specialize in building scalable, high-performance applications that enhance user experience and business efficiency.
          </p>
        </div>
      </div>

      {/* Education Section */}
      <h2 className="edu-title">Education</h2>
      <div className="education-timeline">
        {educationData.map((edu, index) => (
          <div key={index} className="edu-card">
            <div className="gold-star">⭐</div>
            <span className="edu-icon">{edu.icon}</span>
            <div className="edu-info">
              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">{edu.institution}</p>
              <p className="edu-institution"> Percentage : {edu.score}</p>
              <p className="edu-year">{edu.year}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="edu-title">Experience</h2>
      <div className="education-timeline">
        {experienceData.map((exp, index) => (
          <div key={index} className="edu-card">
            <div className="gold-star">⚙️⚙️</div>
            <span className="edu-icon">{exp.icon}</span>
            <div className="edu-info">
              <h3 className="edu-degree">{exp.Role}</h3>
              <p className="edu-institution">{exp.From}</p>
              <p className="edu-institution"> {exp.year}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Bio;
