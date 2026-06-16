const LINKS = [
  { label: "GitHub", href: "https://github.com", hint: "@username" },
  { label: "LinkedIn", href: "https://linkedin.com", hint: "/in/username" },
  { label: "Email", href: "mailto:hello@example.com", hint: "hello@example.com" },
  { label: "Resume", href: "#", hint: "PDF · 2026" },
];

export function Contact() {
  return (
    <section className="relative bg-[#0B0D0F] px-6 pb-20 pt-40 sm:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-[var(--color-accent)]">
          chapter 08 — say hi
        </p>
        <h2 className="mt-6 max-w-3xl font-display text-balance text-5xl leading-[1.05] sm:text-7xl">
          Let's build something <span className="italic text-muted-foreground">that didn't exist yesterday.</span>
        </h2>

        <ul className="mt-24 divide-y divide-white/10 border-y border-white/10">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between py-8 transition-colors hover:bg-white/[0.02] sm:py-10"
              >
                <div className="flex items-baseline gap-6">
                  <span className="font-display text-4xl tracking-tight transition-transform group-hover:-translate-x-1 sm:text-6xl">
                    {l.label}
                  </span>
                  <span className="hidden font-mono text-xs text-muted-foreground sm:inline">{l.hint}</span>
                </div>
                <span
                  aria-hidden
                  className="font-mono text-xs text-[var(--color-accent)] transition-transform group-hover:translate-x-2"
                >
                  → 01
                </span>
              </a>
            </li>
          ))}
        </ul>

        <footer className="mt-24 flex flex-col items-start justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© 2026 — built with care</span>
          <span>end of story / scroll up to replay</span>
        </footer>
      </div>
    </section>
  );
}
