import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import interviewImg from "@/assets/project-interview.jpg";
import careerImg from "@/assets/project-career.jpg";
import startupImg from "@/assets/project-startup.jpg";
import portfolioImg from "@/assets/project-portfolio.jpg";
import studyImg from "@/assets/project-study.jpg";

type Project = {
  no: string;
  title: string;
  year: string;
  desc: string;
  tech: string[];
  impact: string;
  img: string;
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "AI Interview Coach",
    year: "2025",
    desc: "A voice-first coach that runs realistic mock interviews and gives forensic feedback on what you actually said.",
    tech: ["Next.js", "OpenAI", "Whisper", "Edge"],
    impact: "12k mock sessions · 4.9★ user rating",
    img: interviewImg,
  },
  {
    no: "02",
    title: "Career Companion",
    year: "2025",
    desc: "Personal career OS — tracks skills, suggests paths, and turns ambition into weekly action.",
    tech: ["TypeScript", "Postgres", "LangChain"],
    impact: "Featured by 3 university career centers",
    img: careerImg,
  },
  {
    no: "03",
    title: "Startup Validator",
    year: "2024",
    desc: "Pressure-tests a startup idea against market, audience, and unit economics in under 60 seconds.",
    tech: ["GPT-4", "Tailwind", "Vercel"],
    impact: "60s validation · 8k ideas analyzed",
    img: startupImg,
  },
  {
    no: "04",
    title: "Portfolio Builder",
    year: "2024",
    desc: "Drag-and-drop portfolios that don't look like portfolios. For people who care how they show up.",
    tech: ["React", "Framer Motion"],
    impact: "1.2k portfolios shipped",
    img: portfolioImg,
  },
  {
    no: "05",
    title: "AI Study Assistant",
    year: "2023",
    desc: "Turns any document into a knowledge graph and a deck of spaced-repetition cards.",
    tech: ["Embeddings", "Supabase", "PWA"],
    impact: "First product · 500 active learners",
    img: studyImg,
  },
];

// Each panel is 90vw wide with 20vw gap → 110vw per project.
const PANEL_VW = 90;
const GAP_VW = 20;
const STEP_VW = PANEL_VW + GAP_VW;

function ProjectPanel({ p, index, progress }: { p: Project; index: number; progress: any }) {
  // Compute when this panel is "centered" in viewport.
  // Track translates from 0 to -(N-1)*STEP. Panel i is centered when track translate = -(i)*STEP.
  // So center progress for panel i is i / (N-1).
  const total = PROJECTS.length;
  const center = index / (total - 1);
  const span = 1 / (total - 1);

  const opacity = useTransform(
    progress,
    [Math.max(0, center - span), center, Math.min(1, center + span)],
    [0.35, 1, 0.35],
  );
  const scale = useTransform(
    progress,
    [Math.max(0, center - span), center, Math.min(1, center + span)],
    [0.92, 1, 0.92],
  );
  const imgX = useTransform(
    progress,
    [Math.max(0, center - span), center, Math.min(1, center + span)],
    ["6%", "0%", "-6%"],
  );

  return (
    <motion.article
      style={{ width: `${PANEL_VW}vw`, marginRight: `${GAP_VW}vw`, opacity, scale }}
      className="relative flex h-screen shrink-0 items-center"
    >
      <div className="relative grid h-[78vh] w-full grid-cols-12 gap-6 px-[4vw]">
        {/* Number — huge, behind */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -top-6 left-[2vw] font-display text-[22vw] leading-none text-white/[0.04] select-none"
        >
          {p.no}
        </motion.span>

        {/* Image */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          whileInView={{ clipPath: "inset(0% 0 0 0)" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative col-span-12 overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-surface)] lg:col-span-8"
        >
          <motion.img
            src={p.img}
            alt={p.title}
            loading="lazy"
            style={{ x: imgX }}
            className="h-full w-full scale-110 object-cover"
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0D0F]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--color-accent)]">
            <span>{p.no}</span>
            <span className="h-px w-8 bg-[var(--color-accent)]/60" />
            <span className="text-muted-foreground">{p.year}</span>
          </div>
        </motion.div>

        {/* Text */}
        <div className="col-span-12 flex flex-col justify-end lg:col-span-4">
          <motion.h3
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {p.title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {p.desc}
          </motion.p>
          <div className="mt-8 space-y-4">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">Stack</p>
              <ul className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">Impact</p>
              <p className="mt-2 text-sm text-foreground/90">{p.impact}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const total = PROJECTS.length;
  // Total horizontal travel: (N-1) * STEP_VW (in vw units)
  const travelVw = (total - 1) * STEP_VW;
  // Add a small leading offset so first project starts centered-ish
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${travelVw}vw`]);
  const smoothX = useSpring(x, { stiffness: 120, damping: 28, mass: 0.4 });

  // Progress motion value passed to panels for individual reactions
  const progress = useMotionValue(0);
  useTransform(scrollYProgress, (v) => {
    progress.set(v);
    return v;
  });
  // Drive progress directly:
  scrollYProgress.on?.("change", (v) => progress.set(v));

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0D0F]"
      style={{ height: `${total * 100}vh` }}
      aria-label="Selected work"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Chapter label */}
        <div className="pointer-events-none absolute left-[4vw] top-[4vh] z-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
            chapter 02 — selected work
          </p>
          <h2 className="mt-3 max-w-xl font-display text-3xl leading-[1.05] sm:text-4xl">
            A gallery of things <span className="italic text-muted-foreground">that didn't exist yesterday</span>.
          </h2>
        </div>

        {/* Progress rail */}
        <div className="pointer-events-none absolute bottom-8 left-[4vw] right-[4vw] z-20 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            01 / {String(total).padStart(2, "0")}
          </span>
          <div className="relative h-px flex-1 bg-white/10">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-[var(--color-accent)]/70"
            />
          </div>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x: smoothX, paddingLeft: "5vw", paddingRight: "5vw" }}
          className="flex h-full will-change-transform"
        >
          {PROJECTS.map((p, i) => (
            <ProjectPanel key={p.no} p={p} index={i} progress={progress} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
