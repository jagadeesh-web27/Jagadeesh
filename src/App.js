import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Bio from "./Pages/Bio";
import Projects from "./Pages/Projects";
import Skills from "./Pages/Skills";
import Hobbies from "./Pages/Hobbies";
import ContactMe from "./Pages/ContactMe";
import Footer from "./Components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Skip link — WCAG 2.4.1: keyboard bypass */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main className="App" id="main-content">
        <section id="about">
          <Bio />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="hobbies">
          <Hobbies />
        </section>
        <section id="contact">
          <ContactMe />
        </section>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
