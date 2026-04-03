import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Home.css";

import { FaGithub, FaLinkedin, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { SiLeetcode, SiGmail } from "react-icons/si";

interface HeroProps {
  theme: "light" | "dark"; // pass theme from global state
}

export function Home({ theme }: HeroProps) {
  const roles = [
    "DSA Enthusiast",
    "Software Developer",
    "Data Analyst"
  ];

  const connectLinks = [
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/ishwar-gupta-9983a5315/" },
    { icon: FaInstagram, link: "https://www.instagram.com/ishwargupta2004/" },
    { icon: FaTwitter, link: "https://x.com/IshwarGupt60868" },
    { icon: FaWhatsapp, link: "https://wa.me/917742213060" },
    { icon: SiGmail, link: "mailto:eshugupta176@gmail.com" },
  ];

  const workLinks = [
    { icon: FaGithub, link: "https://github.com/ishwargupta2004" },
    { icon: SiLeetcode, link: "https://leetcode.com/u/frostok/" },
  ];

  const [typedRoles, setTypedRoles] = useState("");
  const rolesText = "Electronics Engineer | Full Stack Developer | Tech Explorer";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedRoles(rolesText.slice(0, i + 1));
      i++;
      if (i === rolesText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };


  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${theme === "light" ? "/j.jpg" : "/Hero.jpg"})`,
        }}
      />

      <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi! I’m <br />
          <span className="gradient-text hero-name-line">ISHWAR GUPTA</span>
          <motion.div className="hero-line" variants={itemVariants} />
        </motion.h1>

        <motion.p className="hero-intro typing-effect" variants={itemVariants}>
          {typedRoles}
        </motion.p>

        <motion.p className="hero-intro" variants={itemVariants}>
          An Algorithmic Strategist & Full-Stack Architect crafting the future of high-performance digital solutions.
        </motion.p>

        <motion.div className="hero-roles" variants={itemVariants}>
          {roles.map((r, i) => (
            <motion.div key={i} className="role-tag" variants={itemVariants}>
              {r}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-info" variants={itemVariants}>
          {[
            { label: "📍 Location", value: "Gurugram, Haryana, India" },
            { label: "💼 Expertise", value: "DSA, Full Stack" },
            { label: "📞 Contact", value: "eshugupta176@gmail.com" },
          ].map((info, i) => (
            <motion.div key={i} className="info-card" whileHover={{ scale: 1.05, y: -3 }} variants={itemVariants}>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-socials" variants={itemVariants}>
          <div className="social-group">
            <h5>Connect with me</h5>
            <div className="social-icons">
              {connectLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                  className="social-icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? '#fff' : '#000', color: theme === 'dark' ? '#000' : '#fff' }}
                >
                  <s.icon size={26} />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="social-group">
            <h5>See what I'm doing</h5>
            <div className="social-icons">
              {workLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                  className="social-icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme === 'dark' ? '#fff' : '#000', color: theme === 'dark' ? '#000' : '#fff' }}
                >
                  <s.icon size={26} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          variants={itemVariants}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
