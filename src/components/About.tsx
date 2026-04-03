import { useEffect, useRef, useState } from "react";
import {
  Code,
  Star,
  Zap,
  Trophy,
  Gamepad2,
  Headphones,
  Film,
  Activity,
  Heart,
  GraduationCap
} from "lucide-react";

import "./About.css";

export function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [extraVisible, setExtraVisible] = useState(false);
  const [educationVisible, setEducationVisible] = useState(false);
  const [hobbiesVisible, setHobbiesVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  /* ===== TITLE REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTitleVisible(true),
      { threshold: 0.5 }
    );
    const intro = document.querySelector(".about-intro-screen");
    if (intro) observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  /* ===== IMAGE SCROLL ===== */
  useEffect(() => {
    const NAVBAR_HEIGHT = 80;
    const IMAGE_STOP_OFFSET = 60;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, NAVBAR_HEIGHT + IMAGE_STOP_OFFSET - rect.top);
      const progress = Math.min(scrolled / (window.innerHeight * 0.25), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== WHO AM I REVEAL (whole box + then typing) ===== */
  useEffect(() => {
    let triggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;

          // after 4s: show WHO AM I card (whole box)
          setTimeout(() => {
            setInfoVisible(true);

            // after card is visible: start typing on title
            setTimeout(() => {
              const el = document.querySelector(".whoami-title");
              el?.classList.add("type");
            }, 200);
          }, 1000); // 4 seconds AFTER scrolled into view
        }
      },
      { threshold: 0.7 }
    );

    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== EXTRA REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setExtraVisible(true),
      { threshold: 0.3 }
    );
    if (extraRef.current) observer.observe(extraRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== EDUCATION REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setEducationVisible(true),
      { threshold: 0.2 }
    );
    if (educationRef.current) observer.observe(educationRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== HOBBIES REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHobbiesVisible(true),
      { threshold: 0.3 }
    );
    const hobbiesElement = document.querySelector(".about-hobbies");
    if (hobbiesElement) observer.observe(hobbiesElement);
    return () => observer.disconnect();
  }, []);

  const counters = [
    { icon: Code, label: "Projects Built", value: 6 },
    { icon: Star, label: "Rating", value: 1020 },
    { icon: Zap, label: "Tech Mastery", value: 22 },
    { icon: Trophy, label: "Problems Solved", value: 350 },
  ];

  const [countValues, setCountValues] = useState(counters.map(() => 0));

  useEffect(() => {
    if (!extraVisible) return;

    const duration = 2000; // 2 seconds for all counters
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setCountValues(counters.map(c => Math.floor(c.value * progress)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [extraVisible]);

  /* ===== IMAGE + TEXT ===== */
  const getImageWidth = () =>
    scrollProgress < 0.2 ? 100 :
    scrollProgress < 0.6 ? 100 - ((scrollProgress - 0.4) / 0.2) * 50 :
    50;

  const NAVBAR_HEIGHT = 80;

  const getImageTransform = () =>
    scrollProgress < 0.2
      ? `translateY(${100 - (scrollProgress / 0.2) * 100 + NAVBAR_HEIGHT}px)`
      : `translateY(${NAVBAR_HEIGHT}px)`;

  const getTextOpacity = () =>
    scrollProgress < 0.4 ? 0 :
    scrollProgress < 0.6 ? (scrollProgress - 0.4) / 0.2 :
    1;

  return (
    <section id="about" className="about-wrapper">
      {/* INTRO TITLE */}
      <div className={`about-intro-screen ${titleVisible ? "show-title" : ""}`}>
        <h1>
          About <span className="grad">me?</span>
        </h1>
      </div>

      {/* MAIN SCROLL AREA */}
      <div ref={containerRef} className="about-scroll">
        <div className="about-sticky">
          {/* IMAGE */}
          <div
            className="about-image"
            style={{ width: `${getImageWidth()}%`, transform: getImageTransform() }}
          >
            <img src="./temp.jpg" alt="Profile" />
          </div>

          {/* INFO PANEL */}
          <div
            ref={infoRef}
            className={`about-info ${infoVisible ? "info-show" : ""}`}
            style={{
              // WHOLE BOX HIDDEN UNTIL infoVisible === true
              opacity: infoVisible ? getTextOpacity() : 0,
              width: infoVisible
                ? getImageWidth() > 80
                  ? "0%"
                  : "50%"
                : "0%"
            }}
          >
            <div className="info-inner">
              <h2 className="whoami-title">
                <span>Who am I?</span>
              </h2>

              <p>
                I'm Ishwar Gupta, a tech-driven learner passionate about building real-world solutions. I enjoy exploring competitive programming, full-stack development, and scalable software architecture. I'm eager to contribute my skills and grow in a challenging professional environment.
              </p>

              <p>
                Beyond code, I enjoy exploring design, experimenting with web interactions, blending creativity with technical precision. My goal is to build solutions that not only perform — but also inspire.
              </p>

              <p>
                B.Tech ECE undergraduate at BIT Mesra with hands-on experience in Full-Stack Projects (MERN & Next.js). Proficient in C++, Data Structures & Algorithms, and Core CS Fundamentals. Seeking opportunities to contribute and tackle challenging technical hurdles.
              </p>


            </div>
          </div>
        </div>
      </div>

      {/* EDUCATION SECTION */}
      <div 
        ref={educationRef} 
        className={`about-education ${educationVisible ? "education-show" : "education-hidden"}`}
      >
        <div className="section-header-box">
          <div className="header-icon-container">
            <GraduationCap size={24} />
          </div>
          <h2>Education</h2>
        </div>
        <div className="education-cards">
          {[
            {
              school: "Birla Institute Of Technology",
              degree: "Bachelor of Technology",
              major: "Electronics And Communication",
              grade: "Cgpa : 8.0",
              years: "2023 – 2027",
              loc: "Mesra, Ranchi",
            },
            {
              school: "Ajeet Public School",
              degree: "Higher Secondary (XII) | CBSE",
              major: "Grade",
              grade: "95.6%",
              years: "2020 – 2021",
              loc: "Tijara, Alwar",
            },
            {
              school: "Arihant International School",
              degree: "Secondary (X) | CBSE",
              major: "Grade",
              grade: "90.6%",
              years: "2018 – 2019",
              loc: "Tijara, Alwa",
            },
          ].map((edu, i) => (
            <div key={i} className="edu-box">
              <div className="edu-row-box">
                <div className="edu-left-box">
                  <span className="edu-school-name">{edu.school}</span>, <span className="edu-degree-box">{edu.degree}</span>
                </div>
                <div className="edu-right-box">{edu.years}</div>
              </div>
              <div className="edu-row-box">
                <div className="edu-left-box edu-sub-text">
                  {edu.major} (<span className="edu-grade-highlight">{edu.grade}</span>)
                </div>
                <div className="edu-right-box edu-loc-box">{edu.loc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div ref={extraRef} className={`about-extra ${extraVisible ? "extra-show" : ""}`}>
        <div className="about-counters">
          {counters.map((c, i) => (
            <div key={i} className="counter-box">
              <c.icon size={42} className="counter-icon" />
              <h3>
                {countValues[i]}
                {c.label !== "Rating" && "+"}
              </h3>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </div>


      <div className={`about-hobbies ${hobbiesVisible ? "hobbies-show" : "hobbies-hidden"}`}>
        <div className="section-header-box">
          <div className="header-icon-container" style={{ background: "#f472b6" }}>
            <Heart size={24} />
          </div>
          <h2>Hobbies</h2>
        </div>
        <div className="hobby-grid">
          <div className="hobby">
            <Headphones size={20} className="hobby-icon" style={{ color: "#a855f7" }} /> 
            <span>Listening to Music</span>
          </div>
          <div className="hobby">
            <Film size={20} className="hobby-icon" style={{ color: "#eab308" }} /> 
            <span>Movies</span>
          </div>
          <div className="hobby">
            <Gamepad2 size={20} className="hobby-icon" style={{ color: "#3b82f6" }} /> 
            <span>Gaming</span>
          </div>
          <div className="hobby">
            <Activity size={20} className="hobby-icon" style={{ color: "#ef4444" }} /> 
            <span>Sports & Fitness</span>
          </div>
        </div>
      </div>

    </section>
  );
}
