import confetti from "canvas-confetti";

export const tinyConfetti = (origin?: { x: number; y: number }) => {
  confetti({
    particleCount: 40,
    spread: 70,
    startVelocity: 20,
    gravity: 1,
    scalar: 1,
    ticks: 90,
    origin: origin ?? { x: 0.5, y: 0.5 },
  });
};
