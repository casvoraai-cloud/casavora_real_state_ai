"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFamiliarChecklist } from "@/hooks/use-familiar-checklist";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

export function SoundFamiliar() {
  const { items, checked, toggle, submitting, submitted, handleSubmit } = useFamiliarChecklist();

  return (
    <section id="familiar" className="py-28 relative bg-surface border-y border-border">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">The Problem</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Does this sound familiar?</h2>
            <p className="mt-4 text-ink-soft max-w-xl mx-auto">
              Tick the ones you've felt. It's not just you — property ownership was never designed
              to fit inside your inbox.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid sm:grid-cols-2 gap-3">
            {items.map((item, i) => {
              const on = checked.has(i);
              return (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => toggle(i)}
                  className={`group h-auto justify-start gap-4 rounded-2xl border px-5 py-4 text-left font-normal transition-all duration-300 ${
                    on
                      ? "bg-accent-soft border-accent/30 hover:bg-accent-soft"
                      : "bg-surface border-border hover:border-ink/20"
                  }`}
                >
                  <span
                    className={`grid place-items-center w-6 h-6 rounded-md border-2 transition-all ${
                      on ? "bg-accent border-accent" : "border-ink/20 group-hover:border-ink/40"
                    }`}
                  >
                    {on && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-base text-ink transition-all">
                    {item}
                  </span>
                </Button>
              );
            })}
          </div>
          {checked.size > 0 && (
            <p className="mt-8 text-center text-sm text-ink-soft">
              You've ticked <b className="text-ink">{checked.size}</b>. Keep scrolling —
              we're building for exactly this.
            </p>
          )}
          <div className="mt-10 text-center">
            <Button
              onClick={handleSubmit}
              disabled={checked.size === 0 || submitting}
              className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift disabled:opacity-50"
            >
              {submitting ? "Submitting…" : submitted ? "Submitted ✓" : "Submit"}
            </Button>
          </div>
        </Reveal>
        <ScrollCue to="journey" />
      </div>
    </section>
  );
}
