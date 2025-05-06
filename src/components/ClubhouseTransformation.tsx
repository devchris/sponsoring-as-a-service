'use client'
import { useEffect, useState, useRef } from 'react';

export default function ClubhouseTransformation() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation when element is in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate how far the element is through the viewport
        const elementProgress = 1 - (rect.top / windowHeight);
        // Constrain between 0 and 1
        setScrollProgress(Math.min(Math.max(elementProgress, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Run once on mount to initialize
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on scroll progress
  const roofStyle = {
    fill: `rgb(${155 + (scrollProgress * 50)}, ${75 + (scrollProgress * 53)}, ${60 + (scrollProgress * 20)})`,
    filter: `brightness(${0.7 + (scrollProgress * 0.5)})`,
  };

  const windowStyle = {
    fill: `rgba(100, 170, 255, ${0.2 + (scrollProgress * 0.7)})`,
    filter: `brightness(${0.7 + (scrollProgress * 0.5)})`,
  };

  const wallStyle = {
    fill: `rgb(${180 + (scrollProgress * 40)}, ${180 + (scrollProgress * 40)}, ${180 + (scrollProgress * 40)})`,
  };

  const grassStyle = {
    fill: `rgb(${100 + (scrollProgress * 50)}, ${150 + (scrollProgress * 50)}, ${50 + (scrollProgress * 80)})`,
  };

  const courtStyle = {
    fill: `rgb(${200 + (scrollProgress * 30)}, ${120 + (scrollProgress * 50)}, ${80 + (scrollProgress * 20)})`,
    opacity: 0.3 + (scrollProgress * 0.7),
  };

  const cloudStyle = {
    transform: `translateX(${-20 + (scrollProgress * 20)}px)`,
    opacity: 0.6 + (scrollProgress * 0.4),
  };

  const sunStyle = {
    opacity: 0.3 + (scrollProgress * 0.7),
    transform: `scale(${0.8 + (scrollProgress * 0.2)})`,
  };

  const crackStyle = {
    opacity: 1 - scrollProgress,
    strokeWidth: 2 - scrollProgress,
  };

  return (
    <div ref={containerRef} className="w-full h-96 mb-16 mt-8 overflow-hidden">
      <div className="mx-auto max-w-4xl relative">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Sky background */}
          <rect x="0" y="0" width="800" height="400" fill={`rgb(${135 + (scrollProgress * 80)}, ${206 + (scrollProgress * 40)}, ${250})`} />

          {/* Sun */}
          <circle cx="680" cy="80" r="50" fill="yellow" style={sunStyle} />

          {/* Clouds */}
          <g style={cloudStyle}>
            <ellipse cx="150" cy="70" rx="50" ry="30" fill="white" opacity="0.8" />
            <ellipse cx="200" cy="70" rx="40" ry="25" fill="white" opacity="0.8" />
            <ellipse cx="100" cy="70" rx="40" ry="25" fill="white" opacity="0.8" />
          </g>
          <g style={{ ...cloudStyle, transform: `translateX(${220 + (scrollProgress * -20)}px)` }}>
            <ellipse cx="150" cy="100" rx="50" ry="30" fill="white" opacity="0.7" />
            <ellipse cx="200" cy="100" rx="40" ry="25" fill="white" opacity="0.7" />
            <ellipse cx="100" cy="100" rx="40" ry="25" fill="white" opacity="0.7" />
          </g>

          {/* Ground */}
          <rect x="0" y="300" width="800" height="100" style={grassStyle} />

          {/* Tennis Court */}
          <rect x="500" y="310" width="250" height="150" style={courtStyle} />
          <rect x="510" y="320" width="230" height="130" fill="white" opacity="0.3" />
          <line x1="625" y1="320" x2="625" y2="450" stroke="white" strokeWidth="2" />
          <rect x="623" y="370" width="4" height="30" fill="white" />

          {/* Tennis net */}
          <line x1="625" y1="320" x2="625" y2="350" stroke="black" strokeWidth={1 + scrollProgress} />

          {/* Clubhouse Building */}
          <rect x="150" y="200" width="250" height="150" style={wallStyle} />

          {/* Door */}
          <rect x="240" y="280" width="40" height="70" fill={`rgb(${100 + (scrollProgress * 50)}, ${50 + (scrollProgress * 20)}, ${0})`} />
          <circle cx="250" cy="320" r="3" fill={scrollProgress > 0.5 ? "gold" : "#555"} />

          {/* Windows */}
          <rect x="180" y="230" width="40" height="40" style={windowStyle} />
          <rect x="320" y="230" width="40" height="40" style={windowStyle} />
          <line x1="200" y1="230" x2="200" y2="270" stroke="white" strokeWidth="2" />
          <line x1="180" y1="250" x2="220" y2="250" stroke="white" strokeWidth="2" />
          <line x1="340" y1="230" x2="340" y2="270" stroke="white" strokeWidth="2" />
          <line x1="320" y1="250" x2="360" y2="250" stroke="white" strokeWidth="2" />

          {/* Roof */}
          <polygon points="125,200 425,200 275,120" style={roofStyle} />

          {/* Club Sign */}
          <rect
            x="200"
            y="170"
            width="140"
            height="25"
            fill={`rgba(${30 + (scrollProgress * 50)}, ${50 + (scrollProgress * 50)}, ${120 + (scrollProgress * 100)}, ${0.5 + (scrollProgress * 0.5)})`}
            rx="5"
            ry="5"
          />
          <text
            x="270"
            y="187"
            textAnchor="middle"
            fill="white"
            fontWeight="bold"
            fontSize="14"
            style={{
              opacity: 0.6 + (scrollProgress * 0.4),
              filter: `drop-shadow(0 0 ${scrollProgress * 3}px white)`
            }}
          >
            TENNIS CLUB
          </text>

          {/* Cracks in the building - disappear with scroll */}
          <path d="M200,350 L230,320 L210,290" stroke="#333" fill="none" style={crackStyle} />
          <path d="M350,350 L320,300 L340,270" stroke="#333" fill="none" style={crackStyle} />
          <path d="M150,220 L170,260 L190,230" stroke="#333" fill="none" style={crackStyle} />
          <path d="M275,120 L275,150" stroke="#333" fill="none" style={crackStyle} />

          {/* Decorative elements that appear with scroll */}
          <g style={{ opacity: scrollProgress }}>
            {/* Flower beds */}
            <rect x="120" y="330" width="30" height="20" fill="#7c5e48" />
            <rect x="400" y="330" width="30" height="20" fill="#7c5e48" />

            {/* Flowers */}
            <circle cx="125" cy="325" r="5" fill="#ff5555" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />
            <circle cx="135" cy="325" r="5" fill="#ffff55" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />
            <circle cx="145" cy="325" r="5" fill="#ff55ff" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />

            <circle cx="405" cy="325" r="5" fill="#ff5555" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />
            <circle cx="415" cy="325" r="5" fill="#ffff55" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />
            <circle cx="425" cy="325" r="5" fill="#ff55ff" style={{ opacity: scrollProgress * 0.8 + 0.2 }} />

            {/* Tennis players */}
            <circle cx="550" cy="340" r="10" fill="#ffdbac" />
            <rect x="545" y="350" width="10" height="20" fill="white" />
            <line x1="555" y1="355" x2="570" y2="345" stroke="#666" strokeWidth="2" />
            <circle cx="570" cy="345" r="5" fill="#ffffaa" />

            <circle cx="700" cy="340" r="10" fill="#ffdbac" />
            <rect x="695" y="350" width="10" height="20" fill="red" />
            <line x1="695" y1="355" x2="680" y2="345" stroke="#666" strokeWidth="2" />
            <circle cx="680" cy="345" r="5" fill="#ffffaa" />
          </g>
        </svg>

        <div className="absolute bottom-0 left-0 right-0 text-center mb-4">
          <span className="inline-block px-4 py-2 bg-white/80 text-gray-900 rounded-lg backdrop-blur-sm text-sm font-medium shadow-sm">
            {scrollProgress < 0.3 ? 'Ein maroder Vereinssitz...' :
              scrollProgress < 0.7 ? 'Wir helfen bei der Transformation...' :
                'Ein florierender Verein mit Sponsoring!'}
          </span>
        </div>
      </div>
    </div>
  );
} 