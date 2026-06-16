import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 50, damping: 20 });
  const display = useTransform(spring, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, mv, to]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}

const STATS = [
  { value: 20, suffix: "+", label: "Projects built" },
  { value: 1000, suffix: "+", label: "Hours coding" },
  { value: 12, suffix: "+", label: "Technologies mastered" },
  { value: 6, suffix: "", label: "Hackathons" },
];

export function Achievements() {
  return (
    <section className="relative bg-[#0B0D0F] px-6 py-40 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
          chapter 05 — by the numbers
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-balance text-5xl leading-[1.05] sm:text-7xl">
          Receipts.
        </h2>

        <div className="mt-24 divide-y divide-white/10 border-y border-white/10">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-[auto_1fr] items-baseline gap-6 py-10 sm:grid-cols-[1fr_auto] sm:py-16"
            >
              <p className="order-2 max-w-md text-lg text-muted-foreground sm:order-1 sm:text-2xl">
                <span className="mr-3 font-mono text-xs text-[var(--color-accent)]">
                  0{i + 1}
                </span>
                {s.label}
              </p>
              <h3 className="order-1 font-display text-7xl leading-none tracking-tighter text-gradient-accent sm:order-2 sm:text-[8rem] lg:text-[12rem]">
                <Counter to={s.value} suffix={s.suffix} />
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
