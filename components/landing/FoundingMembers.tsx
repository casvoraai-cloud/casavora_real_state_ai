"use client";

import { useState } from "react";
import { useEmailSignup } from "@/hooks/use-email-signup";
import { useFamiliarChecklist } from "@/hooks/use-familiar-checklist";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

const BENEFITS = [
  "Early access before public launch",
  "Lifetime founding-member discount",
  "Vote on features and roadmap",
  "Direct line to the founders",
  "Private beta with a small group",
];

type Stage = "intro" | "checklist" | "confirm" | "form";

export function FoundingMembers() {
  const [stage, setStage] = useState<Stage>("intro");
  const { items, checked, toggle, submitting: checklistSubmitting, handleSubmit: submitChecklist } =
    useFamiliarChecklist(() => setStage("confirm"));
  const { name, setName, email, setEmail, sent, submitting, error, submit } = useEmailSignup("Founding Members");

  return (
    <section id="founding" className="py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] p-10 md:p-16 text-white"
            style={{ background: "linear-gradient(135deg, #101F30, #1C3350)" }}>
            <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-30 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(194,142,58,0.7), transparent)" }} />

            <div className="grid md:grid-cols-2 gap-12 relative">
              <div>
                <Badge variant="secondary" className="h-auto gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium text-white hover:bg-white/10">
                  <span className="w-2 h-2 rounded-full bg-accent" /> Founding Members
                </Badge>
                <h2 className="mt-5 text-4xl md:text-5xl font-bold text-white">
                  Be one of the first 500.
                </h2>
                <p className="mt-4 text-white/70 max-w-md">
                  A small group of homeowners, landlords and investors shaping the product from day zero.
                </p>
                <ul className="mt-8 space-y-3 text-white/90">
                  {BENEFITS.map((b) => (
                    <li key={b} className="flex items-center gap-3">
                      <span className="grid place-items-center w-5 h-5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur border border-white/15 p-6">
                {stage === "intro" && (
                  <>
                    <div className="text-sm text-white/70">Save your spot</div>
                    <div className="mt-1 text-xl font-semibold text-white">Join Founding Members</div>
                    <p className="mt-3 text-sm text-white/70">
                      One quick question first, then you&apos;re in.
                    </p>
                    <Button
                      onClick={() => setStage("checklist")}
                      className="mt-5 h-auto w-full rounded-xl bg-accent px-4 py-3 font-semibold text-accent-foreground hover-lift hover:bg-accent hover:text-white"
                    >
                      Claim my spot
                    </Button>
                  </>
                )}

                {stage === "checklist" && (
                  <>
                    <div className="text-xs uppercase tracking-widest text-white/50">Step 1 of 2</div>
                    <div className="mt-1 text-xl font-semibold text-white">Does this sound familiar?</div>
                    <p className="mt-2 text-sm text-white/70">Tick at least one — it helps us build for exactly this.</p>
                    <div className="mt-4 max-h-64 space-y-2 overflow-y-auto pr-1">
                      {items.map((item, i) => {
                        const on = checked.has(i);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggle(i)}
                            className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                              on ? "bg-accent/20 border-accent text-white" : "bg-white/5 border-white/15 text-white/80 hover:border-white/30"
                            }`}
                          >
                            <span
                              className={`grid w-5 h-5 shrink-0 place-items-center rounded-md border-2 ${
                                on ? "bg-accent border-accent" : "border-white/30"
                              }`}
                            >
                              {on && (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                  <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </span>
                            {item}
                          </button>
                        );
                      })}
                    </div>
                    <Button
                      onClick={submitChecklist}
                      disabled={checked.size === 0 || checklistSubmitting}
                      className="mt-5 h-auto w-full rounded-xl bg-accent px-4 py-3 font-semibold text-accent-foreground hover-lift hover:bg-accent hover:text-white disabled:opacity-50"
                    >
                      {checklistSubmitting ? "Submitting…" : "Continue"}
                    </Button>
                    <p className="mt-2 text-xs text-white/50">Select at least one to continue.</p>
                  </>
                )}

                {stage === "confirm" && (
                  <div className="py-4 text-center">
                    <div className="mx-auto grid w-12 h-12 place-items-center rounded-full bg-accent text-xl font-bold text-accent-foreground">✓</div>
                    <p className="mt-4 text-white">Thanks — that&apos;s exactly what we&apos;re building for.</p>
                    <p className="mt-1 text-sm text-white/70">Ready to become a founding member?</p>
                    <Button
                      onClick={() => setStage("form")}
                      className="mt-5 h-auto rounded-xl bg-accent px-6 py-3 font-semibold text-accent-foreground hover-lift hover:bg-accent hover:text-white"
                    >
                      Yes, count me in
                    </Button>
                  </div>
                )}

                {stage === "form" && !sent && (
                  <>
                    <div className="text-sm text-white/70">Save your spot</div>
                    <div className="mt-1 text-xl font-semibold text-white">Join Founding Members</div>
                    <form onSubmit={submit} className="mt-5 space-y-3">
                      <Input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        className="h-auto w-full rounded-xl bg-white/10 border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus-visible:border-accent"
                      />
                      <Input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@home.com"
                        className="h-auto w-full rounded-xl bg-white/10 border-white/20 px-4 py-3 text-white placeholder:text-white/50 focus-visible:border-accent"
                      />
                      <Button
                        type="submit"
                        disabled={submitting}
                        className="h-auto w-full rounded-xl bg-accent px-4 py-3 font-semibold text-accent-foreground hover-lift hover:bg-accent hover:text-white disabled:opacity-50"
                      >
                        {submitting ? "Submitting…" : "Claim my spot"}
                      </Button>
                      <p className="text-xs text-white/50">No spam. Ever. Unsubscribe anytime.</p>
                      {error && <p className="text-xs text-red-200">{error}</p>}
                    </form>
                  </>
                )}

                {sent && (
                  <div className="mt-6 rounded-xl bg-accent/20 border border-accent/30 p-4 text-sm text-white">
                    You&apos;re in. We&apos;ll be in touch personally within a few days.
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
        <ScrollCue to="survey" />
      </div>
    </section>
  );
}
