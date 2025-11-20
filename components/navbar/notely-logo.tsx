export const NotelyLogo = ({ size = 32 }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="block"
        xmlns="http://www.w3.org/2000/svg">
        {/* Notebook Body (primary background, white stroke) */}
        <rect
          x="8"
          y="8"
          width="48"
          height="48"
          rx="10"
          className="fill-primary stroke-background"
          strokeWidth="2"
        />

        {/* Eyes (white) */}
        <circle cx="24" cy="28" r="4" className="fill-background" />
        <circle cx="40" cy="28" r="4" className="fill-background" />

        {/* Smile (white stroke) */}
        <path
          d="M24 40 C30 46, 34 46, 40 40"
          stroke="hsl(0 0% 100%)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Title */}
      <span className="text-2xl font-semibold text-primary">Notely</span>
    </div>
  );
};
