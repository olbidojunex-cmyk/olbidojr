import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// --- LOADING SCREEN COMPONENT ---
const LoadingScreen = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-content">
        {/* Your requested GIF link */}
        <img
          src="https://media2.giphy.com/media/2IudUHdI075HL02Pkk/giphy.gif"
          alt="Loading..."
          className="loading-gif"
        />
        <div className="loader-bar">
          <div className="loader-progress"></div>
        </div>
        <p className="loading-text">Preparing Portfolio...</p>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // --- DATA ---
  const webProjects = [
    {
      title: "POS System ni Librong James",
      desc: "Specialized POS for Car Accessories management.",
      image: "/pos.png",
      link: "https://pos.bns-santacruz.com",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel" },
        { name: "PHP", icon: "fab fa-php" },
        { name: "MySQL", icon: "fas fa-database" },
      ],
    },
    {
      title: "Malnutrition Profiling and Monitoring System",
      desc: "A web and mobile platform for Barangay Nutrition Scholars of Sta. Cruz to efficiently profile and monitor child nutrition data.",
      image: "/bns.png",
      link: "https://bns-santacruz.com",
      tags: [
        { name: "PHP", icon: "fab fa-php" },
        { name: "JS", icon: "fab fa-js" },
        { name: "HTML", icon: "fab fa-html5" },
      ],
    },
  ];

  const creativeWorks = [
    {
      title: "Branding & Layout Design",
      desc: "Professional layouts and business stationary designed in Photoshop.",
      image: "/banner.png",
      tags: [
        { name: "Photoshop", icon: "fas fa-paint-brush" },
        { name: "Word", icon: "far fa-file-word" },
      ],
    },
    {
      title: "Graphic Manipulation",
      desc: "Advanced photo editing and digital art compositions.",
      image: "/propesiya.png",
      tags: [{ name: "Photoshop", icon: "fas fa-palette" }],
    },
  ];

  // --- TYPING ANIMATION LOGIC ---
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = [
    "I build full-stack web apps",
    "I design visuals with Photoshop",
    "I troubleshoot and repair PCs",
    "I create UI/UX designs",
    "I develop mobile apps",
    "I edit videos & graphics",
    "I code and automate tasks",
  ];

  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentFullRole.slice(0, roleText.length + 1);
        setRoleText(nextText);
        if (nextText === currentFullRole) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        const nextText = currentFullRole.slice(0, roleText.length - 1);
        setRoleText(nextText);
        if (nextText === "") {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    };
    const timer = setTimeout(handleTyping, isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  // --- SCROLL REVEAL & UTILITIES ---
  useEffect(() => {
    // Hide loader after 3 seconds
    const timer = setTimeout(() => setLoading(false), 3000);

    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });

    const handleScroll = () => {
      // Progress Bar
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollWidth(progress);

      // Scroll To Top Button
      setShowScrollTop(window.scrollY > 500);

      // Scroll Animation Logic
      const reveals = document.querySelectorAll(".reveal-section");
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add("active");
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="portfolio-wrapper">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <div
        className="custom-cursor"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
      ></div>
      <div
        className="scroll-progress-line"
        style={{ transform: `scaleX(${scrollWidth / 100})` }}
      ></div>

      <button
        className={`scroll-up-btn ${showScrollTop ? "pop" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <header className="fixed-header">
        <div className="container header-content">
          <a href="#home" className="nav-brand">
            PORTFOLIO
          </a>
          <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
            <a href="#works" onClick={() => setIsMenuOpen(false)}>
              Projects
            </a>
            <a href="#creative" onClick={() => setIsMenuOpen(false)}>
              Creative
            </a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </a>
          </div>
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </header>

      <main>
        {/* HERO SECTION - Always active initially */}
        <section id="home" className="hero reveal-section active">
          <div className="container hero-grid">
            <div className="hero-text">
              <h2 className="greeting">Hi There!</h2>
              <h1 className="name-title reveal">I'm Olbido</h1>
              <p className="hero-sub">
                {roleText}
                <span className="cursor">|</span>
              </p>
              <div className="cta-group">
                <a href="/olbido.pdf" target="_blank" className="btn-outline">
                  Resume
                </a>
                <a href="#contact" className="btn-solid">
                  Let's Talk
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="resume-card">
                <div className="card-header">
                  <div className="profile-dot"></div>
                  <span>Resume Summary</span>
                </div>
                <div className="card-body relative-body">
                  <div className="photo-slot">
                    <img src="/profile.png" alt="Profile" />
                  </div>
                  <div className="card-info">
                    <h3 className="card-name">Olbido, Maximino Jr.</h3>
                    <p className="card-edu">Tagoloan Community College</p>
                    <div className="card-divider"></div>
                    <strong className="skill-title">Tech Skills</strong>
                    <ul className="card-skills">
                      <li>• MS Office & Adobe Photoshop</li>
                      <li>• PC Repair & Troubleshooting</li>
                      <li>• Fullstack Web Development</li>
                    </ul>
                  </div>
                </div>
                <div className="card-badge">Available for OJT</div>
              </div>
            </div>
          </div>
        </section>

        {/* WEB PROJECTS */}
        <section id="works" className="works-section reveal-section">
          <div className="container">
            <p className="section-label">WEB PROJECTS</p>
            <h2 className="section-title">
              Fullstack <span>Development</span>
            </h2>
            <div className="works-grid">
              {webProjects.map((proj, idx) => (
                <a
                  href={proj.link}
                  key={idx}
                  className="work-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="work-image">
                    <img src={proj.image} alt={proj.title} />
                    <div className="work-tags">
                      {proj.tags.map((tag) => (
                        <span key={tag.name} title={tag.name}>
                          <i className={tag.icon}></i>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="work-info">
                    <h3>{proj.title}</h3>
                    <p>{proj.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CREATIVE DESIGN */}
        <section id="creative" className="works-section reveal-section">
          <div className="container">
            <p className="section-label">CREATIVE DESIGN</p>
            <h2 className="section-title">
              Photoshop & <span>Layouts</span>
            </h2>
            <div className="works-grid">
              {creativeWorks.map((work, idx) => (
                <div key={idx} className="work-card">
                  <div className="work-image">
                    <img src={work.image} alt={work.title} />
                    <div className="work-tags">
                      {work.tags.map((tag) => (
                        <span key={tag.name} title={tag.name}>
                          <i className={tag.icon}></i>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="work-info">
                    <h3>{work.title}</h3>
                    <p>{work.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="footer-section reveal-section">
          <div className="container footer-grid">
            <div className="footer-intro">
              <h2 className="footer-title">
                Let's <span>Connect</span>
              </h2>
              <p>Looking for a dedicated Intern or Developer?</p>
            </div>
            <div className="contact-links">
              <a href="mailto:olbidojunex@gmail.com" className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <span>Email Me</span>
                  <p>olbidojunex@gmail.com</p>
                </div>
              </a>
              <a href="tel:+639947587140" className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <span>Call Me</span>
                  <p>+63 994 758 7140</p>
                </div>
              </a>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 • olbido . All Rights Reserved.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
