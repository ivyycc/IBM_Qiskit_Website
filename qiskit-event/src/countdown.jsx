// CountdownTimer.jsx
import React, { useState, useEffect } from 'react';

// The target date and time for the event: 11 October, 2025 at 00:00:00 (midnight)
// NOTE: Adjust the timezone if necessary. This uses local time by default.
const TARGET_DATE = new Date('October 11, 2025 09:00:00').getTime();

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isEventOver, setIsEventOver] = useState(false);

  function calculateTimeLeft() {
    // Get the difference between the target date and the current date (in milliseconds)
    const difference = TARGET_DATE - new Date().getTime();
    let time = {};

    if (difference > 0) {
      // Calculate days, hours, minutes, and seconds
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        //minutes: Math.floor((difference / 1000 / 60) % 60),
        //seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      // Event is over
      time = { days: 0, hours: 0};// minutes: 0, seconds: 0 };
    }
    
    return time;
  }

  useEffect(() => {
    // Set up the interval to update the countdown every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Check if the difference is less than or equal to zero
      if (TARGET_DATE - new Date().getTime() <= 0) {
        setIsEventOver(true);
        clearInterval(timer); // Stop the timer when the event starts
      }
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timer);
  }, []);

  // Format the time value to always have two digits (e.g., 05 instead of 5)
  const formatTime = (value) => String(value).padStart(2, '0');

  // Render the timer UI
  const timerComponents = Object.keys(timeLeft).map((unit) => (
    <div key={unit} className="flex flex-col items-center p-2 sm:p-4 bg-yellow-400/20 backdrop-blur-sm rounded-lg shadow-xl min-w-[70px] sm:min-w-[90px]">
      {/* Time value, e.g., '12' */}
      <span className="text-3xl sm:text-5xl font-extrabold text-yellow-300 font-mono tracking-tighter" style={{ textShadow: '0 0 5px #fcd34d' }}>
        {formatTime(timeLeft[unit])}
      </span>
      {/* Unit label, e.g., 'Days' */}
      <span className="text-xs sm:text-sm uppercase font-semibold mt-1 text-white">
        {unit}
      </span>
    </div>
  ));

  return (
    <div className="flex justify-center items-center space-x-2 sm:space-x-4">
      {isEventOver ? (
        <p className="text-2xl sm:text-3xl font-bold text-yellow-400 p-4 rounded-lg bg-blue-900/50">
          🎉 The event is currently underway!
        </p>
      ) : (
        timerComponents
      )}
    </div>
  );
};

export default CountdownTimer;