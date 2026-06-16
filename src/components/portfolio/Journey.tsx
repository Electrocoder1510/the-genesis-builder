import { motion } from "framer-motion";

const MILESTONES = [
  { year: "2022", title: "First website", desc: "A single HTML file. Hosted on a free subdomain. Refreshed it 40 times that night." },
  { year: "2023", title: "Met AI", desc: "Started experimenting with LLMs. Discovered the joy of teaching machines to reason." },
  { year: "2024", title: "Real-world projects", desc: "Shipped tools real people used. Learned that launching beats learning quietly." },
  { year: "2025", title: "Building products", desc: "Solving problems I actually care about. Treating every release like a small story." },
];

export function Journey() {
  return (
    <section className="relative bg-[#0B0D0F] px-6 py-40 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
          chapter 03 — journey
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-balance text-5xl leading-[1.05] sm:text-7xl">
          Four years.<br />
          <span className="italic text-muted-foreground">A thousand iterations.</span>
        </h2>

        <div className="relative mt-32">
          <div className="absolute left-[7px] top-0 h-full w-px bg-gradient-to-b from-[var(--color-accent)]/40 via-white/10 to-transparent md:left-1/2" />
          <ul className="space-y-32">
            {MILESTONES.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-20%" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-16 ${right ? "" : "md:[&>*:first-child]:order-2"}`}
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 size-4 rounded-full border border-[var(--color-accent)]/50 bg-[#0B0D0F] md:left-1/2 md:-translate-x-1/2"
                  >
                    <span className="absolute inset-1 rounded-full bg-[var(--color-accent)] pulse-glow" />
                  </span>
                  <div className={`md:px-10 ${right ? "md:text-left" : "md:text-right"}`}>
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--color-accent)]">
                      {m.year}
                    </p>
                    <h3 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">{m.title}</h3>
                  </div>
                  <div className={`mt-4 md:mt-0 md:px-10 ${right ? "md:text-left" : "md:text-right"}`}>
                    <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:ml-0 md:mr-0">
                      {m.desc}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
