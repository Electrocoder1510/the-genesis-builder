import { useMemo } from "react";

const SNIPPETS = [
  "const idea = await build();",
  "if (!exists) create();",
  "model.train(curiosity)",
  "while(true) ship()",
  "export default future",
  "ai.imagine(impossible)",
  "fetch('/dreams')",
  "return new Thing()",
  "0x6EE7FF",
  "// keep building",
  "neuron.fire()",
  "git commit -m 'wip'",
];

export function CodeParticles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        text: SNIPPETS[i % SNIPPETS.length],
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 14 + Math.random() * 14,
        size: 10 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 font-mono whitespace-nowrap text-[var(--color-accent)]"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `drift ${p.duration}s linear ${p.delay}s infinite`,
            textShadow: "0 0 12px rgba(110,231,255,0.4)",
          }}
        >
          {p.text}
        </span>
      ))}
    </div>
  );
}
