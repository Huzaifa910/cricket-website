import React from "react";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-container">
      <div className="about-content">

        <h1 className="about-title">🏏 Kings Eleven</h1>
        <p className="tagline">Official Cricket Team Panel</p>

        <p className="about-text">
         "Kings Eleven is a professional cricket team that focuses on discipline, teamwork, and sportsmanship."
        </p>

        <h2 className="section-title">Our Values</h2>
        <ul className="values-list">
          <li>✔ Discipline</li>
          <li>✔ Honesty</li>
          <li>✔ Teamwork</li>
          <li>✔ Respect</li>
          <li>✔ Hard Work</li>
        </ul>

        <h2 className="section-title">Contact</h2>
        <p className="about-text">📍 Karachi, Pakistan</p>
        <p className="about-text">📧 kings11official@test.com</p>

        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        © Team Kings Eleven — All Rights Are Reserved.
      </footer>
    </div>
  );
};

export default About;
