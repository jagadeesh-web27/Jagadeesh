import React, { useEffect, useState } from "react";
import "../Styles/hobbies.css"; // Import CSS

const hobbiesData = [
  { id: 1, name: "Playing Chess", gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcW1pMDV5bnAzMml6ajA3c2l2NWFrbjUwczJpZ2t5ZTRqbnFuang2diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9POMmQiLkvhRzKFXyT/giphy.gif" },
  { id: 2, name: "Playing Cricket", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYjMxYnBneHU4cWxwM3RiM3dtNWs1M2cxbmh6Z2NqaWNhaDQzOTVpMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/iOuNh6MqyyyPbQRxxS/giphy.gif" },
  { id: 3, name: "Watching Movies", gif: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHhmNTU3NmZ5OGczNGQ5Y2wxY3RlajRueGNsY3hyb2M3bW01aW12eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7rc0qU6m5hneMsuc/giphy.gif" },
  { id: 4, name: "Travelling", gif: "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbG1yc2J6bDhxb3dyaDYxcG9qbGx3dHNkeTk2c2JoZTJ2ZDNodXg3NSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/sjX1ozLxH9NcwuFBBw/giphy.gif" },
];

function Hobbies() {
  const [visibleHobbies, setVisibleHobbies] = useState([]);

  useEffect(() => {
    const uniqueHobbies = [];
    hobbiesData.forEach((hobby, index) => {
      setTimeout(() => {
        if (!uniqueHobbies.some(h => h.id === hobby.id)) {
          uniqueHobbies.push(hobby);
          setVisibleHobbies([...uniqueHobbies]);
        }
      }, index * 300); // Delay for animation effect
    });
  }, []);

  return (
    <section className="hobbies-container">
      <h2 className="hobbies-title">My Hobbies</h2>
      <div className="hobbies-grid">
        {visibleHobbies.map((hobby) => (
          <div key={hobby.id} className="hobby-item zigzag">
            <div className="hobby-gif">
              <img src={hobby.gif} alt={hobby.name} />
            </div>
            <div className="hobby-info">
              <p className="hobby-name">{hobby.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hobbies;