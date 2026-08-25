import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollCue } from "./ScrollCue";

const heroImg = "/assets/hero-homeowner.png";

const CHIPS = [
  { label: "Insurance", top: "8%", left: "6%", delay: "0s" },
  { label: "Maintenance", top: "18%", right: "8%", delay: "1.2s" },
  { label: "Legals", top: "12%", right: "4%", delay: "0.4s" },
  { label: "Mortgage", top: "48%", left: "3%", delay: "0.6s" },
  { label: "Tradesmen", top: "42%", right: "10%", delay: "1.8s" },
  { label: "Documents", top: "62%", right: "5%", delay: "2s" },
  { label: "Appliances", top: "80%", left: "10%", delay: "1.6s" },
  { label: "Warranty", top: "30%", left: "14%", delay: "2.4s" },
  { label: "Repairs", top: "72%", right: "14%", delay: "0.9s" },
  { label: "Tenants", top: "35%", left: "3%", delay: "1.1s" },
  { label: "Financial", top: "55%", left: "8%", delay: "2.8s" },
];

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 overflow-hidden">
      {/* soft radial background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(194,142,58,0.35), transparent)" }} />
        <div className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(closest-side, rgba(16,31,48,0.25), transparent)" }} />
      </div>

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="relative z-10">
          <Badge variant="outline" className="gap-2 rounded-full border-border bg-surface px-3 py-1 h-auto text-xs font-medium text-ink-soft">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            Product Zero · Customer validation open
          </Badge>
          <h1 className="mt-6 font-display font-extrabold text-ink leading-[1.05] text-5xl md:text-6xl lg:text-[64px]">
            Everything you need to manage your property.
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-xl leading-relaxed">
            Stop juggling spreadsheets, emails, documents, tradespeople, inspections and reminders.
            One intelligent platform for every stage of property ownership.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Button render={<a href="#founding" />} nativeButton={false} className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
              Join Founding Members
            </Button>
            <a
              href="#demo"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-primary"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
              Watch Prototype
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-ink-soft">
            <div className="flex -space-x-2">
              {[0,1,2,3].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background"
                  style={{ background: `oklch(0.8 0.1 ${120 + i * 40})` }} />
              ))}
            </div>
            <span>Join <b className="text-ink">328</b> homeowners shaping the platform</span>
          </div>
        </div>

        <div className="relative min-h-[520px]">
          <div className="absolute inset-0 grid place-items-center">
            <img
              src={heroImg}
              alt="Homeowner surrounded by property paperwork, maintenance, insurance, bills, and reminders"
              width={560}
              height={480}
              className="w-[92%] max-w-[560px] drop-shadow-[0_30px_60px_rgba(30,58,138,0.15)]"
            />
          </div>
          {CHIPS.map((chip, i) => (
            <div
              key={chip.label}
              className={`glass-chip absolute rounded-full px-3 py-1.5 text-xs font-medium text-ink ${i % 2 === 0 ? "animate-float-slow" : "animate-float-slower"}`}
              style={{
                top: chip.top,
                left: chip.left,
                right: chip.right,
                animationDelay: chip.delay,
              }}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>
      <ScrollCue to="familiar" />
    </section>
  );
}
