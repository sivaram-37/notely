export const NotelyLogo = ({ size = 32 }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        className="block"
        xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="12" fill="var(--primary)" />

        <rect
          x="14"
          y="14"
          width="36"
          height="36"
          rx="6"
          fill="var(--background)"
          stroke="var(--foreground)"
          strokeWidth="2"
        />

        <path d="M50 34 L36 50 H50 V34Z" fill="var(--chart-3)" />

        <line
          x1="20"
          y1="26"
          x2="44"
          y2="26"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="34"
          x2="44"
          y2="34"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="20"
          y1="42"
          x2="38"
          y2="42"
          stroke="var(--foreground)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      <span className="text-2xl font-semibold" style={{ color: "var(--primary)" }}>
        Notely
      </span>
    </div>
  );
};
