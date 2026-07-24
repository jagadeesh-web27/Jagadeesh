import React from "react";
import "../Styles/footer.css";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <div className="footer-divider"></div>
      
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#home" onClick={scrollToTop} className="footer-logo">
              Jagadeesh Boya
            </a>
            <p className="footer-tagline">
              Building accessible, high-performance web applications with a focus on inclusive design.
            </p>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#hero">About Me</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-socials-group">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a href="https://github.com/Jagadeesh-Boya" target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/in/jagadeesh-boya" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="mailto:jagadeeshboya27@gmail.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {currentYear} Jagadeesh Boya. All rights reserved.
          </p>
          <p className="footer-made-with">
            Built with <FaHeart className="heart-icon" /> &amp; React
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
