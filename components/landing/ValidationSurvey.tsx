"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { getDeviceId, getDeviceName } from "@/lib/device";
import { Reveal } from "./Reveal";
import { ScrollCue } from "./ScrollCue";

const TOOLS = ["Google Drive", "Excel / Sheets", "Paper folders", "Nothing yet", "A property agency"];
const TASKS = ["Tracking maintenance", "Storing documents", "Managing tradies", "Insurance renewals", "Tenant communication", "Tax & expenses"];

export function ValidationSurvey() {
  const [step, setStep] = useState(0);
  const [tool, setTool] = useState<string>("");
  const [stress, setStress] = useState(6);
  const [tasks, setTasks] = useState<string[]>([]);
  const [pay, setPay] = useState<string>("");
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const total = 5;
  const progress = ((step + (done ? 1 : 0)) / total) * 100;

  const next = () => setStep((s) => Math.min(total - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const toggleTask = (t: string) =>
    setTasks((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Survey",
          email,
          tool,
          stress,
          tasks,
          pay,
          deviceId: getDeviceId(),
          deviceName: getDeviceName(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Submission failed");
      setDone(true);
      toast.add({
        title: "Thank you!",
        description: "We successfully received your feedback.",
        type: "success",
      });
      setTool("");
      setStress(6);
      setTasks([]);
      setPay("");
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="survey" className="py-28 bg-background">
      <div className="mx-auto max-w-3xl px-6">
        <Reveal>
          <div className="text-center">
            <Badge variant="secondary" className="h-auto rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent-foreground">Help us learn</Badge>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold">A 90-second validation survey.</h2>
            <p className="mt-4 text-ink-soft">Every answer shapes what we build first.</p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 rounded-3xl border border-border bg-background p-6 md:p-10">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-xs text-ink-soft">Step {Math.min(step + 1, total)} of {total}</div>

            <div className="mt-8 min-h-[220px]">
              {done ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent grid place-items-center text-accent-foreground text-2xl">✓</div>
                  <p className="mt-4 text-ink-soft">Your answers are already shaping what we build first.</p>
                </div>
              ) : step === 0 ? (
                <>
                  <h3 className="text-xl font-semibold text-ink">How do you currently manage your property?</h3>
                  <div className="mt-5 grid sm:grid-cols-2 gap-3">
                    {TOOLS.map((t) => (
                      <Button key={t} variant="ghost" onClick={() => setTool(t)}
                        className={`h-auto justify-start rounded-xl border px-4 py-3 text-left text-sm font-normal transition ${tool === t ? "border-primary bg-primary/5 text-ink hover:bg-primary/5" : "border-border text-ink-soft hover:border-ink/20"}`}>
                        {t}
                      </Button>
                    ))}
                  </div>
                </>
              ) : step === 1 ? (
                <>
                  <h3 className="text-xl font-semibold text-ink">How stressful is managing it today?</h3>
                  <div className="mt-8">
                    <input type="range" min={1} max={10} value={stress} onChange={(e) => setStress(Number(e.target.value))}
                      className="w-full accent-[#C28E3A]" />
                    <div className="mt-2 flex justify-between text-xs text-ink-soft">
                      <span>1 · Peaceful</span>
                      <span className="text-ink font-semibold">{stress}</span>
                      <span>10 · Overwhelming</span>
                    </div>
                  </div>
                </>
              ) : step === 2 ? (
                <>
                  <h3 className="text-xl font-semibold text-ink">Which of these are hardest for you?</h3>
                  <p className="text-sm text-ink-soft mt-1">Pick as many as apply.</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {TASKS.map((t) => {
                      const on = tasks.includes(t);
                      return (
                        <Button key={t} variant="ghost" onClick={() => toggleTask(t)}
                          className={`h-auto rounded-full border px-4 py-2 text-sm font-normal transition ${on ? "bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground" : "border-border text-ink-soft hover:border-ink/20"}`}>
                          {t}
                        </Button>
                      );
                    })}
                  </div>
                </>
              ) : step === 3 ? (
                <>
                  <h3 className="text-xl font-semibold text-ink">Would you pay for a tool that solved this?</h3>
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {["Yes", "Maybe", "No"].map((o) => (
                      <Button key={o} variant="ghost" onClick={() => setPay(o)}
                        className={`h-auto rounded-xl border px-4 py-4 text-sm font-medium transition ${pay === o ? "bg-primary text-primary-foreground border-primary hover:bg-primary hover:text-primary-foreground" : "border-border text-ink hover:border-ink/20"}`}>
                        {o}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-ink">Want to join the beta?</h3>
                  <p className="text-sm text-ink-soft mt-1">Leave your email and we'll bring you in early.</p>
                  <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@home.com"
                    className="mt-5 h-auto w-full rounded-xl border-border bg-surface px-4 py-3 focus-visible:border-primary" />
                  {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
                </>
              )}
            </div>

            {!done && (
              <div className="mt-8 flex justify-between items-center">
                <Button variant="ghost" onClick={back} disabled={step === 0} className="h-auto text-sm text-ink-soft disabled:opacity-30">← Back</Button>
                {step < total - 1 ? (
                  <Button onClick={next} className="h-auto rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground">
                    Continue →
                  </Button>
                ) : (
                  <Button onClick={submit} disabled={submitting || !email} className="h-auto rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground disabled:opacity-50">
                    {submitting ? "Submitting…" : "Submit"}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
        <ScrollCue to="faq" />
      </div>
    </section>
  );
}
