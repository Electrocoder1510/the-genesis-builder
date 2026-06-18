import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Cursor-following fluid blobs that live in the background.
 * Sits behind text/code but in front of the portrait, with mix-blend
 * so it tints rather than obscures.
 */
export function CursorFluid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);

  // Two springs at different stiffness -> trailing/fluid feel
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

  const blob = (cx: any, cy: any, size: number, color: string, opacity: number) => {
    const left = useTransform(cx, (v: number) => `${v - size / 2}px`);
    const top = useTransform(cy, (v: number) => `${v - size / 2}px`);
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
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen"
    >
      {blob(sx1, sy1, 420, "rgba(110,231,255,0.55)", 0.9)}
      {blob(sx2, sy2, 620, "rgba(79,209,255,0.35)", 0.75)}
      {blob(sx3, sy3, 820, "rgba(140,180,255,0.22)", 0.6)}
    </div>
  );
}
