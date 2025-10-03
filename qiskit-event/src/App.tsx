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
import CountdownTimer from './countdown';


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
        <a href="#" className="text-yellow-500 font-bold text-xl">IBM Qiskit Fall Fest</a>
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
<footer className="bg-black text-white border-t border-gray-800 py-12 px-6">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">

    {/* Event Info */}
    <div className="text-center md:text-left space-y-1">
      <p className="font-semibold text-lg">© 2025 IBM Qiskit Fall Fest with Wits University</p>
      <p className="text-gray-400 text-sm">Organized by IBM Quantum x Wits students</p>
    </div>

    {/* Social / Links */}
    <div className="flex flex-wrap gap-4 justify-center md:justify-end">
      {/* Blog */}
      <a
        href="https://www.ibm.com/quantum/blog"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="IBM Quantum Blog"
        className="text-gray-400 hover:text-yellow-500 hover:scale-110 transition-transform duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 2H9C7.9 2 7 2.9 7 4v16l7-3 7 3V4c0-1.1-.9-2-2-2zm0 15l-5-2.18L9 17V4h10v13z" />
        </svg>
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/showcase/ibm-quantum/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="IBM Quantum LinkedIn"
        className="text-gray-400 hover:text-yellow-500 hover:scale-110 transition-transform duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 19h-2.5v-9h2.5v9zm-1.25-10.28c-.83 0-1.5-.68-1.5-1.5s.67-1.5 1.5-1.5 1.5.68 1.5 1.5-.67 1.5-1.5 1.5zm13 10.28h-2.5v-4.5c0-1.08-.02-2.47-1.5-2.47s-1.73 1.18-1.73 2.4v4.57h-2.5v-9h2.4v1.23h.03c.33-.63 1.14-1.28 2.35-1.28 2.51 0 2.97 1.65 2.97 3.79v5.26z" />
        </svg>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/qiskit"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="IBM Quantum YouTube"
        className="text-gray-400 hover:text-yellow-500 hover:scale-110 transition-transform duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a2.996 2.996 0 0 0-2.11-2.112C19.24 3.5 12 3.5 12 3.5s-7.24 0-9.387.574a2.996 2.996 0 0 0-2.111 2.112A31.65 31.65 0 0 0 0 12a31.65 31.65 0 0 0 .502 5.814 2.996 2.996 0 0 0 2.111 2.112C4.76 20.5 12 20.5 12 20.5s7.24 0 9.387-.574a2.996 2.996 0 0 0 2.11-2.112A31.65 31.65 0 0 0 24 12a31.65 31.65 0 0 0-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    </div>

  </div>
</footer>

  );
}


function App() {
  const [open, setOpen] = useState(false); // ✅ declare state here

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className=" font-mono bg-black bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat bg-auto">
      <Navbar />
      <main>
        {/* Hero Section */}
        <div
          className="relative w-full text-white bg-cover bg-center flex items-center justify-center min-h-screen"
          style={{ backgroundImage: "url('/Fall%20Fest%20Graphics/Illustration%20Exports/Full_Illustration.png')" }}
        >
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/70 to-blue-800/80"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 space-y-10 max-w-6xl mx-auto">
          
            
            {/* Title */}
            <h1 className="font-mono text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-yellow-500">
              <TypingText />
            </h1>

            {/* Countdown Timer */}
            <div className="mt-8 mb-12"> 
              <CountdownTimer />
            </div>

            {/* Date and Location */}
            <div className="flex justify-center items-center gap-6 mt-4 flex-wrap">
              {/* Date */}
              <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-100 font-semibold px-4 py-2 rounded-full shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-10 4h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>11-12 October, 2025</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 bg-yellow-500/20 text-yellow-100 font-semibold px-4 py-2 rounded-full shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4.5 8-10a8 8 0 10-16 0c0 5.5 8 10 8 10z" />
                </svg>
                <span>Wits University</span>
              </div>
            </div>


            {/* Register Button */}
            <div className="inline-block mt-6 text-center">
              <button
                onClick={() => setOpen(!open)}
                className="inline-block px-8 py-4 bg-gray-600 text-gray-300 font-semibold rounded-md shadow-lg cursor-not-allowed mt-4 sm:mt-6"
              >
                Registration Closed
              </button>

              {open && (
                <div className="mt-2 bg-black/60 text-pink-100 text-sm p-3 rounded-md shadow-lg max-w-xs mx-auto">
                  We have reached maximum capacity. Stay tuned for future events!
                </div>
              )}
            </div>



          </div>
        </div>

        <Section id="about" className="min-h-screen bg-black/40 text-white py-20">
          <div className="max-w-5xl mx-auto px-6 text-center space-y-10">
            {/* Heading */}
            <h2 className="text-4xl font-bold text-yellow-500">About the Event</h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Get ready to explore the quantum world with us! The 
              <span className="font-semibold text-yellow-400"> Qiskit Fall Fest</span> — the world’s largest 
              student-led quantum computing festival — is officially coming to 
              <span className="font-semibold"> Wits University</span> in 2025!
            </p>

            {/* Partner Logos */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wide text-yellow-100 italic">
                Brought to you by
              </p>
              <div className="bg-white/30 backdrop-blur-sm rounded-2xl py-4 px-8 flex justify-center items-center flex-wrap gap-12 shadow-inner">
                
                <a href="https://www.ibm.com/quantum" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105" >
                  <img src="/Fall Fest Graphics/Illustration Exports/IBM Quantum Logo.png" alt="IBM Quantum" className="h-12 sm:h-16 object-contain" />
                </a>

                <a href="https://www.wits.ac.za/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-105" >
                  <img src="/wits-logo.svg" alt="Wits University" className="h-12 sm:h-16 object-contain" />
                </a>
                
              </div>
            </div>
          </div>
        </Section>

        <Section id="mission" className="min-h-screen bg-blue-900/60 text-white py-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Badge */}
            <div className="flex justify-center">
              <img
                src="/Fall Fest Graphics/Badge/Badge_Dark.png"
                alt="Qiskit Badge"
                className="w-64 sm:w-72 h-auto transform transition duration-500 hover:rotate-6 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
              />
            </div>

            {/* Description */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-yellow-400">Why Join?</h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                This isn’t just a series of lectures — it’s an invitation to join a vibrant global community supported by IBM Quantum. Whether you’re in Computer Science, Finance, Engineering, or Commerce, quantum computing is something anyone can learn.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                Through hands-on workshops, interactive demos, and collaborative challenges, you’ll discover how quantum concepts connect to real-world problems — from optimization and data analysis to cryptography and finance.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                No prior experience is required — just curiosity! By joining, you’ll help put Wits at the forefront of quantum education and innovation while unlocking the potential of quantum technology for your own field.
              </p>
            </div>
          </div>
        </Section>


        {/* Speakers Section (Example update) */}
        <Section id="speakers" className="min-h-screen bg-black/40 text-white">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-yellow-500">Speakers</h2>
            <p className="text-lg text-blue-200 mt-2">Meet the pioneers leading the quantum charge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Speaker Card - TBC */}
            <div className="bg-black p-6 rounded-md shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50">
              <div className="w-32 h-32 mb-4 rounded-full border-4 border-yellow-400 bg-gray-700 flex items-center justify-center text-xl font-bold text-yellow-400">
                ?
              </div>
              <h3 className="font-bold text-2xl text-white">Marcel Pfaffhauser</h3>
              <p className="text-pink-300">Quantum Community and Education Developer at IBM</p>
              <p className="text-sm text-blue-300 mt-2 italic">More details to follow!</p>
            </div>


            {/* Speaker Card - Known */}
            <div className="bg-black p-6 rounded-md shadow-lg flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-pink-500/50">
              <div className="w-32 h-32 mb-4 rounded-full border-4 border-yellow-400 bg-gray-700 flex items-center justify-center text-2xl font-bold text-yellow-400">
                SK
              </div>
              <h3 className="font-bold text-2xl text-white">Shawal Kassim</h3>
              <p className="text-pink-300">Wits University Researcher</p>
              <p className="text-sm text-blue-300 mt-2 italic">More details to follow!</p>
            </div>
          </div>
        </Section>


        {/* Schedule Section */}
        <ScheduleSection />

        {/* Organizers Section */}
        <OrganizersSection />

        {/* Resources Section */}
        <Section id="resources" className="min-h-screen bg-blue-900/60 text-white">
          <div
            id="resources-venue"
            className="w-full py-16 text-white flex flex-col items-center"
          >
            <div className="text-center mb-12">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-yellow-500">
                Resources & Venue
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 w-full max-w-7xl px-4 sm:px-8">
              {/* Left Column: Venue Details & Map */}
              <div className="bg-black/60 rounded-lg p-6 md:p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">Our Location</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  The Qiskit Fall Fest will be hosted at WITS University (specific venue TBC).
                  
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
              <div className="bg-black/60 rounded-lg p-6 md:p-8 shadow-xl border-2 border-blue-900">
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