import React, { useState, useRef, useEffect } from "react";

interface Organizer {
  name: string;
  role: string;
  img: string;
}

const organizers: Organizer[] = [
  { name: "Alice Smith", role: "Lead Organizer", img: "/org1.jpg" },
  { name: "Bob Johnson", role: "Coordinator", img: "/org2.jpg" },
  { name: "Carol Lee", role: "Volunteer Lead", img: "/org3.jpg" },
  { name: "David Kim", role: "Logistics", img: "/org4.jpg" },
];

export const OrganizersSection: React.FC<{ id?: string; className?: string }> = ({ id, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Center hovered card
  useEffect(() => {
    if (hoveredIndex !== null && containerRef.current) {
      const container = containerRef.current;
      const child = container.children[hoveredIndex] as HTMLElement;
      const offset = child.offsetLeft + child.offsetWidth / 2 - container.offsetWidth / 2;
      container.scrollTo({ left: offset, behavior: "smooth" });
    }
  }, [hoveredIndex]);

  return (
    <div
    id={id}
    className={`w-full py-48 bg-blue-600 text-white rounded-xl shadow-lg flex flex-col ${className}`}
    >

      <h3 className="text-4xl font-bold mb-12 text-left px-6 md:px-12 lg:px-20 text-yellow-400">
        Organizers
      </h3>

      <div
        ref={containerRef}
        className="w-full flex overflow-x-auto overflow-y-visible snap-x snap-mandatory scrollbar-hide px-6 md:px-12 lg:px-20 items-center space-x-16"
      >

        {organizers.map((org, index) => {
          const isHovered = hoveredIndex === index;
          const isNeighbor = hoveredIndex !== null && (index === hoveredIndex - 1 || index === hoveredIndex + 1);

          return (
            <div
              key={org.name}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                flex-shrink-0 snap-center bg-white text-black rounded-3xl shadow-lg cursor-pointer
                flex flex-col items-center justify-center transition-all duration-500
                ${isHovered ? "min-w-[300px] scale-110 z-20" : isNeighbor ? "min-w-[220px] scale-95 z-10" : "min-w-[180px] scale-90 z-0"}
             `}
            >

              <img
                src={org.img}
                alt={org.name}
                className="rounded-full w-32 h-32 mb-4 border-4 border-yellow-400"
              />
              <h4 className="font-bold text-xl mb-2 text-center">{org.name}</h4>
              <p className="text-center text-gray-700">{org.role}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
