"use client";

import { useEmailSignup } from "@/hooks/use-email-signup";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "./Reveal";

export function NewsletterSignup() {
  const { email, setEmail, sent, submitting, error, submit } = useEmailSignup("Newsletter");

  return (
    <section id="newsletter" className="py-24 bg-background">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-surface p-10 md:p-16 text-center">
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-40 blur-3xl"
              style={{ background: "radial-gradient(closest-side, rgba(194,142,58,0.4), transparent)" }} />
            <div className="relative">
              <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Stay in the loop</Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">Get property-management tips and early updates.</h2>
              <p className="mt-3 text-ink-soft max-w-lg mx-auto">
                One email every few weeks. No pitch decks, no spam — just progress and practical ideas.
              </p>

              {sent ? (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent/10 border border-accent/20 px-4 py-2 text-sm text-accent-foreground">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  You're on the list. Watch your inbox.
                </div>
              ) : (
                <form
                  onSubmit={submit}
                  className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <Input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@home.com"
                    className="h-auto flex-1 rounded-full border-border bg-background px-5 py-3 text-sm focus-visible:border-primary"
                  />
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift whitespace-nowrap disabled:opacity-50"
                  >
                    {submitting ? "Subscribing…" : "Subscribe"}
                  </Button>
                </form>
              )}
              {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
