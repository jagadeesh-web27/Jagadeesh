import React from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Header.css";
import logo from "../assets/logo_new.jpg";

function Header() {
  return (
    <header className="header shadow-md">
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <span>Jagadeesh Boya</span>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
              Bio Data
            </NavLink>
          </li>
          <li>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" className={({ isActive }) => (isActive ? "active" : "")}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/hobbies" className={({ isActive }) => (isActive ? "active" : "")}>
              Hobbies
            </NavLink>
          </li>
          <li>
            <NavLink to="/contactme" className={({ isActive }) => (isActive ? "active" : "")}>
              Contact Me
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
