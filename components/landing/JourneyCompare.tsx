import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const journeyImg = "/assets/journey-compare.png";

export function JourneyCompare() {
  return (
    <section className="py-28 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">The shift</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">From scattered to serene.</h2>
            <p className="mt-4 text-ink-soft">
              Your property lives in twelve places today. Tomorrow it lives in one.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <img src={journeyImg} alt="Cluttered desk of paperwork next to a clean property dashboard" loading="lazy" width={1024} height={768} className="mt-10 w-full max-w-3xl mx-auto rounded-3xl" />
        </Reveal>

        <div className="mt-16 grid md:grid-cols-2 gap-6">

          {/* Messy */}
          <Reveal>
            <div className="relative rounded-3xl border border-border bg-[oklch(0.96_0.005_60)] p-8 h-full overflow-hidden">
              <div className="text-xs uppercase tracking-widest text-ink-soft">Today</div>
              <div className="mt-3 text-2xl font-bold text-ink">The scattered life</div>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  { l: "Sticky note", r: "3deg", c: "oklch(0.94 0.08 90)" },
                  { l: "Excel v7", r: "-2deg", c: "oklch(0.95 0.05 145)" },
                  { l: "Email thread", r: "1deg", c: "oklch(0.96 0.03 250)" },
                  { l: "PDF folder", r: "-3deg", c: "oklch(0.94 0.05 30)" },
                  { l: "Phone call", r: "2deg", c: "oklch(0.94 0.07 320)" },
                  { l: "Paper receipt", r: "-1deg", c: "oklch(0.96 0.02 60)" },
                ].map((n) => (
                  <div
                    key={n.l}
                    style={{ transform: `rotate(${n.r})`, background: n.c }}
                    className="rounded-md p-4 text-xs font-medium text-ink/70 shadow-sm border border-black/5"
                  >
                    {n.l}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-destructive">
                <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
                3 reminders missed this month
              </div>
            </div>
          </Reveal>

          {/* Clean */}
          <Reveal delay={120}>
            <div className="relative rounded-3xl border border-border bg-surface p-8 h-full overflow-hidden">
              <div className="text-xs uppercase tracking-widest text-accent-foreground/80">With Homestead</div>
              <div className="mt-3 text-2xl font-bold text-ink">One calm dashboard</div>
              <div className="mt-8 space-y-3">
                {[
                  { t: "Boiler service", s: "Booked with Tom · Nov 14", ok: true },
                  { t: "Home insurance", s: "Renews in 42 days · $824/yr", ok: true },
                  { t: "Warranty · Dishwasher", s: "Valid until 2027", ok: true },
                  { t: "Roof inspection", s: "Suggested this autumn", ok: false },
                ].map((r) => (
                  <div key={r.t} className="flex items-center gap-3 rounded-xl border border-border p-3">
                    <span className={`w-2 h-2 rounded-full ${r.ok ? "bg-accent" : "bg-amber-400"}`} />
                    <div className="flex-1">
                      <div className="text-sm font-semibold text-ink">{r.t}</div>
                      <div className="text-xs text-ink-soft">{r.s}</div>
                    </div>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink-soft"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-accent-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                Everything on track
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 text-center">
          <Button render={<a href="#demo" />} nativeButton={false} className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
            See the prototype in action
          </Button>
        </div>
      </div>
    </section>
  );
}

