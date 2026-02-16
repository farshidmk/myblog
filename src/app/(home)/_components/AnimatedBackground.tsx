"use client";

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated circles */}
        <circle
          cx="10%"
          cy="20%"
          r="120"
          fill="#006d77"
          opacity="0.1"
          className="animate-float"
        />
        <circle
          cx="85%"
          cy="15%"
          r="80"
          fill="#e29578"
          opacity="0.15"
          className="animate-float-delayed"
        />
        <circle
          cx="90%"
          cy="80%"
          r="100"
          fill="#83c5be"
          opacity="0.1"
          className="animate-float-slow"
        />
        <circle
          cx="15%"
          cy="85%"
          r="90"
          fill="#006d77"
          opacity="0.12"
          className="animate-float"
        />

        {/* Animated paths */}
        <path
          d="M 0 50 Q 150 30 300 50 T 600 50"
          stroke="#006d77"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
          className="animate-draw"
        />
        <path
          d="M 100 0 Q 120 150 140 300"
          stroke="#e29578"
          strokeWidth="2"
          fill="none"
          opacity="0.2"
          className="animate-draw-delayed"
        />
      </svg>
    </div>
  );
}
