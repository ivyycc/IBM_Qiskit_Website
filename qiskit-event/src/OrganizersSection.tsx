import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Organizer {
  name: string;
  role: string;
  img: string;
}

const organizers: Organizer[] = [
  { name: "Ivy Chepkwony", role: "Co-organizer", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" },
  { name: "Mubeen ", role: "Lead organizer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Lanet", role: "Co-organizer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "Ntando", role: "Co-organizer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
];

export const OrganizersSection: React.FC<{ id?: string; className?: string }> = ({ id, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const GAP = 32;

  const scrollToOrganizer = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLDivElement>(".org-card");
    if (!cards[index]) return;

    const card = cards[index];
    const containerWidth = container.clientWidth;
    const scrollPosition = card.offsetLeft - containerWidth / 2 + card.clientWidth / 2;

    container.scrollTo({
      left: scrollPosition,
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

  useEffect(() => {
    scrollToOrganizer(activeIndex);
  }, []);

  return (
    <div
      id={id}
      className={`w-full py-16 bg-blue-800 text-white rounded-xl shadow-lg flex flex-col ${className}`}
    >
      <h3 className="text-3xl sm:text-4xl font-bold mb-12 text-left px-4 sm:px-12 lg:px-20 text-yellow-500">
        Organizers
      </h3>

      <div className="w-full relative">
        {/* Navigation Buttons (hidden on mobile) */}
        <button
          onClick={goToPrevious}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="flex gap-4 sm:gap-8 px-4 sm:px-12 lg:px-20 overflow-x-auto scroll-smooth py-12 sm:py-16 no-scrollbar"
        >
          {organizers.map((org, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            const scale = distance === 0 ? 1.15 : absDistance === 1 ? 0.95 : 0.85;
            const opacity = distance === 0 ? 1 : absDistance === 1 ? 0.9 : 0.7;

            return (
              <div
                key={org.name}
                onClick={() => scrollToOrganizer(index)}
                className={`org-card flex-shrink-0 bg-white text-black rounded-3xl cursor-pointer flex flex-col items-center justify-center transition-all duration-500 ease-out relative`}
                style={{
                  width: "clamp(180px, 60vw, 260px)",
                  height: "clamp(220px, 65vw, 280px)",
                  transform: `scale(${scale})`,
                  opacity,
                }}
              >
                <img
                  src={org.img}
                  alt={org.name}
                  className={`rounded-full border-4 border-yellow-500 object-cover transition-all duration-500 ${
                    distance === 0 ? "w-32 h-32 mb-4 sm:w-40 sm:h-40 sm:mb-6" : "w-28 h-28 mb-3"
                  }`}
                />
                <div className="text-center px-2 sm:px-4">
                  <h4 className={`font-bold mb-1 sm:mb-2 transition-all duration-300 ${distance === 0 ? "text-lg sm:text-2xl" : "text-base sm:text-xl"}`}>
                    {org.name}
                  </h4>
                  <p className={`text-gray-700 transition-all duration-300 ${distance === 0 ? "text-sm sm:text-lg" : "text-xs sm:text-base"}`}>
                    {org.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 sm:mt-8 gap-3">
          {organizers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToOrganizer(index)}
              className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-yellow-500 scale-125" : "bg-yellow-200 hover:bg-yellow-300"
              }`}
            />
          ))}
        </div>

        {/* Gradient overlays (hidden on mobile) */}
        <div className="hidden sm:block absolute left-0 w-20 bg-gradient-to-r from-blue-800 to-transparent pointer-events-none z-40 top-20 bottom-20"></div>
        <div className="hidden sm:block absolute right-0 w-20 bg-gradient-to-l from-blue-800 to-transparent pointer-events-none z-40 top-20 bottom-20"></div>
      </div>
    </div>
  );
};

export default OrganizersSection;
