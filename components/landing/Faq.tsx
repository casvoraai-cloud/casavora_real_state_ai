"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

const FAQS = [
  { q: "Why are you building this?", a: "Because property ownership is one of the biggest financial commitments of our lives — yet the tools for it live in inboxes, spreadsheets and shoeboxes. We think it deserves better." },
  { q: "Is it available today?", a: "Not yet. We're in Product Zero — the customer discovery stage. Founding members shape what we build first." },
  { q: "Can I influence features?", a: "Absolutely. Founding members vote on the roadmap and talk to us directly. That's the whole point of this stage." },
  { q: "Will there be mobile apps?", a: "Yes. iOS and Android are on the roadmap after the web beta. Reminders are only useful in your pocket." },
  { q: "Who is it for?", a: "Home owners, landlords, tenants and investors. If a property lives somewhere in your life, this is for you." },
];

export function Faq() {
  return (
    <section id="faq" className="py-28 bg-surface border-y border-border">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">FAQ</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Honest answers.</h2>
          </div>
        </Reveal>
        <div className="mt-14">
          <Accordion defaultValue={["0"]} className="gap-3">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <AccordionItem
                  value={String(i)}
                  className="not-last:border-b-0 rounded-2xl border border-border bg-surface px-6 hover:border-ink/20 transition"
                >
                  <AccordionTrigger className="font-semibold text-ink hover:no-underline py-6">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-ink-soft pb-6">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              </Reveal>
            ))}
          </Accordion>
        </div>
        <ScrollCue to="newsletter" />
      </div>
    </section>
  );
}
