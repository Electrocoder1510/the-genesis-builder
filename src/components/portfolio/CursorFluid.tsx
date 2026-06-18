import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

function Blob({
  cx,
  cy,
  size,
  color,
  opacity,
}: {
  cx: MotionValue<number>;
  cy: MotionValue<number>;
  size: number;
  color: string;
  opacity: number;
}) {
  const left = useTransform(cx, (v) => `${v - size / 2}px`);
  const top = useTransform(cy, (v) => `${v - size / 2}px`);
  return (
    <motion.div
      aria-hidden
      style={{
        left,
        top,
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        opacity,
        filter: "blur(40px)",
      }}
      className="absolute rounded-full"
    />
  );
}

/**
 * Cursor-following fluid blobs that live in the background.
 * mix-blend-screen so they tint the scene without obscuring text.
 */
export function CursorFluid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  const sx1 = useSpring(x, { stiffness: 120, damping: 22, mass: 0.6 });
  const sy1 = useSpring(y, { stiffness: 120, damping: 22, mass: 0.6 });
  const sx2 = useSpring(x, { stiffness: 50, damping: 18, mass: 1.2 });
  const sy2 = useSpring(y, { stiffness: 50, damping: 18, mass: 1.2 });
  const sx3 = useSpring(x, { stiffness: 25, damping: 16, mass: 2 });
  const sy3 = useSpring(y, { stiffness: 25, damping: 16, mass: 2 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x.set(e.clientX - rect.left);
      y.set(e.clientY - rect.top);
    };
    const onLeave = () => {
      x.set(-9999);
      y.set(-9999);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
    >
      <Blob cx={sx1} cy={sy1} size={420} color="rgba(110,231,255,0.55)" opacity={0.9} />
      <Blob cx={sx2} cy={sy2} size={620} color="rgba(79,209,255,0.35)" opacity={0.75} />
      <Blob cx={sx3} cy={sy3} size={820} color="rgba(140,180,255,0.22)" opacity={0.6} />
    </div>
  );
}
