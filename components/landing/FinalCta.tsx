import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const ctaImg = "/assets/final-cta-homeowner.png";

export function FinalCta() {
  return (
    <section id="cta" className="py-28 bg-surface border-t border-border">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <img src={ctaImg} alt="Happy homeowner with an organized property dashboard" loading="lazy" width={1600} height={1000}
            className="w-full rounded-3xl" />
        </Reveal>
        <Reveal delay={120}>
          <div>
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Join us</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold leading-tight">
              Help build the future of property management.
            </h2>
            <p className="mt-4 text-ink-soft max-w-md">
              A calmer home life starts with a smarter platform. Come build it with us.
            </p>
            <Button render={<a href="#founding" />} nativeButton={false} className="mt-8 h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
              Join Founding Members →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
