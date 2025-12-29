import type { NextPage } from "next";
import Image from "next/image";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaTwitter,
} from "react-icons/fa";
import TypewriterEffect from "../components/TypewriterEffect";

const Home: NextPage = () => {
  const descriptions = [
    "Platform Engineer specializing in cloud computing.",
    "Building resilient software with maintainability in mind.",
    "Creating well designed systems.",
    "Implementing efficient delivery pipelines.",
    "DevOps Enthusiast & Neovim User.",
  ];

  return (
    <div className="dashboard">
      <header className="hero-section">
        <div className="profile-image-container">
          <Image
            src="/static/profile.jpeg"
            alt="Florian Demel"
            fill
            className="profile-image"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-content">
          <h1>Florian Demel</h1>
          <TypewriterEffect
            phrases={descriptions}
            typingSpeed={40}
            deletingSpeed={20}
            delayBetweenPhrases={3000}
          />
        </div>

        <div className="contact-bar">
          <a href="mailto:kontakt@floriandemel.de" className="contact-item">
            <FaEnvelope className="contact-icon-small" />
            <span className="contact-label">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/florian-demel-b11254236/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaLinkedin className="contact-icon-small" />
            <span className="contact-label">LinkedIn</span>
          </a>
          <a
            href="https://github.com/FlrnDml"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaGithub className="contact-icon-small" />
            <span className="contact-label">GitHub</span>
          </a>
          <a
            href="https://x.com/FlrnDml"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <FaTwitter className="contact-icon-small" />
            <span className="contact-label">X</span>
          </a>
        </div>
      </header>
    </div>
  );
};

export default Home;