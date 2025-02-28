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
        
        <Section title="Skills & Focus Areas">
          <div className="grid">
            <Card 
              title="Cloud Computing" 
              categories={["Azure", "Infrastructure as Code", "Containerization"]}
            >
              <p>Designing and implementing scalable cloud infrastructure with automation at its core. Specialized in Azure environments and container orchestration solutions.</p>
            </Card>
            
            <Card 
              title="Software Architecture" 
              categories={["Microservices", "Domain Driven Design", "Maintainability"]}
            >
              <p>Creating resilient, modular software systems that prioritize maintainability and business value. Experienced in designing microservice architectures that balance complexity with technical requirements.</p>
            </Card>
            
            <Card 
              title="Fullstack & DevOps" 
              categories={["Frontend", "Backend", "CI/CD"]}
            >
              <p>Developing comprehensive platform solutions for web technologies across the full stack, with a focus on implementing efficient delivery pipelines and robust DevOps practices to ensure reliable, continuous deployment.</p>
            </Card>
          </div>
        </Section>

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

        <Section title="My Book Recommendations">
          <div className="grid">
            <Card title="A Philosophy of Software Design">
              <p className="book-author">John Ousterhout</p>
              <p className="book-description">
                Deep insights on reducing complexity through coding techniques like strategic module boundaries and information hiding. My fundamental resource for designing maintainable software systems.
              </p>
            </Card>
            
            <Card title="Team Topologies">
              <p className="book-author">Matthew Skelton & Manuel Pais</p>
              <p className="book-description">
                A practical framework for the design and interaction of software development teams, aligning organizations and software architecture. A must-read for modern software teams and believers of Conway's Law.
              </p>
            </Card>
            
            <Card title="The Phoenix Project">
              <p className="book-author">Gene Kim, Kevin Behr & George Spafford</p>
              <p className="book-description">
                A business novel illustrating DevOps principles through an engaging crisis-management story. Essential reading on connecting IT operations with business objectives and a nice introduction to DevOps culture.
              </p>
            </Card>
          </div>
        </Section>

        <Section title="Certifications">
          <div className="grid">
            <Card 
              title="Microsoft Certified: Azure Fundamentals" 
              categories={["Cloud", "Microsoft", "Infrastructure"]}
            > 
              <p>Validation of foundational knowledge in cloud services and Microsoft Azure. Covers core Azure concepts, services, security, pricing and support models.</p>
              <p className="cert-details">
                <strong>Issuer:</strong> Microsoft<br />
                <strong>Date:</strong> October 2023<br />
                <strong>Credential ID:</strong> 5363CDC387C9D2C3
              </p>
            </Card>
            
            <Card 
              title="IHK Ausbilder-Eignungsverordnung (AEVO)" 
              categories={["Professional Development"]}
            > 
              <p>Qualification for training and educating apprentices according to German standards. Demonstrates competence in planning, conducting, and evaluating professional training programs.</p>
              <p className="cert-details">
                <strong>Issuer:</strong> IHK Region Stuttgart<br />
                <strong>Date:</strong> June 2023
              </p>
            </Card>
            
            <Card 
              title="Professional Scrum Master™ I (PSM I)" 
              categories={["Agile", "Project Management", "Scrum"]}
            > 
              <p>Certification in fundamental Scrum framework knowledge and its practical application. Validates understanding of Scrum theory, practices, roles, and team facilitation.</p>
              <p className="cert-details">
                <strong>Issuer:</strong> Scrum.org<br />
                <strong>Date:</strong> October 2022<br />
                <strong>Credential ID:</strong> 1125126
              </p>
            </Card>
          </div>
        </Section>

        <Section title="Education">
          <div className="grid">
            <Card title="Master of Science">
              <h4 className="study-title">Computer Science and Media</h4>
              <p className="education-text">Advanced studies in software management, software architecture and cloud-native application development.</p>
              <p className="education-details">
                <strong>Institution:</strong> Stuttgart Media University
              </p>
            </Card>
            
            <Card title="Bachelor of Science">
              <h4 className="study-title">Media Engineering</h4>
              <p className="education-text">Interdisciplinary program combining engineering, business management, and media technology. Focus on technical project management and software development methodologies.</p>
              <p className="education-details">
                <strong>Institution:</strong> Stuttgart Media University
              </p>
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