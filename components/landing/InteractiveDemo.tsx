"use client";

import { useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

type Step = {
  label: string;
  title: string;
  body: () => ReactNode;
};

const STEPS: Step[] = [
  {
    label: "My Property",
    title: "42 Willow Street",
    body: () => (
      <div className="grid grid-cols-2 gap-3">
        {["Dashboard", "Documents", "Appliances", "Tradies"].map((t) => (
          <div key={t} className="rounded-xl border border-border p-4 text-sm font-medium text-ink hover:border-primary/30 hover:bg-primary/[0.03] transition">{t}</div>
        ))}
      </div>
    ),
  },
  {
    label: "Dashboard",
    title: "Property overview",
    body: () => (
      <div className="space-y-3">
        {[
          { t: "Next up · Boiler service", s: "In 12 days", c: "bg-accent" },
          { t: "Insurance renewal", s: "In 42 days", c: "bg-amber-400" },
          { t: "Warranty · Dishwasher", s: "Valid 2 years", c: "bg-primary" },
        ].map((r) => (
          <div key={r.t} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <span className={`w-2 h-2 rounded-full ${r.c}`} />
            <div className="flex-1 text-sm"><b className="text-ink">{r.t}</b> <span className="text-ink-soft">· {r.s}</span></div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: "Appliance",
    title: "Bosch SMS4 dishwasher",
    body: () => (
      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="rounded-xl bg-accent-soft p-3"><div className="font-semibold text-accent-foreground">Warranty</div><div className="mt-1 text-ink/70">Until Mar 2027</div></div>
        <div className="rounded-xl bg-primary/10 p-3"><div className="font-semibold text-primary">Manual</div><div className="mt-1 text-ink/70">28 pages · PDF</div></div>
        <div className="rounded-xl bg-muted p-3"><div className="font-semibold text-ink">Serviced</div><div className="mt-1 text-ink/70">Apr 2024</div></div>
      </div>
    ),
  },
  {
    label: "Warranty",
    title: "Warranty details",
    body: () => (
      <div className="rounded-xl border border-border p-4 text-sm space-y-2">
        <div className="flex justify-between"><span className="text-ink-soft">Provider</span><b className="text-ink">Bosch Home</b></div>
        <div className="flex justify-between"><span className="text-ink-soft">Purchased</span><b className="text-ink">03 Mar 2022</b></div>
        <div className="flex justify-between"><span className="text-ink-soft">Expires</span><b className="text-ink">03 Mar 2027</b></div>
        <div className="flex justify-between"><span className="text-ink-soft">Receipt</span><b className="text-accent-foreground">Attached</b></div>
      </div>
    ),
  },
  {
    label: "Manual",
    title: "Manual",
    body: () => (
      <div className="rounded-xl border border-border p-6 text-center">
        <div className="mx-auto w-14 h-16 rounded-md bg-primary/10 grid place-items-center text-primary font-bold">PDF</div>
        <div className="mt-3 text-sm font-medium text-ink">Bosch SMS4 — installation & care</div>
        <div className="text-xs text-ink-soft">28 pages · English</div>
      </div>
    ),
  },
  {
    label: "Reminder",
    title: "Set a reminder",
    body: () => (
      <div className="rounded-xl border border-border p-4 space-y-3 text-sm">
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent" /> Descale cycle · every 3 months</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-accent" /> Filter check · every 6 months</div>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary" /> Warranty ending · 90 days before</div>
      </div>
    ),
  },
  {
    label: "History",
    title: "Maintenance history",
    body: () => (
      <ul className="text-sm space-y-2">
        {[
          ["Apr 2024", "Full service by Bosch"],
          ["Jan 2024", "Descale + filter change"],
          ["Oct 2023", "Door seal replaced"],
        ].map(([d, t]) => (
          <li key={d} className="flex gap-4 rounded-xl border border-border p-3">
            <span className="text-ink-soft w-20">{d}</span>
            <span className="text-ink">{t}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export function InteractiveDemo() {
  const [i, setI] = useState(0);
  const step = STEPS[i];
  const Body = step.body;

  return (
    <section id="demo" className="py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Try it live</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Click through a real journey.</h2>
            <p className="mt-4 text-ink-soft">
              From your property, into a single appliance, to the warranty you were about to lose.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-14 mx-auto max-w-5xl rounded-3xl border border-border bg-background overflow-hidden shadow-[0_30px_80px_-30px_rgba(30,58,138,0.25)]">
            {/* browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
              <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <span className="w-3 h-3 rounded-full bg-[#28c840]" />
              <div className="ml-4 flex items-center gap-1 text-xs text-ink-soft overflow-x-auto">
                {STEPS.slice(0, i + 1).map((s, idx) => (
                  <span key={idx} className="flex items-center gap-1 whitespace-nowrap">
                    {idx > 0 && <span className="text-ink-soft/50">/</span>}
                    <span className={idx === i ? "text-ink font-medium" : ""}>{s.label}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-[220px_1fr]">
              <div className="border-r border-border bg-muted/40 p-3 space-y-1">
                {STEPS.map((s, idx) => (
                  <Button
                    key={s.label}
                    variant="ghost"
                    onClick={() => setI(idx)}
                    className={`h-auto w-full justify-start px-3 py-2 rounded-lg text-sm font-normal transition ${
                      idx === i
                        ? "bg-primary text-primary-foreground font-medium hover:bg-primary hover:text-primary-foreground"
                        : "text-ink-soft hover:bg-background hover:text-ink"
                    }`}
                  >
                    {idx + 1}. {s.label}
                  </Button>
                ))}
              </div>
              <div key={i} className="p-6 md:p-8 animate-in fade-in duration-300">
                <div className="text-xs uppercase tracking-widest text-ink-soft">{step.label}</div>
                <h3 className="mt-1 text-2xl font-bold text-ink">{step.title}</h3>
                <div className="mt-6"><Body /></div>
                <div className="mt-8 flex justify-between">
                  <Button
                    variant="ghost"
                    onClick={() => setI((n) => Math.max(0, n - 1))}
                    disabled={i === 0}
                    className="h-auto text-sm text-ink-soft disabled:opacity-30"
                  >
                    ← Back
                  </Button>
                  <Button
                    onClick={() => setI((n) => Math.min(STEPS.length - 1, n + 1))}
                    disabled={i === STEPS.length - 1}
                    className="h-auto rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground disabled:opacity-30"
                  >
                    Next step →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
