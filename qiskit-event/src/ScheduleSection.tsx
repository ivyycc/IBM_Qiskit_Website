export default function ScheduleSection() {
  const schedule = [
    {
      day: "🌟 Day 1: Quantum Kickoff",
      theme: "Intro to quantum + Qiskit basics",
      items: [
        "9:00 – 9:15 → Welcome & Icebreaker",
        "9:15 – 10:00 → Lecture: Quantum Computing Basics 101:superposition, qubits, entanglement",
        "10:00 – 10:15 → Break: Have a snack!",
        "10:15 – 11:30 → Workshop: Getting Started with Qiskit: install, run first superposition circuit, probability histograms",
        "11:30 – 12:00 → Quantum Trivia Kahoot!: fun prizes for top 3!",
        "12:00 – 12:30 → Panel/Q&A: My Journey in Quantum Computing" ,
      ],
    },
    {
      day: "🌟 Day 2: Quantum Deep Dive & Celebration",
      theme: "Circuits, challenges, and the IBM keynote finale",
      items: [
        "9:00 – 9:10 → Quick Recap",
        "9:10 – 10:00 → Lecture: Quantum Applications in the Real World",
        "10:00 – 10:15 → Break: Have a snack!",
        "10:15 – 11:00 → Workshop: Building Circuits in Qiskit: X, H, Bell state",
        "11:00 – 11:30 → Challenge: Bell State Circuit / Small Puzzle Extension",
        "11:30 – 12:00 → IBM Speaker Talk + Q&A: speaker to be confirmed...coming soon!",
        "12:00 – 12:30 → Closing Ceremony: Certificates, Prizes, and Next Steps in Your Quantum Journey",
      ],
    },
  ];

  return (
    <section
      id="schedule"
      className="relative w-full px-6 md:px-12 lg:px-20 py-24 bg-black text-white"
    >
      <h2 className="text-4xl font-bold text-center text-yellow-500 mb-16">
        Event Schedule
      </h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-500 transform -translate-x-1/2" />

        <div className="space-y-32">
          {schedule.map((event, index) => (
            <div
              key={index}
              className={`relative flex w-full ${
                index % 2 === 0 ? "md:justify-start" : "md:justify-end"
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-blue-600 shadow-lg" />

              {/* Card */}
              <div
                className={`w-full md:w-5/12 p-6 rounded-xl shadow-lg bg-blue-800 text-white transform transition duration-300 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] ${
                  index % 2 === 0 ? "text-left" : "md:text-left"
                }`}
              >
                {/* heading */}
                <h3 className="text-2xl font-extrabold text-yellow-400 mb-2 tracking-wide">
                  {event.day}
                </h3>
                <p className="italic mb-4 text-pink-300">{event.theme}</p>
                <div className="relative border-l-4 border-yellow-500 pl-6 space-y-6">
                  {event.items.map((item, i) => {
                    const [time, ...rest] = item.split(": ");
                    return (
                      <div
                        key={i}
                        className="group transform transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <div className="bg-blue-800 p-4 rounded-xl shadow-md hover:bg-pink-400 transition-colors duration-300 ease-in-out">
                          <p className="text-white">
                            <span className="font-bold text-yellow-500">
                              {time}
                            </span>
                            : {rest.join(": ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
