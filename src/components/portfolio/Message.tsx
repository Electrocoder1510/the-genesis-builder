import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";

function Line({ children, progress, range }: { children: React.ReactNode; progress: MotionValue<number>; range: [number, number, number, number] }) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [40, 0, 0, -40]);
  return (
    <motion.h2
      style={{ opacity, y }}
      className="font-display text-balance text-5xl leading-[1] tracking-tight sm:text-7xl md:text-8xl lg:text-[9rem]"
    >
      {children}
    </motion.h2>
  );
}

export function Message() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#0B0D0F]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
        <div className="relative w-full max-w-6xl">
          <p className="mb-10 text-center font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
            chapter 01 — why
          </p>
          <div className="relative h-[60vh]">
            <div className="absolute inset-0 flex items-center justify-center">
              <Line progress={scrollYProgress} range={[0.0, 0.12, 0.28, 0.36]}>
                Technology isn't <span className="italic text-muted-foreground">what excites me.</span>
              </Line>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Line progress={scrollYProgress} range={[0.36, 0.46, 0.6, 0.68]}>
                <span className="text-gradient-accent">Creating things</span>
              </Line>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Line progress={scrollYProgress} range={[0.68, 0.78, 0.92, 1]}>
                that didn't exist <span className="italic">yesterday</span> does.
              </Line>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
