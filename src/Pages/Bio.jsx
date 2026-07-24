import React, { useEffect, useRef, useState } from "react";
import "../Styles/bio.css";
import profileImage from "../assets/profile.jpg";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaCode, FaUniversalAccess, FaServer, FaPaintBrush, FaCertificate } from "react-icons/fa";

const educationData = [
  {
    year: "2020 – 2023",
    degree: "Bachelor's in Computer Science",
    institution: "SSBN Degree College, Anantapur",
    score: "89%",
    icon: "🎓",
    color: "#8b5cf6",
  },
  {
    year: "2018 – 2020",
    degree: "Intermediate Education (MPC)",
    institution: "SSBN Junior College",
    score: "85%",
    icon: "📘",
    color: "#06b6d4",
  },
  {
    year: "2018",
    degree: "Secondary School Education",
    institution: "ZP High School, MPR Dam",
    score: "90%",
    icon: "🏫",
    color: "#ec4899",
  },
];

const experienceData = [
  {
    year: "Apr – Dec 2023",
    role: "Internship Developer",
    company: "Mitraz Skill Development Center",
    icon: "💼",
    color: "#10b981",
    description: "Developed user interfaces using HTML, CSS, JavaScript, and Java. Built responsive pages and learned agile team collaboration practices.",
  },
  {
    year: "Dec 2023 – Sep 2024",
    role: "Full Stack Development Training",
    company: "Jspiders",
    icon: "👨‍💻",
    color: "#8b5cf6",
    description: "Trained in building full stack software. Implemented scalable REST APIs, relational/non-relational database schemas, and single-page apps.",
  },
  {
    year: "Nov 2024 – Present",
    role: "Full Stack Developer",
    company: "Enable India Solutions",
    icon: "🚀",
    color: "#06b6d4",
    description: "Developing robust applications with an emphasis on digital accessibility (WCAG 2.1 AA). Implementing screen-reader friendly code, keyboard navigation, and semantic HTML.",
  },
];

const servicesData = [
  {
    title: "Full-Stack Development",
    description: "Building scalable web applications from frontend to backend using React, Node.js, and MongoDB.",
    icon: <FaCode />,
    color: "#8b5cf6"
  },
  {
    title: "Accessibility Engineering",
    description: "Ensuring websites meet WCAG 2.2 AA standards for inclusive design and keyboard navigation.",
    icon: <FaUniversalAccess />,
    color: "#10b981"
  },
  {
    title: "API Development",
    description: "Designing and implementing robust RESTful APIs with secure authentication and database integration.",
    icon: <FaServer />,
    color: "#06b6d4"
  },
  {
    title: "UI/UX Implementation",
    description: "Translating complex designs into pixel-perfect, responsive, and animated user interfaces.",
    icon: <FaPaintBrush />,
    color: "#ec4899"
  }
];

const certsData = [
  {
    title: "Java Programming",
    issuer: "Jspiders",
    date: "2024",
    color: "#8b5cf6"
  },
  {
    title: "Full Stack Web Development",
    issuer: "Jspiders",
    date: "2024",
    color: "#06b6d4"
  },
  {
    title: "Web Accessibility (WCAG) Testing",
    issuer: "Enable India Solutions",
    date: "2025",
    color: "#10b981"
  },
  {
    title: "React Advanced Patterns",
    issuer: "Online Certification",
    date: "2023",
    color: "#ec4899"
  }
];

const typingWords = [
  "Full-Stack Developer",
  "Accessibility Specialist",
  "React & Node.js Engineer",
  "Inclusive Design Advocate",
];

function useTypingEffect(words, speed = 90, pause = 1800) {
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    let timeout;
    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
      setCharIdx(0);
    }
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return displayText;
}

function StatCounter({ target, suffix = "+", label }) {
  const [count, setCount] = useState(0);
  const ref = useRef();

  useEffect(() => {
    let observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 2000;
        const stepTime = Math.abs(Math.floor(duration / target));
        let timer = setInterval(() => {
          start += 1;
          setCount(start);
          if (start >= target) {
            setCount(target);
            clearInterval(timer);
          }
        }, stepTime);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-item" ref={ref}>
      <strong>{count}{suffix}</strong>
      <span>{label}</span>
    </div>
  );
}

function TimelineCard({ item, index, type }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`timeline-card ${visible ? "timeline-card--visible" : ""}`}
      style={{ "--delay": `${index * 0.15}s`, "--color": item.color }}
    >
      <div
        className="timeline-dot"
        style={{ background: item.color, boxShadow: `0 0 14px ${item.color}` }}
      />
      <div className="timeline-content">
        <div className="timeline-header">
          <span className="timeline-icon">{item.icon}</span>
          <span className="timeline-year">{item.year}</span>
        </div>
        <h3 className="timeline-title">
          {type === "edu" ? item.degree : item.role}
        </h3>
        <p className="timeline-place">
          {type === "edu" ? item.institution : item.company}
        </p>
        {item.description && (
          <p className="timeline-desc">
            {item.description}
          </p>
        )}
        {type === "edu" && (
          <div className="timeline-score">
            <span>Score</span>
            <strong>{item.score}</strong>
          </div>
        )}
      </div>
    </div>
  );
}

function Bio() {
  const typedText = useTypingEffect(typingWords);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="bio-page">
      {/* ===== HERO ===== */}
      <section
        className={`hero-section ${heroVisible ? "hero-section--visible" : ""}`}
        id="hero"
      >
        {/* Animated Background Particles */}
        <div className="hero-bg-particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
        </div>

        <div className="hero-inner">
          {/* Profile */}
          <div className="hero-image-wrap">
            <div className="hero-image-ring" aria-hidden="true" />
            <div className="hero-image-ring hero-image-ring--2" aria-hidden="true" />
            <img src={profileImage} alt="Jagadeesh Boya" className="hero-image" />
            <div className="hero-status">
              <span className="status-dot status-dot--pulse" aria-hidden="true" />
              Available for work
            </div>
          </div>

          {/* Text */}
          <div className="hero-content">
            <p className="hero-greeting">👋 Hello, I'm</p>
            <h1 className="hero-name">Jagadeesh Boya</h1>
            <div className="hero-typing-wrap">
              <span className="hero-typed">{typedText}</span>
              <span className="hero-cursor" aria-hidden="true">|</span>
            </div>
            <p className="hero-bio">
              Passionate about building{" "}
              <strong>accessible, high-performance</strong> web applications with
              React, Node.js, and MongoDB. Specializing in inclusive design, WCAG compliance, and assistive technology testing.
            </p>
            
            {/* Social Links Row */}
            <div className="hero-socials">
              <a href="https://github.com/Jagadeesh-Boya" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/jagadeesh-boya" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:jagadeesh@example.com" className="hero-social-link" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>

            <div className="hero-actions">
              <a
                href="#contact"
                className="btn btn-primary"
                id="contact-hero-btn"
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById("contact");
                  if (element) {
                    const offset = 70;
                    const bodyRect = document.body.getBoundingClientRect().top;
                    const elementRect = element.getBoundingClientRect().top;
                    const elementPosition = elementRect - bodyRect;
                    const offsetPosition = elementPosition - offset;
                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                  }
                }}
              >
                Let's Work Together
              </a>
              <a href="/Jagadeesh_Boya_CV.pdf" download className="btn btn-outline" id="resume-btn">
                <FaDownload className="btn-icon" style={{marginRight: '8px'}} /> Download CV
              </a>
            </div>
            
            <div className="hero-stats">
              <StatCounter target={3} label="Years Learning" />
              <div className="stat-divider" />
              <StatCounter target={6} label="Projects Built" />
              <div className="stat-divider" />
              <StatCounter target={10} label="Technologies" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== TECH MARQUEE ===== */}
      <div className="tech-marquee-wrapper">
        <div className="tech-marquee">
          <div className="tech-marquee-track">
            <span>React</span><span className="dot">•</span>
            <span>Node.js</span><span className="dot">•</span>
            <span>MongoDB</span><span className="dot">•</span>
            <span>JavaScript</span><span className="dot">•</span>
            <span>TypeScript</span><span className="dot">•</span>
            <span>Express</span><span className="dot">•</span>
            <span>Java</span><span className="dot">•</span>
            <span>HTML5/CSS3</span><span className="dot">•</span>
            <span>WCAG 2.2</span><span className="dot">•</span>
            {/* Duplicated for infinite scroll */}
            <span>React</span><span className="dot">•</span>
            <span>Node.js</span><span className="dot">•</span>
            <span>MongoDB</span><span className="dot">•</span>
            <span>JavaScript</span><span className="dot">•</span>
            <span>TypeScript</span><span className="dot">•</span>
            <span>Express</span><span className="dot">•</span>
            <span>Java</span><span className="dot">•</span>
            <span>HTML5/CSS3</span><span className="dot">•</span>
            <span>WCAG 2.2</span><span className="dot">•</span>
          </div>
        </div>
      </div>

      <div className="section-divider"></div>

      {/* ===== WHAT I DO ===== */}
      <section className="services-section" id="services">
        <div className="section-container">
          <h2 className="section-title">What I Do</h2>
          <p className="section-subtitle">Services and expertise I offer</p>
          <div className="services-grid">
            {servicesData.map((service, i) => (
              <div className="service-card" key={i} style={{"--service-color": service.color, "--delay": `${i * 0.15}s`}}>
                <div className="service-icon" style={{color: service.color}}>{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-glow" style={{background: service.color}}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ===== JOURNEY (EXPERIENCE & EDUCATION) ===== */}
      <section className="timeline-section" id="journey">
        <div className="section-container journey-container">
          <div className="journey-column">
            <h2 className="section-title">Experience</h2>
            <p className="section-subtitle">My professional journey so far</p>
            <div className="timeline">
              {experienceData.map((exp, i) => (
                <TimelineCard key={i} item={exp} index={i} type="exp" />
              ))}
            </div>
          </div>

          <div className="journey-column">
            <h2 className="section-title">Education</h2>
            <p className="section-subtitle">My academic journey and qualifications</p>
            <div className="timeline">
              {educationData.map((edu, i) => (
                <TimelineCard key={i} item={edu} index={i} type="edu" />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ===== CERTIFICATIONS ===== */}
      <section className="certs-section" id="certifications">
        <div className="section-container">
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">Continuous learning & achievements</p>
          <div className="certs-grid">
            {certsData.map((cert, i) => (
              <div className="cert-card" key={i} style={{"--cert-color": cert.color, "--delay": `${i * 0.1}s`}}>
                <div className="cert-icon-wrap">
                  <FaCertificate className="cert-icon" style={{color: cert.color}} />
                </div>
                <div className="cert-info">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer">{cert.issuer}</p>
                  <span className="cert-date">{cert.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bio;
