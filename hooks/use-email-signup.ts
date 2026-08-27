"use client";

import { useState } from "react";
import { getDeviceId, getDeviceName } from "@/lib/device";

export function useEmailSignup(source: "Newsletter" | "Founding Members") {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    if (!email || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source, name, email, deviceId: getDeviceId(), deviceName: getDeviceName() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error ?? "Submission failed");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { name, setName, email, setEmail, sent, submitting, error, submit };
}
