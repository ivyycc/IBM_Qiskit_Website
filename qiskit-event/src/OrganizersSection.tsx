import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Organizer {
  name: string;
  role: string;
  img: string;
}

const organizers: Organizer[] = [
  { name: "Alice Smith", role: "Lead Organizer", img: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face" },
  { name: "Bob Johnson", role: "Coordinator", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Carol Lee", role: "Volunteer Lead", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "David Kim", role: "Logistics", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
];

export const OrganizersSection: React.FC<{ id?: string; className?: string }> = ({ id, className }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const ITEM_WIDTH = 280; // width of card
  const ITEM_HEIGHT = 280; // make it more square
  const GAP = 32; // gap between cards

  const scrollToOrganizer = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    const containerWidth = container.clientWidth;

    // total width including gap
    const itemTotalWidth = ITEM_WIDTH + GAP;

    // center position calculation
    const scrollPosition = index * itemTotalWidth - containerWidth / 2 + ITEM_WIDTH / 2;

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
    // center the first item on mount
    scrollToOrganizer(activeIndex);
  }, []);

  return (
    <div
      id={id}
      className={`w-full py-16 bg-blue-800 text-white rounded-xl shadow-lg flex flex-col ${className}`}
      style={{ overflow: "visible" }}
    >
      <h3 className="text-4xl font-bold mb-12 text-left px-6 md:px-12 lg:px-20 text-yellow-500">
        Organizers
      </h3>

      <div className="w-full relative overflow-visible">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 bg-yellow-500 hover:bg-yellow-600 text-blue-800 rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div
          ref={containerRef}
          className="flex gap-8 px-6 md:px-12 lg:px-20 overflow-x-auto overflow-y-visible scroll-smooth py-16"
          style={{ scrollBehavior: "smooth" }}
        >
          {organizers.map((org, index) => {
            const distance = index - activeIndex;
            const absDistance = Math.abs(distance);

            // Scale and opacity based on distance from active item
            const scale = distance === 0 ? 1.25 : absDistance === 1 ? 0.95 : 0.85;
            const opacity = distance === 0 ? 1 : absDistance === 1 ? 0.9 : 0.7;
            const offsetX = distance * GAP * 0.5; // subtle 3D spacing

            return (
              <div
                key={org.name}
                onClick={() => scrollToOrganizer(index)}
                className={`flex-shrink-0 bg-white text-black rounded-3xl cursor-pointer flex flex-col items-center justify-center transition-all duration-500 ease-out relative overflow-visible z-${distance === 0 ? 30 : absDistance === 1 ? 20 : 10}`}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  transform: `translateX(${offsetX}px) scale(${scale})`,
                  opacity,
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                }}
              >
                <img
                  src={org.img}
                  alt={org.name}
                  className={`rounded-full border-4 border-yellow-500 object-cover transition-all duration-500 ${
                    distance === 0 ? "w-40 h-40 mb-6" : "w-32 h-32 mb-4"
                  }`}
                />
                <div className="text-center px-4">
                  <h4 className={`font-bold mb-2 text-center transition-all duration-300 ${distance === 0 ? "text-2xl" : "text-xl"}`}>
                    {org.name}
                  </h4>
                  <p className={`text-center text-gray-700 transition-all duration-300 ${distance === 0 ? "text-lg" : "text-base"}`}>
                    {org.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 gap-3">
          {organizers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToOrganizer(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-yellow-500 scale-125" : "bg-yellow-200 hover:bg-yellow-300"
              }`}
            />
          ))}
        </div>

        {/* Gradient overlays */}
        <div className="absolute left-0 w-20 bg-gradient-to-r from-blue-800 to-transparent pointer-events-none z-40" style={{ top: "100px", bottom: "100px" }}></div>
        <div className="absolute right-0 w-20 bg-gradient-to-l from-blue-800 to-transparent pointer-events-none z-40" style={{ top: "100px", bottom: "100px" }}></div>
      </div>
    </div>
  );
};

export default OrganizersSection;
