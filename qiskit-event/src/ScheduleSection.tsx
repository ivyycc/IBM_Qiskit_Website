export default function ScheduleSection() {
  const schedule = [
    {
      day: "Day 1: Quantum Kickoff",
      theme: "Introduce quantum basics and get hands-on with Qiskit.",
      items: [
        "9:00 AM - 9:15 AM: Welcome and Icebreaker",
        "9:15 AM - 10:00 AM: Lecture - Quantum Computing Basics 101",
        "10:00 AM - 10:15 AM: Break",
        "10:15 AM - 11:30 AM: Workshop - Getting Started with Qiskit",
        "11:30 AM - 12:00 PM: Quantum Trivia Quiz Challenge",
        '12:00 PM - 1:00 PM: Panel Q&A - “My Journey in Quantum Computing” (Shawal)',
      ],
    },
    {
      day: "Day 2: Diving Deeper",
      theme: "Explore quantum applications and circuit-building.",
      items: [
        "9:00 AM - 9:10 AM: Quick Recap",
        "9:10 AM - 10:00 AM: Lecture - Quantum Computing Applications Talk",
        "10:00 AM - 10:15 AM: Break",
        "10:15 AM - 11:30 AM: Workshop - Creating Circuits in Qiskit",
        "11:30 AM - 12:00 PM: Qiskit Circuit Builder Challenge Kickoff",
        "12:00 PM - 1:00 PM: Mini-Workshop - Exploring Quantum Gates",
      ],
    },
    {
      day: "Day 3: Quantum Finale",
      theme: "Celebrate quantum history and wrap up.",
      items: [
        "9:00 AM - 9:10 AM: Day 3 Welcome",
        "9:10 AM - 10:00 AM: Lecture - The History of Quantum Computing",
        "10:00 AM - 10:15 AM: Break",
        "10:15 AM - 11:30 AM: Workshop - Building a Quantum Random Number Generator",
        "11:30 AM - 12:00 PM: Closing Ceremony",
      ],
    },
  ];

  return (
    <section
      id="schedule"
      className="relative w-full px-6 md:px-12 lg:px-20 py-24 bg-blue-600 text-white"
    >
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-16">
        Event Schedule
      </h2>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-yellow-400 transform -translate-x-1/2" />

        <div className="space-y-32">
          {schedule.map((event, index) => (
            <div
              key={index}
              className={`relative flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Dot on the line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 rounded-full border-4 border-blue-600 shadow-lg" />

              {/* Card */}
              <div
                className={`w-5/12 p-6 rounded-xl shadow-lg bg-blue-700 text-white hover:scale-105 transform transition duration-300 ${
                  index % 2 === 0 ? "text-left" : ""
                }`}
              >
                {/* heading */}
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  {event.day}
                </h3>
                <p className="italic mb-4">{event.theme}</p>
                <div className="relative border-l-4 border-yellow-400 pl-6 space-y-6">
                  {event.items.map((item, i) => {
                    const [time, ...rest] = item.split(": ");
                    return (
                      <div
                        key={i}
                        className="group transform transition-transform duration-300 hover:scale-[1.02]"
                      >
                        <div className="bg-blue-800 p-4 rounded-xl shadow-md hover:bg-blue-900 transition-colors duration-300 ease-in-out">
                          <p className="text-white">
                            <span className="font-bold text-yellow-300">{time}</span>: {rest.join(": ")}
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
