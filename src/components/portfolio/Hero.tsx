import { motion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef } from "react";
import portrait from "@/assets/portrait.jpg";
import { Typewriter } from "./Typewriter";

const FLOW_SNIPPETS = [
  "const idea = await build();",
  "if (!exists) create();",
  "model.train(curiosity)",
  "while(true) ship()",
  "neuron.fire()",
  "ai.imagine(impossible)",
  "fetch('/dreams')",
  "return new Thing()",
  "0x6EE7FF",
  "// keep building",
  "export default future",
  "agent.run()",
  "git commit -m 'wip'",
  "build()",
  "neural.ts",
];

export function Hero({ name = "Alex" }: { name?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  // Start slightly zoomed in, then zoom OUT as the user scrolls — stops at 0.7 (not fully gone)
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.15, 0.7]);
  const frameOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 1, 0]);


  // Flowing code lines across the face — random vertical positions, varied speeds
  const flows = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        text: FLOW_SNIPPETS[i % FLOW_SNIPPETS.length],
        top: 8 + Math.random() * 84, // % within viewport
        duration: 9 + Math.random() * 12,
        delay: -Math.random() * 20,
        size: 11 + Math.random() * 5,
        opacity: 0.35 + Math.random() * 0.5,
        direction: i % 3 === 0 ? "rtl" : "ltr",
      })),
    [],
  );

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#05070a]">
        {/* Full-bleed portrait — zooms OUT on scroll, stops at a comfortable size */}
        <motion.div
          style={{ scale: imgScale, y, opacity: frameOpacity }}
          className="absolute inset-0"
        >
          <img src={portrait} alt="Portrait" className="size-full object-cover" />
        </motion.div>


        {/* Subtle vignette + cyan wash to unify with brand */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, rgba(5,7,10,0.55) 70%, rgba(5,7,10,0.95) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(120deg, rgba(110,231,255,0.10), transparent 40%, rgba(110,231,255,0.08))",
          }}
        />
        <div aria-hidden className="absolute inset-0 grid-bg opacity-[0.08]" />

        {/* Flowing code lines — pass IN FRONT of the face */}
        <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
          {flows.map((f) => (
            <span
              key={f.id}
              className="absolute whitespace-nowrap font-mono text-[var(--color-accent)]"
              style={{
                top: `${f.top}%`,
                fontSize: `${f.size}px`,
                opacity: f.opacity,
                textShadow:
                  "0 0 10px rgba(110,231,255,0.7), 0 0 24px rgba(110,231,255,0.35)",
                animation: `flow-${f.direction} ${f.duration}s linear ${f.delay}s infinite`,
                willChange: "transform",
              }}
            >
              {f.text}
            </span>
          ))}
        </div>

        {/* Corner labels */}
        <div className="absolute left-6 top-6 z-30 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:left-10 sm:top-10">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] pulse-glow" />
          <span>portfolio / v.2026</span>
        </div>
        <div className="absolute right-6 top-6 z-30 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:right-10 sm:top-10">
          scroll to begin ↓
        </div>

        {/* Name + typewriter — left side */}
        <div className="absolute inset-y-0 left-0 z-20 flex items-center">
          <motion.div
            style={{ opacity }}
            className="max-w-xl px-6 sm:px-12 lg:px-20"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
              ~/intro.sh
            </p>
            <h1 className="font-display text-6xl leading-[0.95] text-balance sm:text-7xl lg:text-[8rem]">
              Hi, I'm
              <br />
              <span className="text-gradient-accent italic">{name}</span>.
            </h1>
            <div className="mt-6 font-mono text-lg text-foreground/90 sm:text-xl">
              <span className="text-[var(--color-accent)]">{`> `}</span>
              <Typewriter
                words={["Developer.", "Builder.", "AI Explorer.", "Problem Solver.", "Creator."]}
              />
            </div>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-foreground/70">
              A young engineer turning curiosity into products. Currently shipping AI-native tools
              that help people think and work better.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          a story in eight chapters
        </div>
      </div>
    </section>
  );
}
