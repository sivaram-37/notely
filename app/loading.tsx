"use client";

const Loading = () => {
  return (
    <div className="h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="flex items-end gap-2">
        {[16, 26, 20, 30].map((h, i) => (
          <div
            key={i}
            className="w-2 bg-primary rounded-sm animate-[eqBounce_0.9s_ease-in-out_infinite]"
            style={{ height: h, animationDelay: `${i * 0.15}s` }}
          />
        ))}
        <style>
          {`
          @keyframes eqBounce {
            0%, 100% {
              transform: scaleY(1);
              opacity: 0.8;
              }
              50% {
              transform: scaleY(1.9);
              opacity: 1;
              }
              }
              `}
        </style>
      </div>
    </div>
  );
};

export default Loading;
