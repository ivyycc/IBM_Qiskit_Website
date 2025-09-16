import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Github, Linkedin, Globe } from "lucide-react";

const MediumIcon: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 1043.63 592.71" 
    height={size} 
    className={className}
    fill="currentColor"
  >
    <path d="M588.67 296.35c0 163.64-131.71 296.35-294.34 296.35S0 460 0 296.35 131.71 0 294.33 0s294.34 132.71 294.34 296.35zM911.5 296.35c0 154.48-65.85 279.65-147.05 279.65s-147.05-125.17-147.05-279.65 65.85-279.65 147.05-279.65 147.05 125.17 147.05 279.65zm132.13 0c0 134.19-29.36 243-65.55 243s-65.55-108.81-65.55-243 29.36-243 65.55-243 65.55 108.81 65.55 243z" />
  </svg>
);

interface Organizer {
  name: string;
  role: string;
  img: string;
  bio: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    medium?: string;
  };
}

const organizers: Organizer[] = [
  { 
    name: "Mubeen", 
    role: "Lead organizer", 
    img: "/website_photos/mubeen.jpg",
    bio: "2nd year CS student with a lifelong passion for quantum computing and sharing knowledge!",
    socials: {
      linkedin: "https://www.linkedin.com/in/mubeen-dewan-18528a306/",
      medium: "https://medium.com/@mubeendewan",
    }
  },
  { 
    name: "Ivy", 
    role: "Co-organizer", 
    img: "/website_photos/ivy.jpg",
    bio: "Honour student in Big Data Analytics, excited about the potential of quantum computing to revolutionize technology.",
    socials: {
      linkedin: "https://www.linkedin.com/in/ivy-chepkwony-1872a22a8/",
      github: "https://github.com/ivyycc",
    }
  },
  { 
    name: "Lanet", 
    role: "Co-organizer", 
    img: "/website_photos/lanet.jpg",
    bio: "Passionate about innovation and fostering impactful solutions that bridge technical depth with real-world relevance.",
    socials: {
      linkedin: "http://www.linkedin.com/in/lanet-ndebe-7a57b7298",
      github: "https://github.com/2626245"
    }
  },
  { 
    name: "Ntando", 
    role: "Co-organizer", 
    img: "/website_photos/ntando.jpg",
    bio: "CS student curious about quantum computing and always up for learning, sharing, and growing with others.",
    socials: {
      linkedin: "http://linkedin.com/in/ntandoyenkosi-memela-9844a5243/",
    }
  },
];

export const OrganizersSection: React.FC<{ id?: string; className?: string }> = ({ id, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToOrganizer = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLDivElement>("[data-index]");
    const targetCard = cards[index];
    
    if (!targetCard) return;

    // Use a more reliable centering method
    const scrollPosition = targetCard.offsetLeft - container.offsetWidth / 2 + targetCard.offsetWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const goToPrevious = () => {
    if (activeIndex > 0) {
      scrollToOrganizer(activeIndex - 1);
    }
  };

  const goToNext = () => {
    if (activeIndex < organizers.length - 1) {
      scrollToOrganizer(activeIndex + 1);
    }
  };

  // Effect to update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Effect to automatically center on mobile when the user scrolls manually
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = () => {
      let closestIndex = 0;
      let closestDistance = Infinity;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      container.querySelectorAll<HTMLDivElement>("[data-index]").forEach((card) => {
        const idx = parseInt(card.getAttribute('data-index') || '0');
        const cardCenter = card.offsetLeft + card.clientWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = idx;
        }
      });

      if (closestIndex !== activeIndex) {
        setActiveIndex(closestIndex);
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeIndex, isMobile]);

  // Handle re-centering on resize
  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => scrollToOrganizer(activeIndex), 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div
      id={"organizers"}
      className={`w-full py-16 bg-blue-800 text-white rounded-lg shadow-lg flex flex-col items-center ${className}`}
    >
      <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-12 text-center text-yellow-500">
        Meet the Organizers
      </h3>

      <div className="px-4 md:px-0"> 
         <p className="text-lg sm:text-base md:text-lg text-blue-200 mt-2 max-w-full break-words text-center ">
        Meet the Witsies behind the scenes, passionate about bringing quantum computing to life!
        </p>
      </div>


      
      <div className="w-full relative px-4 sm:px-12 lg:px-20">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          disabled={activeIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-50 p-2 transition-colors duration-300 ${
            activeIndex === 0 
              ? 'text-gray-500 cursor-not-allowed' 
              : 'text-yellow-500 hover:text-yellow-400'
          }`}
          aria-label="Previous organizer"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={goToNext}
          disabled={activeIndex === organizers.length - 1}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-50 p-2 transition-colors duration-300 ${
            activeIndex === organizers.length - 1 
              ? 'text-gray-500 cursor-not-allowed' 
              : 'text-yellow-500 hover:text-pink-600'
          }`}
          aria-label="Next organizer"
        >
          <ChevronRight size={32} />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className={`flex gap-8 overflow-x-auto scroll-smooth py-12 no-scrollbar snap-x snap-mandatory ${
            isMobile ? 'justify-start' : 'justify-center'
          }`}
          style={isMobile ? { paddingLeft: 'calc(50% - 140px)', paddingRight: 'calc(50% - 140px)' } : {}}
        >
          {organizers.map((org, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={org.name}
                data-index={index}
                className={`org-card flex-shrink-0 bg-black text-white rounded-lg cursor-pointer flex flex-col items-center transition-all duration-500 ease-out relative snap-center px-6 py-8 shadow-xl ${
                  isActive 
                    ? 'transform scale-105 shadow-[0_0_20px_rgba(255,235,59,0.3)]' 
                    : 'hover:scale-100 hover:shadow-lg'
                }`}
                style={{
                  width: "clamp(250px, 80vw, 320px)",
                  minHeight: "450px",
                  border: '2px solid transparent',
                  boxShadow: isActive 
                    ? '0 0 15px rgba(238, 79, 156, 0.7)' 
                    : '0 0 5px rgba(0,0,0,0.1)',
                  opacity: isActive ? 1 : 0.6,
                }}
                onClick={() => scrollToOrganizer(index)}
              >
                <div 
                  className="rounded-lg border-4 border-yellow-500/70 object-cover overflow-hidden"
                  style={{ width: '150px', height: '150px' }}
                >
                  <img
                    src={org.img}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center px-2 flex flex-col flex-1 justify-start mt-6 space-y-2">
                  <h4 className="font-bold text-2xl text-yellow-400">
                    {org.name}
                  </h4>
                  <p className="text-pink-400/90 text-base font-medium">
                    {org.role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1 mt-4">
                    {org.bio}
                  </p>
                  {org.socials && (
                    <div className="flex justify-center mt-6 space-x-4">
                      {org.socials.linkedin && (
                        <a
                          href={org.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 hover:text-pink-600 transition-colors"
                        >
                          <Linkedin size={24} />
                        </a>
                      )}
                      {org.socials.github && (
                        <a
                          href={org.socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 hover:text-pink-600 transition-colors"
                        >
                          <Github size={24} />
                        </a>
                      )}
                      {org.socials.medium && (
                        <a
                          href={org.socials.medium}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-yellow-400 hover:text-pink-600 transition-colors"
                        >
                          <MediumIcon size={24} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-3">
          {organizers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToOrganizer(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-yellow-500 scale-125"
                  : "bg-gray-400 hover:bg-yellow-200 hover:scale-110"
              }`}
              aria-label={`Go to organizer ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizersSection;