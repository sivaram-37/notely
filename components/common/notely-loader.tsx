"use client";

export const NotelyLoader = ({ size = 64 }: { size?: number }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-notely-pulse">
        {/* Notebook Body */}
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="10"
          className="fill-primary stroke-background"
          strokeWidth="2"
        />

        {/* Left Eye (blinks first) */}
        <circle
          cx="24"
          cy="28"
          r="4"
          className="fill-background origin-center animate-notely-blink-left"
        />

        {/* Right Eye (blinks second with delay) */}
        <circle
          cx="40"
          cy="28"
          r="4"
          className="fill-background origin-center animate-notely-blink-right"
        />

        {/* Smile */}
        <path
          d="M24 40 C30 46, 34 46, 40 40"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="animate-notely-smile"
        />
      </svg>

      {/* Loading text */}
      <div className="flex gap-0.5 text-primary font-medium text-sm">
        {"Loading...".split("").map((char, i) => (
          <p key={i} className="animate-notely-wave" style={{ animationDelay: `${i * 0.12}s` }}>
            {char}
          </p>
        ))}
      </div>
    </div>
  );
};
