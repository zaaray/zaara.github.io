import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, SmileIcon, ExternalLink } from "lucide-react";
import zaaraImage from './images/zaara-website1.png';
import proj1 from "./images/proj1.png";
import proj2 from "./images/proj2.png";
import proj3 from "./images/proj3.png";
// Put only the files you actually have in /src/images/icons/
const SKILL_ICONS = {
  python: require("./images/python.png"),
  java: require("./images/java.png"),
  cpp: require("./images/c.png"),
  javascript: require("./images/js.png"),
  sql: require("./images/sql.png"),
  solidity: require("./images/solidity.png"),
  react: require("./images/react.png"),
  github: require("./images/github.png"),
  gis: require("./images/gis.png"),
  figma: require("./images/figma.png"),
};



// --- Helper: smooth scroll to anchors ---
function useSmoothScroll() {
  useEffect(() => {
    const handler = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute('href');
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);
}

// --- Cute floating sparkle badge ---
const SparkleBadge = () => (
  <motion.span
    className="badge"
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4, type: "spring", stiffness: 120 }}
  >
    <SmileIcon className="headline" />
    Hi, nice to meet you!
  </motion.span>
);

function Header() {
  const [active, setActive] = useState("hero"); // highlight Home by default
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"));
    if (!sections.length) return;
  
    const HEADER_H = 64; // keep in sync with your CSS
    const pickActive = () => {
      // Use a point ~1/3 down from the top to feel natural
      const probe = window.scrollY + HEADER_H + window.innerHeight * 0.33;
  
      let current = "hero";
      for (const s of sections) {
        const top = s.offsetTop;
        const bottom = top + s.offsetHeight;
        if (probe >= top && probe < bottom) {
          current = s.id;
          break;
        }
      }
  
      setActive(current);
      setSolid(window.scrollY > 8);
    };
  
    // run once and on scroll/resize
    pickActive();
    window.addEventListener("scroll", pickActive, { passive: true });
    window.addEventListener("resize", pickActive);
  
    return () => {
      window.removeEventListener("scroll", pickActive);
      window.removeEventListener("resize", pickActive);
    };
  }, []);
  
  
  return (
    <header className={`header ${solid ? 'is-solid' : ''}`}>
      <div className="container header-row">
      <a href="#hero" className="brand">
      <span className="brand-text">Zaara</span>
      <span className="brand-smile"> ☺︎</span>
      </a>

        <nav className="nav desktop-only">
        <a href="#hero" className={`nav-link ${active === "hero" ? "active" : ""}`}>Home</a>
        <a href="#about" className={`nav-link ${active === "about" ? "active" : ""}`}>About</a>
        <a href="#work" className={`nav-link ${active === "work" ? "active" : ""}`}>Work</a>
        <a href="#projects" className={`nav-link ${active === "projects" ? "active" : ""}`}>Projects</a>
        <a href="#contact" className={`nav-link ${active === "contact" ? "active" : ""}`}>Contact</a>
      </nav>

      </div>

      {/* Mobile sheet */}
      
    </header>
  );
}


// --- Section wrappers with reveal on scroll ---
const FadeInWhenVisible = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

// --- Hero ---
function Hero() {
  useSmoothScroll();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 60]);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <FadeInWhenVisible>
          <div className="hero-copy">
            <SparkleBadge />
            <motion.h1
            className="headline handwriting"
            initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 6, ease: "easeOut" }}
          >
            I'm Zaara
          </motion.h1>
            {/* <div className="row gap">
              <a className="btn" href="#projects">See projects <ArrowRight className="icon-inline" /></a>
              <a className="link" href="#work">Experience <ArrowRight className="icon-inline" /></a>
            </div> */}
            <div className="row social">
              <a
                href="https://github.com/zaaray"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
              >
                <Github className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/zaara-yakub/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
              >
              <Linkedin className="icon" />
            </a>
              <a
              href="mailto:zaarayakub@gmail.com"
              aria-label="Email"
              >
              <Mail className="icon" />
            </a>
            </div>
          </div>
        </FadeInWhenVisible>

        {/* Right side — Canva-ready image placeholder with subtle parallax */}
        <motion.div style={{ y }} className="hero-art">
          <div className="artbox">
            <motion.img
              src={zaaraImage}
              alt="zaara profile"
              className="pfp-image"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              whileHover={{ rotate: -2, y: -4 }}
              style={{ filter: 'drop-shadow(0 10px 24px rgba(0,0,0,0.12))' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- About ---
function About() {
  return (
    <section id="about" className="section section--full about">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="section-title">About me</h2>
          <p className = "intro-paragraph">
              I recently graduated from Lehigh University with a degree in <b>Computer Science and Engineering</b>. I love turning complex problems into intuitive, data-driven solutions and creating pretty visualizations.
            </p>
            <p className = "intro-paragraph">
            My experience spans <b>AI/ML research</b> in genetics, <b>data science</b> for a <b>cybersecurity startup</b>’s customer success team, and a blend of data science and <b>software engineering </b>at an <b>AI health-tech startup</b>.
            </p>
            <p className = "intro-paragraph">
            Outside of coding, I like to spend my time singing, baking, sketching, or learning how to backflip (it's a work in progress).
            </p>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}

// --- Work (Split Layout: Internships | Technical Skills) ---
function Work() {
  const experiences = [
    {
      role: "AI_PREMie — Software Engineer & Data Scientist",
      time: "May 2023 – Jul 2023",
      bullets: [
        "Developed a Python application to automate cleaning, formatting, and analysis of 100+ raw mass-spectrometry files weekly, reducing researcher analysis time by 55%.",
        "Implemented a statistical analysis algorithm that identified key peptide biomarkers between diseased and healthy patient groups, informing disease diagnosis.",
        "Completed internship onsite in Dublin, collaborating directly with cross-functional researchers and engineers.",
      ],
    },
    {
      role: "Callsign — Data Scientist",
      time: "Apr 2022 – Oct 2022",
      bullets: [
        "Improved fraud detection performance on 1M+ transactions using Python, SQL, and AWS.",
        "Analyzed retention metrics with Customer Success to optimize client engagement.",
        "Built dashboards with Pandas and Matplotlib to visualize fraud trends.",
      ],
    },
    {
      role: "Cold Spring Harbor Laboratory — AI/ML Researcher",
      time: "Aug 2020 – May 2021",
      bullets: [
        "Designed, implemented, and benchmarked 5 neural network architectures on genomic datasets, improving interpretability by 30%.",
        "Identified disease-linked genome variants cited in internal research papers and poster sessions.",
        "Presented findings at the RECOMB/ISCB Conference to 200+ researchers.",
      ],
    },
  ];

  // Use iconKey values that match SKILL_ICONS keys above
  const skills = [
    {
      category: "Languages",
      items: [
        { name: "Python", iconKey: "python" },
        { name: "Java", iconKey: "java" },
        { name: "C/C++/C#", iconKey: "cpp" },
        { name: "R" },                    // no icon yet → will be a text chip
        { name: "JavaScript", iconKey: "javascript" },
        { name: "SQL", iconKey: "sql" },
        { name: "Rust" },                 // text chip
        { name: "Solidity", iconKey: "solidity" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "React", iconKey: "react" },
        { name: "Node.js" },              // text chip
        { name: "Flutter" },              // text chip
        { name: "TensorFlow" },           // text chip
        { name: "Unity" },                // text chip
        { name: "ArcGIS SDK", iconKey: "gis" },
      ],
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "AWS" },                  // text chip
        { name: "BigQuery" },             // text chip
        { name: "MongoDB" },              // text chip
        { name: "GitHub", iconKey: "github" },
        { name: "Figma", iconKey: "figma" },
        { name: "Heroku" },               // text chip
        { name: "Bitbucket" },            // text chip
        { name: "Jira" },                 // text chip
      ],
    },
  ];

  return (
    <section id="work" className="section section-soft work-split">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="section-title">Work & Skills</h2>
        </FadeInWhenVisible>

        <div className="work-grid">
          {/* LEFT — Experience */}
          <div className="work-col">
            <FadeInWhenVisible>
              <h3 className="subsection-title">Internship Experience</h3>
            </FadeInWhenVisible>

            {experiences.map((exp, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.1}>
                <div className="card hoverable">
                  <div className="card-header between">
                    <h3 className="card-title">{exp.role}</h3>
                    <span className="muted small">{exp.time}</span>
                  </div>
                  <div className="card-content">
                    <ul className = "card-text">
                      {exp.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

          {/* RIGHT — Skills */}
          <div className="skills-col">
          <FadeInWhenVisible>
              <h3 className="subsection-title">Technical Skills</h3>
            </FadeInWhenVisible>
            {skills.map((block) => (
              <FadeInWhenVisible key={block.category}>
                <div className="card hoverable">
                  <div className="card-header">
                    <h3 className="card-title">{block.category}</h3>
                  </div>
                  <div className="card-content">
                    <ul className="skill-icons">
                      {block.items.map((skill) => {
                        const iconSrc =
                          skill.iconKey && SKILL_ICONS[skill.iconKey];
                        return (
                          <li
                            key={skill.name}
                            className={`skill-icon-item ${
                              iconSrc ? "" : "text-only"
                            }`}
                          >
                            {iconSrc && (
                              <img
                                src={iconSrc}
                                alt={skill.name}
                                className="skill-icon-img"
                                onError={(e) => (e.currentTarget.style.display = "none")}
                              />
                            )}
                            <span>{skill.name}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const ProjectCardContent = ({ project }) => (
  <>
    <div className="card-header">
      <h3 className="card-title row gap-sm">
        {project.title}
        {project.link && <ExternalLink className="icon-xs faded" />}
      </h3>
    </div>
    <div className="card-content">
      <div className="thumb">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="thumb-img"
          />
        ) : (
          <span className="thumb-hint">Preview coming soon ✨</span>
        )}
      </div>
      <p className="card-text">{project.blurb}</p>
    </div>
  </>
);

function Projects() {
  const items = [
    {
      title: "RiVR Watershed Explorers - VR Game",
      blurb:
        "VR Game with Unity + ArcGIS Capstone Project, partnered with Jacobsburg Environmental Center to raise water quality awareness",
      link: "",
      image: proj2,
    },
    {
      title: "Cultivatr — Farm ↔ Land Matching",
      blurb: "Zillow for farmers, farmland listing discovery, and local marketplace loop.",
      link: "",                  // no link yet
      image: proj1,
    },
    {
      title: "Pegasus — Assistive Pegboard",
      blurb:
        "React Native + Arduino pegboard cognitive pattern recognition app with progress tracking.",
      link: "https://github.com/zaaray/pegasus",
      image: proj3,
    },
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="section-title">Projects</h2>
        </FadeInWhenVisible>

        <div className="grid-3">
          {items.map((p, i) => (
            <FadeInWhenVisible key={p.title} delay={i * 0.06}>
              {p.link ? (
                <motion.a
                  href={p.link}
                  target={p.link.startsWith("http") ? "_blank" : undefined}
                  rel={p.link.startsWith("http") ? "noreferrer" : undefined}
                  className="card linkcard"
                  whileHover={{ y: -6 }}
                >
                  <ProjectCardContent project={p} />
                </motion.a>
              ) : (
                <motion.div className="card no-link" whileHover={{ y: -3 }}>
                  <ProjectCardContent project={p} />
                </motion.div>
              )}
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}


// --- Contact ---
function Contact() {
  return (
    <section id="contact" className="section section-soft-alt">
      <div className="container">
        <FadeInWhenVisible>
          <h2 className="section-title">Get in touch</h2>
          <p className="contact-text">
            I’m looking for full-time opportunities in product/data/engineering. Email me or say hi on
            LinkedIn — I’ll reply!
          </p>
        </FadeInWhenVisible>
        <div className="row gap">
          <a className="btn" href="mailto:zaarayakub@gmail.com"><Mail className="icon-inline" /> Email</a>
          <a className="btn" href="https://www.linkedin.com/in/zaara-yakub/" target="_blank" rel="noreferrer">
            <Linkedin className="icon-inline" /> LinkedIn
          </a>
          <a className="btn" href="https://github.com/zaaray" target="_blank" rel="noreferrer">
            <Github className="icon-inline" /> GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
function Footer() {
  return (
    <footer className="footer">
      <div className="container">© {new Date().getFullYear()} Zaara Yakub • Built with React ✨</div>
    </footer>
  );
}

// --- Page ---
export default function PersonalSite() {
  return (
    <div className="app-root">
      <Header />
      <main>
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

