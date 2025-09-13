import React, { useEffect } from 'react';
import './App.css';
import { Section } from './Section';
import { OrganizersSection } from "./OrganizersSection";
import ScheduleSection  from "./ScheduleSection";
import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <a href="#" className="text-yellow-500 font-bold text-xl">Quantum Event</a>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-yellow-500 font-semibold transform transition-transform duration-300 hover:scale-110"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-yellow-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col space-y-4 px-6 pb-6 bg-black">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="hover:text-yellow-500 font-semibold transform transition-transform duration-300 hover:translate-x-1"
            >
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
    <footer className="bg-black text-white p-6 text-center">
      © 2025 IBM Qiskit Event • Organized by Wits IBM QisKit
    </footer>
  );
}


function App() {
  // Smooth scrolling
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-black font-sans space-y-12">
      <Navbar />

    {/* Title Section */}
    <Section
      className="relative w-full px-4 sm:px-8 md:px-16 lg:px-32 text-white rounded-xl shadow-lg bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/Fall%20Fest%20Graphics/Illustration%20Exports/Full_Illustration.png')" }}
    >
      {/* Gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-800/90 z-0"></div>

      {/* Content */}
      <div className="relative z-10 text-center py-16 sm:py-20 md:py-24 animate-fadeIn">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-yellow-500 mb-4 sm:mb-6">
          IBM Qiskit Quantum Event
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6">
          October, 2025 • Wits University
        </p>
        <a
          href="https://www.ibm.com/events/qiskit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-yellow-400 text-black font-semibold rounded-full shadow-lg pulse-glow hover:scale-105 transition-transform duration-300"
        >
          Register Now
        </a>
      </div>
    </Section>




      {/* About */}
      <Section
        id="about"
        className="w-full px-6 md:px-20 lg:px-40 py-20 bg-black text-white rounded-xl shadow-lg"
      >
        <div className="flex flex-col lg:flex-row items-center gap-8">

          {/* SVG Badge (goes first on large, top on small) */}
          <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-1">
            <img
              src="/Fall Fest Graphics/Badge/Badge_Dark.svg"
              alt="Qiskit Badge"
              className="w-56 h-auto transform transition duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.6)]"
            />
          </div>

          {/* Text (goes second on large, bottom on small) */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center bg-blue-800 p-6 rounded-xl shadow-md space-y-6 order-2 lg:order-2">
            <h3 className="text-4xl font-bold text-yellow-500 mb-4 text-left">
              About the Event
            </h3>
            <p className="text-left text-lg bg-blue-800 p-6 rounded-xl shadow-md">
              Join us to explore the future of quantum computing with IBM Qiskit.
              Learn from experts, attend workshops, and connect with researchers.
            </p>
          </div>

        </div>
      </Section>




      {/* Speakers */}
      <Section id="speakers" className="w-full px-6 md:px-12 lg:px-20 py-24 bg-blue-800 text-white rounded-xl shadow-lg flex flex-col">
        <h3 className="text-4xl font-bold text-yellow-500 mb-12 text-left">Speakers</h3>

        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full gap-12">
          {/* Speaker 1 */}
          <div className="bg-black text-black p-8 rounded-3xl shadow-2xl w-full md:w-1/2 transform transition duration-500 flex flex-col items-center hover:drop-shadow-[0_0_16px_rgba(251,113,133,0.6)] hover:scale-105">
            <img src="/speaker1.jpg" alt="Speaker 1" className="rounded-full w-36 h-36 mb-6 border-4 border-yellow-400" />
            <h4 className="font-bold text-2xl mb-2 text-center">Dr. Alice...</h4>

            <p className="text-center text-gray-700">IBM Quantum Researcher</p>
          </div>

          {/* Speaker 2 */}
          <div className="bg-black text-black p-8 rounded-3xl shadow-2xl w-full md:w-1/2 transform transition duration-500 flex flex-col items-center hover:drop-shadow-[0_0_16px_rgba(251,113,133,0.6)] hover:scale-105">

            <img src="/speaker2.jpg" alt="Speaker 2" className="rounded-full w-36 h-36 mb-6 border-4 border-yellow-400" />
            <h4 className="font-bold text-2xl mb-2 text-center">Dr. Bob Qubit</h4>
            <p className="text-center text-gray-700">University Quantum Researcher</p>
          </div>
        </div>
      </Section>



      {/* Schedule */}
      <ScheduleSection/>




      {/* Organizers */}
      <OrganizersSection id="organizers" className="my-extra-styles" />


       {/* Resources */}
      <Section id="resources" className="w-full px-6 md:px-20 lg:px-40 bg-black text-white rounded-xl shadow-lg">
        <h3 className="text-4xl font-bold text-yellow-500 mb-6">Resources</h3>
        {/* Map on the left */}
          <div className="w-full lg:w-1/2 h-80 rounded-xl overflow-hidden shadow-lg">
            <iframe
              title="Map of Wits University"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.8881447552056!2d27.998092915207586!3d-26.191249783438093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e950e551b5c0e9f%3A0x8cdd68be1d7241c!2sUniversity%20of%20the%20Witwatersrand!5e0!3m2!1sen!2sza!4v1694383041234!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        <ul className="list-disc pl-6 space-y-2 text-left text-lg">
          <li><a href="https://qiskit.org/" className="text-blue-800 hover:underline">Qiskit Official Website</a></li>
          <li><a href="https://learn.qiskit.org/" className="text-blue-800 hover:underline">Qiskit Learning Portal</a></li>
          <li><a href="https://github.com/Qiskit" className="text-blue-800 hover:underline">Qiskit GitHub</a></li>
        </ul>
      </Section>

      <Footer />
    </div>
  );
}

export default App;
