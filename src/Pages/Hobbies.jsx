import React, { useEffect, useRef, useState } from "react";
import "../Styles/hobbies.css";

const hobbiesData = [
  {
    id: 1,
    name: "Playing Chess",
    emoji: "♟️",
    description: "Strategic thinking and problem solving on the board",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW1pMDV5bnAzMml6ajA3c2l2NWFrbjUwczJpZ2t5ZTRqbnFuang2diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9POMmQiLkvhRzKFXyT/giphy.gif",
    color: "#8b5cf6",
  },
  {
    id: 2,
    name: "Playing Cricket",
    emoji: "🏏",
    description: "Team spirit, fitness, and the love of the game",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjMxYnBneHU4cWxwM3RiM3dtNWs1M2cxbmh6Z2NqaWNhaDQzOTVpMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iOuNh6MqyyyPbQRxxS/giphy.gif",
    color: "#06b6d4",
  },
  {
    id: 3,
    name: "Watching Movies",
    emoji: "🎬",
    description: "Exploring stories, cultures, and cinematic worlds",
    gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHhmNTU3NmZ5OGczNGQ5Y2wxY3RlajRueGNsY3hyb2M3bW01aW12eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7rc0qU6m5hneMsuc/giphy.gif",
    color: "#ec4899",
  },
  {
    id: 4,
    name: "Travelling",
    emoji: "✈️",
    description: "Discovering new places, people, and perspectives",
    gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1yc2J6bDhxb3dyaDYxcG9qbGx3dHNkeTk2c2JoZTJ2ZDNodXg3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sjX1ozLxH9NcwuFBBw/giphy.gif",
    color: "#10b981",
  },
];

function HobbyCard({ hobby, index }) {
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
    <div
      ref={ref}
      className={`hobby-card ${visible ? "hobby-card--visible" : ""}`}
      style={{ "--delay": `${index * 0.1}s`, "--hobby-color": hobby.color }}
      id={`hobby-${hobby.id}`}
    >
      <div className="hobby-gif-wrap">
        <img src={hobby.gif} alt={hobby.name} className="hobby-gif" loading="lazy" />
        <div className="hobby-emoji">{hobby.emoji}</div>
      </div>
      <div className="hobby-body">
        <h3 className="hobby-name">{hobby.name}</h3>
        <p className="hobby-desc">{hobby.description}</p>
      </div>
      <div className="hobby-glow" style={{ background: hobby.color }} />
    </div>
  );
}

function Hobbies() {
  return (
    <section className="hobbies-page">
      <div className="hobbies-container">
        <h2 className="section-title">My Hobbies</h2>
        <p className="section-subtitle">What I love doing outside of work</p>
        <div className="hobbies-grid">
          {hobbiesData.map((hobby, i) => (
            <HobbyCard key={hobby.id} hobby={hobby} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hobbies;