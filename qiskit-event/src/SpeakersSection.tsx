import { useState } from "react";



interface Speaker {
  name: string;
  title: string;
  photo: string;
  shortBio: string;
  fullBio: string;
}


interface SpeakerCardProps {
  speaker: Speaker;
}


const speakers: Speaker[] = [
  {
    name: "Dr Isaac Nape",
    title: "Quantum Researcher and Lecturer at the University of Witwatersrand",
    photo: "/website_photos/DrIsaac.jpeg",
    shortBio: "Dr Isaac Nape is a quantum researcher and lecturer at the University of the Witwatersrand...",
    fullBio: `Despite being in his early 30s, he has received numerous accolades, 
    including (but not limited to) fellowships with the WITS MIND Institute and Friedel Sellschop, 
    recognition in the Mail & Guardian Top 200, and awards such as the Meiring Naudé Medal and SAIP Silver Jubilee Medal. 
    His work advances quantum technologies, and he is very passionate and excited about mentoring the next generation of African scientists.`,
  },
  {
    name: "Marcel Pfaffhauser",
    title: "IBM Quantum Community and Education Developer",
    photo: "/website_photos/Marcel.jpeg",
    shortBio: "Marcel is a Quantum Community and Education Developer at IBM Quantum based in Zurich, Switerland...",
    fullBio: `He studied Computer Science at ETH Zürich and completed his Master’s in Theory of Computing, followed by research in Quantum Information Theory at USI in Lugano.
     He then worked as a Software Engineer specializing in AR/VR, and gamification using Unity. In 2020, he joined IBM Research in Zurich, focusing on Education and Workforce Development, 
     where he contributed to initiatives such as the Qiskit Global Summer School, 
     IBM Quantum Challenge, and various hackathons. Ultimately, Marcel is dedicated to advancing quantum computing education and connecting people to the global quantum community`,
  },
 {
    name: "Professor Warren Carlson",
    title: "Lecturer at the University of Witwatersrand",
    photo: "/website_photos/placeholder.png",
    shortBio: "Professor Warren Carlson is a Lecturer at the University of Witwatersrand...",
    fullBio: `Holding a PhD in Physics, he is deeply engaged in shaping a future built on the power of quantum physics and mathematics. 
    His research spans string theory, black hole physics, and quantum field theory, offering deep insights into the mathematical foundations of the universe. 
    Drawing from this background, he brings a unique perspective to quantum computing and its underlying physical principles.`,
  },
  {
    name: "Shawal Kassim",
    title: "Quantum Researcher at the University of Witwatersrand",
    photo: "/website_photos/Shawal.png",
    shortBio: "Shawal Kassim is a researcher specialising in Quantum computing at the University of Witwatersrand ...",
    fullBio: `He is a researcher and PhD candidate at the University of the Witwatersrand. Having completed his Master’s, 
    he is deeply passionate about quantum computing and its growing applications in finance. As a fellow student at Wits,
    he brings a relatable perspective and aims to  inspire others to explore the exciting intersections between quantum science and real-world innovation.`,
  },

];

export default function SpeakersSection() {
  return (
    <section id="speakers" className="min-h-screen bg-black/40 text-white py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-yellow-500">Speakers</h2>
        <p className="text-lg text-blue-200 mt-2">Meet the pioneers leading the quantum charge.</p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto px-6 md:px-0">
        {speakers.map((speaker, idx) => (
          <SpeakerCard key={idx} speaker={speaker} />
        ))}
      </div>
    </section>
  );
}

function SpeakerCard({ speaker }: SpeakerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 shadow-md hover:shadow-blue-500/20 transition-all duration-300 transform 
                hover:scale-102 active:scale-100 ">
      
      {/* Image */}
      <div className="relative w-36 h-36 mx-auto rounded-full overflow-hidden mb-6 shadow-[0_0_20px_rgba(234,179,8,0.35)]">
        <img
          src={speaker.photo}
          alt={speaker.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-yellow-500">{speaker.name}</h3>
        <p className="text-blue-300 text-lg mt-1 italic">{speaker.title}</p>

        {/* Bio */}
        <p className="text-base text-gray-300 mt-4 leading-relaxed text-left">
          {speaker.shortBio}
        </p>
        {isExpanded && (
          <p className="text-base text-gray-300 mt-2 leading-relaxed text-left">
            {speaker.fullBio}
          </p>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-yellow-400 hover:text-yellow-300 font-medium text-sm mt-3 block"
        >
          {isExpanded ? "Show Less ▲" : "Read Full Bio →"}
        </button>
      </div>
    </div>
  );
}
