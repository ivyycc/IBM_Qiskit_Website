import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Organizer {
  name: string;
  role: string;
  img: string;
  bio: string;
}

const organizers: Organizer[] = [
  { 
    name: "Ivy", 
    role: "Co-organizer", 
    img: "/website_photos/ivy.jpg",
    bio: "Honour student in Big Data Analytics, passionate about quantum computing and its potential to revolutionize technology." 
  },
  { 
    name: "Mubeen", 
    role: "Lead organizer", 
    img: "/website_photos/mubeen.jpg",
    bio: "2nd year CS student with a lifelong passion for quantum computing and sharing knowledge!" 
  },
  { 
    name: "Lanet", 
    role: "Co-organizer", 
    img: "/website_photos/lanet.jpg",
    bio: "Passionate about innovation and fostering impactful solutions that bridge technical depth with real-world relevance." 
  },
  { 
    name: "Ntando", 
    role: "Co-organizer", 
    img: "/website_photos/ntando.jpg",
    bio: "CS student curious about quantum computing and always up for learning, sharing, and growing with others." 
  },
];

export const OrganizersSection: React.FC<{ id?: string; className?: string }> = ({ id, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToOrganizer = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    // Find the original card (not clones) to center on
    const originalCards = container.querySelectorAll<HTMLDivElement>("[data-index]");
    const targetCard = Array.from(originalCards).find(card => 
      parseInt(card.getAttribute('data-index') || '0') === index
    );
    
    if (!targetCard) return;

    const containerWidth = container.clientWidth;
    const cardCenter = targetCard.offsetLeft + targetCard.clientWidth / 2;
    const containerCenter = containerWidth / 2;
    const scrollPosition = cardCenter - containerCenter;

    container.scrollTo({
      left: Math.max(0, scrollPosition),
      behavior: "smooth",
    });

    setActiveIndex(index);
  };

  const goToPrevious = () => {
    const newIndex = activeIndex > 0 ? activeIndex - 1 : organizers.length - 1;
    scrollToOrganizer(newIndex);
  };

  const goToNext = () => {
    const newIndex = activeIndex < organizers.length - 1 ? activeIndex + 1 : 0;
    scrollToOrganizer(newIndex);
  };

  // Automatic spotlighting on mobile only
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isMobile) return;

    const handleScroll = () => {
      // Only look at original cards for spotlighting
      const originalCards = container.querySelectorAll<HTMLDivElement>("[data-index]");
      let closestIndex = 0;
      let closestDistance = Infinity;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      originalCards.forEach((card) => {
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

    const debouncedScroll = debounce(handleScroll, 50);
    container.addEventListener("scroll", debouncedScroll, { passive: true });
    return () => container.removeEventListener("scroll", debouncedScroll);
  }, [activeIndex, isMobile]);

  // Re-center on resize and initial load
  useEffect(() => {
    const timer = setTimeout(() => scrollToOrganizer(activeIndex), 100);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(() => scrollToOrganizer(activeIndex), 100);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeIndex]);

  return (
    <div
      id={id}
      className={`w-full py-16 bg-blue-800 text-white rounded-xl shadow-lg flex flex-col ${className}`}
    >
      <h3 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold mb-12 text-left px-4 sm:px-12 lg:px-20 text-yellow-500">
        Organizers
      </h3>

      <div className="w-full relative">
        {/* Navigation Buttons - Desktop only */}
        <button
          onClick={goToPrevious}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Previous organizer"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
          aria-label="Next organizer"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth py-12 sm:py-16 no-scrollbar snap-x snap-mandatory"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {/* Left clone for infinite effect */}
          {organizers.slice(-2).map((org, index) => {
            const originalIndex = organizers.length - 2 + index;
            const distance = originalIndex - activeIndex;
            const absDistance = Math.abs(distance);

            // Adjust distance for wrapping
            let adjustedDistance = distance;
            if (activeIndex <= 1 && originalIndex >= organizers.length - 2) {
              adjustedDistance = -(organizers.length - originalIndex + activeIndex);
            }
            const adjustedAbsDistance = Math.abs(adjustedDistance);

            const scale = adjustedDistance === 0 ? 1.15 : adjustedAbsDistance === 1 ? 0.92 : 0.8;
            const opacity = adjustedDistance === 0 ? 1 : adjustedAbsDistance === 1 ? 0.85 : 0.6;
            const shadow = adjustedDistance === 0 
              ? "0 15px 35px rgba(0,0,0,0.6), 0 5px 15px rgba(255,235,59,0.3)" 
              : adjustedAbsDistance === 1 
                ? "0 5px 15px rgba(0,0,0,0.3)" 
                : "0 2px 8px rgba(0,0,0,0.2)";
            const borderGlow = adjustedDistance === 0 ? "0 0 20px rgba(255,235,59,0.5)" : "none";

            return (
              <div
                key={`clone-left-${org.name}`}
                className="org-card flex-shrink-0 bg-black text-white rounded-3xl cursor-pointer flex flex-col items-center transition-all duration-500 ease-out relative snap-center"
                style={{
                  width: isMobile ? "clamp(200px, 70vw, 280px)" : "280px",
                  minHeight: "400px",
                  transform: `scale(${scale}) ${adjustedDistance === 0 ? 'translateY(-10px)' : ''}`,
                  opacity,
                  boxShadow: `${shadow}, ${borderGlow}`,
                  padding: "1.5rem",
                  border: adjustedDistance === 0 ? '2px solid rgba(255,235,59,0.3)' : '2px solid transparent',
                }}
                onClick={() => isMobile && scrollToOrganizer(originalIndex)}
              >
                <div 
                  className="rounded-full border-4 border-yellow-500 object-cover transition-all duration-500 overflow-hidden"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderColor: adjustedDistance === 0 ? '#fbbf24' : '#eab308',
                    borderWidth: adjustedDistance === 0 ? '4px' : '3px'
                  }}
                >
                  <img
                    src={org.img}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center px-2 flex flex-col flex-1 justify-start mt-4">
                  <h4 className="font-bold mb-2 text-xl text-yellow-400">
                    {org.name}
                  </h4>
                  <p className="text-yellow-200 text-sm font-medium mb-3">
                    {org.role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {org.bio}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Original organizers */}
          {organizers.map((org, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            const scale = distance === 0 ? 1.15 : absDistance === 1 ? 0.92 : 0.8;
            const opacity = distance === 0 ? 1 : absDistance === 1 ? 0.85 : 0.6;
            const shadow = distance === 0 
              ? "0 15px 35px rgba(0,0,0,0.6), 0 5px 15px rgba(255,235,59,0.3)" 
              : absDistance === 1 
                ? "0 5px 15px rgba(0,0,0,0.3)" 
                : "0 2px 8px rgba(0,0,0,0.2)";
            const borderGlow = distance === 0 ? "0 0 20px rgba(255,235,59,0.5)" : "none";

            return (
              <div
                key={`original-${org.name}`}
                data-index={index}
                className="org-card flex-shrink-0 bg-black text-white rounded-3xl cursor-pointer flex flex-col items-center transition-all duration-500 ease-out relative snap-center"
                style={{
                  width: isMobile ? "clamp(200px, 70vw, 280px)" : "280px",
                  minHeight: "400px",
                  transform: `scale(${scale}) ${distance === 0 ? 'translateY(-10px)' : ''}`,
                  opacity,
                  boxShadow: `${shadow}, ${borderGlow}`,
                  padding: "1.5rem",
                  border: distance === 0 ? '2px solid rgba(255,235,59,0.3)' : '2px solid transparent',
                }}
                onClick={() => isMobile && scrollToOrganizer(index)}
              >
                <div 
                  className="rounded-full border-4 border-yellow-500 object-cover transition-all duration-500 overflow-hidden"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderColor: distance === 0 ? '#fbbf24' : '#eab308',
                    borderWidth: distance === 0 ? '4px' : '3px'
                  }}
                >
                  <img
                    src={org.img}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center px-2 flex flex-col flex-1 justify-start mt-4">
                  <h4 className="font-bold mb-2 text-xl text-yellow-400">
                    {org.name}
                  </h4>
                  <p className="text-yellow-200 text-sm font-medium mb-3">
                    {org.role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {org.bio}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Right clone for infinite effect */}
          {organizers.slice(0, 2).map((org, index) => {
            const originalIndex = index;
            const distance = originalIndex - activeIndex;
            const absDistance = Math.abs(distance);

            // Adjust distance for wrapping
            let adjustedDistance = distance;
            if (activeIndex >= organizers.length - 2 && originalIndex <= 1) {
              adjustedDistance = organizers.length - activeIndex + originalIndex;
            }
            const adjustedAbsDistance = Math.abs(adjustedDistance);

            const scale = adjustedDistance === 0 ? 1.15 : adjustedAbsDistance === 1 ? 0.92 : 0.8;
            const opacity = adjustedDistance === 0 ? 1 : adjustedAbsDistance === 1 ? 0.85 : 0.6;
            const shadow = adjustedDistance === 0 
              ? "0 15px 35px rgba(0,0,0,0.6), 0 5px 15px rgba(255,235,59,0.3)" 
              : adjustedAbsDistance === 1 
                ? "0 5px 15px rgba(0,0,0,0.3)" 
                : "0 2px 8px rgba(0,0,0,0.2)";
            const borderGlow = adjustedDistance === 0 ? "0 0 20px rgba(255,235,59,0.5)" : "none";

            return (
              <div
                key={`clone-right-${org.name}`}
                className="org-card flex-shrink-0 bg-black text-white rounded-3xl cursor-pointer flex flex-col items-center transition-all duration-500 ease-out relative snap-center"
                style={{
                  width: isMobile ? "clamp(200px, 70vw, 280px)" : "280px",
                  minHeight: "400px",
                  transform: `scale(${scale}) ${adjustedDistance === 0 ? 'translateY(-10px)' : ''}`,
                  opacity,
                  boxShadow: `${shadow}, ${borderGlow}`,
                  padding: "1.5rem",
                  border: adjustedDistance === 0 ? '2px solid rgba(255,235,59,0.3)' : '2px solid transparent',
                }}
                onClick={() => isMobile && scrollToOrganizer(originalIndex)}
              >
                <div 
                  className="rounded-full border-4 border-yellow-500 object-cover transition-all duration-500 overflow-hidden"
                  style={{
                    width: '140px',
                    height: '140px',
                    borderColor: adjustedDistance === 0 ? '#fbbf24' : '#eab308',
                    borderWidth: adjustedDistance === 0 ? '4px' : '3px'
                  }}
                >
                  <img
                    src={org.img}
                    alt={org.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center px-2 flex flex-col flex-1 justify-start mt-4">
                  <h4 className="font-bold mb-2 text-xl text-yellow-400">
                    {org.name}
                  </h4>
                  <p className="text-yellow-200 text-sm font-medium mb-3">
                    {org.role}
                  </p>
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {org.bio}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-3">
          {organizers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToOrganizer(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-yellow-500 scale-125 shadow-lg shadow-yellow-500/50"
                  : "bg-yellow-200 hover:bg-yellow-300 hover:scale-110"
              }`}
              aria-label={`Go to organizer ${index + 1}`}
            />
          ))}
        </div>

        {/* Gradient overlays for desktop */}
        <div className="hidden sm:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-800 via-blue-800/80 to-transparent pointer-events-none z-40" />
        <div className="hidden sm:block absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-800 via-blue-800/80 to-transparent pointer-events-none z-40" />
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Utility function for debouncing
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default OrganizersSection;