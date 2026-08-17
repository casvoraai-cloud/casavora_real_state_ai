import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const onePlaceImg = "/assets/one-place-dashboard.png";

const TILES = [
  { t: "Property", i: "🏠" },
  { t: "Documents", i: "📄" },
  { t: "Bills", i: "💳" },
  { t: "Repairs", i: "🔧" },
  { t: "Tradies", i: "👷" },
  { t: "Insurance", i: "🛡️" },
  { t: "Safety", i: "🚨" },
  { t: "Photos", i: "📷" },
  { t: "Appliances", i: "🔌" },
  { t: "Expenses", i: "💰" },
  { t: "Tenancy", i: "🔑" },
  { t: "Calendar", i: "📅" },
];

export function EverythingInOnePlace() {
  return (
    <section className="py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">All in one place</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Dozens of problems<br />One Solution</h2>
          </div>
        </Reveal>
        {/* <Reveal delay={100}>
          <img src={onePlaceImg} alt="Documents, bills and reminders converging into a single dashboard" loading="lazy" width={1024} height={768} className="mt-10 w-full max-w-2xl mx-auto" />
        </Reveal> */}


        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {TILES.map((tile, i) => (
            <Reveal key={tile.t} delay={i * 40}>
              <div className="rounded-2xl bg-background border border-border p-5 hover-lift">
                <div className="text-2xl">{tile.i}</div>
                <div className="mt-3 text-sm font-semibold text-ink">{tile.t}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Button render={<a href="#demo" />} nativeButton={false} className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift">
            Explore the dashboard
          </Button>
        </div>
      </div>
    </section>
  );
}

