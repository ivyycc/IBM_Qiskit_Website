import React, { useState, useEffect, useRef } from "react";

const TypingText: React.FC = () => {
  const fullText = "IBM Qiskit Fall Fest 2025";
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 640;

    if (!isMobile) {
      // Desktop: use pure CSS animation, no JS typing needed
      setTypedText(fullText);
      setIsTyping(false);
      return;
    }

    // Mobile: JS typing
    let index = 0;

    intervalRef.current = window.setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index += 1;
      } else {
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 100); // adjust typing speed here

    return () => {
      if (intervalRef.current !== null) clearInterval(intervalRef.current);
    };
  }, [fullText]);

  return (
    <>
      <span className="typing-text-desktop">
        {fullText}
      </span>

      <span className="typing-text-mobile" style={{ fontFamily: "monospace" }}>
        {typedText}
        {isTyping && <span className="typing-cursor">|</span>}
      </span>

      <style>{`
        /* Desktop typing effect */
        .typing-text-desktop {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #FFD700;
          font-family: monospace;
          animation: typing 4s steps(${fullText.length}, end) forwards,
                     blink-caret 0.75s step-end infinite;
        }

        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blink-caret {
          0%, 100% { border-color: transparent; }
          50% { border-color: #FFD700; }
        }

        /* Mobile typing cursor */
        .typing-cursor {
          animation: blink 0.7s step-end infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }

        /* Hide desktop on mobile, mobile on desktop */
        @media (max-width: 640px) {
          .typing-text-desktop { display: none; }
        }
        @media (min-width: 641px) {
          .typing-text-mobile { display: none; }
        }
      `}</style>
    </>
  );
};

export default TypingText;
