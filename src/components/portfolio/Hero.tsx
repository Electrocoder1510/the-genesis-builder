import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import portrait from "@/assets/portrait.jpg";
import { CodeParticles } from "./CodeParticles";
import { Typewriter } from "./Typewriter";

export function Hero({ name = "Alex" }: { name?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.32]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const ringScale = useTransform(scrollYProgress, [0, 1], [1, 2.4]);
  const ringOpacity = useTransform(scrollYProgress, [0, 1], [0.5, 0]);

  return (
    <section ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* background grid + radial fade */}
        <div aria-hidden className="absolute inset-0 grid-bg radial-fade opacity-60" />
        <CodeParticles count={22} />

        {/* corner labels */}
        <div className="absolute left-6 top-6 z-20 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:left-10 sm:top-10">
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] pulse-glow" />
          <span>portfolio / v.2026</span>
        </div>
        <div className="absolute right-6 top-6 z-20 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground sm:right-10 sm:top-10">
          scroll to begin ↓
        </div>

        {/* Left: typewriter */}
        <div className="absolute left-6 top-1/2 z-20 -translate-y-1/2 sm:left-12 lg:left-20">
          <motion.div style={{ opacity }} className="max-w-md">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
              ~/intro.sh
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient-accent italic">{name}</span>.
            </h1>
            <div className="mt-6 font-mono text-lg text-foreground/80 sm:text-xl">
              <span className="text-muted-foreground">{`> `}</span>
              <Typewriter words={["Developer.", "Builder.", "AI Explorer.", "Problem Solver.", "Creator."]} />
            </div>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A young engineer turning curiosity into products. Currently shipping AI-native tools that help
              people think and work better.
            </p>
          </motion.div>
        </div>

        {/* Center: portrait */}
        <motion.div
          style={{ scale, y }}
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            {/* expanding rings */}
            <motion.div
              aria-hidden
              style={{ scale: ringScale, opacity: ringOpacity }}
              className="absolute inset-0 -m-20 rounded-full border border-[var(--color-accent)]/30"
            />
            <motion.div
              aria-hidden
              style={{ scale: ringScale, opacity: ringOpacity }}
              className="absolute inset-0 -m-40 rounded-full border border-[var(--color-accent)]/15"
            />

            {/* orbiting code labels */}
            {[
              { label: "neural.ts", angle: -20, r: 240 },
              { label: "agent.run()", angle: 60, r: 280 },
              { label: "ship.sh", angle: 140, r: 230 },
              { label: "build()", angle: 220, r: 290 },
              { label: "0x6EE7FF", angle: 300, r: 250 },
            ].map((o, i) => {
              const rad = (o.angle * Math.PI) / 180;
              return (
                <span
                  key={i}
                  className="float-slow absolute font-mono text-[11px] text-[var(--color-accent)]/70"
                  style={{
                    left: `calc(50% + ${Math.cos(rad) * o.r}px)`,
                    top: `calc(50% + ${Math.sin(rad) * o.r}px)`,
                    transform: "translate(-50%,-50%)",
                    animationDelay: `${i * 0.6}s`,
                    textShadow: "0 0 10px rgba(110,231,255,0.5)",
                  }}
                >
                  {o.label}
                </span>
              );
            })}

            <div className="relative size-[280px] overflow-hidden rounded-[36px] sm:size-[360px] lg:size-[420px] glow-accent">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0B0D0F] via-transparent to-transparent" />
              <img
                src={portrait}
                alt="Portrait"
                className="size-full object-cover"
                width={1024}
                height={1024}
              />
            </div>
            <div
              aria-hidden
              className="absolute -inset-px rounded-[36px]"
              style={{
                background: "linear-gradient(135deg, rgba(110,231,255,0.35), transparent 60%)",
                WebkitMaskImage: "linear-gradient(#000,#000), linear-gradient(#000,#000)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: 1,
              }}
            />
          </div>
        </motion.div>

        {/* Right meta */}
        <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
          a story in eight chapters
        </div>
      </div>
    </section>
  );
}
