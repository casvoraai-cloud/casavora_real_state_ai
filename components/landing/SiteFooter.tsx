"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MAILCHIMP_JSONP_URL =
  "https://gmail.us17.list-manage.com/subscribe/post-json?u=56e60c8047e6c7041c587489e&id=1f32ef8b3c&f_id=008fc3e1f0";

function subscribeToMailchimp(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const callbackName = `mcJsonp${Date.now()}`;
    const script = document.createElement("script");

    const cleanup = () => {
      delete (window as unknown as Record<string, unknown>)[callbackName];
      script.remove();
    };

    (window as unknown as Record<string, (data: { result: string; msg: string }) => void>)[callbackName] = (data) => {
      cleanup();
      if (data.result === "success") resolve();
      else reject(new Error(data.msg || "Subscription failed"));
    };

    const params = new URLSearchParams({
      EMAIL: email,
      c: callbackName,
      b_56e60c8047e6c7041c587489e_1f32ef8b3c: "",
    });

    script.src = `${MAILCHIMP_JSONP_URL}&${params.toString()}`;
    script.onerror = () => {
      cleanup();
      reject(new Error("Something went wrong. Please try again."));
    };
    document.body.appendChild(script);
  });
}

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      await subscribeToMailchimp(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid md:grid-cols-[1fr_auto] gap-10 items-start">
          <div className="max-w-sm">
            <img src="/logoNew.png" alt="Casavora" className="h-12 w-auto" />
            <p className="mt-3 text-sm text-ink-soft">
              Simplifying Property Ownership
            </p>
            <div className="mt-4 flex gap-6 text-sm text-ink-soft">
              <a href="#survey" className="hover:text-ink">Survey</a>
              <a href="#founding" className="hover:text-ink">Join</a>
              <a href="#newsletter" className="hover:text-ink">Newsletter</a>
            </div>
          </div>

          <div className="w-full md:w-80">
            <div className="text-sm font-semibold text-ink">Get the early updates</div>
            {sent ? (
              <div className="mt-2 text-sm text-green-600">Thanks — you&apos;re on the list.</div>
            ) : (
              <form
                onSubmit={submit}
                className="mt-2 flex gap-2"
              >
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@home.com"
                  className="h-auto flex-1 rounded-full border-border bg-background px-4 py-2 text-sm focus-visible:border-primary"
                />
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-auto rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover-lift disabled:opacity-50"
                >
                  {submitting ? "…" : "Join"}
                </Button>
              </form>
            )}
            {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border text-sm text-ink-soft text-center md:text-left">
          © {new Date().getFullYear()} CASAVORA. Built with founding members.
        </div>
      </div>
    </footer>
  );
}
