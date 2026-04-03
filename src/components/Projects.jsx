import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./projects.css";

const PROJECTS = [
  {
    title: "Spott – AI-Powered Event Organiser",
    desc: "Built a full-stack event platform. Implemented QR code check-in, real-time dashboard, AI event description generation with Groq AI, and Clerk auth with webhook sync.",
    ss: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1200", // Event organization mockup
    tech: ["Next.js", "MongoDB", "Groq AI", "Clerk", "Tailwind CSS"],
    live: "https://spott-gtd2.vercel.app/",
    code: "https://github.com/ishwargupta2004/Spott",
  },
  {
    title: "Divine - AI Customer Support Chatbot",
    desc: "Built a SaaS app using Next.js for businesses to configure an AI assistant. Integrated Groq AI (LLaMA 3.3 70B) for intelligent responses based on business data. Implemented Clerk webhook auth.",
    ss: "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1200", // AI Support chatbot mockup
    tech: ["Next.js", "MongoDB", "Groq AI", "Clerk", "Tailwind CSS"],
    live: "https://chatbot-psi-gray.vercel.app/",
    code: "https://github.com/ishwargupta2004/Chatbot",
  },
  {
    title: "My_AMAZON – Full-Stack E-Commerce",
    desc: "A fully-functional MERN e-commerce platform with JWT authentication, Razorpay integration, and a responsive UI. Features include product browsing, cart management, search/filtering, and optimized performance via lazy loading.",
    ss: "https://images.pexels.com/photos/5632381/pexels-photo-5632381.jpeg?auto=compress&cs=tinysrgb&w=1200", // E-commerce mockup
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Razorpay"],
    live: "https://my-amazon-frontend.vercel.app/",
    code: "https://github.com/ishwargupta2004/My_Amazon_Frontend",
  },
  {
    title: "My_Contacts – Professional Contact Manager",
    desc: "A robust, full-stack contact management system engineered with MVC architecture. Features a mobile-first responsive design, seamless CRUD operations (Create, Read, Update, Delete), and dynamic server-side rendering for a high-performance experience.",
    ss: "https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1200", // Sleek smartphone interaction mockup
    tech: ["Node.js", "Express.js", "MongoDB", "EJS", "Bootstrap"],
    live: "https://my-contacts-b2cb.onrender.com",
    code: "https://github.com/ishwargupta2004/My_Contacts",
  },
  {
    title: "Pexels – Premium Image Explorer",
    desc: "A sophisticated image discovery and curation platform built with React and Vite. Features real-time Pexels API integration, intelligent search filtering, and persistent local storage for saved collections with a responsive Bootstrap UI.",
    ss: "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1200", // Photo gallery mockup
    tech: ["React", "Vite", "Pexels API", "Axios", "Bootstrap"],
    live: "https://project-2-pexels.vercel.app/",
    code: "https://github.com/ishwargupta2004/Project-2_Pexels",
  },
  {
    title: "My Recipe – Dynamic Recipe Engine",
    desc: "A dynamic website built with React.js using the MealDB API to search thousands of recipes by name, category, and ingredients. Includes real-time data fetching and interactive filtering for an enhanced user experience.",
    ss: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200", // High-quality food recipe image
    tech: ["React", "MealDB API", "JavaScript", "CSS"],
    live: "https://myrecipie.vercel.app/",
    code: "https://github.com/ishwargupta2004/recipie",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="projects-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="projects"
    >
      <motion.div
        className="projects-card"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Title Animation */}
        <motion.h2
                  initial={{ x: -200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="projects-title"
                >
          🚀My <span className="proj">Projects</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          A collection of my full stack development and AI integration projects.
        </motion.p>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.ss} alt={p.title} className="project-image" />
              </motion.div>

              <div className="project-content">
                <h3 className="project-heading">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={p.code}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="code-btn"
                  >
                    <Github size={14} /> Code
                  </motion.a>

                  <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="live-btn"
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
