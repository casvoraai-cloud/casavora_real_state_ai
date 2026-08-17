"use client";

import { useEmailSignup } from "@/hooks/use-email-signup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "./Reveal";

const BENEFITS = [
  "Early access before public launch",
  "Lifetime founding-member discount",
  "Vote on features and roadmap",
  "Direct line to the founders",
  "Private beta with a small group",
];

export function FoundingMembers() {
  const { email, setEmail, sent, submitting, error, submit } = useEmailSignup("Founding Members");
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
                <div className="text-sm text-white/70">Save your spot</div>
                <div className="mt-1 text-xl font-semibold text-white">Join Founding Members</div>
                {sent ? (
                  <div className="mt-6 rounded-xl bg-accent/20 border border-accent/30 p-4 text-sm">
                    You're in. We'll be in touch personally within a few days.
                  </div>
                ) : (
                  <form
                    onSubmit={submit}
                    className="mt-5 space-y-3"
                  >
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
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
