import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [scrollWidth, setScrollWidth] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false); // New state for floating button
  const nameRef = useRef(null);

  // Added icon mapping for tags
  const projects = [
    {
      title: "BNS Santa Cruz - POS System",
      desc: "A specialized Point of Sale system designed for Car Accessories and business management.",
      image: "/profile.png", 
      link: "https://pos.bns-santacruz.com",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel" },
        { name: "PHP", icon: "fab fa-php" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "Tailwind", icon: "fab fa-css3-alt" }
      ]
    },
    {
      title: "BNS Santa Cruz - Official Website",
      desc: "The primary web platform for BNS Santa Cruz showcasing products and services.",
      image: "/web-screenshot.jpg", 
      link: "https://bns-santacruz.com",
      tags: [
        { name: "Laravel", icon: "fab fa-laravel" },
        { name: "PHP", icon: "fab fa-php" },
        { name: "MySQL", icon: "fas fa-database" },
        { name: "JavaScript", icon: "fab fa-js" }
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ["Full Stack Developer", "Photoshop Designer", "PC Troubleshooter", "Creative Coder"];

  useEffect(() => {
    const currentFullRole = roles[roleIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        const nextText = currentFullRole.slice(0, roleText.length + 1);
        setRoleText(nextText);
        if (nextText === currentFullRole) {
          setTimeout(() => setIsDeleting(true), 3000);
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
    const timer = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollWidth(progress);
      
      // Show button after scrolling 400px
      setShowScrollTop(window.scrollY > 400);
    };
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsRevealed(true); },
      { threshold: 0.1 }
    );
    if (nameRef.current) observer.observe(nameRef.current);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="portfolio-wrapper">
      {/* Font Awesome CDN for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <div className="custom-cursor" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}></div>
      <div className="scroll-progress-line" style={{ transform: `scaleX(${scrollWidth / 100})` }}></div>

      {/* Floating Scroll Up Button */}
      <button className={`scroll-up-btn ${showScrollTop ? "pop" : ""}`} onClick={scrollToTop}>
        <i className="fas fa-arrow-up"></i>
      </button>

      <header className="fixed-header">
        <div className="container header-content">
          <a href="#home" className="nav-brand">JUNEX.DEV</a>
          <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
          <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#works" onClick={() => setIsMenuOpen(false)}>Works</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="home" className="hero section-padding">
          <div className="container hero-grid">
            <div className="hero-text">
              <h2 className="greeting">Hewow!</h2>
              <h1 className={`name-title ${isRevealed ? "reveal" : ""}`} ref={nameRef}>Olbido, Maximino Jr.</h1>
              <p className="hero-sub">{roleText}<span className="cursor">|</span></p>
              <div className="cta-group">
                <button className="btn-outline">Resume</button>
                <button className="btn-solid">Let's Talk</button>
              </div>
            </div>

            <div className="hero-visual">
              <div className="resume-card">
                <div className="card-header">
                  <div className="profile-dot"></div>
                  <span>Short Resume Summary</span>
                </div>
                <div className="card-body relative-body">
                  <div className="photo-slot"><img src="/profile.png" alt="Profile" /></div>
                  <div className="card-info">
                    <h3 className="card-name">Olbido, Maximino Jr.</h3>
                    <p className="card-edu">Tagoloan Community College</p>
                    <div className="card-divider"></div>
                    <strong className="skill-title">🛠️ Technical Skills</strong>
                    <ul className="card-skills">
                      <li><span>•</span> MS Office & Photoshop</li>
                      <li><span>•</span> PC Troubleshooting</li>
                    </ul>
                    <strong className="skill-title">🧠 Programming</strong>
                    <ul className="card-skills">
                      <li><span>•</span> Web Dev (HTML, CSS, JS, PHP)</li>
                    </ul>
                  </div>
                </div>
                <div className="card-badge">Available for OJT</div>
              </div>
            </div>
          </div>
        </section>

        <section id="works" className="works-section section-padding">
          <div className="container">
            <p className="section-label">PROJECTS</p>
            <h2 className="section-title">My <span>Works</span></h2>
            <div className="works-grid">
              {projects.map((proj, idx) => (
                <a href={proj.link} key={idx} className="work-card" target="_blank" rel="noopener noreferrer">
                  <div className="work-image">
                    <img src={proj.image} alt={proj.title} />
                    <div className="work-tags">
                      {proj.tags.map(tag => (
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
      </main>
    </div>
  );
}

export default App;