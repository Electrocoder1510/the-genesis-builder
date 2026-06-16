import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMemo, useRef } from "react";

function Particle({ p, progress, convergence }: { p: { x: number; y: number; d: number }; progress: MotionValue<number>; convergence: MotionValue<number> }) {
  const x = useTransform(convergence, (v) => `${p.x * v}vw`);
  const y = useTransform(convergence, (v) => `${p.y * v}vh`);
  const opacity = useTransform(progress, [0, 0.9, 1], [0.6, 0.9, 0.2]);
  return (
    <motion.span
      style={{ x, y, opacity, width: p.d, height: p.d }}
      className="absolute rounded-full bg-[var(--color-accent)]"
    />
  );
}

export function Vision() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const firstOpacity = useTransform(scrollYProgress, [0.05, 0.2, 0.4, 0.55], [0, 1, 1, 0]);
  const firstY = useTransform(scrollYProgress, [0.05, 0.2], [30, 0]);
  const secondOpacity = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 0.95], [0, 1, 1, 1]);
  const secondY = useTransform(scrollYProgress, [0.5, 0.65], [40, 0]);
  const convergence = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const particles = useMemo(
    () =>
      Array.from({ length: 60 }).map((_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 100,
        y: (Math.random() - 0.5) * 100,
        d: 1 + Math.random() * 2,
      })),
    [],
  );

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#0B0D0F]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        {/* converging particles */}
        <div aria-hidden className="absolute inset-0 flex items-center justify-center">
          {particles.map((p) => (
            <Particle key={p.id} p={p} progress={scrollYProgress} convergence={convergence} />
          ))}
          <motion.div
            style={{
              opacity: useTransform(scrollYProgress, [0.7, 1], [0, 1]),
              scale: useTransform(scrollYProgress, [0.7, 1], [0.5, 1.6]),
            }}
            className="absolute size-3 rounded-full bg-[var(--color-accent)]"
            aria-hidden
          >
            <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] blur-2xl" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center">
          <motion.p style={{ opacity: firstOpacity, y: firstY }} className="font-display text-balance text-6xl leading-none tracking-tight sm:text-8xl lg:text-[10rem]">
            Still <span className="italic text-muted-foreground">building.</span>
          </motion.p>
          <motion.p style={{ opacity: secondOpacity, y: secondY }} className="absolute inset-0 flex items-center justify-center font-display text-balance text-5xl leading-[1.05] tracking-tight sm:text-7xl lg:text-9xl">
            <span>
              The best project<br />
              <span className="text-gradient-accent italic">is the next one.</span>
            </span>
          </motion.p>
        </div>
      </div>
    </section>
  );
}
