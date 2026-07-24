import React, { useState, useEffect } from "react";
import "../Styles/Header.css";
import AccessibilityWidget from "./AccessibilityWidget";

const navItems = [
  { path: "about", label: "About" },
  { path: "skills", label: "Skills" },
  { path: "journey", label: "Journey" },
  { path: "projects", label: "Projects" },
  { path: "hobbies", label: "Hobbies" },
  { path: "contact", label: "Contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2, rootMargin: "-80px 0px -40% 0px" }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 70; // navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    closeMenu();
  };

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <nav className="navbar">
        {/* Logo */}
        <div className="logo">
          <div className="logo-icon">JB</div>
          <div className="logo-text">
            <span className="logo-name">Jagadeesh</span>
            <span className="logo-title">Full-Stack Developer</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links" id="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <a
                href={`#${item.path}`}
                className={`nav-link ${activeSection === item.path ? "nav-link--active" : ""}`}
                onClick={(e) => handleNavClick(e, item.path)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls group */}
        <div className="navbar-controls">
          {/* Accessibility Widget */}
          <AccessibilityWidget />

          {/* CTA Button */}
          <a
            href="#contact"
            className="header-cta"
            id="hire-me-btn"
            onClick={(e) => handleNavClick(e, "contact")}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className={`hamburger ${menuOpen ? "hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            id="hamburger-btn"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} id="mobile-menu">
        {navItems.map((item) => (
          <a
            key={item.path}
            href={`#${item.path}`}
            className={`mobile-link ${activeSection === item.path ? "mobile-link--active" : ""}`}
            onClick={(e) => handleNavClick(e, item.path)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-cta"
          onClick={(e) => handleNavClick(e, "contact")}
        >
          Hire Me
        </a>
      </div>
    </header>
  );
}

export default Header;
