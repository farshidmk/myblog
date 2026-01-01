"use client";

export default function CodeAnimation() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main screen */}
        <rect
          x="50"
          y="50"
          width="300"
          height="300"
          rx="20"
          fill="#006d77"
          opacity="0.1"
          className="animate-pulse-slow"
        />
        <rect
          x="60"
          y="90"
          width="280"
          height="240"
          rx="10"
          fill="white"
          opacity="0.9"
        />

        {/* Code lines */}
        <g className="animate-fade-in">
          <rect x="80" y="110" width="100" height="8" rx="4" fill="#006d77" />
          <rect x="190" y="110" width="60" height="8" rx="4" fill="#e29578" />
        </g>

        <g className="animate-fade-in-delayed">
          <rect x="80" y="130" width="80" height="8" rx="4" fill="#83c5be" />
          <rect x="170" y="130" width="120" height="8" rx="4" fill="#006d77" />
        </g>

        <g className="animate-fade-in-more-delayed">
          <rect x="80" y="150" width="140" height="8" rx="4" fill="#e29578" />
          <rect x="230" y="150" width="40" height="8" rx="4" fill="#83c5be" />
        </g>

        <g className="animate-fade-in">
          <rect x="80" y="170" width="60" height="8" rx="4" fill="#006d77" />
          <rect x="150" y="170" width="90" height="8" rx="4" fill="#83c5be" />
        </g>

        <g className="animate-fade-in-delayed">
          <rect x="80" y="190" width="110" height="8" rx="4" fill="#e29578" />
        </g>

        {/* Terminal header */}
        <rect x="60" y="60" width="280" height="25" rx="10" fill="#006d77" />
        <circle cx="75" cy="72.5" r="4" fill="#e29578" />
        <circle cx="90" cy="72.5" r="4" fill="#83c5be" />
        <circle cx="105" cy="72.5" r="4" fill="#ffddd2" />

        {/* Floating elements */}
        <circle
          cx="350"
          cy="100"
          r="15"
          fill="#e29578"
          opacity="0.6"
          className="animate-bounce-slow"
        />
        <circle
          cx="30"
          cy="300"
          r="12"
          fill="#83c5be"
          opacity="0.6"
          className="animate-bounce-delayed"
        />

        {/* Brackets */}
        <text
          x="310"
          y="280"
          fontSize="60"
          fill="#006d77"
          opacity="0.3"
          className="animate-rotate"
          style={{ fontFamily: "monospace" }}
        >
          {"{ }"}
        </text>
      </svg>
    </div>
  );
}
