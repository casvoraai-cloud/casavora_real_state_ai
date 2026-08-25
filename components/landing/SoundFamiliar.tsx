"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { getDeviceId, getDeviceName } from "@/lib/device";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

const ITEMS = [
  "Forgot appliance warranty",
  "Can't find insurance papers",
  "Missed maintenance schedule",
  "Tenant keeps texting you",
  "Lost inspection report",
  "Roof leak became expensive",
  "Unsure what maintenance is due",
  "Bills scattered across five apps",
];

export function SoundFamiliar() {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const recordId = useRef<string | null>(null);
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRender = useRef(true);
  const isResetting = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const syncChecklist = () => {
    const values = Object.fromEntries(ITEMS.map((item, i) => [item, checked.has(i) ? 1 : 0]));
    return fetch("/api/checklist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: recordId.current, values, deviceId: getDeviceId(), deviceName: getDeviceName() }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && !recordId.current) recordId.current = data.id;
        return data;
      });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (isResetting.current) {
      isResetting.current = false;
      return;
    }
    setSubmitted(false);
    if (debounce.current) clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      syncChecklist().catch(() => {});
    }, 600);
    return () => {
      if (debounce.current) clearTimeout(debounce.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleSubmit = async () => {
    if (checked.size === 0 || submitting) return;
    if (debounce.current) clearTimeout(debounce.current);
    setSubmitting(true);
    try {
      await syncChecklist();
      setSubmitted(true);
      toast.add({
        title: "Thank you!",
        description: "We successfully received your feedback.",
        type: "success",
      });
      isResetting.current = true;
      setChecked(new Set());
      recordId.current = null;
    } catch {
      setSubmitted(false);
      toast.add({
        title: "Something went wrong",
        description: "Your answers weren't saved. Please try again.",
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="familiar" className="py-28 relative bg-surface border-y border-border">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">The Problem</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">Does this sound familiar?</h2>
            <p className="mt-4 text-ink-soft max-w-xl mx-auto">
              Tick the ones you've felt. It's not just you — property ownership was never designed
              to fit inside your inbox.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-14 grid sm:grid-cols-2 gap-3">
            {ITEMS.map((item, i) => {
              const on = checked.has(i);
              return (
                <Button
                  key={item}
                  variant="ghost"
                  onClick={() => toggle(i)}
                  className={`group h-auto justify-start gap-4 rounded-2xl border px-5 py-4 text-left font-normal transition-all duration-300 ${
                    on
                      ? "bg-accent-soft border-accent/30 hover:bg-accent-soft"
                      : "bg-surface border-border hover:border-ink/20"
                  }`}
                >
                  <span
                    className={`grid place-items-center w-6 h-6 rounded-md border-2 transition-all ${
                      on ? "bg-accent border-accent" : "border-ink/20 group-hover:border-ink/40"
                    }`}
                  >
                    {on && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L20 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span className="text-base text-ink transition-all">
                    {item}
                  </span>
                </Button>
              );
            })}
          </div>
          {checked.size > 0 && (
            <p className="mt-8 text-center text-sm text-ink-soft">
              You've ticked <b className="text-ink">{checked.size}</b>. Keep scrolling —
              we're building for exactly this.
            </p>
          )}
          <div className="mt-10 text-center">
            <Button
              onClick={handleSubmit}
              disabled={checked.size === 0 || submitting}
              className="h-auto rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover-lift disabled:opacity-50"
            >
              {submitting ? "Submitting…" : submitted ? "Submitted ✓" : "Submit"}
            </Button>
          </div>
        </Reveal>
        <ScrollCue to="journey" />
      </div>
    </section>
  );
}
