"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "@/components/ui/toast";
import { getDeviceId, getDeviceName } from "@/lib/device";

export const FAMILIAR_ITEMS = [
  "Forgot appliance warranty",
  "Can't find insurance papers",
  "Missed maintenance schedule",
  "Tenant keeps texting you",
  "Lost inspection report",
  "Roof leak became expensive",
  "Unsure what maintenance is due",
  "Bills scattered across five apps",
];

export function useFamiliarChecklist(onSubmitted?: () => void) {
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
    const values = Object.fromEntries(FAMILIAR_ITEMS.map((item, i) => [item, checked.has(i) ? 1 : 0]));
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
      onSubmitted?.();
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

  return { items: FAMILIAR_ITEMS, checked, toggle, submitting, submitted, handleSubmit };
}
