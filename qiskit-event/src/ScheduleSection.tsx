import React, { useEffect, useState, useRef } from 'react';
import { Section } from './Section'; // We'll wrap it in our standard Section component
import './App.css';

// Define a type for the active accordion item state
type ActiveItemState = {
  day: number;
  item: number;
} | null;

;

export function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    let previousY = 0; // track last scroll position of the element

    const observer = new IntersectionObserver(
      ([entry]) => {
        const currentY = entry.boundingClientRect.top;
        const isScrollingDown = currentY < previousY;
        previousY = currentY;

        if (entry.isIntersecting && isScrollingDown) {
          setIsInView(true); // animate only when scrolling down
        }
      },
      { threshold: 0.3, ...options }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options]);

  return { ref, isInView };
}



export default function ScheduleSection() {
  const [activeItem, setActiveItem] = useState<ActiveItemState>(null);

  const schedule = [
    {
      day: "Day 1: Quantum Kickoff",
      theme: "Intro to quantum + Qiskit basics",
      items: [
        { time: "9:00 – 9:15", title: "Welcome & Icebreaker", description: "Kick things off with a warm welcome and a fun icebreaker activity to get to know fellow attendees." },
        { time: "9:15 – 10:00", title: "Quantum Computing Basics 101", description: "A foundational lecture on the core principles of quantum computing, covering concepts like superposition and entanglement." },
        { time: "10:00 – 10:15", title: "Break", description: "Take a quick snack break." },
        { time: "10:15 – 11:30", title: "Getting Started with Qiskit", description: "A hands-on workshop to install Qiskit and run your first superposition circuit, visualizing probability histograms." },
        { time: "11:30 – 12:00", title: "Quantum Trivia Kahoot!", description: "A fun and interactive trivia game with great prizes for the top three winners." },
        { time: "12:00 – 12:30", title: "Panel/Q&A", description: "An insightful session with quantum experts sharing their career journeys and answering your questions." },
      ],
      image: "/Fall Fest Graphics/Emojis/Timeline_01.png",
      imageAlt: "Day 1 Quantum Computing Workshop"
    },
    {
      day: "Day 2: Quantum Deep Dive",
      theme: "Circuits, challenges, and the IBM keynote finale",
      items: [
        // ... (Day 2 items remain the same)
        { time: "9:00 – 9:10", title: "Quick Recap", description: "A brief review of Day 1's key takeaways to get everyone back up to speed." },
        { time: "9:10 – 10:00", title: "Quantum Applications", description: "Explore the practical uses of quantum computing in various industries today and in the future." },
        { time: "10:00 – 10:15", title: "Break", description: "Recharge with a short break." },
        { time: "10:15 – 11:00", title: "Building Circuits in Qiskit", description: "A workshop focused on building fundamental quantum circuits like the Bell state." },
        { time: "11:00 – 11:30", title: "Challenge: Bell State Circuit", description: "A hands-on challenge to apply what you've learned and build a Bell state circuit. Prizes up for grabs !!" },
        { time: "11:30 – 12:00", title: "IBM Speaker Talk + Q&A", description: "A special keynote from an IBM expert, followed by a Q&A session." },
        { time: "12:00 – 12:30", title: "Closing Ceremony", description: "Certificates, prizes, and next steps in your quantum journey." },
      ],
      image: "/Fall Fest Graphics/Emojis/Timeline_02.png",
      imageAlt: "Day 2 Quantum Deep Dive & Celebration"
    },
  ];

  const handleItemClick = (dayIdx: number, itemIdx: number) => {
    if (activeItem && activeItem.day === dayIdx && activeItem.item === itemIdx) {
      setActiveItem(null);
    } else {
      setActiveItem({ day: dayIdx, item: itemIdx });
    }
  };


  const { ref, isInView } = useInView({ threshold: 0.3 });
  return (
    <Section id="schedule" className="bg-black text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-yellow-500">Event Schedule</h2>
        <p className="text-lg text-gray-400 mt-2">A two-day dive into the world of quantum.</p>
      </div>

      <div className="relative">
        {/* The central timeline line - hidden on mobile */}
        <div className="absolute left-1/2 top-0 h-full w-1 bg-blue-800 hidden md:block" />

        <div className="space-y-16">
          {schedule.map((event, dayIdx) => (
            <div
              key={dayIdx}
              // This is the core logic for the alternating layout
              className={`relative flex flex-col items-center md:flex-row md:justify-between ${dayIdx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Timeline Dot - hidden on mobile */}
              <div className="absolute left-1/2 top-8 -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-black ring-4 ring-blue-600 z-10 hidden md:block" />

              {/* Image Container */}
              <div className="w-full md:w-5/12 flex justify-center order-first md:order-none">
                <img
                  ref = {ref as any}
                  src={event.image}
                  alt={event.imageAlt}
                  className={`w-full max-w-sm h-auto object-contain rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105  ${
                            isInView
                              ? dayIdx % 2 === 0
                                ? 'float-in-left'
                                : 'float-in-right'
                              : 'opacity-0'
                          }`}
                />
              </div>

              {/* Spacer for desktop */}
              <div className="hidden md:block w-2/12" />

              {/* Content Card */}
              <div className="w-full md:w-5/12 bg-blue-800 rounded-lg shadow-lg p-6 mt-8 md:mt-0">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-yellow-400">{event.day}</h3>
                  <p className="italic text-blue-200">{event.theme}</p>
                </div>
                <div className="divide-y divide-blue-700">
                  {event.items.map((item, itemIdx) => {
                    const isActive = activeItem?.day === dayIdx && activeItem?.item === itemIdx;
                    return (
                      <div key={itemIdx} className="py-3 cursor-pointer" onClick={() => handleItemClick(dayIdx, itemIdx)}>
                        <div className="flex justify-between items-center">
                          <p className="text-white font-semibold">
                            <span className="font-bold text-yellow-500 mr-2">{item.time}</span>
                            {item.title}
                          </p>
                          <svg className={`w-5 h-5 text-yellow-500 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                        {isActive && (
                          <p className="mt-2 text-blue-200 text-sm">{item.description}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}