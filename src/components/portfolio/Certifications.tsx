import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";

const CERTS = [
  { name: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2024" },
  { name: "Full-Stack Web Development", issuer: "Meta", year: "2023" },
  { name: "Prompt Engineering for Developers", issuer: "OpenAI", year: "2024" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2024" },
  { name: "Product Design Foundations", issuer: "Interaction Design Foundation", year: "2023" },
  { name: "GenAI with LLMs", issuer: "Coursera", year: "2025" },
];

function GlassCard({ cert, i }: { cert: (typeof CERTS)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const ry = useSpring(useMotionValue(0), { stiffness: 120, damping: 14 });
  const rotateX = useTransform(rx, (v) => v);
  const rotateY = useTransform(ry, (v) => v);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ry.set(x * 18);
    rx.set(-y * 18);
  };
  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="glass-panel group relative aspect-[4/5] rounded-3xl p-7 transition-shadow hover:shadow-[0_40px_80px_-30px_rgba(110,231,255,0.25)]"
    >
      <div className="flex h-full flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
            cert / {String(i + 1).padStart(2, "0")}
          </span>
          <span className="size-1.5 rounded-full bg-[var(--color-accent)] pulse-glow" />
        </div>
        <div>
          <h3 className="font-display text-2xl leading-tight tracking-tight">{cert.name}</h3>
          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs">
            <span className="text-muted-foreground">{cert.issuer}</span>
            <span className="text-foreground/80">{cert.year}</span>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), rgba(110,231,255,0.15), transparent 60%)",
        }}
      />
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section className="relative overflow-hidden bg-[#0B0D0F] px-6 py-40 sm:px-12 lg:px-20">
      <div aria-hidden className="absolute inset-0 grid-bg opacity-30 radial-fade" />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
          chapter 04 — credentials
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-balance text-5xl leading-[1.05] sm:text-7xl">
          Floating proof <span className="italic text-muted-foreground">of the work.</span>
        </h2>
        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((c, i) => (
            <GlassCard key={c.name} cert={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
