import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

const roadmapImg = "/assets/roadmap-journey.png";

const STEPS = [
  { t: "Today", s: "Listening to homeowners like you.", live: true },
  { t: "Product Zero", s: "Customer validation with founding members.", live: true },
  { t: "AI Prototype", s: "First intelligent workflows go live.", live: false },
  { t: "Private Beta", s: "Founding members shape the real product.", live: false },
  { t: "Public Launch", s: "Homestead opens to everyone.", live: false },
];

export function Roadmap() {
  return (
    <section id="roadmap" className="py-28 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Roadmap</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">You're helping shape it.</h2>
            <p className="mt-4 text-ink-soft">Not "we're building" — we're building this with you.</p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <img src={roadmapImg} alt="Illustrated path with milestones leading up to a home" loading="lazy" width={1024} height={768} className="mt-8 w-full max-w-sm mx-auto" />
        </Reveal>



        <div className="mt-16 relative">
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.t} delay={i * 80}>
                <div className={`relative flex md:justify-${i % 2 === 0 ? "start" : "end"}`}>
                  <div className={`md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:pl-12 md:ml-auto"} pl-12 md:pl-0`}>
                    <div className="rounded-2xl border border-border bg-surface p-5 hover-lift">
                      <div className="flex items-center gap-2">
                        {step.live && <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />}
                        <div className="text-lg font-semibold text-ink">{step.t}</div>
                      </div>
                      <div className="mt-1 text-sm text-ink-soft">{step.s}</div>
                    </div>
                  </div>
                  <span className={`absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${step.live ? "bg-accent" : "bg-primary/40"}`} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-14 text-center">
          <Button render={<a href="#survey" />} nativeButton={false} className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
            Shape what's next
          </Button>
        </div>
        <ScrollCue to="founding" />
      </div>
    </section>
  );
}

