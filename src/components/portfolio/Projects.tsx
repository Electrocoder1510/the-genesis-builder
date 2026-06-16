import { motion, useScroll, useTransform } from "framer-motion";
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
  img: string;
  size: "lg" | "md" | "sm";
  align: "left" | "right" | "center";
  parallax: number;
};

const PROJECTS: Project[] = [
  {
    no: "01",
    title: "AI Interview Coach",
    year: "2025",
    desc: "A voice-first coach that runs realistic mock interviews and gives forensic feedback on what you actually said.",
    tech: ["Next.js", "OpenAI", "Whisper", "Edge"],
    img: interviewImg,
    size: "lg",
    align: "right",
    parallax: -60,
  },
  {
    no: "02",
    title: "Career Companion",
    year: "2025",
    desc: "Personal career OS — tracks skills, suggests paths, and turns ambition into weekly action.",
    tech: ["TypeScript", "Postgres", "LangChain"],
    img: careerImg,
    size: "md",
    align: "left",
    parallax: -120,
  },
  {
    no: "03",
    title: "Startup Validator",
    year: "2024",
    desc: "Pressure-tests a startup idea against market, audience, and unit economics in under 60 seconds.",
    tech: ["GPT-4", "Tailwind", "Vercel"],
    img: startupImg,
    size: "md",
    align: "right",
    parallax: -90,
  },
  {
    no: "04",
    title: "Portfolio Builder",
    year: "2024",
    desc: "Drag-and-drop portfolios that don't look like portfolios. For people who care how they show up.",
    tech: ["React", "Framer Motion"],
    img: portfolioImg,
    size: "sm",
    align: "center",
    parallax: -40,
  },
  {
    no: "05",
    title: "AI Study Assistant",
    year: "2023",
    desc: "Turns any document into a knowledge graph and a deck of spaced-repetition cards.",
    tech: ["Embeddings", "Supabase", "PWA"],
    img: studyImg,
    size: "md",
    align: "left",
    parallax: -100,
  },
];

function ProjectCard({ p, idx }: { p: Project; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, p.parallax]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 0.95]);

  const widthClass =
    p.size === "lg"
      ? "w-full lg:w-[78%]"
      : p.size === "md"
        ? "w-full lg:w-[58%]"
        : "w-full lg:w-[44%]";

  const alignClass =
    p.align === "right" ? "lg:ml-auto" : p.align === "center" ? "lg:mx-auto" : "lg:mr-auto";

  return (
    <motion.article
      ref={ref}
      style={{ y }}
      className={`${widthClass} ${alignClass} group relative`}
    >
      <div className="mb-5 flex items-end justify-between gap-6">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs text-[var(--color-accent)]">{p.no}</span>
          <h3 className="font-display text-3xl tracking-tight sm:text-4xl lg:text-5xl">{p.title}</h3>
        </div>
        <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, clipPath: "inset(100% 0 0 0)" }}
        whileInView={{ opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/5 bg-[var(--color-surface)]"
      >
        <motion.img
          src={p.img}
          alt={p.title}
          loading="lazy"
          width={1280}
          height={800}
          style={{ scale: imageScale }}
          className="aspect-[16/10] w-full object-cover"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D0F]/60 via-transparent to-transparent" />
      </motion.div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">{p.desc}</p>
        <ul className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-wider">
          {p.tech.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-muted-foreground">
              {t}
            </li>
          ))}
        </ul>
      </div>
      {idx < PROJECTS.length - 1 && <div className="mt-24 h-px w-24 bg-white/10" />}
    </motion.article>
  );
}

export function Projects() {
  return (
    <section className="relative bg-[#0B0D0F] px-6 py-40 sm:px-12 lg:px-20">
      <div className="mx-auto mb-32 max-w-7xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
          chapter 02 — selected work
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-balance text-5xl leading-[1.05] sm:text-7xl">
          Things I've built, <span className="italic text-muted-foreground">curated</span>.
        </h2>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-40">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.no} p={p} idx={i} />
        ))}
      </div>
    </section>
  );
}
