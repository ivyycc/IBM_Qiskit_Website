// src/App.js

import React, { useEffect, useState } from 'react';
import './App.css';
import './index.css';
import { Section } from './Section';
import { OrganizersSection } from "./OrganizersSection";
import ScheduleSection from "./ScheduleSection";
import { Menu, X } from "lucide-react";
import WitsMap from "./WitsMap";
import { ChevronUpIcon } from "lucide-react"; // optional, replace with your SVG if not using Lucide
import TypingText from './TypingText';// Import the JS for typing effect


function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop;
      setVisible(scrollPosition > 100); // lower threshold for mobile
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check on mount in case already scrolled
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-4 right-4 z-50 p-4 rounded-full bg-pink-600 text-white shadow-lg 
        transition-opacity duration-300 transform hover:scale-110 hover:shadow-pink-500
        ${visible ? "opacity-90" : "opacity-0 pointer-events-none"}
      `}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="w-6 h-6 md:w-8 md:h-8" />
    </button>
  );
}



// Navbar remains the same, it's already well-structured.
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: "#about", label: "About" },
    { href: "#speakers", label: "Speakers" },
    { href: "#schedule", label: "Schedule" },
    { href: "#organizers", label: "Organizers" },
    { href: "#resources", label: "Resources" },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-sm text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-yellow-500 font-bold text-xl">Qiskit Fall Fest</a>
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-yellow-500 font-semibold transition-colors duration-300">
              {link.label}
            </a>
          ))}
        </div>
        <button className="md:hidden text-yellow-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 pb-6 bg-black">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="hover:text-yellow-500 font-semibold">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        
        {/* Event Info */}
        <div className="text-center md:text-left">
          <p className="font-semibold">© 2025 IBM Qiskit Fall Fest with Wits University</p>
          <p className="text-gray-400 text-sm">Organized by IBM Quantum x Wits students</p>
        </div>

        {/* Social / Links */}
        <div className="flex space-x-4">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
            LinkedIn
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-yellow-500 transition-colors">
            Instagram
          </a>
        </div>

      </div>
    </footer>
  );
}


function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className=" font-mono bg-black">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div 
          className="relative text-white bg-cover bg-center flex items-center justify-center min-h-[80vh]"
          style={{ backgroundImage: "url('/Fall%20Fest%20Graphics/Illustration%20Exports/Full_Illustration.png')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/80"></div>
          <div className="relative z-10 text-center p-4 space-y-6">
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500">
              <TypingText/>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl">October, 2025 • Wits University</p>
            <a
              href="https://www.ibm.com/events/qiskit"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-yellow-400 text-black font-semibold rounded-md shadow-lg hover:scale-105 transition-transform duration-300 pulse-glow"
            >
              Register Now
            </a>

          </div>
        </div>

        {/* About Section */}
        <Section id="about" className="bg-black text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image on the left */}
            <div className="flex justify-center">
              <img
                src="/Fall Fest Graphics/Badge/Badge_Dark.svg"
                alt="Qiskit Badge"
                className="w-72 h-auto transform transition duration-500 hover:rotate-6 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
              />
            </div>
            {/* Text on the right */}
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-yellow-500">About the Event</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Get ready to explore the quantum world with us! The Qiskit Fall Fest, the world's largest gathering of student-run quantum computing events, 
                is officially coming to Wits in 2025.<br/>
                <br/>
                This isn't just a series of lectures—it's a chance to join a vibrant, global community supported by IBM Quantum. 
                Whether you're a curious beginner or a seasoned coder, you'll learn through exciting workshops, collaborative hackathons, and dynamic community meetups. By participating, you're not only learning about
                the future of technology but also helping to put Wits at the forefront of quantum education and innovation.
              </p>
            </div>
          </div>
        </Section>

        {/* Speakers Section (Example update) */}
        <Section id="speakers" className="bg-blue-800 text-white">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-bold text-yellow-500">Speakers</h2>
            <p className="text-lg text-blue-200 mt-2">Meet the pioneers leading the quantum charge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Speaker Card - TBC */}
            <div className="bg-black p-6 rounded-md shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50">
              <div className="w-32 h-32 mb-4 rounded-full border-4 border-yellow-400 bg-gray-700 flex items-center justify-center text-xl font-bold text-yellow-400">
                ?
              </div>
              <h3 className="font-bold text-2xl text-white">TBC</h3>
              <p className="text-pink-300">Speaker coming soon</p>
              <p className="text-sm text-blue-300 mt-2 italic">Stay tuned!</p>
            </div>

            {/* Speaker Card - Known */}
            <div className="bg-black p-6 rounded-md shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50">
              <div className="w-32 h-32 mb-4 rounded-full border-4 border-yellow-400 bg-gray-700 flex items-center justify-center text-2xl font-bold text-yellow-400">
                SK
              </div>
              <h3 className="font-bold text-2xl text-white">Shawal Kassim</h3>
              <p className="text-pink-300">Wits University Researcher</p>
              <p className="text-sm text-blue-300 mt-2 italic">Reveal coming soon!</p>
            </div>
          </div>
        </Section>


        {/* Schedule Section */}
        <ScheduleSection />

        {/* Organizers Section */}
        <OrganizersSection />

        {/* Resources Section */}
        <Section id="resources" className="bg-black text-white">
          <div
            id="resources-venue"
            className="w-full py-16 bg-black text-white flex flex-col items-center"
          >
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-yellow-500">
                Resources & Venue
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl px-4 sm:px-8">
              {/* Left Column: Venue Details & Map */}
              <div className="bg-blue-900 rounded-lg p-6 md:p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Location</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  The Qiskit Fall Fest will be hosted at the WITS (specific location TBC).
                  
                </p>
                      <div 
                          className="w-full h-80 lg:h-96 rounded-lg overflow-hidden shadow-2xl transition-all duration-300"
                          style={{
                            border: '2px solid transparent', // Keep transparent border for consistency
                            boxShadow: '0 0 15px rgba(210, 74, 140, 0.64)' // Apply the pink glow here
                          }}
                        >
                  <WitsMap />
                </div>
              </div>
              {/* Right Column: Key Resources */}
              <div className="bg-black rounded-lg p-6 md:p-8 shadow-xl border-2 border-blue-900">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Key Resources</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Here are some essential links to help you get started with Qiskit and prepare for the event.
                </p>
                <ul className="space-y-4">
                  {[
                    { label: "Qiskit Official Website", link: "https://qiskit.org/" },
                    { label: "Qiskit Learning Portal", link: "https://learn.qiskit.org/" },
                    { label: "Qiskit GitHub", link: "https://github.com/Qiskit" },
                  ].map((res) => (
                    <li key={res.link}>
                      <a
                        href={res.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-5 rounded-lg bg-blue-800 hover:bg-blue-900 text-white font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <span className="flex items-center space-x-2">
                          {res.label.startsWith("🌐") && <span>🌐</span>}
                          {res.label.startsWith("📘") && <span>📘</span>}
                          {res.label.startsWith("💻") && <span>💻</span>}
                          <span className="flex-1">{res.label.substring(res.label.indexOf(" ") + 1)}</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      <ScrollToTop />
      </main>
      <Footer />

    </div>
  );
}

export default App;