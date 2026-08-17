"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const segmentsImg = "/assets/segments-roles.png";

const SEGMENTS = [
  {
    icon: "🏠",
    title: "Home Owner",
    tag: "For the day-to-day of your home",
    benefits: ["Every document in one place", "Appliance warranties tracked", "Maintenance reminders that actually fire", "Trusted tradies at hand"],
  },
  {
    icon: "🏢",
    title: "Landlord",
    tag: "For your rental portfolio",
    benefits: ["Track multiple properties", "Tenancy dates & compliance", "Inspection reports stored", "Expenses ready for tax time"],
  },
  {
    icon: "🔑",
    title: "Tenant",
    tag: "For your rented home",
    benefits: ["Report issues in one tap", "Track requests & responses", "See your tenancy documents", "Never lose a receipt"],
  },
  {
    icon: "🏗",
    title: "Investor",
    tag: "For your growing portfolio",
    benefits: ["Portfolio-wide dashboard", "Cash-flow at a glance", "Cross-property comparisons", "Prep-ready for sale or refinance"],
  },
];

export function Segments() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <div className="max-w-2xl">
              <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Built for you</Badge>
              <h2 className="mt-4 text-4xl md:text-5xl font-bold">One platform, four ways to live in it.</h2>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <img src={segmentsImg} alt="Isometric illustration of homes for owners, landlords, tenants and investors" loading="lazy" width={1024} height={768} className="w-full max-w-md mx-auto" />
          </Reveal>
        </div>


        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SEGMENTS.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.title} delay={i * 80}>
                <Button
                  variant="ghost"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className={`h-auto w-full flex-col items-start whitespace-normal rounded-2xl border p-6 text-left transition-all duration-300 ${
                    isOpen ? "bg-primary text-primary-foreground border-primary shadow-[var(--shadow-float)] hover:bg-primary" : "bg-surface border-border hover-lift"
                  }`}
                >
                  <div className="text-3xl">{s.icon}</div>
                  <div className={`mt-4 text-lg font-semibold ${isOpen ? "" : "text-ink"}`}>{s.title}</div>
                  <div className={`text-sm mt-1 ${isOpen ? "text-primary-foreground/70" : "text-ink-soft"}`}>{s.tag}</div>
                  <div
                    className={`grid w-full transition-all duration-500 ${isOpen ? "grid-rows-[1fr] mt-4 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <ul className="overflow-hidden space-y-2 text-sm">
                      {s.benefits.map((b) => (
                        <li key={b} className="flex gap-2">
                          <span>✓</span><span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
            </Button>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button render={<a href="#founding" />} nativeButton={false} className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
            Join for your role
          </Button>
        </div>
      </div>
    </section>
  );
}

