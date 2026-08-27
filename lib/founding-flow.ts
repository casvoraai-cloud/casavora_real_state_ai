const EVENT_NAME = "cv:request-founding-form";

// Called from SoundFamiliar's "Yes" prompt: the visitor already answered the
// "does this sound familiar" checklist there, so tell the already-mounted
// FoundingMembers section to skip repeating that question, then scroll it into view.
export function requestFoundingForm() {
  window.dispatchEvent(new Event(EVENT_NAME));
  document.getElementById("founding")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function onFoundingFormRequest(handler: () => void) {
  window.addEventListener(EVENT_NAME, handler);
  return () => window.removeEventListener(EVENT_NAME, handler);
}
