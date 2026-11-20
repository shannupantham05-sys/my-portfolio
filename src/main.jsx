import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  ExternalLink,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import "./style.css";

const EMAIL = "your-email@example.com";
const PHONE = "9573897254";
const GITHUB_URL = "https://github.com/shannupantham05-sys";

const pad = (num) => String(num).padStart(2, "0");

const navLinks = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#work"],
  ["Certificates", "#certificates"],
  ["Play", "#play"],
  ["Contact", "#contact"],
];

const skills = [
  ["Programming", ["Java", "Python", "JavaScript", "C"]],
  ["Frontend", ["HTML5", "CSS3", "React"]],
  ["Backend & Data", ["Node.js", "Express", "MongoDB"]],
  ["Tools", ["Git", "GitHub", "VS Code"]],
];

const projects = [
  {
    type: "DATA UI",
    title: "Weather Dashboard",
    href: "./weatherlab/index.html",
    cta: "View live demo",
    text: "A weather dashboard with forecast cards, interactive charts and a responsive layout, built with demo data.",
    stack: ["HTML", "CSS", "JavaScript", "Chart.js"],
  },
  {
    type: "WEB APPLICATION",
    title: "Student Management System",
    href: "./studentlab/index.html",
    cta: "View live demo",
    text: "A clean dashboard concept for managing student information, records and everyday academic workflows.",
    stack: ["React", "JavaScript", "CSS"],
  },
];

function App() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [luckyTile, setLuckyTile] = useState(() => Math.floor(Math.random() * 9));
  const [pickedTile, setPickedTile] = useState(0);
  const [roundResult, setRoundResult] = useState(null);
  const [statusMsg, setStatusMsg] = useState("Choose the tile you think is lucky.");

  const handleChooseTile = (index) => {
    if (roundResult) {
      return;
    }

    const won = index === luckyTile;
    setPickedTile(index);
    setRoundResult({ pick: index });
    setScore((prevScore) => prevScore + (won ? 1 : -1));

    if (won) {
      setStatusMsg("Correct! +1 point.");
    } else {
      setStatusMsg(`Not this one. -1 point. It was tile ${pad(luckyTile + 1)}.`);
    }
  };

  const handleNewRound = () => {
    setLuckyTile(Math.floor(Math.random() * 9));
    setRoundResult(null);
    setStatusMsg("Choose the tile you think is lucky.");
  };

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const handleToggleMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <main className={`site ${theme}`}>
      <nav className="nav shell">
        <a className="brand" href="#home">
          S<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={handleCloseMenu}>
              {label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <button
            type="button"
            className="icon-btn"
            aria-label="Toggle theme"
            onClick={handleToggleTheme}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            type="button"
            className="icon-btn mobile-menu"
            aria-label="Toggle menu"
            onClick={handleToggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <a className="nav-cta" href="#contact">
            Let&apos;s talk <ArrowUpRight size={15} />
          </a>
        </div>
      </nav>

      <section className="hero shell" id="home">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="status-dot"></span> AVAILABLE FOR OPPORTUNITIES
          </div>

          <p className="hero-kicker">HELLO, I&apos;M SHANNU</p>

          <h1>
            Building digital
            <br />
            <span>things that matter.</span>
          </h1>

          <p className="hero-desc">
            Computer Science student. Aspiring software developer. I turn ideas
            into thoughtful, useful and engaging digital experiences.
          </p>

          <div className="hero-buttons">
            <a className="primary-btn" href="#work">
              Explore my work <ArrowUpRight size={17} />
            </a>

            <a className="text-btn" href="#contact">
              Get in touch <ArrowDownRight size={16} />
            </a>
          </div>

          <div className="hero-meta">
            <span>BASED IN INDIA</span>
            <i></i>
            <span>OPEN TO LEARNING &amp; BUILDING</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="photo-frame">
            <img src="./profile.jpeg" alt="Shannu profile portrait" />
            <div className="photo-overlay"></div>
            <div className="photo-caption">
              <span>THE PERSON BEHIND THE CODE</span>
              <b>Curious by nature. Builder by choice.</b>
            </div>
          </div>

          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="floating-chip">
            <Code2 size={15} /> <span>Code · Create · Repeat</span>
          </div>
        </div>

        <a className="scroll-note" href="#about">
          SCROLL TO DISCOVER <span></span>
        </a>
      </section>

      <section className="intro-band">
        <div className="shell intro-inner">
          <span>01 / A LITTLE INTRO</span>
          <p>Curiosity is where every good project begins.</p>
          <Sparkles size={19} />
        </div>
      </section>

      <section className="section shell" id="about">
        <div className="section-head">
          <span className="section-index">01 — ABOUT</span>
          <span className="section-side">THE MINDSET</span>
        </div>

        <div className="about-grid">
          <h2>
            Learning every day.
            <br />
            <em>Creating with purpose.</em>
          </h2>

          <div className="about-text">
            <p>
              I am a Computer Science student with a strong interest in software
              development and modern web technologies. I enjoy building
              interactive, user-friendly applications and exploring new
              technologies to improve my development skills.
            </p>

            <p>
              With hands-on learning in Java, HTML, CSS, JavaScript and React, I
              am continuously growing towards full-stack development. My goal is
              to become a skilled software developer and create practical
              solutions to real-world problems.
            </p>

            <div className="about-stats">
              <div>
                <b>01</b>
                <span>Curious mindset</span>
              </div>

              <div>
                <b>02</b>
                <span>Hands-on learner</span>
              </div>

              <div>
                <b>03</b>
                <span>Problem solver</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="shell">
          <div className="section-head">
            <span className="section-index">02 — TOOLKIT</span>
            <span className="section-side">TECH I WORK WITH</span>
          </div>

          <h2 className="section-title">
            A growing <em>toolkit.</em>
          </h2>

          <div className="skills-grid">
            {skills.map(([category, tags], idx) => (
              <article className="skill-card" key={category}>
                <span className="skill-number">{pad(idx + 1)}</span>
                <h3>{category}</h3>
                <div className="skill-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="work">
        <div className="section-head">
          <span className="section-index">03 — SELECTED WORK</span>
          <span className="section-side">A FEW THINGS I&apos;VE BUILT</span>
        </div>

        <div className="work-title-row">
          <h2 className="section-title">
            Ideas into <em>interfaces.</em>
          </h2>
          <span className="muted">PROJECTS · 2025—2026</span>
        </div>

        <div className="project-list">
          {projects.map((project, idx) => {
            const externalAttrs = project.cta
              ? { target: "_blank", rel: "noreferrer" }
              : {};

            return (
              <article className="project-row" key={project.title}>
                <span className="project-num">{pad(idx + 1)}</span>

                <div className="project-main">
                  <span className="project-type">{project.type}</span>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>

                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  {project.cta && (
                    <a
                      className="text-btn project-link"
                      href={project.href}
                      {...externalAttrs}
                    >
                      {project.cta} <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                <a
                  className="project-arrow"
                  href={project.href}
                  {...externalAttrs}
                  aria-label={
                    project.cta
                      ? `Open ${project.title}`
                      : `Discuss ${project.title}`
                  }
                >
                  <ArrowUpRight size={24} />
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section shell" id="certificates">
        <div className="section-head">
          <span className="section-index">04 — CERTIFICATES</span>
          <span className="section-side">LEARNING MILESTONES</span>
        </div>

        <h2 className="section-title">
          Always <em>learning.</em>
        </h2>

        <div className="project-list">
          <article className="project-row">
            <span className="project-num">01</span>

            <div className="project-main">
              <span className="project-type">
                SIMPLILEARN SKILLUP · POWERED BY GOOGLE CLOUD
              </span>
              <h3>
                Python Basic to Advance &amp; Introduction to Artificial
                Intelligence
              </h3>
              <p>Completed on July 2025.</p>

              <div className="project-stack">
                <span>JULY 2025</span>
              </div>

              <a
                className="text-btn project-link"
                href="./certificates/python-ai.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Click now <ExternalLink size={13} />
              </a>
            </div>

            <a
              className="project-arrow"
              href="./certificates/python-ai.pdf"
              target="_blank"
              rel="noreferrer"
              aria-label="Click now to open certificate"
            >
              <ArrowUpRight size={24} />
            </a>
          </article>
        </div>
      </section>

      <section className="play-section" id="play">
        <div className="shell play-grid">
          <div>
            <div className="section-head">
              <span className="section-index">05 — A LITTLE PLAYGROUND</span>
              <span className="section-side">JUST FOR FUN</span>
            </div>

            <h2>
              Not all code
              <br />
              has to be <em>serious.</em>
            </h2>

            <p>
              A tiny number-guessing challenge. Pick the lucky tile and see if
              you can beat your score.
            </p>

            <div className="play-score">
              SCORE <b>{score}</b>
            </div>
          </div>

          <div className="game-card">
            <div className="game-top">
              <span>
                <Gamepad2 size={16} /> QUICK GAME
              </span>
              <span>{pad(pickedTile + 1)} / 09</span>
            </div>

            <h3>Find the lucky tile.</h3>
            <p aria-live="polite">{statusMsg}</p>

            <div className="tile-grid">
              {Array.from({ length: 9 }, (_, i) => {
                let tileClass = "tile";
                if (roundResult && i === luckyTile) {
                  tileClass += " win";
                } else if (
                  roundResult &&
                  i === roundResult.pick &&
                  i !== luckyTile
                ) {
                  tileClass += " miss";
                }

                return (
                  <button
                    type="button"
                    key={i}
                    className={tileClass}
                    aria-label={`Tile ${i + 1}`}
                    onClick={() => handleChooseTile(i)}
                  >
                    {pad(i + 1)}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="primary-btn game-btn"
              onClick={handleNewRound}
            >
              New round <ArrowUpRight size={16} />
            </button>

            <small>Correct guess: +1 point · Wrong guess: -1 point</small>
          </div>
        </div>
      </section>

      <section className="section shell contact-section" id="contact">
        <div className="section-head">
          <span className="section-index">06 — CONTACT</span>
          <span className="section-side">HAVE A GOOD IDEA?</span>
        </div>

        <h2>
          Let&apos;s make
          <br />
          <em>something great.</em>
        </h2>

        <p className="contact-copy">
          Have a project, opportunity or just want to connect? I&apos;d be happy
          to hear from you.
        </p>

        <a className="contact-email" href={`mailto:${EMAIL}`}>
          {EMAIL} <ArrowUpRight size={20} />
        </a>

        <div className="socials">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub <ExternalLink size={13} />
          </a>

          <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
            <Linkedin size={17} /> LinkedIn <ExternalLink size={13} />
          </a>

          <a href={`mailto:${EMAIL}`}>
            <Mail size={17} /> Email <ExternalLink size={13} />
          </a>
        </div>

        <p
          style={{
            marginTop: "32px",
            fontSize: "12px",
            opacity: 0.72,
            letterSpacing: "0.4px",
          }}
        >
          For any queries:{" "}
          <a href={`tel:${PHONE}`} style={{ textDecoration: "underline" }}>
            {PHONE}
          </a>
        </p>
      </section>

      <footer className="footer shell">
        <a className="brand" href="#home">
          S<span>.</span>
        </a>
        <span>DESIGNED &amp; BUILT WITH CURIOSITY</span>
        <span>© 2026 SHANNU</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
