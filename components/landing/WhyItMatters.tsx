import { Reveal } from "./Reveal";

const STAGES = [
  { title: "Buying", pain: "Contracts everywhere", icon: "🔑" },
  { title: "Moving in", pain: "Utilities, keys, chaos", icon: "📦" },
  { title: "Maintenance", pain: "Forgotten schedules", icon: "🔧" },
  { title: "Insurance", pain: "Renewals slip past", icon: "🛡️" },
  { title: "Repairs", pain: "Which tradie again?", icon: "🪚" },
  { title: "Selling", pain: "Missing paperwork", icon: "🏷️" },
  { title: "Next home", pain: "Start from zero", icon: "🏡" },
];

export function WhyItMatters() {
  return (
    <section className="py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-medium text-accent-foreground bg-accent-soft px-3 py-1 rounded-full">Why this matters</span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">
              Every stage of ownership creates a new pile of problems.
            </h2>
            <p className="mt-4 text-ink-soft">
              The truth is, property doesn't stop demanding your attention after the paperwork is signed.
              It just goes quiet until it doesn't.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 relative">
          {/* line */}
          <div className="hidden lg:block absolute top-10 left-6 right-6 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {STAGES.map((s, i) => (
              <Reveal key={s.title} delay={i * 60}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-background border border-border grid place-items-center text-3xl hover-lift">
                    {s.icon}
                  </div>
                  <div className="mt-4 font-semibold text-ink">{s.title}</div>
                  <div className="mt-1 text-sm text-ink-soft">{s.pain}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <a href="#survey" className="inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
            Tell us where it hurts most
          </a>
        </div>
      </div>
    </section>
  );
}

