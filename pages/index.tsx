import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaDownload } from 'react-icons/fa'
import Card from '../components/Card'
import Section from '../components/Section'
import TypewriterEffect from '../components/TypewriterEffect'

const Home: NextPage = () => {
  const descriptions = [
    "Platform Engineer specializing in cloud computing, software architecture, and fullstack development.",
    "Building scalable cloud infrastructure with automation at its core.",
    "Creating resilient software systems with maintainability in mind.",
    "Implementing efficient delivery pipelines and robust DevOps practices.",
    "Would love to hear from you!"
  ];

  return (
    <div>
      <Head>
        <title>Florian Demel | Platform Engineer</title>
        <meta name="description" content="Platform Engineer specializing in cloud computing, software architecture, and fullstack development." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        {/* Streamlined Header Section with enhanced circular profile picture */}
        <header className="hero-section">
          <div className="profile-image-container">
            <Image 
              src="/static/profile.jpeg" 
              alt="Florian Demel" 
              fill
              sizes="(max-width: 480px) 100px, (max-width: 768px) 120px, 150px"
              className="profile-image"
              loading="eager"
              style={{objectFit: "cover"}}
            />
          </div>
          <div className="hero-content">
            <h1>Florian Demel</h1>
            <TypewriterEffect 
              phrases={descriptions} 
              className="hero-subtitle" 
              typingSpeed={40}
              deletingSpeed={20}
              delayBetweenPhrases={3000}
            />
          </div>
          
          {/* Contact Section at top */}
          <div className="contact-bar">
            <a href="mailto:kontakt@floriandemel.de" className="contact-item">
              <FaEnvelope className="contact-icon-small" />
              <span className="contact-label">Email</span>
            </a>
            <a href="https://www.linkedin.com/in/florian-demel-b11254236/" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaLinkedin className="contact-icon-small" />
              <span className="contact-label">LinkedIn</span>
            </a>
            <a href="https://github.com/FlrnDml" target="_blank" rel="noopener noreferrer" className="contact-item">
              <FaGithub className="contact-icon-small" />
              <span className="contact-label">GitHub</span>
            </a>
          </div>
        </header>
        
        <Section title="More About Me">
          <div className="grid">
            <Card 
              title="Scientific Work" 
              categories={["Automatic Speech Recognition", "AI", "Open Source"]}
            >
              <p>Contributor to Melvin ASR, a scientific approach to Automatic Speech Recognition. Project developed as part of university research combining artificial intelligence and voice technology.</p>
              <div className="card-action">
                <a href="https://github.com/shuffle-project/melvin-asr" className="button button-small" target="_blank" rel="noopener noreferrer">
                  <FaCode style={{marginRight: '0.5rem'}} /> View Repository
                </a>
              </div>
            </Card>
            
            <Card 
              title="Paper Publication" 
              categories={["Research", "Computer Science"]}
            >
              <p>Published research on software maintainability metrics derived from my master's thesis. Explores innovative approaches to measuring and improving system maintainability through theory-driven metrics.</p>
              <div className="card-action">
                <a 
                  href="https://github.com/FlrnDml/floriandemel.de/blob/f6b9944ac48f5c2abf4fac6013b0ccdbb835b638/Case-Study-Measuring-Maintainability_Florian%20Demel.pdf"
                  className="button button-small"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <FaDownload style={{marginRight: '0.5rem'}} /> View Paper
                </a>
              </div>
            </Card>
          </div>
        </Section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Florian Demel. All rights reserved.</p>
          <p className="photo-credit">
            Background photo: <a href="https://www.pexels.com/de-de/foto/foto-von-berg-und-baumen-1139429/" target="_blank" rel="noopener noreferrer">https://www.pexels.com/de-de/foto/foto-von-berg-und-baumen-1139429/</a>
          </p>
          <p>
            <Link href="/impressum" style={{ marginRight: '1rem', color: 'var(--text-secondary)' }}>Impressum</Link>
            <Link href="/datenschutz" style={{ color: 'var(--text-secondary)' }}>Datenschutz</Link>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Home